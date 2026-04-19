// Shared UI helpers: site header, toast, modal, confirm dialog, form utilities.
//
// Every authenticated page should call renderHeader(...) in its init code so
// the brand, nav, and company switcher stay consistent.

// Explicit version on session.js — otherwise browsers with a cached older
// session.js (without isSuperadmin) break the named import and ui.js fails
// to initialize, which blanks every page. Bump this whenever session.js's
// exported surface changes.
import { logOut, setActiveCompanyId, isSuperadmin } from './session.js?v=47';
import { toggleMode } from './theme.js';

// ---------- header ----------

// Two-tier nav:
//   WORKFLOW_NAV  — main tier, rendered as icon + label chips
//   UTILITY_NAV   — thin upper strip (Settings / Pricing / Help + Admin)
const WORKFLOW_NAV = [
  { href: '/dashboard.html', label: 'Dashboard',     match: 'dashboard',  icon: '⌂' },
  { href: '/team.html',      label: 'Team',          match: 'team',       icon: '👥' },
  { href: '/framework.html', label: 'Framework',     match: 'framework',  icon: '◐' },
  { href: '/intake.html',    label: 'Intake',        match: 'intake',     icon: '↓' },
  { href: '/inventory.html', label: 'Inventory',     match: 'inventory',  icon: '▤' },
  { href: '/risks.html',     label: 'Risks',         match: 'risks',      icon: '⚠' },
  { href: '/aia.html',       label: 'AIAs',          match: 'aia',        icon: '🛡' },
  { href: '/checklists.html',label: 'Checklists',    match: 'checklists', icon: '☐' },
  { href: '/policies.html',  label: 'Policies',      match: 'policies',   icon: '▦' },
  { href: '/misc.html',      label: 'Miscellaneous', match: 'misc',       icon: '⋯' }
];
const UTILITY_NAV = [
  { href: '/settings.html', label: 'SETTINGS', match: 'settings' },
  { href: '/pricing.html',  label: 'PRICING',  match: 'pricing'  },
  { href: '/help.html',     label: 'HELP',     match: 'help'     }
];

export function renderHeader({ user, company, memberships = [] }) {
  const mount = document.querySelector('[data-site-header]');
  if (!mount) return;

  const currentPath = window.location.pathname;

  // Workflow nav (icon + label).
  const workflowHTML = WORKFLOW_NAV.map(p => {
    const active = currentPath.includes(p.match) ? ' active' : '';
    return `<a class="nav-link${active}" href="${p.href}">
      <span class="nav-ico" aria-hidden="true">${p.icon}</span>
      <span class="nav-label">${escapeHTML(p.label)}</span>
    </a>`;
  }).join('');

  // Utility strip (text-only, all caps). Admin link is appended for superadmin.
  const utilPages = isSuperadmin(user)
    ? [...UTILITY_NAV, { href: '/admin.html', label: 'ADMIN', match: 'admin' }]
    : UTILITY_NAV;
  const utilityHTML = utilPages.map(p => {
    const active = currentPath.includes(p.match) ? ' active' : '';
    return `<a class="util-link${active}" href="${p.href}">${escapeHTML(p.label)}</a>`;
  }).join('');

  const companyOptions = memberships.map(m => {
    const selected = (company && m.company.id === company.id) ? ' selected' : '';
    return `<option value="${escapeHTML(m.company.id)}"${selected}>${escapeHTML(m.company.name || '(unnamed)')}</option>`;
  }).join('');

  mount.innerHTML = `
    <a href="#main-content" class="skip-link">Skip to main content</a>

    <div class="site-header-util">
      <nav class="util-nav" aria-label="Utility">${utilityHTML}</nav>
      <div class="util-right">
        ${memberships.length > 1 ? `
          <select class="company-switcher" data-company-switcher aria-label="Company">
            ${companyOptions}
          </select>
        ` : (company ? `<span class="company-label">${escapeHTML(company.name || '')}</span>` : '')}
        <button class="theme-toggle" data-theme-toggle aria-label="Toggle light/dark mode" title="Toggle light/dark mode">
          <span class="icon-sun" aria-hidden="true">☀</span><span class="icon-moon" aria-hidden="true">☾</span>
        </button>
        <div class="user-menu">
          <span class="user-name">${escapeHTML(user?.displayName || user?.email || '')}</span>
          <button class="btn btn-ghost btn-sm" data-signout>Sign out</button>
        </div>
      </div>
    </div>

    <header class="site-header">
      <a class="brand" href="/dashboard.html" aria-label="GAIN — Govern AI Now">
        <img src="/logo-dark.svg" alt="GAIN" class="brand-logo" />
      </a>
      <nav class="primary-nav" aria-label="Primary">${workflowHTML}</nav>
    </header>
  `;

  const switcher = mount.querySelector('[data-company-switcher]');
  if (switcher) {
    switcher.addEventListener('change', (e) => {
      setActiveCompanyId(e.target.value);
      window.location.reload();
    });
  }

  const signOutBtn = mount.querySelector('[data-signout]');
  if (signOutBtn) {
    signOutBtn.addEventListener('click', async () => {
      await logOut();
      window.location.href = '/index.html';
    });
  }

  const themeToggleBtn = mount.querySelector('[data-theme-toggle]');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => toggleMode());
  }
}

