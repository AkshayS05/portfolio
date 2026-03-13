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

// ===== SUPABASE CONFIG =====
const SUPABASE_URL = 'https://vowfihujcrkmgnsigjxm.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvd2ZpaHVqY3JrbWduc2lnanhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI1MDk4NTEsImV4cCI6MjA4ODA4NTg1MX0.TEuCa1TOmLp82ZBoWgyBdDY-CjaOoSlWVVEwfdXt_pQ';

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// ===== ANALYTICS TRACKER (Feature 2) =====
const Analytics = {
  _tracked: new Set(),
  _role: null,

  setRole(role) {
    this._role = role;
  },

  track(eventType, data) {
    fetch(`${SUPABASE_URL}/rest/v1/portfolio_analytics`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({
        event_type: eventType,
        visitor_role: this._role || sessionStorage.getItem('akshay_visitor_role') || null,
        event_data: data || {}
      })
    }).catch(() => {});
  },

  trackPageView() {
    if (sessionStorage.getItem('_pv_tracked')) return;
    sessionStorage.setItem('_pv_tracked', '1');
    this.track('page_view', { page: window.location.pathname });
  },

  trackSectionView(sectionId) {
    const key = `_sv_${sectionId}`;
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, '1');
    this.track('section_view', { section: sectionId });
  },

  init() {
    this.trackPageView();

    // Section view tracking via IntersectionObserver
    const sects = document.querySelectorAll('.section[id]');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.trackSectionView(entry.target.id);
        }
      });
    }, { threshold: 0.3 });
    sects.forEach(s => obs.observe(s));

    // Resume download tracking
    document.querySelectorAll('[data-resume-link]').forEach(el => {
      el.addEventListener('click', () => {
        this.track('resume_download', { href: el.href || '' });
      });
    });

    // Calendly click tracking
    document.querySelectorAll('.btn--calendly, .contact__calendly-card .btn').forEach(el => {
      el.addEventListener('click', () => {
        this.track('calendly_click');
      });
    });
  }
};

Analytics.init();

// Listen for role selection from visitor-selector
document.addEventListener('visitor-role-selected', (e) => {
  if (e.detail && e.detail.role) {
    Analytics.setRole(e.detail.role);
    Analytics.track('role_select', { role: e.detail.role });
  }
});

// ===== LOAD TESTIMONIALS FROM SUPABASE (Feature 3 enhanced) =====
const testimonialGrid = document.getElementById('testimonialGrid');

