document.addEventListener('DOMContentLoaded', () => {
  const introScreen = document.getElementById('intro-screen');
  const introVideo = document.getElementById('intro-video');
  const introBlackout = document.getElementById('intro-blackout');
  const skipHint = document.getElementById('skip-hint');
  const navbar = document.getElementById('navbar');
  const heroVideo = document.getElementById('hero-video');
  const logo = document.getElementById('logo');
  const adminPanel = document.getElementById('admin-panel');

  let hasTriggeredFade = false;

  // Lock scroll during loading
  document.body.classList.add('no-scroll');

  // Trigger video play
  introVideo.play().catch(() => {
    if (skipHint) skipHint.innerText = "Click to Start";
  });

  introVideo.addEventListener('play', () => {
    // Just start the hero video in background, but keep it hidden by intro layer
    if (heroVideo) heroVideo.play().catch(() => {});
  });

  // Assets reveal after video finishes
  introVideo.onended = () => {
    // Hide the video immediately
    introVideo.style.display = 'none';
    
    // Show the asset (image) instantly
    introScreen.classList.add('show-assets');
    
    // Remove the blackout instantly so the background is transparent
    if (introBlackout) introBlackout.style.display = 'none';
    
    // Trigger violent shake for 0.5 seconds
    introScreen.classList.add('shake');
    
    // After 0.5s shake, apply the tilt
    setTimeout(() => {
      introScreen.classList.remove('shake');
      introScreen.classList.add('tilted');
      
      // Wait 2 seconds with images tilted on screen
      setTimeout(() => {
        // Start the split-slide animation
        introScreen.classList.add('split');
        
        // Wait for slide animation (2.5s) to finish
        setTimeout(() => {
          // Softly vanish the vignette
          const overlay = document.getElementById('intro-overlay');
          if (overlay) overlay.style.opacity = '0';
          
          // Wait for the vignette fade (1.5s) before final removal
          setTimeout(() => {
            finishIntro();
          }, 1500);
        }, 2500);
      }, 2000); 
    }, 500);
  };

  function finishIntro() {
    // Unlock scroll
    document.body.classList.remove('no-scroll');
    
    // Reset intro states for next time
    introScreen.classList.remove('show-assets', 'shake', 'tilted', 'split');
    const overlay = document.getElementById('intro-overlay');
    if (overlay) overlay.style.opacity = '1';
    
    // Instant removal of intro screen
    introScreen.style.display = 'none';
    introVideo.pause();
  }

  introScreen.onclick = () => { finishIntro(); };
  if (skipHint) skipHint.onclick = (e) => { e.stopPropagation(); finishIntro(); };

  // --- Easter Egg (5 Clicks) ---
  let clickCount = 0;
  if (logo) {
    logo.onclick = () => {
      clickCount++;
      if (clickCount === 5) {
        adminPanel.classList.remove('hidden');
        clickCount = 0;
      }
      setTimeout(() => { if (clickCount > 0) clickCount = 0; }, 3000);
    };
  }

  window.closeAdmin = () => {
    if (adminPanel) adminPanel.classList.add('hidden');
  };

  // --- Bankai Cinematic Animation & Theme States ---
  let bankaiState = localStorage.getItem('bankai-theme-state') || 'orange'; // 'orange' or 'monochrome'
  const bankaiBtn = document.getElementById('bankai-btn');
  const hollowBtn = document.getElementById('hollow-btn');
  let bankaiTimeouts = [];

  const applyThemeVariables = (state) => {
    const root = document.documentElement;
    const aboutVideo = document.getElementById('about-video');
    const aboutGif = document.getElementById('about-gif');
    const workBg = document.getElementById('work-bankai-bg');
    const heroHollowImg = document.getElementById('hero-hollow-img');
    const aboutHollowImg = document.getElementById('about-hollow-img');

    if (state === 'hollow') {
      document.body.classList.remove('bankai-active');
      document.body.classList.add('hollow-active');
      root.style.setProperty('--bg-color', '#000000');
      root.style.setProperty('--text-color', '#EDEDED');
      root.style.setProperty('--accent-color', '#6B0000');
      root.style.setProperty('--accent-glow', 'rgba(107, 0, 0, 0.3)');
      root.style.setProperty('--accent-gradient-2', '#4a0000');
      root.style.setProperty('--card-bg', '#0a0a0a');
      root.style.setProperty('--card-border', '#1a1a1a');
      root.style.setProperty('--contact-bg', "url('Videos/28.png')");
      if (bankaiBtn) bankaiBtn.innerHTML = '<img src="Videos/collapse.png" alt="Collapse" class="theme-btn-img" />';
      if (hollowBtn) hollowBtn.style.display = 'none';
      
      if (workBg) {
        workBg.style.backgroundImage = "url('Videos/27.png')";
        workBg.classList.add('show');
      }
      
      if (heroVideo) heroVideo.style.display = 'none';
      if (heroHollowImg) heroHollowImg.style.display = 'block';

      if (aboutVideo) {
        aboutVideo.pause();
        aboutVideo.style.display = 'none';
      }
      if (aboutGif) aboutGif.style.display = 'none';
      if (aboutHollowImg) aboutHollowImg.style.display = 'block';
    } else if (state === 'monochrome') {
      document.body.classList.add('bankai-active');
      document.body.classList.remove('hollow-active');
      root.style.setProperty('--bg-color', '#050505');
      root.style.setProperty('--text-color', '#ffffff');
      root.style.setProperty('--accent-color', '#ffffff');
      root.style.setProperty('--accent-glow', 'rgba(255, 255, 255, 0.3)');
      root.style.setProperty('--accent-gradient-2', '#cccccc');
      root.style.setProperty('--card-bg', '#050505');
      root.style.setProperty('--card-border', '#1a1a1a');
      root.style.setProperty('--contact-bg', "url('Videos/reach2.png')");
      if (bankaiBtn) bankaiBtn.innerHTML = '<img src="Videos/collapse.png" alt="Collapse" class="theme-btn-img" />';
      if (hollowBtn) hollowBtn.style.display = 'inline-flex';
      if (workBg) {
        workBg.style.backgroundImage = "";
        workBg.classList.add('show');
      }
      
      // Update Hero Video to abcd.mp4 for Bankai theme
      if (heroVideo) {
        heroVideo.style.display = 'block';
        if (heroHollowImg) heroHollowImg.style.display = 'none';
        const targetSrc = 'Videos/abcd.mp4';
        if (!heroVideo.src.endsWith(targetSrc)) {
          heroVideo.src = targetSrc;
          heroVideo.load();
          heroVideo.play().catch(() => {});
        }
      }

      // Swap About Video to qwerty.gif for Bankai theme
      if (aboutVideo && aboutGif) {
        aboutVideo.pause();
        aboutVideo.style.display = 'none';
        aboutGif.style.display = 'block';
        if (aboutHollowImg) aboutHollowImg.style.display = 'none';
      }
    } else {
      document.body.classList.remove('bankai-active');
      document.body.classList.remove('hollow-active');
      root.style.setProperty('--bg-color', '#000000');
      root.style.setProperty('--text-color', '#ffffff');
      root.style.setProperty('--accent-color', '#ff6600');
      root.style.setProperty('--accent-glow', 'rgba(255, 102, 0, 0.3)');
      root.style.setProperty('--accent-gradient-2', '#ffcc00');
      root.style.setProperty('--card-bg', '#0a0a0a');
      root.style.setProperty('--card-border', '#1a1a1a');
      root.style.setProperty('--contact-bg', "url('Videos/reach.png')");
      if (bankaiBtn) bankaiBtn.innerHTML = '<img src="Videos/bankai.png" alt="Bankai" class="theme-btn-img" />';
      if (hollowBtn) hollowBtn.style.display = 'inline-flex';
      if (workBg) {
        workBg.style.backgroundImage = "";
        workBg.classList.remove('show');
      }
      
      // Restore standard Hero Video to hero.mp4
      if (heroVideo) {
        heroVideo.style.display = 'block';
        if (heroHollowImg) heroHollowImg.style.display = 'none';
        const targetSrc = 'Videos/hero.mp4';
        if (!heroVideo.src.endsWith(targetSrc)) {
          heroVideo.src = targetSrc;
          heroVideo.load();
          heroVideo.play().catch(() => {});
        }
      }

      // Restore About Video to standard hero2.mp4
      if (aboutVideo && aboutGif) {
        aboutGif.style.display = 'none';
        if (aboutHollowImg) aboutHollowImg.style.display = 'none';
        aboutVideo.style.display = 'block';
        aboutVideo.play().catch(() => {});
      }
    }
  };

  // Set initial state on page load
  applyThemeVariables(bankaiState);

  // Helper to push and track timeouts
  const queueTimeout = (fn, delay) => {
    const id = setTimeout(fn, delay);
    bankaiTimeouts.push(id);
    return id;
  };

  const clearBankaiTimeouts = () => {
    bankaiTimeouts.forEach(t => clearTimeout(t));
    bankaiTimeouts = [];
  };

  window.skipBankaiAnimation = (e) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    
    clearBankaiTimeouts();

    const overlay = document.getElementById('bankai-overlay');
    const banImg = document.getElementById('bankai-ban');
    const kaiImg = document.getElementById('bankai-kai');

    if (banImg) banImg.classList.remove('show');
    if (kaiImg) kaiImg.classList.remove('show');

    // Immediately toggle the theme state
    bankaiState = (bankaiState === 'orange') ? 'monochrome' : 'orange';
    applyThemeVariables(bankaiState);
    localStorage.setItem('bankai-theme-state', bankaiState);

    // Fade out overlay snappily
    if (overlay) {
      overlay.classList.remove('active');
      overlay.classList.remove('cinematic-mode');
    }

    // Restore scrolling
    setTimeout(() => {
      document.body.style.overflow = '';
    }, 600);
  };

  window.openHollowTheme = () => {
    const overlay = document.getElementById('bankai-overlay');
    const holeImg = document.getElementById('hollow-hole');

    if (!overlay || !holeImg) return;

    clearBankaiTimeouts();
    document.body.style.overflow = 'hidden';

    // Slowly darken/blackout the screen
    overlay.classList.add('active');
    overlay.classList.add('cinematic-mode');

    queueTimeout(() => {
      holeImg.classList.add('show');
      
      queueTimeout(() => {
        holeImg.classList.remove('show');
        holeImg.classList.add('fade-out');
        
        bankaiState = 'hollow';
        applyThemeVariables(bankaiState);
        localStorage.setItem('bankai-theme-state', bankaiState);

        overlay.classList.remove('active');
        overlay.classList.remove('cinematic-mode');

        queueTimeout(() => {
          document.body.style.overflow = '';
          holeImg.classList.remove('fade-out');
        }, 1500);

      }, 4000);

    }, 2000);
  };

  window.openThemesPanel = () => {
    const overlay = document.getElementById('bankai-overlay');
    const banImg = document.getElementById('bankai-ban');
    const kaiImg = document.getElementById('bankai-kai');

    if (!overlay || !banImg || !kaiImg) return;

    clearBankaiTimeouts();

    // Disable body scrolling during sequence
    document.body.style.overflow = 'hidden';
    
    // Slowly darken/blackout the screen
    overlay.classList.add('active');

    if (bankaiState === 'orange') {
      // ===== ENTERS BANKAI: PLAY INTENSE CINEMATIC WITH IMAGES =====
      overlay.classList.add('cinematic-mode');

      // Step 2: Show BAN.png once the screen is black (1.5s transition)
      queueTimeout(() => {
        banImg.classList.add('show');

        // Step 3: Remove BAN.png after 1.5 seconds
        queueTimeout(() => {
          banImg.classList.remove('show');

          // Step 4: Show KAI.png snappily after BAN.png starts fading (200ms delay!)
          queueTimeout(() => {
            kaiImg.classList.add('show');

            // Step 5: Remove KAI.png after 2.5 seconds
            queueTimeout(() => {
              kaiImg.classList.remove('show');

              // Apply monochrome variables pitch black phase
              bankaiState = 'monochrome';
              applyThemeVariables(bankaiState);
              localStorage.setItem('bankai-theme-state', bankaiState);

              // Step 6: Fade out overlay (0.8s transition)
              queueTimeout(() => {
                overlay.classList.remove('active');
                overlay.classList.remove('cinematic-mode');

                // Step 7: Re-enable scrolling once overlay transition is complete
                queueTimeout(() => {
                  document.body.style.overflow = '';
                }, 1500); // 1.5s for overlay fadeout

              }, 800);

            }, 2500);

          }, 200); // Decreased delay from 800ms to 200ms so KAI displays snappily!

        }, 1500);

      }, 1500); // 1.5s screen darkening time

    } else {
      // ===== COLLAPSE / RETURN TO ORANGE: PEACEFUL AND SMOOTH FADE BACK =====
      overlay.classList.remove('cinematic-mode');

      // Wait 1.5s for the screen to go solid black
      queueTimeout(() => {
        // Restore standard theme variables during pitch black screen
        bankaiState = 'orange';
        applyThemeVariables(bankaiState);
        localStorage.setItem('bankai-theme-state', bankaiState);

        // Add a brief dramatic black beat (800ms) before fading out
        queueTimeout(() => {
          overlay.classList.remove('active');

          // Re-enable scrolling after the overlay fadeout transition is complete
          queueTimeout(() => {
            document.body.style.overflow = '';
          }, 1500);

        }, 800);

      }, 1500);
    }
  };

  // --- UI Logic (throttled scroll for performance) ---
  let scrollTicking = false;
  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      requestAnimationFrame(() => {
        if (window.scrollY > 50) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  }, { passive: true });

  // --- Play/pause about-video only when in viewport ---
  const aboutVideo = document.getElementById('about-video');
  if (aboutVideo) {
    const aboutObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          aboutVideo.play().catch(() => {});
        } else {
          aboutVideo.pause();
        }
      });
    }, { threshold: 0.1 });
    aboutObserver.observe(document.getElementById('about'));
  }

  // --- Pause hero-video when scrolled away ---
  if (heroVideo) {
    const heroObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) heroVideo.play().catch(() => {});
        else heroVideo.pause();
      });
    }, { threshold: 0.1 });
    heroObserver.observe(document.getElementById('hero'));
  }

  // --- Contentful CMS Integration ---
  async function renderProjects() {
    const SPACE_ID = 'ajk4pzy1lq44';
    const ACCESS_TOKEN = 'zgIVfVbr1RQcO5e1EY-M1P5R7hS1PedKMnoa7xAdUhs';

    let data;
    try {
      const res = await fetch(
        `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&content_type=portfolio&include=2`
      );
      data = await res.json();
      console.log("Contentful Data:", data);
    } catch (err) {
      console.error("Contentful fetch error:", err);
      return;
    }

    const ticker    = document.getElementById("projects-ticker");
    const modalGrid = document.getElementById("projects-modal-grid");

    if (!data.items || data.items.length === 0) {
      if (ticker)    ticker.innerHTML    = '<p style="color:var(--accent-color);padding:40px">No projects found.</p>';
      if (modalGrid) modalGrid.innerHTML = '<p style="color:var(--accent-color);padding:40px;grid-column:1/-1">No projects found.</p>';
      return;
    }

    const getImage = (fields) => {
      if (fields.image && fields.image.sys && data.includes && data.includes.Asset) {
        const asset = data.includes.Asset.find(a => a.sys.id === fields.image.sys.id);
        if (asset && asset.fields && asset.fields.file) return "https:" + asset.fields.file.url;
      }
      return "";
    };

    const emojis = ["🚀","⚡","🔥","💡","🎯","🛠️","🌐","🎨"];

    // Store project data for detail modal
    const projectsData = data.items.map((item, i) => ({
      title:       item.fields.title       || "Untitled Project",
      description: item.fields.description || "No description.",
      url:         item.fields.projectUrl  || "#",
      img:         getImage(item.fields),
      emoji:       emojis[i % emojis.length]
    }));



    // ── Ticker cards ──
    const makeTickerCard = (p, idx) => {
      const imgHTML = p.img
        ? `<img class="ticker-card-img" src="${p.img}" alt="${p.title}" loading="lazy" />`
        : `<div class="ticker-card-img-placeholder">${p.emoji}</div>`;

      return `
        <div class="ticker-card" data-idx="${idx}" style="cursor:pointer;">
          ${imgHTML}
          <div class="ticker-card-body">
            <div class="ticker-card-title">${p.title}</div>
            <div class="ticker-card-desc">${p.description}</div>
            <div class="ticker-card-footer">
              <button class="ticker-view-btn" data-idx="${idx}">View</button>
            </div>
          </div>
        </div>`;
    };

    if (ticker) {
      const html = projectsData.map((p, i) => makeTickerCard(p, i)).join("");
      ticker.innerHTML = html + html;
      // Attach click handlers (card + view button)
      ticker.querySelectorAll('.ticker-card').forEach(card => {
        card.addEventListener('click', (e) => {
          const idx = parseInt(card.getAttribute('data-idx'));
          openDetailModal(projectsData[idx]);
        });
      });
    }

    // ── "All Projects" modal grid cards ──
    const makeModalCard = (p, idx) => {
      const num     = String(idx + 1).padStart(2, "0");
      const imgHTML = p.img
        ? `<img class="modal-card-img" src="${p.img}" alt="${p.title}" loading="lazy" />`
        : `<div class="modal-card-placeholder">${p.emoji}</div>`;

      return `
        <div class="modal-card" data-idx="${idx}" style="cursor:pointer;">
          ${imgHTML}
          <div class="modal-card-body">
            <div class="modal-card-num">${num}</div>
            <div class="modal-card-title">${p.title}</div>
            <div class="modal-card-desc">${p.description}</div>
            <button class="modal-card-cta" data-idx="${idx}">View →</button>
          </div>
          <div class="modal-card-bar"></div>
        </div>`;
    };

    if (modalGrid) {
      modalGrid.innerHTML = projectsData.map((p, i) => makeModalCard(p, i)).join("");
      modalGrid.querySelectorAll('.modal-card').forEach(card => {
        card.addEventListener('click', () => {
          const idx = parseInt(card.getAttribute('data-idx'));
          openDetailModal(projectsData[idx]);
        });
      });
    }
  }

  renderProjects();

  // --- All-projects modal ---
  const projectsModal = document.getElementById('projects-modal');

  window.openProjectsModal = () => {
    projectsModal.classList.add('open');
    projectsModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  window.closeProjectsModal = () => {
    projectsModal.classList.remove('open');
    projectsModal.setAttribute('aria-hidden', 'true');
    setTimeout(() => {
      document.body.style.overflow = '';
    }, 350);
  };

  projectsModal.addEventListener('click', (e) => {
    if (e.target === projectsModal) closeProjectsModal();
  });

  // --- Project detail modal ---
  const detailModal  = document.getElementById('detail-modal');
  const detailImgWrap = document.getElementById('detail-img-wrap');
  const detailTitle  = document.getElementById('detail-title');
  const detailDesc   = document.getElementById('detail-desc');
  const detailCta    = document.getElementById('detail-cta');

  window.openDetailModal = (p) => {
    detailImgWrap.innerHTML = p.img
      ? `<img src="${p.img}" alt="${p.title}" class="detail-img" />`
      : `<div class="detail-img-placeholder">${p.emoji}</div>`;
    detailTitle.textContent = p.title;
    detailDesc.textContent  = p.description;
    detailCta.href          = p.url;
    detailModal.classList.add('open');
    detailModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  window.closeDetailModal = () => {
    detailModal.classList.remove('open');
    detailModal.setAttribute('aria-hidden', 'true');
    setTimeout(() => {
      if (!projectsModal.classList.contains('open')) {
        document.body.style.overflow = '';
      }
    }, 350);
  };

  detailModal.addEventListener('click', (e) => {
    if (e.target === detailModal) closeDetailModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (detailModal.classList.contains('open'))    closeDetailModal();
      if (projectsModal.classList.contains('open'))  closeProjectsModal();
    }
  });

  // --- Mobile Navigation ---
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');

  const toggleMobileNav = () => {
    hamburger.classList.toggle('active');
    mobileNav.classList.toggle('active');
    document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : 'auto';
  };

  if (hamburger) hamburger.onclick = toggleMobileNav;
  window.closeMobileNav = () => {
    hamburger.classList.remove('active');
    mobileNav.classList.remove('active');
    document.body.style.overflow = 'auto';
  };

  // --- Intersection Observer for Scroll Reveals ---
  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  };

  const revealObserver = new IntersectionObserver(revealCallback, {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  });

  document.querySelectorAll('.reveal').forEach(el => {
    if (el.id !== 'projects-container') revealObserver.observe(el);
  });

  // --- Contact Form → Formspree + Success Popup ---
  const contactForm  = document.getElementById('contact-form');
  const submitBtn    = document.getElementById('submit-btn');
  const msgPopup     = document.getElementById('msg-popup');
  const formErrorDiv = contactForm ? contactForm.querySelector('[data-fs-error]') : null;

  let popupTimer = null;

  window.closeMsgPopup = () => {
    msgPopup.classList.remove('open');
    msgPopup.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (popupTimer) clearTimeout(popupTimer);
  };

  // Close on backdrop click or Escape
  if (msgPopup) {
    msgPopup.addEventListener('click', (e) => {
      if (e.target === msgPopup) closeMsgPopup();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && msgPopup && msgPopup.classList.contains('open')) closeMsgPopup();
  });

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Loading state
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';
      if (formErrorDiv) formErrorDiv.style.display = 'none';

      try {
        const res = await fetch('https://formspree.io/f/mnjraenn', {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: new FormData(contactForm)
        });

        if (res.ok) {
          // Show popup
          contactForm.reset();
          document.body.style.overflow = 'hidden';
          msgPopup.classList.add('open');
          msgPopup.setAttribute('aria-hidden', 'false');
          // Auto-dismiss after 5 seconds
          popupTimer = setTimeout(closeMsgPopup, 5000);
        } else {
          const json = await res.json();
          const msg = json.errors ? json.errors.map(e => e.message).join(', ') : 'Something went wrong. Please try again.';
          if (formErrorDiv) {
            formErrorDiv.textContent = msg;
            formErrorDiv.style.display = 'block';
          }
        }
      } catch {
        if (formErrorDiv) {
          formErrorDiv.textContent = 'Network error. Check your connection and try again.';
          formErrorDiv.style.display = 'block';
        }
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message ↗';
      }
    });
  }
  // --- Blood Particle Trail (Bankai Mode) ---
  const canvas = document.getElementById('blood-trail');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const createParticle = (x, y) => {
      if (bankaiState !== 'monochrome' && bankaiState !== 'hollow') return;
      particles.push({
        x: x,
        y: y,
        vx: (Math.random() - 0.5) * 2.5,
        vy: bankaiState === 'hollow' ? (Math.random() * 3 + 2) : ((Math.random() - 0.5) * 2.5 - 1.5),
        life: 1,
        size: Math.random() * 4 + 1.5
      });
    };

    window.addEventListener('mousemove', (e) => {
      if (bankaiState === 'monochrome') {
        createParticle(e.clientX, e.clientY);
        createParticle(e.clientX, e.clientY);
      }
    });

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (bankaiState === 'monochrome') {
        for (let i = 0; i < particles.length; i++) {
          let p = particles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.life -= 0.08; // fade out speed (increased to shorten trail)
          p.size *= 0.85;  // shrink (increased to shorten trail)
          
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${p.life})`;
          ctx.fill();
        }
        particles = particles.filter(p => p.life > 0);
      } else {
        particles = [];
      }
      requestAnimationFrame(animateParticles);
    };
    animateParticles();
  }
});
