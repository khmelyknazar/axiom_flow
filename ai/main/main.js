// ===== API CONFIG (Для n8n Webhook) =====
// Встав сюди свій Production URL з n8n нода Webhook
const N8N_WEBHOOK_URL = 'https://probable-mushy-polyester.ngrok-free.dev/webhook/sales-lead';

// ===== FORM SUBMIT (Головна форма на сайті) =====
async function handleFormSubmit(e) {
  e.preventDefault();
  const emailInput = document.getElementById('email-input');
  const successEl = document.getElementById('form-success');
  if (!emailInput || !emailInput.value) return;

  const btn = e.target.querySelector('button[type="submit"]');
  const oldText = btn.textContent;
  btn.textContent = i18n.t('form.sending');
  btn.disabled = true;

  try {
    const res = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        email: emailInput.value.trim(),
        form_type: 'cta_main'
      })
    });
    
    if (!res.ok) throw new Error('Network response was not ok');
    
    successEl.classList.add('show');
    successEl.style.color = ''; // скидаємо червоний колір, якщо він був
    successEl.textContent = i18n.t('cta.email.success');
    emailInput.value = '';
  } catch (err) {
    console.error('Critical routing failure:', err);
    successEl.classList.add('show');
    successEl.style.color = '#f87171'; // підсвічуємо червоним при помилці
    successEl.textContent = i18n.currentLang === 'ua' ? 'Помилка маршрутизації. Спробуйте ще раз.' : 'Routing error. Please try again.';
    setTimeout(() => { successEl.classList.remove('show'); }, 4000);
  }

  btn.textContent = i18n.t('form.cta.btn');
  btn.disabled = false;
}

// ===== MODAL CONTROLS =====
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

// ===== DEMO FORM (Форма в модальному вікні) =====
async function handleDemoForm(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button');
  const inputs = e.target.querySelectorAll('input');
  const [nameInput, emailInput, typeInput] = inputs;

  const oldText = btn.textContent;
  btn.textContent = i18n.t('form.sending');
  btn.disabled = true;

  try {
    const res = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        business_type: typeInput.value.trim(),
        form_type: 'modal_demo'
      })
    });
    
    if (!res.ok) throw new Error('Server error during payload sync');
    
    // Очищаємо поля
    inputs.forEach(input => input.value = '');
    
    closeDemoModal();
    document.body.style.overflow = '';
    showToast(i18n.t('toast.demo'));
  } catch (err) {
    console.error('Critical modal routing failure:', err);
    showToast(i18n.currentLang === 'ua' ? 'Помилка синхронізації бази даних.' : 'Database sync failed.');
  }

  btn.textContent = i18n.t('form.demo.btn');
  btn.disabled = false;
}

// ===== DYNAMIC TOAST NOTIFICATIONS =====
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

// ===== PRICING HOVER EFFECT =====
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
