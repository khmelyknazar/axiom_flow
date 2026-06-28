/* =====================================================
   AI RECEPTIONIST — Main JavaScript
   ===================================================== */

// ===== API CONFIG =====
// Замінити на URL свого сервера після деплою на Render
const API_BASE = 'https://ai-receptionist-0ho8.onrender.com';

// ===== NAV SCROLL =====
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}, { passive: true });

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ===== REVEAL ON SCROLL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ===== CHAT DEMO =====
const chatMessages = document.getElementById('chat-messages');

function getConversation() {
  const T = (key) => (typeof i18n !== 'undefined' ? i18n.t(key) : key);
  return [
    { from: 'customer', text: T('chat.msg.1'), delay: 800 },
    { from: 'ai',       text: T('chat.msg.2'), delay: 2200 },
    { from: 'customer', text: T('chat.msg.3'), delay: 4200 },
    { from: 'ai',       text: T('chat.msg.4'), delay: 5800 },
    { from: 'customer', text: T('chat.msg.5'), delay: 7800 },
    { from: 'ai',       text: T('chat.msg.6'), delay: 9200 },
    { from: 'customer', text: T('chat.msg.7'), delay: 11000 },
    { from: 'ai',       text: T('chat.msg.8'), delay: 12400 },
  ];
}

function getTime(offsetSeconds) {
  const now = new Date();
  now.setSeconds(now.getSeconds() - (15 - offsetSeconds / 1000));
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

let chatStarted = false;
let chatTimers = [];

function startChat() {
  if (chatStarted) return;
  chatStarted = true;

  const conversation = getConversation();

  conversation.forEach((msg, i) => {
    if (msg.from === 'ai') {
      const t1 = setTimeout(() => {
        const typing = document.createElement('div');
        typing.className = 'chat-msg from-ai';
        typing.id = `typing-${i}`;
        typing.innerHTML = `<div class="chat-typing">
          <span class="typing-dot"></span>
          <span class="typing-dot"></span>
          <span class="typing-dot"></span>
        </div>`;
        chatMessages.appendChild(typing);
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }, msg.delay - 900);
      chatTimers.push(t1);
    }

    const t2 = setTimeout(() => {
      const typingEl = document.getElementById(`typing-${i}`);
      if (typingEl) typingEl.remove();

      const msgEl = document.createElement('div');
      msgEl.className = `chat-msg from-${msg.from}`;
      msgEl.innerHTML = `
        <div class="chat-bubble">${msg.text}</div>
        <span class="chat-time">${getTime(msg.delay)}</span>
      `;
      chatMessages.appendChild(msgEl);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }, msg.delay);
    chatTimers.push(t2);
  });
}

window.addEventListener('langchange', () => {
  if (!chatStarted) return;
  chatTimers.forEach(clearTimeout);
  chatTimers = [];
  chatStarted = false;
  chatMessages.innerHTML = '';
  startChat();
});

const demoSection = document.getElementById('demo');
const demoObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    startChat();
    demoObserver.disconnect();
  }
}, { threshold: 0.3 });

if (demoSection) demoObserver.observe(demoSection);

// ===== FORM SUBMIT (підключено до сервера) =====
async function handleFormSubmit(e) {
  e.preventDefault();
  const emailInput = document.getElementById('email-input');
  const successEl = document.getElementById('form-success');
  if (!emailInput.value) return;

  const btn = e.target.querySelector('button[type="submit"]');
  btn.textContent = i18n.t('form.sending');
  btn.disabled = true;

  try {
    const res = await fetch(`${API_BASE}/api/leads/email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: emailInput.value })
    });
    if (!res.ok) throw new Error('Server error');
    successEl.classList.add('show');
    successEl.textContent = i18n.t('cta.email.success');
    emailInput.value = '';
  } catch (err) {
    successEl.classList.add('show');
    successEl.style.color = '#f87171';
    successEl.textContent = 'Помилка. Спробуйте ще раз.';
    setTimeout(() => { successEl.classList.remove('show'); successEl.style.color = ''; }, 3000);
  }

  btn.textContent = i18n.t('form.cta.btn');
  btn.disabled = false;
}

// ===== MODAL =====
function openDemoModal() {
  document.getElementById('demo-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeDemoModal(e) {
  if (!e || e.target === document.getElementById('demo-modal') || !e.target) {
    document.getElementById('demo-modal').classList.remove('open');
    document.body.style.overflow = '';
  }
}

// ===== DEMO FORM (підключено до сервера) =====
async function handleDemoForm(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button');
  const inputs = e.target.querySelectorAll('input');
  const [nameInput, emailInput, typeInput] = inputs;

  btn.textContent = i18n.t('form.sending');
  btn.disabled = true;

  try {
    const res = await fetch(`${API_BASE}/api/leads/demo`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: nameInput.value,
        email: emailInput.value,
        businessType: typeInput.value
      })
    });
    if (!res.ok) throw new Error('Server error');
    closeDemoModal();
    document.body.style.overflow = '';
    showToast(i18n.t('toast.demo'));
  } catch (err) {
    showToast('Помилка. Спробуйте ще раз.');
  }

  btn.textContent = i18n.t('form.demo.btn');
  btn.disabled = false;
}

function showToast(message) {
  const toast = document.createElement('div');
  toast.style.cssText = `
    position: fixed;
    bottom: 32px;
    left: 50%;
    transform: translateX(-50%) translateY(20px);
    background: #1e1e35;
    border: 1px solid rgba(124,108,252,0.3);
    color: #f0f0ff;
    padding: 14px 24px;
    border-radius: 100px;
    font-size: 14px;
    font-family: 'DM Sans', sans-serif;
    z-index: 999;
    box-shadow: 0 8px 32px rgba(0,0,0,0.4);
    opacity: 0;
    transition: all 0.4s ease;
  `;
  toast.textContent = message;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
  });

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(10px)';
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}

// ===== ESCAPE KEY MODAL =====
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeDemoModal();
});

// ===== PRICING HOVER =====
document.querySelectorAll('.pricing-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    document.querySelectorAll('.pricing-card').forEach(c => {
      if (c !== this && !c.classList.contains('pricing-card-featured')) {
        c.style.opacity = '0.7';
      }
    });
  });
  card.addEventListener('mouseleave', function() {
    document.querySelectorAll('.pricing-card').forEach(c => {
      c.style.opacity = '1';
    });
  });
});
