/**
 * AZ MEER LTD (UK) - Category Filter & Live Search Engine
 * Handles live filtering for Portfolio, Products, Blog, and FAQ items.
 */

document.addEventListener('DOMContentLoaded', () => {
  initFilterEngine();
  initAccordionFaq();
});

function initFilterEngine() {
  const searchInput = document.getElementById('filter-search-input');
  const filterPills = document.querySelectorAll('[data-filter-category]');
  const items = document.querySelectorAll('[data-item-category]');

  if (!items.length) return;

  let activeCategory = 'All';
  let searchQuery = '';

  function applyFilter() {
    items.forEach(item => {
      const cat = item.getAttribute('data-item-category') || '';
      const textContent = item.textContent.toLowerCase();

      const matchesCat = (activeCategory === 'All' || cat.toLowerCase().includes(activeCategory.toLowerCase()));
      const matchesSearch = (!searchQuery || textContent.includes(searchQuery));

      if (matchesCat && matchesSearch) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  }

  // Handle Search Input
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      applyFilter();
    });
  }

  // Handle Category Pill Clicks
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeCategory = pill.getAttribute('data-filter-category') || 'All';
      applyFilter();
    });
  });
}

/* Accordion FAQ Toggle */
function initAccordionFaq() {
  document.querySelectorAll('.faq-accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const parent = header.closest('.faq-item');
      if (!parent) return;

      const isOpen = parent.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(item => item.classList.remove('open'));

      if (!isOpen) {
        parent.classList.add('open');
      }
    });
  });
}
