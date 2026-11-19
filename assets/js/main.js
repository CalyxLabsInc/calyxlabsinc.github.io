/* ==========================================================================
   CALYX LABS INC. — INTERACTIVE SCRIPTS
   Handles mobile nav, clipboard copy, screenshot lightbox, mailto builder,
   interactive Calyx SOC simulation, and Zappy Bird mini playable demo.
   ========================================================================== */

function showToast(message) {
  let toast = document.getElementById('calyx-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'calyx-toast';
    toast.className = 'toast-banner';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

function copyText(text, label) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast('Copied ' + (label || 'to clipboard') + '!');
    }).catch(() => fallbackCopy(text, label));
  } else {
    fallbackCopy(text, label);
  }
}

function fallbackCopy(text, label) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand('copy');
    showToast('Copied ' + (label || 'to clipboard') + '!');
  } catch (e) {
    showToast('Copy ready: ' + text.slice(0, 32) + '...');
  }
  document.body.removeChild(ta);
}

function openLightbox(imgSrc, caption) {
  const modal = document.getElementById('lightbox-modal');
  const img = document.getElementById('lightbox-img');
  const cap = document.getElementById('lightbox-caption');
  if (!modal || !img) return;
  img.src = imgSrc;
  if (cap) cap.textContent = caption || '';
  modal.classList.add('open');
}

function closeLightbox() {
  const modal = document.getElementById('lightbox-modal');
  if (modal) modal.classList.remove('open');
}

function handleContactSubmit(event) {
  event.preventDefault();
  const name = (document.getElementById('contact-name')?.value || '').trim();
  const email = (document.getElementById('contact-email')?.value || '').trim();
  const topic = (document.getElementById('contact-topic')?.value || 'General Inquiry').trim();
  const subjectInput = (document.getElementById('contact-subject')?.value || '').trim();
  const message = (document.getElementById('contact-message')?.value || '').trim();

  const finalSubject = subjectInput
    ? `[Calyx Labs - ${topic}] ${subjectInput}`
    : `[Calyx Labs Inquiry] ${topic} from ${name || 'Website Visitor'}`;

  const bodyLines = [
    `Hello Calyx Labs Inc. (Tristen Martinez / Calyxia),`,
    ``,
    message,
    ``,
    `--------------------------------------------------`,
    `Sender Name: ${name || 'Not specified'}`,
    `Sender Email: ${email || 'Not specified'}`,
    `Category: ${topic}`,
    `Sent via: https://calyxlabsinc.github.io/contact.html`
  ];

  const mailtoUrl = `mailto:calyxlabsinc@gmail.com?subject=${encodeURIComponent(finalSubject)}&body=${encodeURIComponent(bodyLines.join('\n'))}`;

  const previewBox = document.getElementById('mailto-preview-box');
  const previewLink = document.getElementById('mailto-direct-link');
  if (previewBox && previewLink) {
    previewBox.style.display = 'block';
    previewLink.href = mailtoUrl;
  }

  showToast('Opening your email client for calyxlabsinc@gmail.com...');
  window.location.href = mailtoUrl;
}

document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }

  const modal = document.getElementById('lightbox-modal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeLightbox();
    });
  }
});
