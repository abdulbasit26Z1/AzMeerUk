/**
 * AZ MEER LTD (UK) - Developer REST API Sandbox Tester
 * Simulates live REST API responses directly in the UI
 */

document.addEventListener('DOMContentLoaded', () => {
  initApiTester();
});

function initApiTester() {
  const selectEndpoint = document.getElementById('api-endpoint-select');
  const sendBtn = document.getElementById('api-send-btn');
  const responseStatus = document.getElementById('api-response-status');
  const responseTime = document.getElementById('api-response-time');
  const responseBody = document.getElementById('api-response-body');

  if (!selectEndpoint || !sendBtn || !responseBody) return;

  const mockEndpoints = {
    'GET /api/v1/health': {
      status: '200 OK',
      time: '18 ms',
      body: {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        region: 'uk-london-1',
        services: {
          database: 'operational',
          api_gateway: 'operational',
          cdn: 'operational'
        },
        version: 'v2.4.0'
      }
    },
    'POST /api/v1/auth/login': {
      status: '200 OK',
      time: '45 ms',
      body: {
        success: true,
        token_type: 'Bearer',
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1a19kZXZlbG9wZXIiLCJpYXQiOjE3NDM1MDk0MDAsImV4cCI6MTc0MzU5NTgwMH0...',
        expires_in: 86400,
        user: {
          id: 'usr_uk_9281',
          name: 'AZ MEER Partner',
          organization: 'London Enterprise UK',
          role: 'Developer'
        }
      }
    },
    'GET /api/v1/projects': {
      status: '200 OK',
      time: '32 ms',
      body: {
        total: 4,
        projects: [
          {
            id: 'prj-101',
            title: 'Mezzy Mobile App UK',
            category: 'Mobile Application',
            platforms: ['iOS', 'Android'],
            status: 'Production',
            location: 'London, UK'
          },
          {
            id: 'prj-102',
            title: 'AZ MEER Business Suite UK',
            category: 'SaaS Platform',
            platforms: ['Web', 'Cloud API'],
            status: 'Production',
            location: 'Manchester, UK'
          },
          {
            id: 'prj-103',
            title: 'Field Connect UK',
            category: 'Enterprise IoT & Workflow',
            platforms: ['Android', 'Web'],
            status: 'Active Deployment',
            location: 'Birmingham, UK'
          }
        ]
      }
    },
    'GET /api/v1/services': {
      status: '200 OK',
      time: '24 ms',
      body: {
        company: 'AZ MEER LTD (United Kingdom)',
        services: [
          'Full-Stack Web Development',
          'iOS & Android Cross-Platform Apps',
          'Custom Software Architecture',
          'UI/UX Design Systems',
          'API Security & Cloud Modernization'
        ]
      }
    },
    'POST /api/v1/quote': {
      status: '201 Created',
      time: '62 ms',
      body: {
        status: 'received',
        quote_id: 'QTE-UK-2026-8842',
        message: 'Your UK software quote request has been routed to our London engineering leads.',
        estimated_response: 'Within 2 hours (UK Business Time)'
      }
    }
  };

  sendBtn.addEventListener('click', () => {
    const selected = selectEndpoint.value;
    const mock = mockEndpoints[selected];

    if (mock) {
      responseStatus.textContent = mock.status;
      responseStatus.className = 'badge badge-success';
      responseTime.textContent = mock.time;
      responseBody.textContent = JSON.stringify(mock.body, null, 2);
    }
  });

  // Trigger initial test
  sendBtn.click();
}
