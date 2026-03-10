// ===== HEADER SCROLL EFFECT =====
const header = document.querySelector('.header');

const handleScroll = () => {
  if (window.scrollY > 50) {
    header.classList.add('header--scrolled');
  } else {
    header.classList.remove('header--scrolled');
  }
};

window.addEventListener('scroll', handleScroll);

// ===== MOBILE NAV TOGGLE =====
const mobileToggle = document.querySelector('.nav__mobile-toggle');
const navLinks = document.querySelector('.nav__links');

if (mobileToggle) {
  mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    navLinks.classList.toggle('nav__links--open');
  });
}

// ===== SCROLL REVEAL SECTIONS =====
const sections = document.querySelectorAll('.section');

const revealSection = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('section--visible');
      observer.unobserve(entry.target);
    }
  });
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

sections.forEach(section => sectionObserver.observe(section));

// ===== PROJECT FILTERS =====
const filterBtns = document.querySelectorAll('.projects__filter');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active button
    filterBtns.forEach(b => b.classList.remove('projects__filter--active'));
    btn.classList.add('projects__filter--active');

    const filter = btn.dataset.filter;

    projectCards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.classList.remove('project-card--hidden');
      } else {
        card.classList.add('project-card--hidden');
      }
    });
  });
});

// ===== VIDEO MODAL =====
const modal = document.getElementById('videoModal');

if (modal) {
  const backdrop = modal.querySelector('.project-modal__backdrop');
  const closeBtn = modal.querySelector('.project-modal__close');
  const iframe = modal.querySelector('.project-modal__video');

  // Open modal when play button is clicked
  document.querySelectorAll('.project-card__play').forEach(btn => {
    btn.addEventListener('click', () => {
      const videoUrl = btn.dataset.video;
      if (videoUrl) {
        iframe.src = videoUrl;
        modal.classList.add('project-modal--open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeModal = () => {
    modal.classList.remove('project-modal--open');
    iframe.src = '';
    document.body.style.overflow = '';
  };

  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });
}

// ===== CONTACT FORM SUBMIT =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = document.getElementById('contactSubmit');
    const successMsg = document.getElementById('contactSuccess');
    const formData = new FormData(contactForm);

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    try {
      const res = await fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' },
      });

      if (res.ok) {
        contactForm.reset();
        successMsg.style.display = 'block';
        submitBtn.textContent = 'Sent!';
        setTimeout(() => {
          successMsg.style.display = 'none';
          submitBtn.disabled = false;
          submitBtn.innerHTML = 'Send Message <svg class="btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>';
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
}

// ===== LOAD TESTIMONIALS FROM SUPABASE =====
const testimonialGrid = document.getElementById('testimonialGrid');

if (testimonialGrid) {
  (async function () {
    const SUPABASE_URL = 'https://vowfihujcrkmgnsigjxm.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvd2ZpaHVqY3JrbWduc2lnanhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI1MDk4NTEsImV4cCI6MjA4ODA4NTg1MX0.TEuCa1TOmLp82ZBoWgyBdDY-CjaOoSlWVVEwfdXt_pQ';

    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/reviews?approved=eq.true&order=created_at.desc&limit=2`, {
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        },
      });
      const reviews = await res.json();

      if (!reviews.length) return;

      testimonialGrid.innerHTML = reviews.map(r => {
        const rating = r.star_rating || 5;
        const stars = '\u2605'.repeat(rating) + '\u2606'.repeat(5 - rating);
        return `
        <blockquote class="testimonial-card">
          <div class="testimonial-card__stars">${stars}</div>
          <p class="testimonial-card__text">"${escapeHtml(r.review_text)}"</p>
          <div class="testimonial-card__author">
            <div class="testimonial-card__avatar">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
            <div>
              <cite class="testimonial-card__name">${escapeHtml(r.reviewer_name)}</cite>
              <span class="testimonial-card__role">${escapeHtml(r.relationship)}</span>
            </div>
          </div>
        </blockquote>
      `;}).join('');
    } catch {
      // fallback — leave grid empty
    }

    function escapeHtml(str) {
      const div = document.createElement('div');
      div.textContent = str;
      return div.innerHTML;
    }
  })();
}