export function renderFooter() {
  const mount = document.querySelector('[data-site-footer]');
  if (!mount) return;
  // Business and Enterprise customers can strip the GAIN brand tagline via
  // settings → Branding. Legal/support/version links always remain — those
  // aren't white-labelable because they're compliance-required.
  let hideBrand = false;
  try { hideBrand = sessionStorage.getItem('gain.hideBrandFooter') === '1'; } catch (_) {}
  const brandSpans = hideBrand ? '' : `
      <span>GAIN · Govern AI Now</span>
      <span class="text-muted">Your data · Your company · Your framework</span>`;
  mount.innerHTML = `
    <footer class="site-footer">${brandSpans}
      <span class="site-footer-links" style="display:flex;gap:14px;font-size:.8rem;opacity:.7;flex-wrap:wrap">
        <a href="/help.html" style="color:inherit">Help</a>
        <a href="/support.html" style="color:inherit">Support</a>
        <a href="/terms.html" style="color:inherit">Terms</a>
        <a href="/privacy.html" style="color:inherit">Privacy</a>
        <a href="/accessibility.html" style="color:inherit">Accessibility</a>
        <a href="/dpa.html" style="color:inherit">DPA</a>
        <a href="/sub-processors.html" style="color:inherit">Sub-processors</a>
      </span>
      <span class="text-muted" style="font-size:.7rem;opacity:.6">v48</span>
    </footer>
  `;
}

// ---------- toast ----------

let toastHost = null;

export function toast(message, type = 'info', duration = 3200) {
  if (!toastHost) {
    toastHost = document.createElement('div');
    toastHost.className = 'toast-host';
    // Screen readers: announce new toasts politely. role=status is
    // implicit aria-live=polite but we set both for broad AT support.
    toastHost.setAttribute('role', 'status');
    toastHost.setAttribute('aria-live', 'polite');
    toastHost.setAttribute('aria-atomic', 'true');
    document.body.appendChild(toastHost);
  }
  const el = document.createElement('div');
  el.className = `toast toast-${type}`;
  el.textContent = message;
  toastHost.appendChild(el);
  // Force reflow for transition.
  requestAnimationFrame(() => el.classList.add('show'));
  setTimeout(() => {
    el.classList.remove('show');
    setTimeout(() => el.remove(), 300);
  }, duration);
}

// ---------- modal ----------

