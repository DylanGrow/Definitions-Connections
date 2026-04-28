/**
 * app.js — Client-side application entry point
 *
 * Architecture: Module pattern. All logic is client-side only.
 * No data leaves the device. No external requests after initial load.
 *
 * Locale locks:
 *   - Temperature: Fahrenheit only
 *   - Time format: 12-hour (hh:mm AM/PM)
 */

'use strict';

// ─── Constants ────────────────────────────────────────────────────────────────

const APP = {
  name: 'APP NAME',
  version: '1.0.0',
  build: '2026',
};

// ─── Locale Utilities (hard-locked) ──────────────────────────────────────────

const Locale = (() => {

  /**
   * Format a Date object to 12-hour time string.
   * @param {Date} date
   * @returns {string} e.g. "3:45 PM"
   */
  function formatTime(date) {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  }

  /**
   * Convert Celsius to Fahrenheit.
   * @param {number} celsius
   * @returns {number}
   */
  function toFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
  }

  /**
   * Format a temperature value in Fahrenheit.
   * @param {number} fahrenheit
   * @returns {string} e.g. "72°F"
   */
  function formatTemp(fahrenheit) {
    return `${Math.round(fahrenheit)}°F`;
  }

  /**
   * Format a full date.
   * @param {Date} date
   * @returns {string} e.g. "Sunday, April 26, 2026"
   */
  function formatDate(date) {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  return { formatTime, toFahrenheit, formatTemp, formatDate };
})();

// ─── DOM Utilities ────────────────────────────────────────────────────────────

const DOM = (() => {

  /**
   * Safe querySelector — returns null without throwing.
   * @param {string} selector
   * @param {Element} [root=document]
   * @returns {Element|null}
   */
  function qs(selector, root = document) {
    return root.querySelector(selector);
  }

  /**
   * Safe querySelectorAll — returns an Array.
   * @param {string} selector
   * @param {Element} [root=document]
   * @returns {Element[]}
   */
  function qsa(selector, root = document) {
    return Array.from(root.querySelectorAll(selector));
  }

  /**
   * Create an element with optional attributes and text.
   * @param {string} tag
   * @param {Object} [attrs={}]
   * @param {string} [text='']
   * @returns {Element}
   */
  function el(tag, attrs = {}, text = '') {
    const element = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => element.setAttribute(k, v));
    if (text) element.textContent = text;
    return element;
  }

  return { qs, qsa, el };
})();

// ─── Storage Utilities ────────────────────────────────────────────────────────

const Store = (() => {

  /**
   * Get a parsed value from localStorage.
   * @param {string} key
   * @param {*} fallback
   * @returns {*}
   */
  function get(key, fallback = null) {
    try {
      const raw = localStorage.getItem(key);
      return raw !== null ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  }

  /**
   * Serialize and save a value to localStorage.
   * @param {string} key
   * @param {*} value
   */
  function set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage full or unavailable — fail silently
    }
  }

  /**
   * Remove a key from localStorage.
   * @param {string} key
   */
  function remove(key) {
    localStorage.removeItem(key);
  }

  return { get, set, remove };
})();

// ─── App Init ─────────────────────────────────────────────────────────────────

const App = (() => {

  function setFooterYear() {
    const el = DOM.qs('#footer-year');
    if (el) el.textContent = new Date().getFullYear();
  }

  function init() {
    setFooterYear();

    // ── Insert your app logic below ──────────────────────────────
    // DOM, Store, and Locale utilities are all available.
    // Example:
    //   const saved = Store.get('user-prefs', {});
    //   const timeEl = DOM.qs('#current-time');
    //   if (timeEl) timeEl.textContent = Locale.formatTime(new Date());
    // ─────────────────────────────────────────────────────────────
  }

  return { init };
})();

// ─── Boot ─────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', App.init);
