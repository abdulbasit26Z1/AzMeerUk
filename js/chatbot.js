/**
 * AZ MEER LTD (UK) - Floating AI Assistant Widget
 * Answers user questions about services, contact details, quote estimations, and tech stack.
 */

document.addEventListener('DOMContentLoaded', () => {
  initChatbot();
});

function initChatbot() {
  const triggerBtn = document.getElementById('chatbot-trigger-btn');
  const modal = document.getElementById('chatbot-modal');
  const closeBtn = document.getElementById('chatbot-close-btn');
  const chatForm = document.getElementById('chatbot-form');
  const chatInput = document.getElementById('chatbot-input');
  const chatMessages = document.getElementById('chatbot-messages');

  if (!triggerBtn || !modal || !chatForm || !chatInput || !chatMessages) return;

  // Toggle Chat Modal
  triggerBtn.addEventListener('click', () => {
    modal.classList.toggle('open');
    if (modal.classList.contains('open')) {
      chatInput.focus();
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('open');
    });
  }

  // Handle preset quick buttons
  document.querySelectorAll('[data-chat-prompt]').forEach(btn => {
    btn.addEventListener('click', () => {
      const promptText = btn.getAttribute('data-chat-prompt');
      if (promptText) {
        addUserMessage(promptText);
        processBotResponse(promptText);
      }
    });
  });

  // Handle chat form submit
  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = chatInput.value.trim();
    if (!text) return;

    addUserMessage(text);
    chatInput.value = '';
    processBotResponse(text);
  });

  function addUserMessage(text) {
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble user';
    bubble.textContent = text;
    chatMessages.appendChild(bubble);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function addBotMessage(textHtml) {
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble bot';
    bubble.innerHTML = textHtml;
    chatMessages.appendChild(bubble);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function processBotResponse(query) {
    const q = query.toLowerCase();

    // Simulate thinking state
    setTimeout(() => {
      if (q.includes('service') || q.includes('offer') || q.includes('build')) {
        addBotMessage(`<strong>AZ MEER LTD (UK)</strong> provides top-tier software engineering services:
          <ul style="margin-top:0.5rem; padding-left:1.2rem;">
            <li>Full-Stack Web Development</li>
            <li>Mobile Apps (iOS & Android)</li>
            <li>Custom Enterprise Software</li>
            <li>UI/UX Design Systems</li>
            <li>API Architecture & Modernization</li>
          </ul>
          You can also use our <strong>Instant Quote Estimator</strong> on the Services or Home page!`);
      } else if (q.includes('quote') || q.includes('cost') || q.includes('price') || q.includes('budget')) {
        addBotMessage(`Our project estimates start from <strong>£3,000 GBP</strong> for lightweight MVPs up to custom enterprise solutions. You can calculate an instant estimate using our <a href="services.html#quote-calculator" style="color:var(--link-on-light); text-decoration:underline;">Interactive Quote Calculator</a> or fill in our <a href="contact.html" style="color:var(--link-on-light); text-decoration:underline;">Contact Form</a>.`);
      } else if (q.includes('location') || q.includes('where') || q.includes('address') || q.includes('uk') || q.includes('london')) {
        addBotMessage(`AZ MEER LTD is headquartered in the United Kingdom.<br><br><strong>London HQ:</strong> 128 City Road, London, EC1V 2NX, UK.<br><strong>Email:</strong> contact@azmeer.co.uk<br><strong>Phone:</strong> +44 20 7946 0912`);
      } else if (q.includes('tech') || q.includes('stack') || q.includes('framework')) {
        addBotMessage(`We build modern, secure applications using:
          <br>• <strong>Frontend:</strong> React, Next.js, Vue, Tailwind CSS, TypeScript
          <br>• <strong>Mobile:</strong> Flutter, React Native, Swift, Kotlin
          <br>• <strong>Backend:</strong> Node.js, Python, Go, PostgreSQL, Redis
          <br>• <strong>Cloud & DevOps:</strong> AWS UK, Docker, Kubernetes, GitHub Actions`);
      } else {
        addBotMessage(`Thank you for reaching out! At <strong>AZ MEER LTD UK</strong>, we specialize in high-performance web, mobile, and custom software development.<br><br>How can we assist you today? You can <a href="contact.html" style="color:var(--link-on-light); text-decoration:underline;">Request a Consultation</a> or call us at <strong>+44 20 7946 0912</strong>.`);
      }
    }, 400);
  }
}
