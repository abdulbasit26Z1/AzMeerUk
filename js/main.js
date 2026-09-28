/**
 * AZ MEER LTD (UK) - Main JavaScript File
 * Manages mobile drawer, header scroll effects, active navigation, modal dialogues, and contact forms.
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileDrawer();
  setActiveNavLink();
  initContactForms();
  initModals();
});

/* Header Scroll Effect */
function initHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* Mobile Navigation Drawer */
function initMobileDrawer() {
  const toggleBtn = document.getElementById('mobile-toggle-btn');
  const drawer = document.getElementById('mobile-drawer');
  if (!toggleBtn || !drawer) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = drawer.classList.contains('open');
    if (isOpen) {
      drawer.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    } else {
      drawer.classList.add('open');
      toggleBtn.setAttribute('aria-expanded', 'true');
    }
  });

  // Close drawer when clicking outside or clicking a mobile nav link
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
    });
  });
}

/* Highlight Active Nav Item */
function setActiveNavLink() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/* Contact Form & Consultation Modal Handling */
function initContactForms() {
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const data = {
      name: formData.get('name') || '',
      email: formData.get('email') || '',
      phone: formData.get('phone') || '',
      service: formData.get('service') || 'General Inquiry',
      message: formData.get('message') || '',
      date: new Date().toISOString()
    };

    // Save submission in localStorage
    const submissions = JSON.parse(localStorage.getItem('azmeer_uk_inquiries') || '[]');
    submissions.push(data);
    localStorage.setItem('azmeer_uk_inquiries', JSON.stringify(submissions));

    // Show Confirmation Modal
    openModal('thank-you-modal');
    contactForm.reset();
  });
}

/* Generic Modal Dialogue System */
function initModals() {
  document.querySelectorAll('[data-modal-target]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute('data-modal-target');
      openModal(targetId);
    });
  });

  document.querySelectorAll('.modal-close, .modal-overlay').forEach(el => {
    el.addEventListener('click', (e) => {
      if (e.target === el || el.classList.contains('modal-close')) {
        closeAllModals();
      }
    });
  });
}

function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeAllModals() {
  document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('open'));
  document.body.style.overflow = '';
}
