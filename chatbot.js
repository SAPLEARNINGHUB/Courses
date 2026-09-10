// ═══════════════════════════════════════════════════════════════
// CHATBOT WITH PREDEFINED CONVERSATIONS & FUN POPUPS
// ═══════════════════════════════════════════════════════════════

(function() {
  'use strict';

  // ─────────────────────────────────────────────────────────────
  // PREDEFINED CONVERSATIONS
  // ─────────────────────────────────────────────────────────────
  const conversations = {
    greeting: [
      { bot: "Hi there! 👋 I'm your SAP Learning Assistant. How can I help you today?" }
    ],

    courses: [
      { bot: "Great question! We offer training in:" },
      { bot: "📊 SAP Analytics Cloud\n🌐 SAP Datasphere\n📋 SAP BPC\n🏗️ SAP BW/4HANA\n⚡ SAP S/4HANA\n🔗 SAP BDC" },
      { bot: "Which one interests you the most?" }
    ],

    pricing: [
      { bot: "Our pricing is flexible and depends on:" },
      { bot: "• Module complexity\n• Duration of training\n• Type of support (1-on-1, group, job support)" },
      { bot: "Fill out the enquiry form below and we'll send you a personalized quote! 💰" }
    ],

    duration: [
      { bot: "Training duration varies by module and your experience:" },
      { bot: "🟢 Beginners: 6-8 weeks\n🟡 Intermediate: 4-6 weeks\n🔴 Advanced: 2-4 weeks" },
      { bot: "We go at YOUR pace - no rush! 🎯" }
    ],

    certification: [
      { bot: "Yes! We provide certification preparation for:" },
      { bot: "• C_SAC_2302 (SAP Analytics Cloud)\n• C_BW4H_214 (BW/4HANA)\n• And other SAP certifications" },
      { bot: "We include mock tests, exam strategies, and last-mile revision! 🏅" }
    ],

    experience: [
      { bot: "No worries! We welcome freshers! 🎓" },
      { bot: "Our training is designed for all levels - from absolute beginners to experienced professionals." },
      { bot: "We'll start from the basics and build your skills step by step." }
    ],

    demo: [
      { bot: "Absolutely! We offer FREE live demo sessions! 🎥" },
      { bot: "Scroll down to the 'Live Demo Sessions' section and register for an upcoming session." },
      { bot: "You'll get hands-on experience before committing!" }
    ],

    jobsupport: [
      { bot: "Yes! We provide comprehensive job support: 💼" },
      { bot: "• Interview preparation\n• Mock interviews\n• Resume guidance\n• Real-world project help\n• Post-placement support" },
      { bot: "We're with you every step of your career journey!" }
    ],

    contact: [
      { bot: "You can reach us through:" },
      { bot: "📧 Email: [Check the contact section]\n📱 WhatsApp: [See below]\n📞 Call: [Listed in footer]" },
      { bot: "Or just fill the enquiry form and we'll contact you ASAP! ⚡" }
    ],

    motivation: [
      { bot: "SAP skills are HIGHLY in-demand! 🚀" },
      { bot: "Companies are constantly looking for certified SAP professionals. With the right training, you can:" },
      { bot: "✨ Land high-paying jobs\n✨ Work with global companies\n✨ Build a stable career\n✨ Become an industry expert" },
      { bot: "Your learning journey starts here! 💪" }
    ]
  };

  // ─────────────────────────────────────────────────────────────
  // FUN POPUPS FOR SCROLL MILESTONES
  // ─────────────────────────────────────────────────────────────
  const funPopups = [
    {
      trigger: 25, // Scroll percentage
      emoji: "🎉",
      title: "You're Exploring!",
      message: "Nice! You're checking out our modules. Keep scrolling to discover more awesome SAP training options!",
      shown: false
    },
    {
      trigger: 50,
      emoji: "🔥",
      title: "Halfway There!",
      message: "You're really interested! We love it! 💕 Don't miss our special packages below.",
      shown: false
    },
    {
      trigger: 75,
      emoji: "⭐",
      title: "Almost Done!",
      message: "You're almost at the bottom! Have you found what you're looking for? Try our chatbot if you have questions!",
      shown: false
    },
    {
      trigger: 90,
      emoji: "🎯",
      title: "You Made It!",
      message: "Wow! You scrolled through everything! Ready to start your SAP learning journey? Let's connect! 🚀",
      shown: false
    }
  ];

  // ─────────────────────────────────────────────────────────────
  // CHATBOT STATE
  // ─────────────────────────────────────────────────────────────
  let chatState = {
    isOpen: false,
    messages: [],
    currentConversation: null
  };

  // ─────────────────────────────────────────────────────────────
  // INITIALIZE CHATBOT
  // ─────────────────────────────────────────────────────────────
  const initChatbot = () => {
    const chatbotHTML = `
      <div class="chatbot-container">
        <!-- Robot Avatar -->
        <div class="robot-container" id="robotAvatar">
          <div class="robot-glow"></div>
          <span class="robot-emoji" onclick="toggleChat()">🤖</span>
        </div>

        <!-- Chat Window -->
        <div class="chat-window" id="chatWindow">
          <div class="chat-header">
            <div class="chat-header-left">
              <div class="chat-avatar">🤖</div>
              <div class="chat-header-text">
                <h3>SAP Learning Bot</h3>
                <div class="chat-status">
                  <span class="status-dot"></span>
                  <span>Online</span>
                </div>
              </div>
            </div>
            <button class="chat-close-btn" onclick="toggleChat()">×</button>
          </div>

          <div class="chat-messages" id="chatMessages"></div>

          <div class="chat-options" id="chatOptions"></div>
        </div>
      </div>

      <!-- Fun Popup -->
      <div class="popup-overlay" id="popupOverlay" onclick="closeFunPopup()"></div>
      <div class="fun-popup" id="funPopup">
        <div class="popup-emoji" id="popupEmoji">🎉</div>
        <h2 class="popup-title" id="popupTitle">Title</h2>
        <p class="popup-message" id="popupMessage">Message</p>
        <button class="popup-close-btn" onclick="closeFunPopup()">Got it! ✨</button>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', chatbotHTML);

    // Start with greeting immediately
    setTimeout(() => {
      addMessage("Hi there! 👋 I'm your SAP Learning Assistant. How can I help you today?");
      setTimeout(() => {
        showMainMenu();
      }, 1500);
    }, 500);
  };

  // ─────────────────────────────────────────────────────────────
  // TOGGLE CHAT
  // ─────────────────────────────────────────────────────────────
  window.toggleChat = () => {
    const chatWindow = document.getElementById('chatWindow');
    chatState.isOpen = !chatState.isOpen;

    if (chatState.isOpen) {
      chatWindow.classList.add('active');
    } else {
      chatWindow.classList.remove('active');
    }
  };

  // ─────────────────────────────────────────────────────────────
  // ADD MESSAGE
  // ─────────────────────────────────────────────────────────────
  const addMessage = (text, isBot = true, delay = 0) => {
    setTimeout(() => {
      const messagesContainer = document.getElementById('chatMessages');
      const time = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

      const messageHTML = `
        <div class="chat-message">
          ${isBot ? '<div class="message-avatar">🤖</div>' : ''}
          <div class="message-content">
            <p class="message-text">${text}</p>
            <div class="message-time">${time}</div>
          </div>
        </div>
      `;

      messagesContainer.insertAdjacentHTML('beforeend', messageHTML);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, delay);
  };

  // ─────────────────────────────────────────────────────────────
  // ADD TYPING INDICATOR
  // ─────────────────────────────────────────────────────────────
  const showTyping = () => {
    const messagesContainer = document.getElementById('chatMessages');
    const typingHTML = `
      <div class="typing-indicator" id="typingIndicator">
        <div class="message-avatar">🤖</div>
        <div class="message-content">
          <div class="typing-dots">
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
          </div>
        </div>
      </div>
    `;
    messagesContainer.insertAdjacentHTML('beforeend', typingHTML);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  };

  const hideTyping = () => {
    const typing = document.getElementById('typingIndicator');
    if (typing) typing.remove();
  };

  // ─────────────────────────────────────────────────────────────
  // ADD CONVERSATION
  // ─────────────────────────────────────────────────────────────
  const addConversation = (conversationKey) => {
    const conversation = conversations[conversationKey];
    if (!conversation) return;

    showTyping();

    conversation.forEach((msg, index) => {
      setTimeout(() => {
        if (index === 0) hideTyping();
        if (index < conversation.length - 1) showTyping();
        addMessage(msg.bot);
        if (index === conversation.length - 1) hideTyping();
      }, (index + 1) * 1500);
    });
  };

  // ─────────────────────────────────────────────────────────────
  // SHOW MAIN MENU
  // ─────────────────────────────────────────────────────────────
  const showMainMenu = () => {
    setTimeout(() => {
      const optionsContainer = document.getElementById('chatOptions');
      optionsContainer.innerHTML = `
        <button class="chat-option-btn" onclick="handleOption('courses')">📚 What courses do you offer?</button>
        <button class="chat-option-btn" onclick="handleOption('pricing')">💰 How much does it cost?</button>
        <button class="chat-option-btn" onclick="handleOption('duration')">⏱️ How long is the training?</button>
        <button class="chat-option-btn" onclick="handleOption('certification')">🏅 Do you provide certification?</button>
        <button class="chat-option-btn" onclick="handleOption('experience')">🎓 I'm a fresher, can I join?</button>
        <button class="chat-option-btn" onclick="handleOption('demo')">🎥 Can I get a demo first?</button>
        <button class="chat-option-btn" onclick="handleOption('jobsupport')">💼 Do you provide job support?</button>
        <button class="chat-option-btn" onclick="handleOption('motivation')">🚀 Why should I learn SAP?</button>
      `;
    }, 500);
  };

  // ─────────────────────────────────────────────────────────────
  // HANDLE OPTION CLICK
  // ─────────────────────────────────────────────────────────────
  window.handleOption = (option) => {
    // Disable all buttons temporarily
    const buttons = document.querySelectorAll('.chat-option-btn');
    buttons.forEach(btn => btn.disabled = true);

    // Add conversation
    addConversation(option);

    // Re-enable and show menu again
    setTimeout(() => {
      buttons.forEach(btn => btn.disabled = false);
    }, 5000);
  };

  // ─────────────────────────────────────────────────────────────
  // FUN POPUPS ON SCROLL - DISABLED
  // ─────────────────────────────────────────────────────────────
  const initScrollPopups = () => {
    // Disabled - no fun popups on scroll
    console.log('Fun scroll popups disabled');
  };

  // ─────────────────────────────────────────────────────────────
  // SHOW FUN POPUP
  // ─────────────────────────────────────────────────────────────
  const showFunPopup = (popup) => {
    const popupEl = document.getElementById('funPopup');
    const overlayEl = document.getElementById('popupOverlay');

    document.getElementById('popupEmoji').textContent = popup.emoji;
    document.getElementById('popupTitle').textContent = popup.title;
    document.getElementById('popupMessage').textContent = popup.message;

    overlayEl.classList.add('show');
    popupEl.classList.add('show');

    // Auto-close after 5 seconds
    setTimeout(() => {
      closeFunPopup();
    }, 5000);
  };

  // ─────────────────────────────────────────────────────────────
  // CLOSE FUN POPUP
  // ─────────────────────────────────────────────────────────────
  window.closeFunPopup = () => {
    const popupEl = document.getElementById('funPopup');
    const overlayEl = document.getElementById('popupOverlay');

    popupEl.classList.remove('show');
    overlayEl.classList.remove('show');
  };

  // ─────────────────────────────────────────────────────────────
  // INITIALIZE
  // ─────────────────────────────────────────────────────────────
  const init = () => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
      return;
    }

    console.log('🤖 Initializing Chatbot & Fun Popups...');

    setTimeout(() => {
      initChatbot();
      initScrollPopups();
    }, 500);

    console.log('✨ Chatbot ready!');
  };

  // Auto-initialize
  init();

})();