export function openModal({ title, body, actions = [] }) {
  const titleId = 'modal-title-' + Math.random().toString(36).slice(2, 9);
  const opener = document.activeElement; // return focus here on close

  const backdrop = document.createElement('div');
  backdrop.className = 'modal-backdrop';
  backdrop.innerHTML = `
    <div class="modal" role="dialog" aria-modal="true" aria-labelledby="${titleId}" tabindex="-1">
      <div class="modal-header">
        <h3 id="${titleId}">${escapeHTML(title || '')}</h3>
        <button class="modal-close" aria-label="Close dialog">&times;</button>
      </div>
      <div class="modal-body"></div>
      <div class="modal-footer"></div>
    </div>
  `;
  const modalEl = backdrop.querySelector('.modal');
  const bodyEl  = backdrop.querySelector('.modal-body');
  if (typeof body === 'string') bodyEl.innerHTML = body;
  else if (body instanceof Node) bodyEl.appendChild(body);

  const footerEl = backdrop.querySelector('.modal-footer');
  for (const a of actions) {
    const btn = document.createElement('button');
    btn.className = `btn btn-${a.variant || 'secondary'}`;
    btn.textContent = a.label;
    btn.addEventListener('click', () => a.onClick?.({ close }));
    footerEl.appendChild(btn);
  }

  function close() {
    document.removeEventListener('keydown', onKey, true);
    backdrop.remove();
    document.body.classList.remove('modal-open');
    // Return focus to whatever opened the modal, if it's still in the DOM.
    if (opener && typeof opener.focus === 'function' && document.contains(opener)) {
      try { opener.focus(); } catch (_) {}
    }
  }

  // ESC closes, Tab stays inside the dialog.
  function onKey(e) {
    if (e.key === 'Escape') {
      e.stopPropagation();
      close();
      return;
    }
    if (e.key !== 'Tab') return;
    const focusables = modalEl.querySelectorAll(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (!focusables.length) return;
    const first = focusables[0];
    const last  = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
  document.addEventListener('keydown', onKey, true);

  backdrop.querySelector('.modal-close').addEventListener('click', close);
  backdrop.addEventListener('click', (e) => { if (e.target === backdrop) close(); });

  document.body.appendChild(backdrop);
  document.body.classList.add('modal-open');

  // Move focus into the dialog: first focusable element, or the modal itself.
  requestAnimationFrame(() => {
    const firstFocusable = modalEl.querySelector(
      'input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), button:not([disabled])'
    );
    (firstFocusable || modalEl).focus();
  });

  return { close, backdrop };
}

export function confirmDialog({ title, message, confirmLabel = 'Confirm', cancelLabel = 'Cancel', variant = 'primary' }) {
  return new Promise((resolve) => {
    openModal({
      title,
      body: `<p>${escapeHTML(message)}</p>`,
      actions: [
        { label: cancelLabel, variant: 'ghost', onClick: ({ close }) => { close(); resolve(false); } },
        { label: confirmLabel, variant, onClick: ({ close }) => { close(); resolve(true); } }
      ]
    });
  });
}

// ---------- form helpers ----------

export function serializeForm(form) {
  const data = {};
  for (const el of form.querySelectorAll('input, select, textarea')) {
    if (!el.name) continue;
    if (el.type === 'checkbox') {
      if ('multiple' in el.dataset) {
        data[el.name] = data[el.name] || [];
        if (el.checked) data[el.name].push(el.value);
      } else {
        data[el.name] = el.checked;
      }
    } else if (el.type === 'radio') {
      if (el.checked) data[el.name] = el.value;
    } else {
      data[el.name] = el.value;
    }
  }
  return data;
}

export function setFormValues(form, values = {}) {
  for (const el of form.querySelectorAll('input, select, textarea')) {
    if (!el.name || !(el.name in values)) continue;
    const v = values[el.name];
    if (el.type === 'checkbox') {
      if ('multiple' in el.dataset) {
        el.checked = Array.isArray(v) && v.includes(el.value);
      } else {
        el.checked = !!v;
      }
    } else if (el.type === 'radio') {
      el.checked = (el.value === v);
    } else {
      el.value = v ?? '';
    }
  }
}

// ---------- misc ----------

export function escapeHTML(s) {
  return String(s ?? '').replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

export function formatDate(ts) {
  if (!ts) return '';
  const d = ts.toDate ? ts.toDate() : (ts instanceof Date ? ts : new Date(ts));
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

export function formatDateTime(ts) {
  if (!ts) return '';
  const d = ts.toDate ? ts.toDate() : (ts instanceof Date ? ts : new Date(ts));
  return d.toLocaleString();
}