if (testimonialGrid) {
  (async function () {
    try {
      // Fetch testimonials (3 instead of 2)
      const res = await fetch(`${SUPABASE_URL}/rest/v1/reviews?approved=eq.true&order=created_at.desc&limit=3`, {
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

      // Fetch total count for badge
      const countRes = await fetch(`${SUPABASE_URL}/rest/v1/reviews?approved=eq.true&select=id`, {
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Prefer': 'count=exact',
          'Range': '0-0',
        },
      });
      const range = countRes.headers.get('content-range');
      if (range) {
        const total = parseInt(range.split('/')[1], 10);
        if (total > 0) {
          const countEl = document.getElementById('testimonialCount');
          const numEl = document.getElementById('endorsementNumber');
          if (countEl && numEl) {
            numEl.textContent = total;
            countEl.style.display = '';
          }
        }
      }
    } catch {
      // fallback — leave grid empty
    }
  })();
}

// ===== GITHUB ACTIVITY WIDGET (Feature 4) =====
const githubFeed = document.getElementById('githubFeed');

if (githubFeed) {
  (async function () {
    try {
      // Fetch recent events + recent commits from repos
      const [eventsRes, reposRes] = await Promise.all([
        fetch('https://api.github.com/users/AkshayS05/events?per_page=30'),
        fetch('https://api.github.com/users/AkshayS05/repos?sort=pushed&per_page=5'),
      ]);

      if (!eventsRes.ok && !reposRes.ok) throw new Error('GitHub API error');

      let cards = [];

      // Try to get commits from recent repos (more reliable)
      if (reposRes.ok) {
        const repos = await reposRes.json();
        const commitPromises = repos.slice(0, 4).map(async (repo) => {
          try {
            const cRes = await fetch(`https://api.github.com/repos/${repo.full_name}/commits?per_page=2`);
            if (!cRes.ok) return [];
            const commits = await cRes.json();
            return commits.map(c => ({
              repo: repo.name,
              message: c.commit.message.split('\n')[0],
              time: new Date(c.commit.author.date),
              type: 'commit'
            }));
          } catch { return []; }
        });
        const allCommits = (await Promise.all(commitPromises)).flat();
        cards = allCommits;
      }

      // Fallback: use events if no commits found
      if (!cards.length && eventsRes.ok) {
        const events = await eventsRes.json();
        const supported = events.filter(e => ['PushEvent', 'CreateEvent', 'PullRequestEvent'].includes(e.type)).slice(0, 8);
        cards = supported.map(ev => {
          const repo = ev.repo.name.split('/')[1] || ev.repo.name;
          let message = '';
          if (ev.type === 'PushEvent') {
            message = (ev.payload.commits && ev.payload.commits.length)
              ? ev.payload.commits[ev.payload.commits.length - 1].message
              : `Pushed to ${ev.payload.ref.replace('refs/heads/', '')}`;
          } else if (ev.type === 'CreateEvent') {
            message = `Created ${ev.payload.ref_type} ${ev.payload.ref || ''}`.trim();
          } else if (ev.type === 'PullRequestEvent') {
            message = `${ev.payload.action} PR: ${ev.payload.pull_request.title}`;
          }
          return { repo, message: message.split('\n')[0], time: new Date(ev.created_at), type: ev.type };
        });
      }

      if (!cards.length) {
        document.getElementById('github-activity').style.display = 'none';
        return;
      }

      // Sort by time, take 6, deduplicate by message
      const seen = new Set();
      const unique = cards
        .sort((a, b) => b.time - a.time)
        .filter(c => {
          const key = c.repo + c.message;
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        })
        .slice(0, 6);

      githubFeed.innerHTML = unique.map(c => {
        const msg = c.message.length > 70 ? c.message.substring(0, 67) + '...' : c.message;
        const time = timeAgo(c.time);
        return `
          <div class="github-event">
            <div class="github-event__body">
              <div class="github-event__repo">${escapeHtml(c.repo)}</div>
              <div class="github-event__message">${escapeHtml(msg)}</div>
            </div>
            <div class="github-event__time">${time}</div>
          </div>
        `;
      }).join('');
    } catch {
      const section = document.getElementById('github-activity');
      if (section) section.style.display = 'none';
    }
  })();
}

function timeAgo(date) {
  const seconds = Math.floor((new Date() - date) / 1000);
  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
  ];
  for (const i of intervals) {
    const count = Math.floor(seconds / i.seconds);
    if (count >= 1) return `${count} ${i.label}${count > 1 ? 's' : ''} ago`;
  }
  return 'just now';
}

// ===== PDF RESUME VIEWER MODAL (Feature 5) =====
const resumeModal = document.getElementById('resumeModal');

if (resumeModal) {
  const resumeBackdrop = resumeModal.querySelector('.resume-modal__backdrop');
  const resumeCloseBtn = resumeModal.querySelector('.resume-modal__close');
  const resumeViewer = document.getElementById('resumeViewer');
  const resumeDownloadLink = document.getElementById('resumeDownload');

  const closeResumeModal = () => {
    resumeModal.classList.remove('resume-modal--open');
    resumeViewer.src = '';
    document.body.style.overflow = '';
  };

  document.querySelectorAll('[data-resume-link]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.href || link.getAttribute('href');
      // On mobile, let the default download behavior happen
      if (window.innerWidth < 768) return;
      e.preventDefault();
      resumeViewer.src = href;
      resumeDownloadLink.href = href;
      resumeModal.classList.add('resume-modal--open');
      document.body.style.overflow = 'hidden';
      Analytics.track('resume_download', { href });
    });
  });

  resumeCloseBtn.addEventListener('click', closeResumeModal);
  resumeBackdrop.addEventListener('click', closeResumeModal);
}

// ===== "WHAT I'M WORKING ON" (Feature 6) =====
const currentItems = document.getElementById('currentItems');

