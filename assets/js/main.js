/* ============================================
   FLAGSHIP '26 — E-Cell VNIT | main.js
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Mobile Menu ---- */
  const menuBtn = document.getElementById('menu-btn');
  const nav = document.getElementById('main-nav');
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
    // Close on mobile link click
    nav.querySelectorAll('.snav-mobile-links a, .snav-mobile-cta').forEach(link => {
      link.addEventListener('click', () => nav.classList.remove('open'));
    });
    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target)) nav.classList.remove('open');
    });
  }

  /* ---- Sticky Nav scroll state ---- */
  const heroTicker = document.querySelector('.hero-ticker');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
      if (heroTicker) heroTicker.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
      if (heroTicker) heroTicker.classList.remove('scrolled');
    }
  });

  /* ---- Intersection Observer for fade-up animations ---- */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-up').forEach(el => {
    // Hero elements animate in immediately with a stagger
    if (el.closest('#hero')) {
      const siblings = [...el.closest('#hero').querySelectorAll('.fade-up')];
      const idx = siblings.indexOf(el);
      setTimeout(() => el.classList.add('visible'), 100 + idx * 120);
    } else {
      observer.observe(el);
    }
  });

  /* ---- Active nav link on scroll ---- */
  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(section => sectionObserver.observe(section));

  /* ---- Registration Modal ---- */
  const regModal = document.getElementById('register-modal');
  const closeModalBtn = document.getElementById('close-modal');
  const modalBackdrop = document.getElementById('modal-backdrop');
  
  if (regModal && closeModalBtn && modalBackdrop) {
    const openModal = () => {
      regModal.classList.remove('opacity-0', 'pointer-events-none');
      document.body.style.overflow = 'hidden'; // Prevent scrolling
      if (nav) nav.classList.remove('open');
    };

    const closeModal = () => {
      regModal.classList.add('opacity-0', 'pointer-events-none');
      document.body.style.overflow = '';
    };

    // Open modal directly from Navbar CTA, Mobile CTA, Hero CTA, and Page button
    document.querySelectorAll('a[href="#register"], .snav-cta, .snav-mobile-cta, .dock-cta-primary, #open-register-modal').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
      });
    });

    closeModalBtn.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', closeModal);
  }

  /* ---- Registration Form — handled by Firebase module in index.html ---- */

  /* ---- Ask Question Modal ---- */
  const questionModal = document.getElementById('question-modal');
  const closeQuestionModalBtn = document.getElementById('close-question-modal');
  const questionModalBackdrop = document.getElementById('question-modal-backdrop');
  const askBtns = document.querySelectorAll('.ask-question-btn');
  const questionSpeakerName = document.getElementById('question-speaker-name');
  const qSpeakerInput = document.getElementById('q-speaker');

  if (questionModal && closeQuestionModalBtn && questionModalBackdrop) {
    const openQuestionModal = (speakerId, speakerName) => {
      qSpeakerInput.value = speakerId;
      questionSpeakerName.textContent = speakerName;
      questionModal.classList.remove('opacity-0', 'pointer-events-none');
      document.body.style.overflow = 'hidden';
    };

    const closeQuestionModal = () => {
      questionModal.classList.add('opacity-0', 'pointer-events-none');
      document.body.style.overflow = '';
    };

    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.ask-question-btn');
      if (!btn) return;
      e.preventDefault();
      const speakerId = btn.getAttribute('data-speaker');
      const card = btn.closest('.spk-card') || btn.closest('.speaker-card');
      const nameEl = card && (card.querySelector('.spk-name') || card.querySelector('h3'));
      const speakerName = nameEl ? nameEl.textContent.trim() : (speakerId || 'Speaker');
      openQuestionModal(speakerId, speakerName);
    });

    closeQuestionModalBtn.addEventListener('click', closeQuestionModal);
    questionModalBackdrop.addEventListener('click', closeQuestionModal);
  }

  /* ---- Ask Question Form ---- */
  const qForm = document.getElementById('question-form');
  const qText = document.getElementById('q-text');
  const qWordCount = document.getElementById('q-word-count');

  if (qForm && qText && qWordCount) {
    // Word count validation
    qText.addEventListener('input', () => {
      const words = qText.value.trim().split(/\s+/).filter(w => w.length > 0);
      qWordCount.textContent = `${words.length}/30 words`;
      if (words.length > 30) {
        qWordCount.classList.add('text-error');
      } else {
        qWordCount.classList.remove('text-error');
      }
    });

    qForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = qForm.querySelector('button[type="submit"]');
      const speaker = document.getElementById('q-speaker').value;
      const name = document.getElementById('q-name').value.trim();
      const question = qText.value.trim();

      if (!name || !question) {
        showToast('Please fill all fields.', 'error');
        return;
      }

      const words = question.split(/\s+/).filter(w => w.length > 0);
      if (words.length > 30) {
        showToast('Question exceeds 30 words limit.', 'error');
        return;
      }

      btn.disabled = true;
      btn.textContent = 'Submitting...';

      try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbw_aCOHQWvQpS18_f7sDoAqzde9tzE-PyU7sxSI-d2R8kpVVz0m53sPpsA1X2JntuSx/exec', {
          method: 'POST',
          // using text/plain to avoid CORS preflight issues with Google Apps Script
          headers: {
            'Content-Type': 'text/plain;charset=utf-8',
          },
          body: JSON.stringify({ speaker, name, question })
        });

        if (!response.ok) throw new Error('Server returned ' + response.status);
        
        showToast('Question submitted successfully!', 'success');
        qForm.reset();
        qWordCount.textContent = '0/30 words';
        if (questionModal) {
          questionModal.classList.add('opacity-0', 'pointer-events-none');
          document.body.style.overflow = '';
        }
      } catch (err) {
        showToast('Failed to submit. Try again.', 'error');
      } finally {
        btn.disabled = false;
        btn.innerHTML = '<span class="material-symbols-outlined" style="font-size:18px">send</span> Submit Question';
      }
    });
  }

  /* ---- Toast Notification ----
   * NOTE: showToast() is defined in the Firebase module script block
   * inside index.html <head>. It creates/replaces a #toast element.
   * Do NOT define a second copy here — they share the same DOM ID.
   */

  /* ---- Agenda Tab Toggle ---- */
  const tabBtns = document.querySelectorAll('.agenda-tab');
  const tabPanels = document.querySelectorAll('.agenda-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      tabBtns.forEach(b => b.classList.remove('active', 'bg-primary-container', 'text-on-primary-container'));
      tabBtns.forEach(b => b.classList.add('text-on-surface-variant', 'border-glass-stroke'));
      btn.classList.add('active', 'bg-primary-container', 'text-on-primary-container');
      btn.classList.remove('text-on-surface-variant', 'border-glass-stroke');

      tabPanels.forEach(panel => {
        panel.classList.toggle('hidden', panel.dataset.panel !== target);
      });
    });
  });

});
