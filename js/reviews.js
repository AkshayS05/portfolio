// ===== LOAD & RENDER REVIEWS =====
(async function () {
  const grid = document.getElementById('reviewsGrid');
  const empty = document.getElementById('reviewsEmpty');
  const countEl = document.getElementById('reviewCount');
  const avgEl = document.getElementById('avgRating');

  if (!grid) return;

  let reviews = [];
  try {
    const res = await fetch('data/reviews.json');
    reviews = await res.json();
  } catch {
    reviews = [];
  }

  // Stats
  if (countEl) countEl.textContent = reviews.length;
  if (avgEl && reviews.length > 0) {
    const avg = reviews.reduce((sum, r) => sum + (r.rating || 5), 0) / reviews.length;
    avgEl.textContent = avg.toFixed(1);
  }

  if (reviews.length === 0) {
    if (empty) empty.style.display = 'block';
    return;
  }

  // Render cards
  grid.innerHTML = reviews.map(r => {
    const initials = r.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
    const stars = '\u2605'.repeat(r.rating || 5) + '\u2606'.repeat(5 - (r.rating || 5));
    const dateStr = r.date ? new Date(r.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '';

    return `
      <blockquote class="rv-card">
        <div class="rv-card__header">
          <div class="rv-card__author">
            <div class="rv-card__avatar">${escapeHtml(initials)}</div>
            <div>
              <span class="rv-card__name">${escapeHtml(r.name)}</span>
              <span class="rv-card__role">${escapeHtml(r.role)}</span>
            </div>
          </div>
          <div class="rv-card__stars">${stars}</div>
        </div>
        <p class="rv-card__text">"${escapeHtml(r.text)}"</p>
        ${dateStr ? `<p class="rv-card__date">${dateStr}</p>` : ''}
      </blockquote>
    `;
  }).join('');

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
})();

// ===== STAR RATING INTERACTION =====
(function () {
  const stars = document.querySelectorAll('.rv-star');
  const ratingInput = document.getElementById('ratingValue');
  if (!stars.length) return;

  let currentRating = 5;
  updateStars(currentRating);

  stars.forEach(star => {
    star.addEventListener('click', () => {
      currentRating = parseInt(star.dataset.rating);
      if (ratingInput) ratingInput.value = currentRating;
      updateStars(currentRating);
    });

    star.addEventListener('mouseenter', () => {
      updateStars(parseInt(star.dataset.rating));
    });
  });

  document.querySelector('.rv-form__stars')?.addEventListener('mouseleave', () => {
    updateStars(currentRating);
  });

  function updateStars(rating) {
    stars.forEach(s => {
      const val = parseInt(s.dataset.rating);
      s.classList.toggle('active', val <= rating);
    });
  }
})();

// ===== REVIEW FORM SUBMIT =====
(function () {
  const form = document.getElementById('reviewForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = document.getElementById('reviewSubmit');
    const successMsg = document.getElementById('reviewSuccess');
    const formData = new FormData(form);

    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' },
      });

      if (res.ok) {
        form.reset();
        successMsg.style.display = 'block';
        submitBtn.textContent = 'Submitted!';
        setTimeout(() => {
          successMsg.style.display = 'none';
          submitBtn.disabled = false;
          submitBtn.innerHTML = 'Submit Review <svg class="btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
        }, 4000);
      } else {
        submitBtn.textContent = 'Error — try again';
        submitBtn.disabled = false;
      }
    } catch {
      submitBtn.textContent = 'Error — try again';
      submitBtn.disabled = false;
    }
  });
})();

// ===== MOBILE NAV =====
(function () {
  const toggle = document.querySelector('.nav__mobile-toggle');
  const links = document.querySelector('.nav__links');
  if (toggle) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      links.classList.toggle('nav__links--open');
    });
  }
})();