if (currentItems) {
  (async function () {
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/current_status?visible=eq.true&order=display_order.asc`, {
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        },
      });
      const items = await res.json();

      if (!items.length) {
        document.getElementById('current').style.display = 'none';
        return;
      }

      currentItems.innerHTML = items.map(item => {
        const tags = (item.tech_tags || []).map(t => `<span class="current-card__tag">${escapeHtml(t)}</span>`).join('');
        return `
          <div class="current-card">
            <div class="current-card__header">
              <span class="current-card__status current-card__status--${item.status}">${item.status === 'in_progress' ? 'In Progress' : item.status === 'planned' ? 'Planned' : 'Completed'}</span>
            </div>
            <h3 class="current-card__title">${escapeHtml(item.title)}</h3>
            ${item.description ? `<p class="current-card__desc">${escapeHtml(item.description)}</p>` : ''}
            ${tags ? `<div class="current-card__tags">${tags}</div>` : ''}
          </div>
        `;
      }).join('');
    } catch {
      document.getElementById('current').style.display = 'none';
    }
  })();
}

// ===== DARK/LIGHT MODE TOGGLE (Feature 7) =====
const themeToggle = document.getElementById('themeToggle');

if (themeToggle) {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });

  // Listen for OS preference changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    }
  });
}

// ===== VISITOR COUNTER BADGE (Feature 8) =====
const visitorCountEl = document.getElementById('visitorCount');

if (visitorCountEl) {
  (async function () {
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/portfolio_analytics?event_type=eq.page_view&select=id`, {
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Prefer': 'count=exact',
          'Range': '0-0',
        },
      });
      const range = res.headers.get('content-range');
      if (range) {
        const total = parseInt(range.split('/')[1], 10);
        if (total > 10) {
          const rounded = Math.floor(total / 10) * 10;
          const numEl = document.getElementById('visitorNumber');
          if (numEl) {
            numEl.textContent = rounded;
            visitorCountEl.style.display = '';
            // Animate count up
            let current = 0;
            const step = Math.ceil(rounded / 30);
            const timer = setInterval(() => {
              current = Math.min(current + step, rounded);
              numEl.textContent = current;
              if (current >= rounded) clearInterval(timer);
            }, 30);
          }
        }
      }
    } catch {
      // silently fail
    }
  })();
}

// ===== KEYBOARD SHORTCUTS (Feature 9) =====
const shortcutsModal = document.getElementById('shortcutsModal');

document.addEventListener('keydown', (e) => {
  // Skip if user is typing in an input/textarea
  const tag = e.target.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || e.target.isContentEditable) return;

  switch (e.key) {
    case '1':
      sessionStorage.setItem('akshay_visitor_role', 'powerplatform');
      location.reload();
      break;
    case '2':
      sessionStorage.setItem('akshay_visitor_role', 'fullstack');
      location.reload();
      break;
    case '3':
      sessionStorage.setItem('akshay_visitor_role', 'guest');
      location.reload();
      break;
    case 'r':
    case 'R': {
      const resumeLink = document.querySelector('[data-resume-link]');
      if (resumeLink) resumeLink.click();
      break;
    }
    case 'd':
    case 'D':
      if (themeToggle) themeToggle.click();
      break;
    case '?':
      if (shortcutsModal) {
        shortcutsModal.classList.toggle('shortcuts-modal--open');
        document.body.style.overflow = shortcutsModal.classList.contains('shortcuts-modal--open') ? 'hidden' : '';
      }
      break;
    case 'Escape':
      // Close any open modal
      if (shortcutsModal && shortcutsModal.classList.contains('shortcuts-modal--open')) {
        shortcutsModal.classList.remove('shortcuts-modal--open');
        document.body.style.overflow = '';
      }
      if (resumeModal && resumeModal.classList.contains('resume-modal--open')) {
        resumeModal.classList.remove('resume-modal--open');
        document.getElementById('resumeViewer').src = '';
        document.body.style.overflow = '';
      }
      break;
  }
});

// Close shortcuts modal on backdrop click
if (shortcutsModal) {
  shortcutsModal.querySelector('.shortcuts-modal__backdrop').addEventListener('click', () => {
    shortcutsModal.classList.remove('shortcuts-modal--open');
    document.body.style.overflow = '';
  });
}
