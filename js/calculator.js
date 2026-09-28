/**
 * AZ MEER LTD (UK) - Interactive Scope & Quote Calculator
 * Calculates software engineering project estimates in GBP (£)
 */

document.addEventListener('DOMContentLoaded', () => {
  initQuoteCalculator();
});

function initQuoteCalculator() {
  const calcContainer = document.getElementById('quote-calculator');
  if (!calcContainer) return;

  const state = {
    serviceType: 'web',
    basePrice: 4500,
    scopeMultiplier: 1.0,
    addons: setOfAddons(),
    timelineMultiplier: 1.0
  };

  function setOfAddons() {
    return new Set(['auth', 'dashboard']);
  }

  const prices = {
    services: {
      web: 4500,
      mobile: 6000,
      fullstack: 8500,
      cloud: 5000,
      design: 3000
    },
    scopes: {
      mvp: 1.0,
      mid: 1.6,
      enterprise: 2.5
    },
    addons: {
      auth: 800,
      payment: 1200,
      chat: 1500,
      ai: 2500,
      dashboard: 1200,
      support: 1000
    },
    timelines: {
      express: 1.25,
      standard: 1.0,
      relaxed: 0.95
    }
  };

  function calculateTotal() {
    const serviceBase = prices.services[state.serviceType] || 4500;
    let addonsTotal = 0;
    state.addons.forEach(addonKey => {
      addonsTotal += prices.addons[addonKey] || 0;
    });

    const subtotal = (serviceBase * state.scopeMultiplier) + addonsTotal;
    const finalTotal = Math.round(subtotal * state.timelineMultiplier);

    const formattedMin = '£' + Math.round(finalTotal * 0.95).toLocaleString('en-GB');
    const formattedMax = '£' + Math.round(finalTotal * 1.15).toLocaleString('en-GB');

    const estimateValueEl = document.getElementById('calc-estimate-price');
    if (estimateValueEl) {
      estimateValueEl.textContent = `${formattedMin} - ${formattedMax}`;
    }

    const estimateTimeEl = document.getElementById('calc-estimate-time');
    if (estimateTimeEl) {
      let weeks = '6 - 10 Weeks';
      if (state.scopeMultiplier === 1.0) weeks = '4 - 6 Weeks';
      if (state.scopeMultiplier === 2.5) weeks = '12 - 20 Weeks';
      if (state.timelineMultiplier === 1.25) weeks += ' (Express)';
      estimateTimeEl.textContent = weeks;
    }
  }

  // Handle service selection
  calcContainer.querySelectorAll('[data-calc-service]').forEach(btn => {
    btn.addEventListener('click', () => {
      calcContainer.querySelectorAll('[data-calc-service]').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      state.serviceType = btn.getAttribute('data-calc-service');
      calculateTotal();
    });
  });

  // Handle scope selection
  calcContainer.querySelectorAll('[data-calc-scope]').forEach(btn => {
    btn.addEventListener('click', () => {
      calcContainer.querySelectorAll('[data-calc-scope]').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      const scopeKey = btn.getAttribute('data-calc-scope');
      state.scopeMultiplier = prices.scopes[scopeKey] || 1.0;
      calculateTotal();
    });
  });

  // Handle add-ons selection
  calcContainer.querySelectorAll('[data-calc-addon]').forEach(cb => {
    cb.addEventListener('change', () => {
      const addonKey = cb.getAttribute('data-calc-addon');
      if (cb.checked) {
        state.addons.add(addonKey);
      } else {
        state.addons.delete(addonKey);
      }
      calculateTotal();
    });
  });

  // Handle timeline selection
  calcContainer.querySelectorAll('[data-calc-timeline]').forEach(btn => {
    btn.addEventListener('click', () => {
      calcContainer.querySelectorAll('[data-calc-timeline]').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      const timeKey = btn.getAttribute('data-calc-timeline');
      state.timelineMultiplier = prices.timelines[timeKey] || 1.0;
      calculateTotal();
    });
  });

  // Book Consultation with pre-filled estimate
  const requestBtn = document.getElementById('calc-request-btn');
  if (requestBtn) {
    requestBtn.addEventListener('click', () => {
      const priceText = document.getElementById('calc-estimate-price')?.textContent || '';
      const serviceSelect = document.getElementById('contact-service-select');
      if (serviceSelect) {
        serviceSelect.value = state.serviceType;
      }
      const messageBox = document.getElementById('contact-message-box');
      if (messageBox) {
        messageBox.value = `Hi AZ MEER UK team,\nI used the instant quote calculator and generated an estimated project budget of ${priceText} for a ${state.serviceType.toUpperCase()} project. I would like to discuss this project with your London engineering team.`;
      }

      // Scroll to contact section or open contact page
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.href = 'contact.html';
      }
    });
  }

  calculateTotal();
}
