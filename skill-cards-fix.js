// ═══════════════════════════════════════════════════════════════
// ENHANCED SKILL CARDS - COMPLETE IMPLEMENTATION
// ═══════════════════════════════════════════════════════════════

(function() {
  'use strict';

  // ─────────────────────────────────────────────────────────────
  // ENHANCE SKILL CARDS WITH IT RESOURCING EFFECTS
  // ─────────────────────────────────────────────────────────────
  const enhanceSkillCards = () => {
    const skillCards = document.querySelectorAll('.skill-card');

    if (skillCards.length === 0) {
      console.warn('No skill cards found');
      return;
    }

    console.log(`Enhancing ${skillCards.length} skill cards...`);

    skillCards.forEach((card, index) => {
      // Add index for stagger animation
      card.style.setProperty('--index', index);

      // Force visibility
      card.style.opacity = '1';
      card.style.transform = 'none';

      // Add decorative corner accent
      if (!card.querySelector('.corner-accent')) {
        const cornerAccent = document.createElement('div');
        cornerAccent.className = 'corner-accent';
        card.appendChild(cornerAccent);
      }

      // Add particle container
      if (!card.querySelector('.skill-particles')) {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'skill-particles';

        // Create 5 particles
        for (let i = 0; i < 5; i++) {
          const particle = document.createElement('div');
          particle.className = 'skill-particle';
          particle.style.left = `${Math.random() * 100}%`;
          particle.style.animationDelay = `${Math.random() * 3}s`;
          particle.style.animationDuration = `${2 + Math.random() * 2}s`;
          particlesContainer.appendChild(particle);
        }

        card.appendChild(particlesContainer);
      }

      // Add expertise badge based on fill percentage
      if (!card.querySelector('.skill-badge')) {
        const fillStyle = card.style.getPropertyValue('--fill');
        const fillPercent = parseInt(fillStyle) || 80;
        let level = 'intermediate';
        let badgeText = '📊 Intermediate';

        if (fillPercent >= 90) {
          level = 'expert';
          badgeText = '⭐ Expert';
        } else if (fillPercent >= 85) {
          level = 'advanced';
          badgeText = '🔥 Advanced';
        }

        card.setAttribute('data-level', level);

        const badge = document.createElement('div');
        badge.className = 'skill-badge';
        badge.textContent = badgeText;
        card.appendChild(badge);
      }

      // 3D tilt effect on mouse move (desktop only)
      if (!window.matchMedia('(pointer: coarse)').matches) {
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          const centerX = rect.width / 2;
          const centerY = rect.height / 2;

          const rotateX = (y - centerY) / 15;
          const rotateY = (centerX - x) / 15;

          card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;

          // Update gradient position
          card.style.setProperty('--mx', `${(x / rect.width) * 100}%`);
          card.style.setProperty('--my', `${(y / rect.height) * 100}%`);
        });

        card.addEventListener('mouseleave', () => {
          card.style.transform = '';
        });
      }

      // Click ripple effect
      card.addEventListener('click', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--ripple-x', `${(x / rect.width) * 100}%`);
        card.style.setProperty('--ripple-y', `${(y / rect.height) * 100}%`);
      });

      // Animate skill meter when card becomes visible
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const meter = card.querySelector('.skill-meter-fill');
            if (meter && !meter.classList.contains('animated')) {
              setTimeout(() => {
                const fillValue = card.style.getPropertyValue('--fill') || '80%';
                meter.style.transform = `scaleX(${parseInt(fillValue) / 100})`;
                meter.classList.add('animated');
              }, 300 + (index * 100));
            }
            card.classList.add('visible');

            // Add stagger animation
            card.style.animation = `cardFadeIn 0.6s ease forwards`;
            card.style.animationDelay = `${index * 0.1}s`;
          }
        });
      }, { threshold: 0.2 });

      observer.observe(card);
    });

    console.log('✅ Skill cards enhanced!');
  };

  // ─────────────────────────────────────────────────────────────
  // ENHANCE IT RESOURCING CARD
  // ─────────────────────────────────────────────────────────────
  const enhanceITCard = () => {
    const itCard = document.querySelector('.service-card.it');
    if (!itCard) return;

    console.log('Enhancing IT card...');

    // Add particles effect
    if (!itCard.querySelector('.skill-particles')) {
      const particlesContainer = document.createElement('div');
      particlesContainer.className = 'skill-particles';
      particlesContainer.style.cssText = 'position:absolute;inset:0;pointer-events:none;z-index:0;opacity:0;transition:opacity 0.5s ease;';

      for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.className = 'skill-particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 3}s`;
        particle.style.animationDuration = `${2 + Math.random() * 2}s`;
        particlesContainer.appendChild(particle);
      }

      itCard.appendChild(particlesContainer);

      // Show particles on hover
      itCard.addEventListener('mouseenter', () => {
        particlesContainer.style.opacity = '1';
      });

      itCard.addEventListener('mouseleave', () => {
        particlesContainer.style.opacity = '0';
      });
    }

    console.log('✅ IT card enhanced!');
  };

  // ─────────────────────────────────────────────────────────────
  // ENHANCE ALL SERVICE CARDS
  // ─────────────────────────────────────────────────────────────
  const enhanceServiceCards = () => {
    const serviceCards = document.querySelectorAll('.service-card:not(.it)');

    serviceCards.forEach((card, index) => {
      // Add subtle particle effect to all service cards
      if (!card.querySelector('.skill-particles')) {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'skill-particles';
        particlesContainer.style.cssText = 'position:absolute;inset:0;pointer-events:none;z-index:0;opacity:0;transition:opacity 0.5s ease;';

        for (let i = 0; i < 3; i++) {
          const particle = document.createElement('div');
          particle.className = 'skill-particle';
          particle.style.left = `${Math.random() * 100}%`;
          particle.style.animationDelay = `${Math.random() * 3}s`;
          particle.style.animationDuration = `${2 + Math.random() * 2}s`;
          particlesContainer.appendChild(particle);
        }

        card.appendChild(particlesContainer);

        card.addEventListener('mouseenter', () => {
          particlesContainer.style.opacity = '1';
        });

        card.addEventListener('mouseleave', () => {
          particlesContainer.style.opacity = '0';
        });
      }
    });

    console.log('✅ Service cards enhanced!');
  };

  // ─────────────────────────────────────────────────────────────
  // FIX SKILL CARD VISIBILITY ISSUES
  // ─────────────────────────────────────────────────────────────
  const fixSkillCardVisibility = () => {
    // Override any existing inline styles that might hide cards
    const style = document.createElement('style');
    style.textContent = `
      .skill-card {
        opacity: 1 !important;
        transform: none !important;
        display: block !important;
        visibility: visible !important;
      }

      .skill-card.visible {
        opacity: 1 !important;
      }
    `;
    document.head.appendChild(style);

    // Force re-flow
    document.querySelectorAll('.skill-card').forEach(card => {
      card.offsetHeight; // Trigger reflow
    });
  };

  // ─────────────────────────────────────────────────────────────
  // INITIALIZE ALL ENHANCEMENTS
  // ─────────────────────────────────────────────────────────────
  const init = () => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
      return;
    }

    console.log('🎨 Initializing Skill Card Enhancements...');

    // Wait for DOM to be fully ready
    setTimeout(() => {
      fixSkillCardVisibility();
      enhanceSkillCards();
      enhanceITCard();
      enhanceServiceCards();
      console.log('✨ All card enhancements complete!');
    }, 200);
  };

  // Auto-initialize
  init();

})();
