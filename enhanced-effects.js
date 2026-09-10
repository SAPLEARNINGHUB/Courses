// ═══════════════════════════════════════════════════════════════
// ENHANCED VISUAL EFFECTS FOR SAP LEARNING HUB
// ═══════════════════════════════════════════════════════════════

(function() {
  'use strict';

  // ─────────────────────────────────────────────────────────────
  // 1. CUSTOM CURSOR TRAIL (Desktop Only)
  // ─────────────────────────────────────────────────────────────
  const initCursorTrail = () => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    const cursorDot = document.createElement('div');
    cursorDot.className = 'custom-cursor-dot';
    document.body.appendChild(cursorDot);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let dotX = 0, dotY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    const animateCursor = () => {
      // Smooth follow for outer ring
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;
      cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;

      // Fast follow for dot
      dotX += (mouseX - dotX) * 0.25;
      dotY += (mouseY - dotY) * 0.25;
      cursorDot.style.transform = `translate(${dotX}px, ${dotY}px)`;

      requestAnimationFrame(animateCursor);
    };
    animateCursor();

    // Scale up on hover
    const interactiveElements = 'a, button, .skill-card, .service-card, .book-session-btn, .nav-dot';
    document.querySelectorAll(interactiveElements).forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) scale(1.5)`;
        cursor.style.borderColor = 'var(--accent)';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) scale(1)`;
        cursor.style.borderColor = 'rgba(255, 46, 63, 0.3)';
      });
    });
  };

  // ─────────────────────────────────────────────────────────────
  // 2. PARTICLE SYSTEM FOR HERO SECTION
  // ─────────────────────────────────────────────────────────────
  const initParticles = () => {
    const canvas = document.createElement('canvas');
    canvas.id = 'particle-canvas';
    canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:1;opacity:0.4;';
    document.body.insertBefore(canvas, document.body.firstChild);

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = window.innerWidth < 768 ? 30 : 60;

    class Particle {
      constructor() {
        this.reset();
        this.y = Math.random() * height;
      }

      reset() {
        this.x = Math.random() * width;
        this.y = -10;
        this.size = Math.random() * 2 + 0.5;
        this.speedY = Math.random() * 0.5 + 0.2;
        this.speedX = Math.random() * 0.3 - 0.15;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX;

        if (this.y > height) this.reset();
        if (this.x < 0 || this.x > width) this.speedX *= -1;
      }

      draw() {
        ctx.fillStyle = `rgba(255, 46, 63, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();

        // Add glow
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 3);
        gradient.addColorStop(0, `rgba(255, 46, 63, ${this.opacity * 0.3})`);
        gradient.addColorStop(1, 'rgba(255, 46, 63, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animate);
    };
    animate();

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });
  };

  // ─────────────────────────────────────────────────────────────
  // 3. ADVANCED SCROLL ANIMATIONS
  // ─────────────────────────────────────────────────────────────
  const initScrollAnimations = () => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observe sections
    document.querySelectorAll('.service-card, .skill-card, .resource-card, .package-item, .sec-label').forEach(el => {
      el.classList.add('fade-in-up');
      observer.observe(el);
    });

    // Stagger animations for grids
    document.querySelectorAll('.services-grid, .skills-grid').forEach(grid => {
      const cards = grid.querySelectorAll('.service-card, .skill-card');
      cards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
      });
    });
  };

  // ─────────────────────────────────────────────────────────────
  // 4. PARALLAX SCROLLING FOR ORBS
  // ─────────────────────────────────────────────────────────────
  const initParallax = () => {
    const orbs = document.querySelectorAll('.orb-1, .orb-2, .orb-3');

    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      orbs.forEach((orb, index) => {
        const speed = 0.2 + (index * 0.1);
        orb.style.transform = `translateY(${scrolled * speed}px)`;
      });
    });
  };

  // ─────────────────────────────────────────────────────────────
  // 5. MAGNETIC BUTTONS
  // ─────────────────────────────────────────────────────────────
  const initMagneticButtons = () => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    document.querySelectorAll('.book-session-btn, .submit-btn').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
      });
    });
  };

  // ─────────────────────────────────────────────────────────────
  // 6. TYPING ANIMATION FOR HERO
  // ─────────────────────────────────────────────────────────────
  const initTypingAnimation = () => {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;

    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.style.opacity = '1';

    let index = 0;
    const typeSpeed = 50;

    const type = () => {
      if (index < text.length) {
        heroTitle.textContent += text.charAt(index);
        index++;
        setTimeout(type, typeSpeed);
      }
    };

    // Start typing after a brief delay
    setTimeout(type, 500);
  };

  // ─────────────────────────────────────────────────────────────
  // 7. SKILL METER ANIMATIONS
  // ─────────────────────────────────────────────────────────────
  const initSkillMeters = () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const fill = entry.target.querySelector('.skill-meter-fill');
          if (fill && !fill.classList.contains('animated')) {
            setTimeout(() => {
              fill.style.transform = 'scaleX(1)';
              fill.classList.add('animated');
            }, 300);
          }
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('.skill-card').forEach(card => observer.observe(card));
  };

  // ─────────────────────────────────────────────────────────────
  // 8. FLOATING BADGES ANIMATION
  // ─────────────────────────────────────────────────────────────
  const initFloatingBadges = () => {
    document.querySelectorAll('.service-badge, .skill-icon-wrap').forEach((badge, index) => {
      badge.style.animation = `floatBadge 3s ease-in-out ${index * 0.2}s infinite`;
    });
  };

  // ─────────────────────────────────────────────────────────────
  // 9. SMOOTH REVEAL ON LOAD
  // ─────────────────────────────────────────────────────────────
  const initLoadReveal = () => {
    document.body.style.opacity = '0';
    window.addEventListener('load', () => {
      setTimeout(() => {
        document.body.style.transition = 'opacity 0.8s ease';
        document.body.style.opacity = '1';
      }, 100);
    });
  };

  // ─────────────────────────────────────────────────────────────
  // 10. 3D TILT EFFECT ON CARDS
  // ─────────────────────────────────────────────────────────────
  const init3DTilt = () => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const cards = document.querySelectorAll('.service-card, .skill-card, .resource-card');

    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
      });
    });
  };

  // ─────────────────────────────────────────────────────────────
  // 11. PROGRESS BAR GLOW EFFECT
  // ─────────────────────────────────────────────────────────────
  const initProgressGlow = () => {
    const progressBar = document.querySelector('.progress-bar');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      progressBar.style.width = scrollPercent + '%';

      // Add glow when scrolling
      if (scrollPercent > 0) {
        progressBar.style.boxShadow = `0 0 20px var(--accent), 0 0 40px rgba(255, 46, 63, 0.3)`;
      }
    });
  };

  // ─────────────────────────────────────────────────────────────
  // 12. INTERACTIVE BACKGROUND GRADIENT
  // ─────────────────────────────────────────────────────────────
  const initInteractiveGradient = () => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let mouseX = 0, mouseY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX / window.innerWidth;
      mouseY = e.clientY / window.innerHeight;

      document.body.style.setProperty('--mouse-x', mouseX);
      document.body.style.setProperty('--mouse-y', mouseY);
    });
  };

  // ─────────────────────────────────────────────────────────────
  // INITIALIZE ALL EFFECTS
  // ─────────────────────────────────────────────────────────────
  const init = () => {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
      return;
    }

    console.log('🎨 Initializing enhanced visual effects...');

    initLoadReveal();
    initCursorTrail();
    initParticles();
    initScrollAnimations();
    initParallax();
    initMagneticButtons();
    initSkillMeters();
    initFloatingBadges();
    init3DTilt();
    initProgressGlow();
    initInteractiveGradient();

    // Don't run typing animation if text is already visible
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle && heroTitle.textContent.trim()) {
      // Skip typing animation for existing content
    }

    console.log('✨ All effects initialized!');
  };

  // Auto-initialize
  init();

})();
