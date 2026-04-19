// Shared UI helpers: site header, toast, modal, confirm dialog, form utilities.
//
// Every authenticated page should call renderHeader(...) in its init code so
// the brand, nav, and company switcher stay consistent.

// Explicit version on session.js — otherwise browsers with a cached older
// session.js (without isSuperadmin) break the named import and ui.js fails
// to initialize, which blanks every page. Bump this whenever session.js's
// exported surface changes.
import { logOut, setActiveCompanyId, isSuperadmin } from './session.js?v=26';
import { toggleMode } from './theme.js';

// ---------- header ----------

// pages: array of { href, label, match } where `match` is a substring matched
// against location.pathname to set the "active" style.
const DEFAULT_NAV = [
  { href: '/dashboard.html', label: 'Dashboard', match: 'dashboard' },
  { href: '/team.html',      label: 'Team',      match: 'team' },
  { href: '/framework.html', label: 'Framework', match: 'framework' },
  { href: '/intake.html',    label: 'Intake',    match: 'intake' },
  { href: '/inventory.html', label: 'Inventory', match: 'inventory' },
  { href: '/risks.html',     label: 'Risks',     match: 'risks' },
  { href: '/aia.html',       label: 'AIAs',      match: 'aia' },
  { href: '/checklists.html', label: 'Checklists', match: 'checklists' },
  { href: '/policies.html',  label: 'Policies',  match: 'policies' },
  { href: '/misc.html',      label: 'Miscellaneous', match: 'misc' },
  { href: '/settings.html',  label: 'SETTINGS',  match: 'settings' },
  { href: '/pricing.html',   label: 'PRICING',   match: 'pricing' }
];

export function renderHeader({ user, company, memberships = [], pages = DEFAULT_NAV }) {
  const mount = document.querySelector('[data-site-header]');
  if (!mount) return;

  const currentPath = window.location.pathname;
  const effectivePages = isSuperadmin(user)
    ? [...pages, { href: '/admin.html', label: 'Admin', match: 'admin' }]
    : pages;
  const navHTML = effectivePages.map(p => {
    const active = currentPath.includes(p.match) ? ' active' : '';
    return `<a class="nav-link${active}" href="${p.href}">${escapeHTML(p.label)}</a>`;
  }).join('');

  const companyOptions = memberships.map(m => {
    const selected = (company && m.company.id === company.id) ? ' selected' : '';
    return `<option value="${escapeHTML(m.company.id)}"${selected}>${escapeHTML(m.company.name || '(unnamed)')}</option>`;
  }).join('');

  mount.innerHTML = `
    <header class="site-header">
      <a class="brand" href="/dashboard.html" aria-label="GAIN — Govern AI Now">
        <img src="/logo-dark.svg" alt="GAIN" class="brand-logo" />
      </a>
      <nav class="primary-nav">${navHTML}</nav>
      <div class="header-right">
        ${memberships.length > 1 ? `
          <select class="company-switcher" data-company-switcher>
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
  mount.innerHTML = `
    <footer class="site-footer">
      <span>GAIN · Govern AI Now</span>
      <span class="text-muted">Your data · Your company · Your framework</span>
      <a href="/support.html" style="font-size:.8rem;color:inherit;opacity:.7">Support</a>
      <span class="text-muted" style="font-size:.7rem;opacity:.6">v28</span>
    </footer>
  `;
}

// ---------- toast ----------

let toastHost = null;

export function toast(message, type = 'info', duration = 3200) {
  if (!toastHost) {
    toastHost = document.createElement('div');
    toastHost.className = 'toast-host';
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
  const backdrop = document.createElement('div');
  backdrop.className = 'modal-backdrop';
  backdrop.innerHTML = `
    <div class="modal" role="dialog" aria-modal="true">
      <div class="modal-header">
        <h3>${escapeHTML(title || '')}</h3>
        <button class="modal-close" aria-label="Close">&times;</button>
      </div>
      <div class="modal-body"></div>
      <div class="modal-footer"></div>
    </div>
  `;
  const bodyEl = backdrop.querySelector('.modal-body');
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
    backdrop.remove();
    document.body.classList.remove('modal-open');
  }

  backdrop.querySelector('.modal-close').addEventListener('click', close);
  backdrop.addEventListener('click', (e) => { if (e.target === backdrop) close(); });

  document.body.appendChild(backdrop);
  document.body.classList.add('modal-open');
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
