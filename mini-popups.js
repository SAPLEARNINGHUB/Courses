// ═══════════════════════════════════════════════════════════════
// FUN MINI POPUPS - Encouraging scroll messages
// ═══════════════════════════════════════════════════════════════

(function() {
  'use strict';

  // ─────────────────────────────────────────────────────────────
  // FUN MESSAGES
  // ─────────────────────────────────────────────────────────────
  const miniPopupMessages = [
    {
      trigger: 5, // Show after 5 seconds on page
      type: 'time',
      emoji: '👋',
      message: "Hey! Scroll down to see the cool stuff we built. It's free to explore! 😉"
    },
    {
      trigger: 15,
      type: 'time',
      emoji: '🎨',
      message: "Still here? There's a chatbot at the bottom-left. Try clicking it! 🤖"
    },
    {
      trigger: 30,
      type: 'scroll',
      emoji: '👀',
      message: "We spent hours making those skill cards interactive. Hover over them! ✨"
    },
    {
      trigger: 50,
      type: 'scroll',
      emoji: '🚀',
      message: "You're halfway! Keep going, the best parts are below! 💪"
    },
    {
      trigger: 75,
      type: 'scroll',
      emoji: '🎯',
      message: "Almost there! Check out the course packages - they're pretty neat! 📦"
    },
    {
      trigger: 95,
      type: 'scroll',
      emoji: '🎉',
      message: "You made it to the bottom! Now go back and play with everything! 😄"
    },
    {
      trigger: 'idle',
      type: 'idle',
      emoji: '😴',
      message: "Still reading? That's awesome! Take your time, no rush! ☕"
    }
  ];

  let shownPopups = new Set();
  let currentPopup = null;
  let idleTimer = null;

  // ─────────────────────────────────────────────────────────────
  // CREATE POPUP ELEMENT
  // ─────────────────────────────────────────────────────────────
  const createMiniPopup = () => {
    const popup = document.createElement('div');
    popup.className = 'mini-popup';
    popup.id = 'miniPopup';
    popup.innerHTML = `
      <button class="mini-popup-close" onclick="closeMiniPopup()">×</button>
      <div class="mini-popup-content">
        <div class="mini-popup-emoji" id="miniPopupEmoji"></div>
        <div class="mini-popup-text">
          <p class="mini-popup-message" id="miniPopupMessage"></p>
        </div>
      </div>
      <div class="mini-popup-progress"></div>
    `;
    document.body.appendChild(popup);
  };

  // ─────────────────────────────────────────────────────────────
  // SHOW MINI POPUP
  // ─────────────────────────────────────────────────────────────
  const showMiniPopup = (message) => {
    const popupKey = `${message.type}-${message.trigger}`;

    // Don't show if already shown
    if (shownPopups.has(popupKey)) return;

    // Don't show if another popup is visible
    if (currentPopup) return;

    const popup = document.getElementById('miniPopup');
    if (!popup) return;

    // Set content
    document.getElementById('miniPopupEmoji').textContent = message.emoji;
    document.getElementById('miniPopupMessage').textContent = message.message;

    // Show popup
    popup.classList.add('show');
    currentPopup = popupKey;
    shownPopups.add(popupKey);

    // Auto-hide after 5 seconds
    setTimeout(() => {
      closeMiniPopup();
    }, 5000);
  };

  // ─────────────────────────────────────────────────────────────
  // CLOSE MINI POPUP
  // ─────────────────────────────────────────────────────────────
  window.closeMiniPopup = () => {
    const popup = document.getElementById('miniPopup');
    if (!popup) return;

    popup.classList.remove('show');
    popup.classList.add('hide');

    setTimeout(() => {
      popup.classList.remove('hide');
      currentPopup = null;
    }, 400);
  };

  // ─────────────────────────────────────────────────────────────
  // TIME-BASED TRIGGERS
  // ─────────────────────────────────────────────────────────────
  const initTimeBasedPopups = () => {
    miniPopupMessages
      .filter(msg => msg.type === 'time')
      .forEach(message => {
        setTimeout(() => {
          showMiniPopup(message);
        }, message.trigger * 1000);
      });
  };

  // ─────────────────────────────────────────────────────────────
  // SCROLL-BASED TRIGGERS
  // ─────────────────────────────────────────────────────────────
  const initScrollBasedPopups = () => {
    let lastScrollPercent = 0;

    window.addEventListener('scroll', () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

      miniPopupMessages
        .filter(msg => msg.type === 'scroll')
        .forEach(message => {
          if (scrollPercent >= message.trigger && lastScrollPercent < message.trigger) {
            showMiniPopup(message);
          }
        });

      lastScrollPercent = scrollPercent;

      // Reset idle timer on scroll
      resetIdleTimer();
    });
  };

  // ─────────────────────────────────────────────────────────────
  // IDLE TRIGGER
  // ─────────────────────────────────────────────────────────────
  const resetIdleTimer = () => {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
      const idleMessage = miniPopupMessages.find(msg => msg.type === 'idle');
      if (idleMessage && !shownPopups.has('idle-idle')) {
        showMiniPopup(idleMessage);
      }
    }, 30000); // 30 seconds of no activity
  };

  // ─────────────────────────────────────────────────────────────
  // USER ACTIVITY TRACKING
  // ─────────────────────────────────────────────────────────────
  const initActivityTracking = () => {
    ['mousemove', 'keydown', 'click', 'touchstart'].forEach(event => {
      document.addEventListener(event, resetIdleTimer, { passive: true });
    });
  };

  // ─────────────────────────────────────────────────────────────
  // INITIALIZE
  // ─────────────────────────────────────────────────────────────
  const init = () => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
      return;
    }

    console.log('🎈 Initializing mini popups...');

    // Create popup element
    setTimeout(() => {
      createMiniPopup();
      initTimeBasedPopups();
      initScrollBasedPopups();
      initActivityTracking();
    }, 1000);

    console.log('✨ Mini popups ready!');
  };

  // Auto-initialize
  init();

})();
