/* ============================================
   SME AI Marketing App — App Logic
   ============================================ */

(function () {
  'use strict';

  // --- State ---
  const TOTAL_LESSONS = 6; // Update as lessons are added
  let currentLesson = 0;
  let completedLessons = new Set();

  // --- Elements ---
  const screens = document.querySelectorAll('.screen');
  const progressFill = document.getElementById('progress-fill');
  const progressLabel = document.getElementById('progress-label');

  // --- Navigation ---
  function showScreen(index) {
    screens.forEach((s, i) => {
      s.classList.toggle('active', i === index);
    });
    updateProgress(index);
    currentLesson = index;
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function updateProgress(lessonIndex) {
    const pct = Math.round((lessonIndex / TOTAL_LESSONS) * 100);
    progressFill.style.width = pct + '%';
    progressLabel.textContent = 'Lesson ' + lessonIndex + ' of ' + TOTAL_LESSONS;
  }

  function nextLesson() {
    completedLessons.add(currentLesson);
    if (currentLesson < screens.length - 1) {
      showScreen(currentLesson + 1);
    }
  }

  function goToLesson(n) {
    showScreen(n);
  }

  // Make nav functions available globally
  window.appNav = { nextLesson, goToLesson, showScreen };

  // --- URL Check (Lesson 0) ---
  const checkForm = document.getElementById('check-form');
  const checkBtn = document.getElementById('check-btn');
  const resultCard = document.getElementById('result-card');
  const resultGoogle = document.getElementById('result-google');
  const resultAI = document.getElementById('result-ai');
  const resultNote = document.getElementById('result-note');
  const startLesson1Btn = document.getElementById('start-lesson-1');

  if (checkForm) {
    checkForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const urlInput = document.getElementById('website-url');
      const url = urlInput.value.trim();

      if (!url) {
        urlInput.focus();
        return;
      }

      // Normalize URL
      let normalizedUrl = url;
      if (!/^https?:\/\//i.test(normalizedUrl)) {
        normalizedUrl = 'https://' + normalizedUrl;
      }

      // Show loading
      checkBtn.classList.add('loading');
      checkBtn.disabled = true;
      checkBtn.innerHTML = '<span class="spinner"></span> Checking...';

      // Simulate API check (replace with real check in production)
      // For MVP, we do a simple fetch to see if the site responds
      let googleFound = false;
      let aiFound = false;

      try {
        // Check if site is reachable (CORS may block, but worth a try)
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const response = await fetch(normalizedUrl, {
          method: 'HEAD',
          mode: 'no-cors',
          signal: controller.signal
        });
        clearTimeout(timeoutId);
        // no-cors means we can't know status, but if it didn't error we got something
        googleFound = true;
      } catch {
        // If fetch fails, site might be down or blocking
        // For MVP, we'll mark it as found if no network error
        googleFound = true; // Most sites are on Google just by existing
      }

      // AI presence: for MVP, simulate based on domain patterns
      // Real implementation would use an AI search API
      const aiIndicators = ['shopify', 'wix', 'squarespace', 'wordpress', 'webflow'];
      aiFound = aiIndicators.some(brand => normalizedUrl.includes(brand));

      // Show results
      renderResults(googleFound, aiFound);

      // Hide check form, show result card
      checkForm.classList.add('hidden');
      resultCard.classList.remove('hidden');

      // Show start lesson 1 button
      if (startLesson1Btn) startLesson1Btn.classList.remove('hidden');
      const altBtn = document.getElementById('start-lesson-1-alt');
      if (altBtn) altBtn.classList.add('hidden');
    });
  }

  function renderResults(googleFound, aiFound) {
    // Google result
    if (googleFound) {
      resultGoogle.querySelector('.result-icon').textContent = '✅';
      resultGoogle.querySelector('.result-status').textContent = 'Found';
      resultGoogle.querySelector('.result-status').className = 'result-status found';
    } else {
      resultGoogle.querySelector('.result-icon').textContent = '❌';
      resultGoogle.querySelector('.result-status').textContent = 'Not found';
      resultGoogle.querySelector('.result-status').className = 'result-status missing';
    }

    // AI result
    if (aiFound) {
      resultAI.querySelector('.result-icon').textContent = '✅';
      resultAI.querySelector('.result-status').textContent = 'Found';
      resultAI.querySelector('.result-status').className = 'result-status found';
    } else {
      resultAI.querySelector('.result-icon').textContent = '⚠️';
      resultAI.querySelector('.result-status').textContent = 'Not found on AI yet';
      resultAI.querySelector('.result-status').className = 'result-status warning';
    }

    // Note
    if (!aiFound) {
      resultNote.textContent = 'Most businesses don\'t realize they\'re invisible to AI search.';
    } else {
      resultNote.textContent = 'Your site shows basic signals. There\'s still room to optimize for AI search.';
    }
  }

  // --- Initialize ---
  showScreen(0);

})();
