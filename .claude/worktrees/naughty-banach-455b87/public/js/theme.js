// Theme: palette + mode persistence. Applied to <html> via data-* attrs.
// Default on first visit = Classic Light.
//
// Pages should also run the tiny inline bootstrap in <head> BEFORE the
// stylesheet loads — that avoids a flash of default styling on reload.
// This module re-applies on import (idempotent) and exposes setters.

export const PALETTES = [
  { id: 'classic',  name: 'Classic',        desc: 'The default GAIN brand — navy and blue.',           swatches: ['#1F3864', '#2E75B6', '#4FB3D9', '#F7F8FA'] },
  { id: 'slate',    name: 'Slate',          desc: 'Cool neutral grays with steel-blue accent.',        swatches: ['#2C3E50', '#4E6B8A', '#6B8AA9', '#F4F6F9'] },
  { id: 'ocean',    name: 'Ocean',          desc: 'Navy and teal/cyan. Modern, tech-forward.',         swatches: ['#0C3D5A', '#0E7490', '#14B8A6', '#F3F9FB'] },
  { id: 'forest',   name: 'Forest',         desc: 'Deep greens with a sage accent.',                   swatches: ['#1F4A36', '#2F6B4F', '#6FB78A', '#F6F8F5'] },
  { id: 'royal',    name: 'Royal',          desc: 'Indigo and violet. Premium, less corporate.',       swatches: ['#322C6B', '#4F46E5', '#8B5CF6', '#F7F6FC'] },
  { id: 'graphite', name: 'Graphite',       desc: 'Near-monochrome with a single blue accent.',        swatches: ['#0F0F0F', '#404040', '#2E75B6', '#FAFAFA'] },
  { id: 'hc',       name: 'High Contrast',  desc: 'AAA-contrast. Pure black/white with bold blue.',    swatches: ['#000000', '#0033A0', '#FFFFFF', '#CCDAF0'] }
];

const VALID_PALETTES = PALETTES.map(p => p.id);
const VALID_MODES = ['light', 'dark'];
const KEY_PALETTE = 'gain.theme.palette';
const KEY_MODE = 'gain.theme.mode';

export function getPalette() {
  try {
    const v = localStorage.getItem(KEY_PALETTE);
    return VALID_PALETTES.includes(v) ? v : 'classic';
  } catch { return 'classic'; }
}

export function getMode() {
  try {
    const v = localStorage.getItem(KEY_MODE);
    return VALID_MODES.includes(v) ? v : 'light';
  } catch { return 'light'; }
}

export function setPalette(p) {
  if (!VALID_PALETTES.includes(p)) return;
  try { localStorage.setItem(KEY_PALETTE, p); } catch {}
  apply();
}

export function setMode(m) {
  if (!VALID_MODES.includes(m)) return;
  try { localStorage.setItem(KEY_MODE, m); } catch {}
  apply();
}

export function toggleMode() {
  setMode(getMode() === 'dark' ? 'light' : 'dark');
}

export function apply() {
  const root = document.documentElement;
  const palette = getPalette();
  const mode = getMode();
  root.setAttribute('data-palette', palette);
  root.setAttribute('data-mode', mode);
  window.dispatchEvent(new CustomEvent('gain-theme-change', {
    detail: { palette, mode }
  }));
}

// Idempotent: re-sync attributes on import (in case inline bootstrap was skipped).
apply();
