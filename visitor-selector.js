// ═══════════════════════════════════════════════════════════
// VISITOR ROLE SELECTOR — Personalized portfolio experience
// ═══════════════════════════════════════════════════════════

(function () {
  "use strict";

  // ── CONFIG ──
  const RESUMES = {
    powerplatform: "Sharma_Akshay_Resume_PowerPlatform.pdf",
    fullstack: "Sharma_Akshay_Resume_FullStack.pdf",
    guest: "Sharma_Akshay_Resume.pdf",
  };

  const ROLE_LABELS = {
    powerplatform: "Power Platform",
    fullstack: "Full Stack",
    guest: "Explorer",
  };

  const SESSION_KEY = "akshay_visitor_role";

  // ── ROLE-SPECIFIC CONTENT ──
  const ROLE_CONTENT = {
    powerplatform: {
      heroTitle:
        'Power Platform Developer <span class="hero__ampersand">&</span> Enterprise App Builder',
      heroTagline:
        "Building enterprise-grade internal tools with Power Apps, Power Automate, and Dataverse. 80+ users on CaseLog, 80% efficiency gains, and a PPQA-nominated solution at FedEx.",
      heroStats: [
        { number: "80+", label: "Users on CaseLog" },
        { number: "80%", label: "Efficiency Gain" },
        { number: "5+", label: "Enterprise Apps" },
      ],
      aboutHeading:
        "Building enterprise applications that transform how teams work.",
      aboutBio: [
        "Power Platform Developer with hands-on experience building enterprise-grade internal applications at FedEx. Specialized in Power Apps (Canvas & Model-Driven), Power Automate, Dataverse, and SharePoint \u2014 delivering tools that replace manual processes with automated, scalable solutions.",
        "Designed and delivered CaseLog \u2014 an internal app serving 80+ users across 5+ FedEx stations with 25,000+ interactions. Automated daily/weekly reporting workflows reducing manual effort by 80%. Selected for FedEx\u2019s Peer-to-Peer Quality Awards (PPQA) for quality and innovation.",
      ],
      aboutHighlightOrder: [1, 0, 2],
      servicesHighlight: 0,
      stackOrder: [0, 3, 1, 2],
      projectFilter: "power",
      experienceHighlight: 1,
      ctaText: "Download Power Platform Resume",
      toastMsg: "Tailored for Power Platform roles",
      toastIcon: "\u26a1",
    },
    fullstack: {
      heroTitle:
        'Full-Stack Web Developer <span class="hero__ampersand">&</span> Front-End Engineer',
      heroTagline:
        "5+ years building responsive, accessible web experiences with React, Next.js, TypeScript, and Node.js. From Shopify storefronts to full-stack applications with Stripe integrations.",
      heroStats: [
        { number: "5+", label: "Years Experience" },
        { number: "5+", label: "Web Apps Shipped" },
        { number: "3+", label: "Frameworks Mastered" },
      ],
      aboutHeading:
        "Building responsive web experiences from front-end to back-end.",
      aboutBio: [
        "Full-Stack Web Developer with 5+ years building responsive, accessible web experiences across modern frameworks and CMS platforms. Proficient in React, Next.js, TypeScript, Node.js, and Shopify Liquid \u2014 delivering everything from enterprise storefronts to full-stack applications.",
        "Currently developing and maintaining SEO-optimized Shopify storefronts at Emkao Foods. Previously built React/Next.js UI features with TypeScript at Ecomtent, integrating Stripe payments and CMS-managed content. Strong in cross-browser delivery, WCAG 2.1 accessibility, and Agile workflows.",
      ],
      aboutHighlightOrder: [2, 0, 1],
      servicesHighlight: 2,
      stackOrder: [1, 2, 3, 0],
      projectFilter: "web",
      experienceHighlight: 0,
      ctaText: "Download Full Stack Resume",
      toastMsg: "Tailored for Full Stack / Web roles",
      toastIcon: "\ud83d\udcbb",
    },
    guest: null,
  };

  // ── INJECT STYLES ──
  const style = document.createElement("style");
  style.textContent = `
    /* ── Google Font ── */
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');

    /* ── Overlay ── */
    .vs-overlay {
      position: fixed;
      inset: 0;
      z-index: 99999;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(8, 8, 14, 0.92);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      opacity: 1;
      transition: opacity 0.5s ease, visibility 0.5s ease;
      font-family: 'Outfit', -apple-system, sans-serif;
    }
    .vs-overlay.hidden {
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
    }

    .vs-card {
      width: 90%;
      max-width: 520px;
      text-align: center;
      animation: vs-rise 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }
    @keyframes vs-rise {
      from { opacity: 0; transform: translateY(30px) scale(0.97); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }

    .vs-wave {
      font-size: 40px;
      margin-bottom: 16px;
      display: block;
      animation: vs-wave-anim 1.8s ease-in-out infinite;
      transform-origin: 70% 70%;
    }
    @keyframes vs-wave-anim {
      0%, 100% { transform: rotate(0deg); }
      15% { transform: rotate(14deg); }
      30% { transform: rotate(-8deg); }
      40% { transform: rotate(14deg); }
      50% { transform: rotate(-4deg); }
      60% { transform: rotate(10deg); }
      70% { transform: rotate(0deg); }
    }

    .vs-title {
      font-family: 'Outfit', sans-serif;
      font-size: 28px;
      font-weight: 700;
      color: #f5f5f7;
      margin: 0 0 8px;
      letter-spacing: -0.02em;
    }
    .vs-subtitle {
      font-size: 15px;
      color: #8b8b9e;
      margin: 0 0 36px;
      line-height: 1.5;
    }

    /* ── Role buttons ── */
    .vs-options {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .vs-option {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 18px 22px;
      background: rgba(255, 255, 255, 0.04);
      border: 1.5px solid rgba(255, 255, 255, 0.08);
      border-radius: 16px;
      cursor: pointer;
      transition: all 0.25s ease;
      text-align: left;
      color: #f5f5f7;
      font-family: 'Outfit', sans-serif;
    }
    .vs-option:hover {
      background: rgba(255, 255, 255, 0.08);
      border-color: rgba(255, 255, 255, 0.18);
      transform: translateY(-2px);
    }
    .vs-option:active { transform: translateY(0); }

    .vs-option-icon {
      width: 48px;
      height: 48px;
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
      flex-shrink: 0;
    }
    .vs-option[data-role="powerplatform"] .vs-option-icon {
      background: linear-gradient(135deg, #7c3aed20, #a78bfa30);
    }
    .vs-option[data-role="fullstack"] .vs-option-icon {
      background: linear-gradient(135deg, #0ea5e920, #22d3ee30);
    }
    .vs-option[data-role="guest"] .vs-option-icon {
      background: linear-gradient(135deg, #f59e0b20, #fbbf2430);
    }

    .vs-option-text { flex: 1; }
    .vs-option-title {
      font-size: 16px;
      font-weight: 600;
      margin: 0 0 3px;
    }
    .vs-option-desc {
      font-size: 13px;
      color: #8b8b9e;
      margin: 0;
      line-height: 1.4;
    }

    .vs-option-arrow {
      color: #555;
      font-size: 18px;
      transition: transform 0.2s, color 0.2s;
    }
    .vs-option:hover .vs-option-arrow {
      color: #aaa;
      transform: translateX(3px);
    }

    /* ── Floating badge to change role ── */
    .vs-badge {
      position: fixed;
      bottom: 20px;
      left: 20px;
      z-index: 9999;
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 14px;
      background: rgba(20, 20, 30, 0.85);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 50px;
      font-family: 'Outfit', sans-serif;
      font-size: 12px;
      font-weight: 500;
      color: #ccc;
      cursor: pointer;
      transition: all 0.25s ease;
      animation: vs-fadeIn 0.5s ease 0.6s both;
    }
    @keyframes vs-fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .vs-badge:hover {
      background: rgba(30, 30, 45, 0.95);
      border-color: rgba(255, 255, 255, 0.2);
    }
    .vs-badge-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #4ade80;
    }
    .vs-badge-change {
      color: #888;
      font-size: 11px;
      margin-left: 4px;
      text-decoration: underline;
      text-underline-offset: 2px;
    }

    /* ── Role-based visibility ── */
    .show-powerplatform,
    .show-fullstack,
    .show-guest { display: none !important; }

    body[data-visitor-role="powerplatform"] .show-powerplatform { display: block !important; }
    body[data-visitor-role="fullstack"] .show-fullstack { display: block !important; }
    body[data-visitor-role="guest"] .show-guest { display: block !important; }

    body[data-visitor-role="powerplatform"] .show-powerplatform-inline { display: inline !important; }
    body[data-visitor-role="fullstack"] .show-fullstack-inline { display: inline !important; }
    body[data-visitor-role="guest"] .show-guest-inline { display: inline !important; }

    /* ── Highlighted cards (services + experience) ── */
    .services__card--highlighted {
      border-color: rgba(124, 58, 237, 0.4) !important;
      box-shadow: 0 0 20px rgba(124, 58, 237, 0.12), 0 0 40px rgba(124, 58, 237, 0.06);
      position: relative;
    }
    .services__card--highlighted::before {
      content: 'Best Match';
      position: absolute;
      top: 12px;
      right: 12px;
      padding: 4px 10px;
      background: linear-gradient(135deg, #7c3aed, #a78bfa);
      color: #fff;
      font-family: 'Outfit', sans-serif;
      font-size: 11px;
      font-weight: 600;
      border-radius: 20px;
      letter-spacing: 0.02em;
      z-index: 2;
    }
    body[data-visitor-role="fullstack"] .services__card--highlighted {
      border-color: rgba(14, 165, 233, 0.4) !important;
      box-shadow: 0 0 20px rgba(14, 165, 233, 0.12), 0 0 40px rgba(14, 165, 233, 0.06);
    }
    body[data-visitor-role="fullstack"] .services__card--highlighted::before {
      background: linear-gradient(135deg, #0ea5e9, #22d3ee);
    }

    .exp-card--highlighted > .exp-card__content {
      border-color: rgba(124, 58, 237, 0.35) !important;
      box-shadow: 0 0 16px rgba(124, 58, 237, 0.1);
    }
    .exp-card--highlighted .exp-card__dot {
      background: #7c3aed !important;
      box-shadow: 0 0 8px rgba(124, 58, 237, 0.5);
    }
    body[data-visitor-role="fullstack"] .exp-card--highlighted > .exp-card__content {
      border-color: rgba(14, 165, 233, 0.35) !important;
      box-shadow: 0 0 16px rgba(14, 165, 233, 0.1);
    }
    body[data-visitor-role="fullstack"] .exp-card--highlighted .exp-card__dot {
      background: #0ea5e9 !important;
      box-shadow: 0 0 8px rgba(14, 165, 233, 0.5);
    }

    /* ── Welcome toast ── */
    .vs-toast {
      position: fixed;
      top: 80px;
      left: 50%;
      transform: translateX(-50%) translateY(-20px);
      z-index: 99998;
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px 22px;
      background: rgba(20, 20, 30, 0.92);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 50px;
      font-family: 'Outfit', sans-serif;
      font-size: 14px;
      font-weight: 500;
      color: #e5e5ea;
      opacity: 0;
      animation: vs-toastIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards,
                 vs-toastOut 0.4s ease 3s forwards;
      white-space: nowrap;
    }
    @keyframes vs-toastIn {
      from { opacity: 0; transform: translateX(-50%) translateY(-20px) scale(0.95); }
      to { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
    }
    @keyframes vs-toastOut {
      from { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
      to { opacity: 0; transform: translateX(-50%) translateY(-10px) scale(0.97); }
    }
    .vs-toast-icon { font-size: 18px; }
    .vs-toast-check {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: #4ade80;
      margin-left: 4px;
    }
    .vs-toast-check svg {
      width: 12px;
      height: 12px;
      stroke: #000;
      stroke-width: 3;
      fill: none;
    }

    /* ── Responsive ── */
    @media (max-width: 480px) {
      .vs-card { width: 94%; }
      .vs-title { font-size: 24px; }
      .vs-option { padding: 14px 16px; gap: 12px; }
      .vs-option-icon { width: 42px; height: 42px; font-size: 20px; }
      .vs-option-title { font-size: 15px; }
      .vs-toast { font-size: 13px; padding: 10px 16px; }
    }
  `;
  document.head.appendChild(style);

  // ── CHECK SESSION ──
  const existingRole = sessionStorage.getItem(SESSION_KEY);
  if (existingRole && RESUMES[existingRole]) {
    applyRole(existingRole, false);
    return;
  }

  // ── BUILD OVERLAY ──
  const overlay = buildOverlay("Hey, welcome!", "I\u2019d love to show you the most relevant stuff.<br>What brings you here?");
  document.body.appendChild(overlay);

  // ── APPLY ROLE ──
  function applyRole(role, animate) {
    document.body.setAttribute("data-visitor-role", role);

    // Swap resume links — by data attribute
    document.querySelectorAll("[data-resume-link]").forEach(function (el) {
      if (el.tagName === "A") {
        el.href = RESUMES[role] || RESUMES.guest;
      }
    });

    // Also try common resume link patterns
    document
      .querySelectorAll('a[href*="Resume"], a[href*="resume"]')
      .forEach(function (el) {
        if (el.href.endsWith(".pdf")) {
          el.href = RESUMES[role] || RESUMES.guest;
        }
      });

    // Personalize content
    personalizeContent(role, animate);

    // Show floating badge
    showBadge(role);
  }

  // ── PERSONALIZE CONTENT ──
  function personalizeContent(role, animate) {
    var content = ROLE_CONTENT[role];
    if (!content) return; // guest keeps defaults

    // 1. Hero title
    var heroTitle = document.querySelector(".hero__title");
    if (heroTitle) heroTitle.innerHTML = content.heroTitle;

    // 2. Hero tagline
    var heroTagline = document.querySelector(".hero__tagline");
    if (heroTagline) heroTagline.textContent = content.heroTagline;

    // 3. Hero stats
    var statNumbers = document.querySelectorAll(".hero__stat-number");
    var statLabels = document.querySelectorAll(".hero__stat-label");
    content.heroStats.forEach(function (stat, i) {
      if (statNumbers[i]) statNumbers[i].textContent = stat.number;
      if (statLabels[i]) statLabels[i].textContent = stat.label;
    });

    // 4. About section heading
    var aboutSection = document.querySelector("#about");
    if (aboutSection) {
      var heading = aboutSection.querySelector(".section__heading");
      if (heading) heading.textContent = content.aboutHeading;
    }

    // 5. About bio paragraphs
    var bios = document.querySelectorAll(".about__bio");
    content.aboutBio.forEach(function (text, i) {
      if (bios[i]) bios[i].textContent = text;
    });

    // 6. About highlights reorder
    var highlightsContainer = document.querySelector(".about__highlights");
    if (highlightsContainer) {
      var highlights = Array.from(highlightsContainer.children);
      content.aboutHighlightOrder.forEach(function (idx) {
        if (highlights[idx]) highlightsContainer.appendChild(highlights[idx]);
      });
    }

    // 7. Services card highlight
    var serviceCards = document.querySelectorAll(".services__card");
    serviceCards.forEach(function (card, i) {
      card.classList.toggle(
        "services__card--highlighted",
        i === content.servicesHighlight
      );
    });

    // 8. Tech Stack groups reorder
    var stackGroups = document.querySelector(".stack__groups");
    if (stackGroups) {
      var groups = Array.from(stackGroups.children);
      content.stackOrder.forEach(function (idx) {
        if (groups[idx]) stackGroups.appendChild(groups[idx]);
      });
    }

    // 9. Auto-filter projects (wait for app.js event listeners)
    setTimeout(function () {
      var filterBtn = document.querySelector(
        '.projects__filter[data-filter="' + content.projectFilter + '"]'
      );
      if (filterBtn) filterBtn.click();
    }, 100);

    // 10. Experience card highlight
    var expCards = document.querySelectorAll(".exp-card");
    expCards.forEach(function (card, i) {
      card.classList.toggle(
        "exp-card--highlighted",
        i === content.experienceHighlight
      );
    });

    // 11. CTA button text
    var heroCta = document.querySelector(".hero__actions .btn--primary");
    if (heroCta) {
      var svg = heroCta.querySelector("svg");
      heroCta.textContent = "";
      if (svg) {
        heroCta.appendChild(svg);
        heroCta.appendChild(document.createTextNode(" "));
      }
      heroCta.appendChild(document.createTextNode(content.ctaText));
    }

    var navCta = document.querySelector(".nav__cta");
    if (navCta) navCta.textContent = content.ctaText;

    // 12. Welcome toast
    if (animate) showToast(content.toastIcon, content.toastMsg);
  }

  // ── WELCOME TOAST ──
  function showToast(icon, msg) {
    var toast = document.createElement("div");
    toast.className = "vs-toast";
    toast.innerHTML =
      '<span class="vs-toast-icon">' + icon + '</span>' +
      msg +
      '<span class="vs-toast-check"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></span>';
    document.body.appendChild(toast);
    setTimeout(function () {
      if (toast.parentNode) toast.remove();
    }, 4000);
  }

  // ── FLOATING BADGE ──
  function showBadge(role) {
    var old = document.querySelector(".vs-badge");
    if (old) old.remove();

    var badge = document.createElement("div");
    badge.className = "vs-badge";
    badge.innerHTML =
      '<span class="vs-badge-dot"></span>' +
      'Viewing as: <strong style="color:#f5f5f7; margin-left:2px;">' +
      ROLE_LABELS[role] +
      "</strong>" +
      '<span class="vs-badge-change">change</span>';
    badge.addEventListener("click", function () {
      sessionStorage.removeItem(SESSION_KEY);
      location.reload();
    });
    document.body.appendChild(badge);
  }

  // ── BUILD OVERLAY ──
  function buildOverlay(title, subtitle) {
    var ov = document.createElement("div");
    ov.className = "vs-overlay";
    ov.innerHTML =
      '<div class="vs-card">' +
      '<span class="vs-wave">\ud83d\udc4b</span>' +
      '<h2 class="vs-title">' + title + "</h2>" +
      '<p class="vs-subtitle">' + subtitle + "</p>" +
      '<div class="vs-options">' +
      '<div class="vs-option" data-role="powerplatform">' +
      '<div class="vs-option-icon">\u26a1</div>' +
      '<div class="vs-option-text">' +
      '<p class="vs-option-title">Hiring for Power Platform</p>' +
      '<p class="vs-option-desc">Power Apps, Dataverse, Power Automate</p>' +
      "</div>" +
      '<span class="vs-option-arrow">\u2192</span>' +
      "</div>" +
      '<div class="vs-option" data-role="fullstack">' +
      '<div class="vs-option-icon">\ud83d\udcbb</div>' +
      '<div class="vs-option-text">' +
      '<p class="vs-option-title">Hiring for Full Stack / Web</p>' +
      '<p class="vs-option-desc">React, Next.js, Node, TypeScript</p>' +
      "</div>" +
      '<span class="vs-option-arrow">\u2192</span>' +
      "</div>" +
      '<div class="vs-option" data-role="guest">' +
      '<div class="vs-option-icon">\ud83d\udc40</div>' +
      '<div class="vs-option-text">' +
      '<p class="vs-option-title">Just exploring</p>' +
      '<p class="vs-option-desc">Show me everything</p>' +
      "</div>" +
      '<span class="vs-option-arrow">\u2192</span>' +
      "</div>" +
      "</div>" +
      "</div>";

    ov.querySelectorAll(".vs-option").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var role = btn.dataset.role;
        sessionStorage.setItem(SESSION_KEY, role);
        ov.classList.add("hidden");
        setTimeout(function () {
          ov.remove();
        }, 500);
        applyRole(role, true);
      });
    });

    return ov;
  }
})();
