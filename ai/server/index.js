require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

// ─── Middleware ───────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.static('../admin')); // serve admin panel

// ─── MongoDB Schema ───────────────────────────────────────
const leadSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['email', 'demo'],
    required: true
  },
  email: { type: String, required: true },
  name: { type: String, default: '' },
  businessType: { type: String, default: '' },
  status: {
    type: String,
    enum: ['new', 'in_progress', 'closed'],
    default: 'new'
  },
  createdAt: { type: Date, default: Date.now }
});

const Lead = mongoose.model('Lead', leadSchema);

// ─── Email Transporter ────────────────────────────────────
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

async function sendNotification(lead) {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) return;

  const typeLabel = lead.type === 'demo' ? '📅 Запит на демо' : '📧 Email підписка';
  const subject = `${typeLabel} — ${lead.email}`;
  const html = `
    <div style="font-family: sans-serif; max-width: 500px;">
      <h2 style="color: #6C63FF;">${typeLabel}</h2>
      <table style="width:100%; border-collapse:collapse;">
        <tr><td style="padding:8px; color:#666;">Email</td><td style="padding:8px;"><b>${lead.email}</b></td></tr>
        ${lead.name ? `<tr><td style="padding:8px; color:#666;">Ім'я</td><td style="padding:8px;"><b>${lead.name}</b></td></tr>` : ''}
        ${lead.businessType ? `<tr><td style="padding:8px; color:#666;">Бізнес</td><td style="padding:8px;"><b>${lead.businessType}</b></td></tr>` : ''}
        <tr><td style="padding:8px; color:#666;">Час</td><td style="padding:8px;">${new Date().toLocaleString('uk-UA')}</td></tr>
      </table>
      <p style="margin-top:20px;">
        <a href="${process.env.ADMIN_URL || 'https://your-app.onrender.com'}/admin" 
           style="background:#6C63FF;color:white;padding:10px 20px;border-radius:8px;text-decoration:none;">
          Відкрити адмін-панель →
        </a>
      </p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.NOTIFY_EMAIL,
      subject,
      html
    });
  } catch (err) {
    console.error('Email error:', err.message);
  }
}

// ─── Auth Middleware ──────────────────────────────────────
function adminAuth(req, res, next) {
  const key = req.headers['x-admin-key'] || req.query.key;
  if (key !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

// ─── Routes ───────────────────────────────────────────────

// Submit email from main CTA form
app.post('/api/leads/email', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Invalid email' });
    }

    const lead = await Lead.create({ type: 'email', email });
    await sendNotification(lead);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Submit demo request
app.post('/api/leads/demo', async (req, res) => {
  try {
    const { name, email, businessType } = req.body;
    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Invalid email' });
    }

    const lead = await Lead.create({ type: 'demo', email, name, businessType });
    await sendNotification(lead);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all leads (admin only)
app.get('/api/leads', adminAuth, async (req, res) => {
  try {
    const { status, type, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (type) filter.type = type;

    const total = await Lead.countDocuments(filter);
    const leads = await Lead.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({ leads, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update lead status (admin only)
app.patch('/api/leads/:id', adminAuth, async (req, res) => {
  try {
    const { status } = req.body;
    const lead = await Lead.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!lead) return res.status(404).json({ error: 'Not found' });
    res.json({ success: true, lead });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete lead (admin only)
app.delete('/api/leads/:id', adminAuth, async (req, res) => {
  try {
    await Lead.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Stats (admin only)
app.get('/api/stats', adminAuth, async (req, res) => {
  try {
    const total = await Lead.countDocuments();
    const newLeads = await Lead.countDocuments({ status: 'new' });
    const demos = await Lead.countDocuments({ type: 'demo' });
    const emails = await Lead.countDocuments({ type: 'email' });

    // Last 7 days
    const week = new Date();
    week.setDate(week.getDate() - 7);
    const weekLeads = await Lead.countDocuments({ createdAt: { $gte: week } });

    res.json({ total, new: newLeads, demos, emails, weekLeads });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Health check
app.get('/api/health', (req, res) => res.json({ ok: true }));

// ─── Connect & Start ──────────────────────────────────────
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });