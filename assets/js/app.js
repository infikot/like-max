/* ==========================================================================
   like Max — app.js
   Bilingual (ru/en) static-site renderer. No framework, no build step.
   ========================================================================== */
(function () {
  "use strict";

  /* ---------- constants ---------- */
  var LINKS = {
    github: "https://github.com/infikot/like-max",
    releases: "https://github.com/infikot/like-max/releases",
    tags: "https://github.com/infikot/like-max/tags",
    channel: "https://t.me/infikot_dev",
    chat: "https://t.me/infikot_dev_chat",
    blocklist: "https://t.me/infikot_dev/3/227",
    author: "https://t.me/infikot",
    email: "mailto:danilaexdanila@gmail.com",
    support: "https://t.me/infikot_dev/6",
    pda: "https://4pda.to",
    safemax: "https://t.me/safemax_mod",
    kometa: "https://github.com/KometTeam"
  };

  var ICONS = {
    sparkles: '<path d="M12 3l1.9 4.6L18.5 9.5 13.9 11.4 12 16l-1.9-4.6L5.5 9.5l4.6-1.9L12 3z"/><path d="M18.5 15.5l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9.9-2.1z"/>',
    heart: '<path d="M12 20.2S4 15.3 4 9.8a4.6 4.6 0 018.4-2.7A4.6 4.6 0 0120 9.8c0 5.5-8 10.4-8 10.4z"/>',
    bolt: '<path d="M13 2L4.5 13.5H11l-1 8.5L19 10.5h-6.5L13 2z"/>',
    shield: '<path d="M12 3l7.5 3v5.5c0 4.6-3.1 8.6-7.5 9.5-4.4-.9-7.5-4.9-7.5-9.5V6L12 3z"/><path d="M9.2 12.2l2 2 3.6-3.8"/>',
    lock: '<rect x="4.5" y="10.5" width="15" height="10" rx="2.5"/><path d="M8 10.5V8a4 4 0 018 0v2.5"/><path d="M12 14.5v2.5"/>',
    eye: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3.2"/>',
    image: '<rect x="3.5" y="4.5" width="17" height="15" rx="2.5"/><circle cx="8.8" cy="9.8" r="1.6"/><path d="M3.8 16.5l4.7-4.2 3.1 2.8 3.3-3.2 5.3 5"/>',
    moon: '<path d="M20 14.2A8.4 8.4 0 019.8 4a8.5 8.5 0 1010.2 10.2z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M18.7 5.3l-1.4 1.4M6.7 17.3l-1.4 1.4"/>',
    phone: '<path d="M6.5 3.5h3l1.5 4-2 1.4a11 11 0 006.1 6.1l1.4-2 4 1.5v3a2 2 0 01-2.2 2A16.5 16.5 0 014.5 5.7 2 2 0 016.5 3.5z"/><path d="M15.5 7.5l4-4M17.5 3.5h2v2"/>',
    folder: '<path d="M3.5 7.5A2 2 0 015.5 5.5h3.2l1.8 2h7.9a2 2 0 012 2v7a2 2 0 01-2 2h-13a2 2 0 01-2-2v-9z"/><path d="M7 11.5h10"/>',
    wand: '<path d="M5 19l9.5-9.5"/><path d="M13 4.5l1 2.2 2.2 1-2.2 1-1 2.2-1-2.2-2.2-1 2.2-1 1-2.2z"/><path d="M18.5 13.5l.8 1.7 1.7.8-1.7.8-.8 1.7-.8-1.7-1.7-.8 1.7-.8.8-1.7z"/>',
    camera: '<path d="M4 8.5h2.6l1.4-2.2h8l1.4 2.2H20a1.5 1.5 0 011.5 1.5v8a1.5 1.5 0 01-1.5 1.5H4A1.5 1.5 0 012.5 18v-8A1.5 1.5 0 014 8.5z"/><circle cx="12" cy="13.5" r="3.4"/>',
    user: '<circle cx="12" cy="8.5" r="3.6"/><path d="M4.8 20c.6-3.6 3.6-5.6 7.2-5.6s6.6 2 7.2 5.6"/>',
    palette: '<path d="M12 3.5a8.5 8.5 0 000 17c1.4 0 2.3-1 2.3-2.1 0-.8-.4-1.5-.4-2.2 0-1 .8-1.7 1.9-1.7H18a3.5 3.5 0 003.5-3.5c0-4.1-4.3-7.5-9.5-7.5z"/><circle cx="8" cy="9" r="1.2"/><circle cx="12" cy="7.2" r="1.2"/><circle cx="15.8" cy="9.3" r="1.2"/>',
    download: '<path d="M12 3.5v11M7.5 10.5l4.5 4.5 4.5-4.5"/><path d="M4.5 17.5v1.5a1.5 1.5 0 001.5 1.5h12a1.5 1.5 0 001.5-1.5v-1.5"/>',
    book: '<path d="M4 5.5A2 2 0 016 3.5h13v15H6a2 2 0 00-2 2v-15z"/><path d="M4 18.5A2 2 0 016 20.5h13"/>',
    search: '<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/>',
    clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3.2 2"/>',
    tag: '<path d="M11.6 3.5H20a.5.5 0 01.5.5v8.4a1 1 0 01-.3.7l-7.6 7.6a1 1 0 01-1.4 0l-7-7a1 1 0 010-1.4l7.6-7.6a1 1 0 01.8-.2z"/><circle cx="16" cy="8" r="1.4"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    x: '<path d="M6 6l12 12M18 6L6 18"/>',
    alert: '<path d="M10.3 3.9L2.6 17.5a2 2 0 001.7 3h15.4a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z"/><path d="M12 9.5v4.5M12 17.6v.1"/>',
    info: '<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5.5M12 7.6v.1"/>',
    globe: '<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.4 2.4 3.4 5.4 3.4 8.5S14.4 18.1 12 20.5c-2.4-2.4-3.4-5.4-3.4-8.5S9.6 5.9 12 3.5z"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    chevronUp: '<path d="M6 14.5l6-6 6 6"/>',
    chevronDown: '<path d="M6 9.5l6 6 6-6"/>',
    chevronRight: '<path d="M9.5 6l6 6-6 6"/>',
    arrowRight: '<path d="M5 12h13M13 6.5l5.5 5.5L13 17.5"/>',
    arrowLeft: '<path d="M19 12H6M11 6.5L5.5 12l5.5 5.5"/>',
    external: '<path d="M14 4.5h5.5V10"/><path d="M19.5 4.5L11 13"/><path d="M18 14v5a1.5 1.5 0 01-1.5 1.5H5A1.5 1.5 0 013.5 19V7.5A1.5 1.5 0 015 6h5"/>',
    github: '<path d="M9 19.5c-4.5 1.3-4.5-2.3-6.2-2.8M15 21v-3.3c0-.9-.2-1.5-.7-2 2.6-.3 5.4-1.3 5.4-5.8a4.5 4.5 0 00-1.2-3.1 4.2 4.2 0 00-.1-3.1s-1-.3-3.2 1.2a11 11 0 00-5.6 0C7.4 3.4 6.4 3.7 6.4 3.7a4.2 4.2 0 00-.1 3.1A4.5 4.5 0 005 9.9c0 4.5 2.8 5.5 5.4 5.8-.5.5-.7 1.1-.7 2V21"/>',
    telegram: '<path d="M21 4.5L2.8 11.4c-.8.3-.8 1.4.1 1.6l4.4 1.3 1.6 4.8c.3.8 1.3.9 1.8.2l2.2-2.8 4.4 3.2c.6.4 1.5.1 1.7-.7L21 5.4c.2-.8-.6-1.4-1.3-1.1z"/><path d="M7.3 14.3l9.5-6.6-6.6 7.2"/>',
    mail: '<rect x="3" y="5.5" width="18" height="13" rx="2.5"/><path d="M4 7l8 5.5L20 7"/>',
    bug: '<path d="M8 6.5a4 4 0 018 0"/><rect x="7" y="8.5" width="10" height="11" rx="5"/><path d="M3.5 11.5h3M17.5 11.5h3M3 16h4M17 16h4M6 6.5l1.5 1.5M18 6.5l-1.5 1.5"/>',
    chat: '<path d="M20.5 12c0 4.1-3.8 7.4-8.5 7.4-1 0-2-.2-2.9-.5L4 20.5l1.5-4.2A7 7 0 013.5 12C3.5 7.9 7.3 4.6 12 4.6s8.5 3.3 8.5 7.4z"/>',
    refresh: '<path d="M20 12a8 8 0 11-2.6-5.9"/><path d="M20.5 4v4.5H16"/>',
    list: '<path d="M8 6.5h12M8 12h12M8 17.5h12"/><circle cx="4.4" cy="6.5" r="1"/><circle cx="4.4" cy="12" r="1"/><circle cx="4.4" cy="17.5" r="1"/>',
    file: '<path d="M13.5 3.5H7A1.5 1.5 0 005.5 5v14A1.5 1.5 0 007 20.5h10a1.5 1.5 0 001.5-1.5V8.5l-5-5z"/><path d="M13.5 3.5v5h5"/>',
    scale: '<path d="M12 4.5v15M6.5 7.5h11"/><path d="M4 15.5l2.5-8 2.5 8a3 3 0 01-5 0zM15 15.5l2.5-8 2.5 8a3 3 0 01-5 0z"/><path d="M8.5 19.5h7"/>',
    phoneOff: '<path d="M6.5 3.5h3l1.5 4-2 1.4a11 11 0 006.1 6.1l1.4-2 4 1.5v3a2 2 0 01-2.2 2A16.5 16.5 0 014.5 5.7 2 2 0 016.5 3.5z"/><path d="M3 3l18 18"/>',
    wifi: '<path d="M4.5 9.5a12 12 0 0115 0M7.5 13a8 8 0 019 0M10.5 16.4a4 4 0 013 0"/><path d="M12 20v.1"/>',
    layers: '<path d="M12 3.5l8.5 4.5L12 12.5 3.5 8 12 3.5z"/><path d="M4 12.5l8 4.5 8-4.5M4 16.5l8 4.5 8-4.5"/>',
    gauge: '<path d="M20 17a9 9 0 10-16 0"/><path d="M12 12.5l4.5-3.5"/><circle cx="12" cy="14.5" r="1.6"/>',
    trash: '<path d="M4.5 7h15M9 7V5a1.5 1.5 0 011.5-1.5h3A1.5 1.5 0 0115 5v2M6.5 7l1 12.5A1.5 1.5 0 009 21h6a1.5 1.5 0 001.5-1.5L17 7"/>'
  };

  /* ---------- state ---------- */
  var BASE = document.documentElement.getAttribute("data-base") || "./";
  var PAGE = document.documentElement.getAttribute("data-page") || "home";
  var lang = document.documentElement.getAttribute("data-lang") === "en" ? "en" : "ru";
  var dict = null;
  var config = null;
  var updates = null;
  var kb = null;
  var legal = null;
  var lastFocus = null;

  var U = {
    home: BASE,
    kb: BASE + "kb/",
    article: BASE + "kb/article",
    tos: BASE + "tos",
    pp: BASE + "pp",
    legal: BASE + "legal",
    thanks: BASE + "thanks"
  };

  var FALLBACKS = {
    ru: { brandTagline: "Неофициальная модификация MAX", loadError: "Не удалось загрузить данные страницы." },
    en: { brandTagline: "Unofficial MAX modification", loadError: "Could not load the page data." }
  };

  /* ---------- utils ---------- */
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  function get(obj, path) {
    var parts = String(path).split(".");
    for (var i = 0; i < parts.length; i++) {
      if (obj == null || typeof obj !== "object") return undefined;
      obj = obj[parts[i]];
    }
    return obj;
  }

  function t(key, vars) {
    var v = dict ? get(dict[lang], key) : undefined;
    if (v === undefined && dict) v = get(dict.ru, key);
    if (v === undefined) v = get(FALLBACKS[lang], key);
    if (v === undefined) v = FALLBACKS.ru[key];
    if (typeof v !== "string") return "";
    return vars ? v.replace(/\{(\w+)\}/g, function (m, k) {
      return vars[k] === undefined ? m : String(vars[k]);
    }) : v;
  }

  function pick(node) {
    if (node == null) return "";
    if (typeof node === "string") return node;
    return node[lang] != null ? node[lang] : (node.ru != null ? node.ru : "");
  }

  function icon(name, cls) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"' +
      (cls ? ' class="' + cls + '"' : "") + ">" + (ICONS[name] || "") + "</svg>";
  }

  function hydrateIcons(root) {
    var nodes = (root || document).querySelectorAll("[data-icon]");
    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      if (n.getAttribute("data-icon-done")) continue;
      n.innerHTML = icon(n.getAttribute("data-icon"));
      n.setAttribute("data-icon-done", "1");
    }
  }

  function fetchJSON(path) {
    return fetch(path, { cache: "no-cache" }).then(function (r) {
      if (!r.ok) throw new Error(path + " → " + r.status);
      return r.json();
    });
  }

  function fmtDate(iso) {
    if (!iso) return "";
    var m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
    if (!m) return iso;
    var months = lang === "en"
      ? ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      : ["янв.", "фев.", "мар.", "апр.", "мая", "июн.", "июл.", "авг.", "сен.", "окт.", "ноя.", "дек."];
    return parseInt(m[3], 10) + " " + months[parseInt(m[2], 10) - 1] + " " + m[1];
  }

  function pageURL(slug) { return U.article + "?slug=" + encodeURIComponent(slug); }

  function toast(msg) {
    var el = document.getElementById("toast");
    if (!el) return;
    el.textContent = msg;
    el.setAttribute("data-show", "");
    clearTimeout(el._timer);
    el._timer = setTimeout(function () { el.removeAttribute("data-show"); }, 2400);
  }

  /* ---------- theme ---------- */
  function setTheme(next, quiet) {
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("lm-theme", next); } catch (e) {}
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", next === "light" ? "#f8faff" : "#0f1115");
    var btn = document.querySelector("[data-theme-toggle]");
    if (btn) {
      btn.innerHTML = icon(next === "light" ? "moon" : "sun");
      btn.setAttribute("aria-label", t(next === "light" ? "a11y.toDark" : "a11y.toLight"));
      btn.setAttribute("title", t(next === "light" ? "a11y.toDark" : "a11y.toLight"));
    }
    if (!quiet) toast(t(next === "light" ? "toast.themeLight" : "toast.themeDark"));
  }

  function initTheme() {
    var current = document.documentElement.getAttribute("data-theme");
    if (current !== "light" && current !== "dark") {
      var saved = null;
      try { saved = localStorage.getItem("lm-theme"); } catch (e) {}
      if (!saved) saved = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
      current = saved;
    }
    setTheme(current, true);
  }

  /* ---------- language ---------- */
  function setLang(next, opts) {
    lang = next === "en" ? "en" : "ru";
    document.documentElement.setAttribute("data-lang", lang);
    document.documentElement.setAttribute("lang", lang);
    try { localStorage.setItem("lm-lang", lang); } catch (e) {}
    if (opts && opts.url) {
      try {
        var u = new URL(window.location.href);
        if (lang === "ru") u.searchParams.delete("lang"); else u.searchParams.set("lang", "en");
        history.replaceState(null, "", u.toString());
      } catch (e) {}
    }
    var sw = document.querySelectorAll("[data-lang-btn]");
    for (var i = 0; i < sw.length; i++) {
      sw[i].setAttribute("aria-pressed", sw[i].getAttribute("data-lang-btn") === lang ? "true" : "false");
    }
    applyMeta();
    renderAll();
  }

  function langSwitch() {
    return '<div class="lang-switch" role="group" aria-label="' + esc(t("a11y.lang")) + '">' +
      '<button type="button" data-lang-btn="ru" aria-pressed="' + (lang === "ru") + '">RU</button>' +
      '<button type="button" data-lang-btn="en" aria-pressed="' + (lang === "en") + '">EN</button>' +
      "</div>";
  }

  function applyMeta() {
    var p = get(dict || {}, lang + ".meta." + PAGE) || get(dict || {}, "ru.meta." + PAGE) || {};
    if (p.title) document.title = p.title;
    var d = document.querySelector('meta[name="description"]');
    if (d && p.desc) d.setAttribute("content", p.desc);
    var ogT = document.querySelector('meta[property="og:title"]');
    if (ogT && p.title) ogT.setAttribute("content", p.title);
    var ogD = document.querySelector('meta[property="og:description"]');
    if (ogD && p.desc) ogD.setAttribute("content", p.desc);
    var ogL = document.querySelector('meta[property="og:locale"]');
    if (ogL) ogL.setAttribute("content", lang === "en" ? "en_US" : "ru_RU");
  }

  /* ---------- header / footer ---------- */
  function navItems() {
    return [
      { href: U.home + "#features", key: "nav.features", page: null },
      { href: U.home + "#updates", key: "nav.updates", page: null },
      { href: U.kb, key: "nav.kb", page: "kb" },
      { href: U.home + "#author", key: "nav.author", page: null },
      { href: U.thanks, key: "nav.thanks", page: "thanks" },
      { href: U.legal, key: "nav.legal", page: "legal" }
    ];
  }

  function renderHeader() {
    var host = document.getElementById("topbar");
    if (!host) return;
    var items = navItems();
    var nav = items.map(function (it) {
      return '<a href="' + it.href + '"' + (it.page && it.page === PAGE ? ' aria-current="page"' : "") +
        ">" + esc(t(it.key)) + "</a>";
    }).join("");

    host.innerHTML =
      '<div class="wrap topbar__inner">' +
        '<a class="brand" href="' + U.home + '">' +
          '<img src="' + BASE + 'assets/img/icon.webp" alt="" width="34" height="34">' +
          "<b>" + esc(config ? config.appName : "like Max") + "</b>" +
        "</a>" +
        '<nav class="nav" aria-label="' + esc(t("a11y.mainNav")) + '">' + nav + "</nav>" +
        '<div class="topbar__actions">' +
          langSwitch() +
          '<button class="icon-btn" type="button" data-theme-toggle aria-label="' + esc(t("a11y.toLight")) + '"></button>' +
          '<button class="icon-btn" type="button" data-drawer-open aria-label="' + esc(t("a11y.menu")) + '">' + icon("menu") + "</button>" +
          '<a class="btn btn--filled btn--sm btn--download" href="' + U.home + '#download">' + icon("download") + "<span>" + esc(t("action.download")) + "</span></a>" +
        "</div>" +
      "</div>";

    // mobile drawer
    var drawer = document.getElementById("drawer");
    if (drawer) {
      drawer.innerHTML =
        '<div class="drawer__panel" role="dialog" aria-modal="true" aria-label="' + esc(t("a11y.menu")) + '">' +
          '<div class="drawer__head">' +
            '<span class="brand"><img src="' + BASE + 'assets/img/icon.webp" alt="" width="34" height="34"><b>' + esc(config ? config.appName : "like Max") + "</b></span>" +
            '<button class="icon-btn" type="button" data-drawer-close aria-label="' + esc(t("a11y.close")) + '">' + icon("x") + "</button>" +
          "</div>" +
          '<nav aria-label="' + esc(t("a11y.mainNav")) + '">' +
            items.map(function (it) {
              return '<a href="' + it.href + '"' + (it.page && it.page === PAGE ? ' aria-current="page"' : "") + ">" + esc(t(it.key)) + "</a>";
            }).join("") +
            '<a href="' + U.pp + '">' + esc(t("legal.ppTitle")) + "</a>" +
            '<a href="' + U.tos + '">' + esc(t("legal.tosTitle")) + "</a>" +
          "</nav>" +
          '<div class="drawer__cta">' +
            '<a class="btn btn--filled btn--block" href="' + U.home + '#download">' + icon("download") + esc(t("action.downloadApk")) + "</a>" +
            '<a class="btn btn--outline btn--block" href="' + U.kb + '">' + icon("book") + esc(t("action.kb")) + "</a>" +
          "</div>" +
        "</div>";
    }
    hydrateIcons(host);
    hydrateIcons(drawer);
    setTheme(document.documentElement.getAttribute("data-theme"), true);
  }

  function renderFooter() {
    var host = document.getElementById("footer");
    if (!host) return;
    var dl = config && config.downloadUrl ? config.downloadUrl : LINKS.channel;
    host.innerHTML =
      '<div class="wrap">' +
        '<div class="footer__grid">' +
          '<div class="footer__brand">' +
            '<a class="brand" href="' + U.home + '">' +
              '<img src="' + BASE + 'assets/img/icon.webp" alt="" width="34" height="34">' +
              "<b>" + esc(config ? config.appName : "like Max") + "</b>" +
            "</a>" +
            "<p>" + esc(t("footer.about")) + "</p>" +
            '<div class="footer-lang">' + langSwitch() + "</div>" +
          "</div>" +
          footerCol(t("footer.colProduct"), [
            [U.home + "#features", t("nav.features")],
            [U.home + "#updates", t("nav.updates")],
            [U.home + "#download", t("action.download")],
            [U.kb, t("nav.kb")]
          ]) +
          footerCol(t("footer.colProject"), [
            [LINKS.github, t("footer.github")],
            [LINKS.releases, t("footer.releases")],
            [LINKS.channel, t("footer.channel")],
            [LINKS.chat, t("footer.community")]
          ]) +
          footerCol(t("footer.colLegal"), [
            [U.tos, t("legal.tosTitle")],
            [U.pp, t("legal.ppTitle")],
            [U.legal, t("legal.legalTitle")],
            [U.thanks, t("nav.thanks")]
          ]) +
        "</div>" +
        '<div class="footer__bottom">' +
          "<p>" + esc(t("footer.disclaimer", { year: new Date().getFullYear() })) + "</p>" +
          '<p><a href="' + LINKS.author + '" target="_blank" rel="noopener">@infikot</a> · ' + esc(t("footer.madeBy")) + "</p>" +
        "</div>" +
      "</div>";
    hydrateIcons(host);
  }

  function footerCol(title, links) {
    var external = function (href) { return /^https?:/.test(href); };
    return "<div><h4>" + esc(title) + "</h4><ul>" + links.map(function (l) {
      return '<li><a href="' + l[0] + '"' + (external(l[0]) ? ' target="_blank" rel="noopener"' : "") + ">" + esc(l[1]) + "</a></li>";
    }).join("") + "</ul></div>";
  }

  /* ---------- shared blocks ---------- */
  function statsStrip() {
    if (!config) return "";
    var items = [
      [t("hero.statVersion"), "v" + config.modVersion],
      [t("hero.statBase"), config.originalVersion],
      ["Android", config.androidVersion],
      [t("hero.statFeatures"), String((config.features || []).length) + "+"]
    ];
    return '<div class="wrap"><dl class="stats reveal">' + items.map(function (i) {
      return "<div><dt>" + esc(i[0]) + "</dt><dd>" + esc(i[1]) + "</dd></div>";
    }).join("") + "</dl></div>";
  }

  function noticeBlock() {
    return '<div class="wrap"><div class="card notice notice--warn reveal">' +
      '<span class="notice__icon">' + icon("alert") + "</span>" +
      "<div>" +
        "<h3>" + esc(t("notice.title")) + "</h3>" +
        "<p>" + esc(t("notice.text")) + "</p>" +
        '<div class="notice__links">' +
          '<a class="link-pill" href="' + U.legal + '">' + icon("scale") + esc(t("notice.linkLegal")) + "</a>" +
          '<a class="link-pill" href="' + U.tos + '">' + icon("file") + esc(t("notice.linkTos")) + "</a>" +
          '<a class="link-pill" href="' + LINKS.blocklist + '" target="_blank" rel="noopener">' + icon("shield") + esc(t("notice.linkDomains")) + "</a>" +
        "</div>" +
        "<p class=\"small mt-20\"><span class=\"badge\">" + esc(t("notice.badge")) + "</span> " + esc(t("notice.crash")) + "</p>" +
      "</div>" +
    "</div></div>";
  }

  function missingBlock() {
    var items = get(dict || {}, lang + ".features.missing") || [];
    if (!items.length) return "";
    return '<div class="callout callout--info reveal">' +
      '<span class="callout__title">' + esc(t("features.missingTitle")) + "</span>" +
      '<ul class="clean-list">' + items.map(function (i) { return "<li>" + esc(i) + "</li>"; }).join("") + "</ul>" +
    "</div>";
  }

  function featureSection() {
    var highlight = get(dict || {}, lang + ".features.highlight") || [];
    var all = (config && config.features) || [];
    return '<section class="section" id="features"><div class="wrap">' +
      '<div class="section-head reveal"><div>' +
        '<span class="eyebrow">' + icon("heart") + esc(t("features.eyebrow")) + "</span>" +
        "<h2>" + esc(t("features.title")) + "</h2>" +
        "<p>" + esc(t("features.lead")) + "</p>" +
      "</div></div>" +
      missingBlock() +
      '<h3 class="subhead reveal mt-32">' + esc(t("features.highlightTitle")) + "</h3>" +
      '<div class="feature-grid feature-grid--key mt-20">' + highlight.map(function (c) {
        return '<article class="feature feature--key reveal">' +
          '<span class="feature__icon">' + icon(c.icon || "check") + "</span>" +
          "<div>" +
            "<h3>" + esc(c.title) + "</h3>" +
            "<p>" + esc(c.text) + "</p>" +
          "</div>" +
        "</article>";
      }).join("") + "</div>" +
      '<div class="card more-card mt-32 reveal">' +
        '<div class="more-card__head">' +
          '<span class="feature__icon">' + icon("list") + "</span>" +
          "<div><h3>" + esc(t("features.moreTitle")) + "</h3>" +
          "<p>" + esc(t("features.moreLead")) + "</p></div>" +
        "</div>" +
        '<ul class="more-list">' +
          all.map(function (f) { return "<li>" + icon("check") + "<span>" + esc(f) + "</span></li>"; }).join("") +
        "</ul>" +
      "</div>" +
    "</div></section>";
  }

  function releaseCard(rel, index) {
    var kindLabel = rel.kind === "major" ? t("updates.kindMajor")
      : rel.kind === "hotfix" ? t("updates.kindHotfix") : t("updates.kindMinor");
    var kindCls = rel.kind === "major" ? " release__kind--major" : rel.kind === "hotfix" ? " release__kind--hotfix" : "";
    var changes = pick(rel.changes);
    return '<details class="release reveal"' + (index === 0 ? " open" : "") + ">" +
      "<summary>" +
        '<span class="release__ver">' + esc(rel.version) + "</span>" +
        '<span class="release__kind' + kindCls + '">' + esc(kindLabel) + "</span>" +
        (index === 0 ? '<span class="badge badge--new">' + esc(t("updates.latest")) + "</span>" : "") +
        '<span class="release__meta">' +
          "<span>" + icon("clock") + esc(fmtDate(rel.date)) + "</span>" +
          "<span>" + icon("layers") + esc(t("updates.base")) + " " + esc(rel.base) + "</span>" +
        "</span>" +
      "</summary>" +
      '<div class="release__body"><ul>' +
        (Array.isArray(changes) ? changes : []).map(function (c) { return "<li>" + esc(c) + "</li>"; }).join("") +
      "</ul></div>" +
    "</details>";
  }

  function updatesSection() {
    var list = (updates && updates.releases) || [];
    var limit = 5;
    var head = list.slice(0, limit).map(function (r, i) { return releaseCard(r, i); }).join("");
    var rest = list.slice(limit).map(function (r, i) { return releaseCard(r, i + limit); }).join("");
    return '<section class="section" id="updates"><div class="wrap">' +
      '<div class="section-head reveal"><div>' +
        '<span class="eyebrow">' + icon("refresh") + esc(t("updates.eyebrow")) + "</span>" +
        "<h2>" + esc(t("updates.title")) + "</h2>" +
        "<p>" + esc(t("updates.lead")) + "</p>" +
      "</div>" +
      '<a class="btn btn--outline btn--sm" href="' + LINKS.releases + '" target="_blank" rel="noopener">' + icon("github") + esc(t("updates.allOnGithub")) + "</a>" +
      "</div>" +
      '<div class="updates">' + head + "</div>" +
      (rest ? '<div class="updates" id="moreUpdates" hidden>' + rest + "</div>" +
        '<div class="row mt-20"><button class="btn btn--tonal" type="button" data-toggle-updates>' +
        icon("list") + "<span>" + esc(t("updates.showAll", { n: list.length })) + "</span></button></div>" : "") +
      '<p class="small dim mt-20">' + esc(t("updates.note")) + "</p>" +
    "</div></section>";
  }

  function faqSection() {
    var items = get(dict || {}, lang + ".faq.items") || [];
    return '<section class="section section--tight" id="faq"><div class="wrap">' +
      '<div class="section-head reveal"><div>' +
        '<span class="eyebrow">' + icon("chat") + esc(t("faq.eyebrow")) + "</span>" +
        "<h2>" + esc(t("faq.title")) + "</h2>" +
        "<p>" + esc(t("faq.lead")) + "</p>" +
      "</div></div>" +
      '<div class="faq">' + items.map(function (it) {
        return "<details class=\"reveal\"><summary>" + esc(it.q) + "</summary>" +
          '<div class="faq__body">' + esc(it.a) + "</div></details>";
      }).join("") + "</div>" +
    "</div></section>";
  }

  function authorSection() {
    var rows = [
      ["telegram", LINKS.channel, t("author.channel"), t("author.channelDesc")],
      ["chat", LINKS.chat, t("author.chat"), t("author.chatDesc")],
      ["github", LINKS.github, t("author.github"), t("author.githubDesc")],
      ["mail", LINKS.email, t("author.email"), t("author.emailDesc")]
    ];
    return '<section class="section" id="author"><div class="wrap">' +
      '<div class="section-head reveal"><div>' +
        '<span class="eyebrow">' + icon("user") + esc(t("author.eyebrow")) + "</span>" +
        "<h2>" + esc(t("author.title")) + "</h2>" +
        "<p>" + esc(t("author.lead")) + "</p>" +
      "</div></div>" +
      '<div class="author-grid">' +
        '<div class="card author-card reveal">' +
          '<img src="' + BASE + 'assets/img/icon.webp" alt="" width="84" height="84">' +
          "<h3>@infikot</h3>" +
          '<p class="author-card__role">' + esc(t("author.role")) + "</p>" +
          "<p>" + esc(t("author.bio")) + "</p>" +
        "</div>" +
        '<div class="link-list">' + rows.map(function (r) {
          return '<a class="link-row reveal" href="' + r[1] + '"' + (/^https?:/.test(r[1]) ? ' target="_blank" rel="noopener"' : "") + ">" +
            '<span class="link-row__icon">' + icon(r[0]) + "</span>" +
            "<span><b>" + esc(r[2]) + "</b><span>" + esc(r[3]) + "</span></span>" +
            '<span class="link-row__arrow">' + icon("arrowRight") + "</span>" +
          "</a>";
        }).join("") + "</div>" +
      "</div>" +
    "</div></section>";
  }

  function downloadSection() {
    var dl = config && config.downloadUrl ? config.downloadUrl : LINKS.channel;
    return '<section class="section" id="download"><div class="wrap">' +
      '<div class="download-card reveal"><div class="download-card__grid">' +
        "<div>" +
          '<span class="eyebrow">' + icon("download") + esc(t("download.eyebrow")) + "</span>" +
          "<h2>" + esc(t("download.title")) + "</h2>" +
          "<p>" + esc(t("download.lead")) + "</p>" +
          '<div class="download-card__actions">' +
            '<button class="btn btn--filled" type="button" data-download>' + icon("download") + esc(t("download.primary")) + "</button>" +
            '<a class="btn btn--outline" href="' + dl + '" target="_blank" rel="noopener">' + icon("telegram") + esc(t("download.mirror")) + "</a>" +
          "</div>" +
          '<p class="download-card__note">' + esc(t("download.note")) + "</p>" +
        "</div>" +
        "<ul class=\"req-list\">" +
          ['<li>' + icon("check") + esc(t("download.reqAndroid")) + "<b>9 – 16</b></li>",
           '<li>' + icon("layers") + esc(t("download.reqBase")) + "<b>" + esc(config ? config.originalVersion : "") + "</b></li>",
           '<li>' + icon("shield") + esc(t("download.reqRoot")) + "<b>" + esc(t("download.reqRootNo")) + "</b></li>",
           '<li>' + icon("wifi") + esc(t("download.reqNet")) + "<b>" + esc(t("download.reqNetYes")) + "</b></li>"].join("") +
        "</ul>" +
      "</div></div>" +
    "</div></section>";
  }

  /* ---------- pages ---------- */
  function renderHome() {
    var c = config || { appName: "like Max", modVersion: "—", originalVersion: "—", androidVersion: "9~16", features: [] };
    return '<section class="hero"><div class="wrap hero__grid">' +
      "<div>" +
        '<span class="eyebrow">' + icon("heart") + esc(t("hero.eyebrow")) + "</span>" +
        "<h1>" + t("hero.title") + "</h1>" +
        '<p class="hero__lead">' + esc(t("hero.lead")) + "</p>" +
        '<div class="hero__cta">' +
          '<button class="btn btn--filled" type="button" data-download>' + icon("download") + esc(t("action.downloadApk")) + "</button>" +
          '<a class="btn btn--outline" href="' + U.kb + '">' + icon("book") + esc(t("action.kb")) + "</a>" +
        "</div>" +
        '<div class="chips hero__meta">' +
          '<span class="chip chip--accent">' + icon("bolt") + "<b>v" + esc(c.modVersion) + "</b></span>" +
          '<span class="chip">MAX ' + esc(c.originalVersion) + "</span>" +
          '<span class="chip">Android ' + esc(c.androidVersion) + "</span>" +
          '<span class="chip">' + icon("shield") + esc(t("hero.noRoot")) + "</span>" +
        "</div>" +
      "</div>" +
      '<div class="hero__aside"><div class="app-card">' +
        '<img src="' + BASE + 'assets/img/icon.webp" alt="' + esc(c.appName) + '" width="92" height="92">' +
        "<h2>" + esc(c.appName) + "</h2>" +
        '<p class="app-card__by"><a href="' + LINKS.author + '" target="_blank" rel="noopener">@infikot</a></p>' +
        '<span class="app-card__ver"><i class="dot"></i>' + esc(t("hero.actual", { v: c.modVersion })) + "</span>" +
        '<div class="app-card__rows">' +
          "<div><span>" + esc(t("hero.statBase")) + "</span><b>MAX " + esc(c.originalVersion) + "</b></div>" +
          "<div><span>Android</span><b>" + esc(c.androidVersion) + "</b></div>" +
          "<div><span>" + esc(t("hero.statFeatures")) + "</span><b>" + String((c.features || []).length) + "</b></div>" +
        "</div>" +
      "</div></div>" +
    "</div></section>" +
    '<section class="section section--tight">' + statsStrip() + "</section>" +
    '<section class="section section--tight">' + noticeBlock() + "</section>" +
    featureSection() +
    updatesSection() +
    kbTeaser() +
    faqSection() +
    authorSection() +
    downloadSection();
  }

  function kbTeaser() {
    var art = popularArticles(4);
    return '<section class="section" id="kb"><div class="wrap">' +
      '<div class="section-head reveal"><div>' +
        '<span class="eyebrow">' + icon("book") + esc(t("kb.eyebrow")) + "</span>" +
        "<h2>" + esc(t("kb.title")) + "</h2>" +
        "<p>" + esc(t("kb.lead")) + "</p>" +
      "</div>" +
      '<a class="btn btn--outline btn--sm" href="' + U.kb + '">' + esc(t("kb.openAll")) + icon("arrowRight") + "</a>" +
      "</div>" +
      '<div class="kb-list">' + art.map(kbCard).join("") + "</div>" +
    "</div></section>";
  }

  function popularArticles(n) {
    var list = (kb && kb.articles) || [];
    var pop = list.filter(function (a) { return a.popular; });
    return (pop.length ? pop : list).slice(0, n);
  }

  function kbCard(a) {
    return '<a class="kb-card reveal" href="' + pageURL(a.slug) + '">' +
      "<h4>" + esc(pick(a.title)) + "</h4>" +
      "<p>" + esc(pick(a.excerpt)) + "</p>" +
      '<span class="kb-card__foot">' + icon("clock") + esc(t("kb.readTime", { n: a.readTime })) +
      (a.cat && kb ? "· " + esc(catName(a.cat)) : "") + "</span>" +
    "</a>";
  }

  function catName(id) {
    var cats = (kb && kb.categories) || [];
    for (var i = 0; i < cats.length; i++) if (cats[i].id === id) return pick(cats[i].name);
    return id;
  }

  function renderKb() {
    var q = "";
    try { q = new URLSearchParams(window.location.search).get("q") || ""; } catch (e) {}
    var cats = (kb && kb.categories) || [];
    var list = (kb && kb.articles) || [];
    return '<section class="section"><div class="wrap">' +
      '<div class="section-head reveal"><div>' +
        '<span class="eyebrow">' + icon("book") + esc(t("kb.eyebrow")) + "</span>" +
        "<h2>" + esc(t("kb.title")) + "</h2>" +
        "<p>" + esc(t("kb.lead")) + "</p>" +
      "</div></div>" +
      '<label class="kb-search reveal">' + icon("search") +
        '<input type="search" id="kbSearch" placeholder="' + esc(t("kb.searchPlaceholder")) + '" value="' + esc(q) + '" aria-label="' + esc(t("kb.searchPlaceholder")) + '">' +
      "</label>" +
      '<div class="kb-cats mt-28" id="kbCats">' + cats.map(function (cat) {
        var items = list.filter(function (a) { return a.cat === cat.id; });
        if (!items.length) return "";
        return '<div class="kb-cat" data-cat="' + esc(cat.id) + '">' +
          "<h3>" + esc(pick(cat.name)) + " · " + items.length + "</h3>" +
          '<div class="kb-list">' + items.map(kbCard).join("") + "</div>" +
        "</div>";
      }).join("") + "</div>" +
      '<div class="kb-empty hidden" id="kbEmpty">' + esc(t("kb.noResults")) + "</div>" +
    "</div></section>";
  }

  function renderArticle() {
    var slug = "";
    try { slug = new URLSearchParams(window.location.search).get("slug") || ""; } catch (e) {}
    var list = (kb && kb.articles) || [];
    var art = null;
    for (var i = 0; i < list.length; i++) if (list[i].slug === slug) art = list[i];
    if (!art && list.length) art = list[0];
    if (!art) {
      return '<section class="section"><div class="wrap doc"><h1>' + esc(t("article.notFoundTitle")) + "</h1>" +
        "<p class=\"muted mt-20\">" + esc(t("article.notFoundText")) + "</p></div></section>";
    }
    var blocks = pick(art.body);
    var heads = (Array.isArray(blocks) ? blocks : []).filter(function (b) { return b.h; });
    var related = list.filter(function (a) { return a.cat === art.cat && a.slug !== art.slug; }).slice(0, 3);

    return '<section class="section"><div class="wrap doc">' +
      '<nav class="crumbs" aria-label="' + esc(t("a11y.breadcrumbs")) + '">' +
        '<a href="' + U.home + '">' + esc(t("nav.home")) + "</a>" + icon("arrowRight") +
        '<a href="' + U.kb + '">' + esc(t("nav.kb")) + "</a>" + icon("arrowRight") +
        "<span>" + esc(pick(art.title)) + "</span>" +
      "</nav>" +
      '<div class="doc__head reveal">' +
        '<span class="eyebrow">' + esc(catName(art.cat)) + "</span>" +
        "<h1>" + esc(pick(art.title)) + "</h1>" +
        '<div class="doc__meta">' +
          "<span>" + icon("clock", "ico-inline") + esc(t("kb.readTime", { n: art.readTime })) + "</span>" +
          "<span>" + icon("refresh") + esc(t("article.updated")) + ": " + esc(fmtDate(art.updated)) + "</span>" +
        "</div>" +
      "</div>" +
      '<div class="prose reveal">' + renderBlocks(blocks) + "</div>" +
      (heads.length > 1 ? '<div class="toc mt-28">' + "<h3>" + esc(t("article.toc")) + "</h3><ol>" +
        heads.map(function (h, i) { return '<li><a href="#h' + i + '">' + esc(h.h) + "</a></li>"; }).join("") +
      "</ol></div>" : "") +
      '<div class="doc__foot">' +
        '<a class="btn btn--outline" href="' + U.kb + '">' + icon("arrowLeft") + esc(t("article.back")) + "</a>" +
        '<a class="btn btn--tonal" href="' + LINKS.chat + '" target="_blank" rel="noopener">' + icon("chat") + esc(t("article.ask")) + "</a>" +
      "</div>" +
      (related.length ? "<h2 style=\"margin-top:44px;font-size:1.3rem\">" + esc(t("article.related")) + "</h2>" +
        '<div class="kb-list mt-20">' + related.map(kbCard).join("") + "</div>" : "") +
    "</div></section>";
  }

  function renderBlocks(blocks) {
    if (!Array.isArray(blocks)) return "";
    var hIndex = -1;
    return blocks.map(function (b) {
      if (b.h) { hIndex++; return '<h2 id="h' + hIndex + '">' + esc(b.h) + "</h2>"; }
      if (b.h3) return "<h3>" + esc(b.h3) + "</h3>";
      if (b.p) return "<p>" + b.p + "</p>";
      if (b.ul) return "<ul>" + b.ul.map(function (i) { return "<li>" + i + "</li>"; }).join("") + "</ul>";
      if (b.ol) return "<ol>" + b.ol.map(function (i) { return "<li>" + i + "</li>"; }).join("") + "</ol>";
      if (b.quote) return "<blockquote>" + b.quote + "</blockquote>";
      if (b.note) {
        var kind = b.note.kind === "warn" ? " callout--warn" : b.note.kind === "info" ? " callout--info" : "";
        return '<div class="callout' + kind + '">' +
          (b.note.title ? '<span class="callout__title">' + esc(b.note.title) + "</span>" : "") +
          b.note.text + "</div>";
      }
      return "";
    }).join("");
  }

  function renderDoc(kind) {
    var doc = legal && legal.docs ? legal.docs[kind] : null;
    var title = t("legal." + kind + "Title");
    var blocks = doc ? pick(doc.body) : [];
    return '<section class="section"><div class="wrap doc">' +
      '<nav class="crumbs" aria-label="' + esc(t("a11y.breadcrumbs")) + '">' +
        '<a href="' + U.home + '">' + esc(t("nav.home")) + "</a>" + icon("arrowRight") +
        "<span>" + esc(title) + "</span>" +
      "</nav>" +
      '<div class="doc__head reveal">' +
        '<span class="eyebrow">' + icon("scale") + esc(t("legal.eyebrow")) + "</span>" +
        "<h1>" + esc(doc && doc.title ? pick(doc.title) : title) + "</h1>" +
        '<div class="doc__meta"><span>' + icon("refresh") + esc(t("legal.revision")) + ": " + esc(fmtDate(legal && legal.updated)) + "</span>" +
          "<span>" + icon("mail") + '<a href="' + LINKS.email + '">danilaexdanila@gmail.com</a></span></div>' +
        '<div class="legal-meta">' +
          '<a class="link-pill" href="' + U.tos + '">' + icon("file") + esc(t("legal.tosTitle")) + "</a>" +
          '<a class="link-pill" href="' + U.pp + '">' + icon("lock") + esc(t("legal.ppTitle")) + "</a>" +
          '<a class="link-pill" href="' + U.legal + '">' + icon("scale") + esc(t("legal.legalTitle")) + "</a>" +
        "</div>" +
      "</div>" +
      '<div class="prose reveal">' + renderBlocks(blocks) + "</div>" +
      '<div class="doc__foot">' +
        '<a class="btn btn--outline" href="' + U.home + '">' + icon("arrowLeft") + esc(t("action.home")) + "</a>" +
        '<a class="btn btn--tonal" href="' + U.kb + '">' + icon("book") + esc(t("action.kb")) + "</a>" +
      "</div>" +
    "</div></section>";
  }

  function renderThanks() {
    var items = get(dict || {}, lang + ".thanks.items") || [];
    return '<section class="section"><div class="wrap doc">' +
      '<nav class="crumbs" aria-label="' + esc(t("a11y.breadcrumbs")) + '">' +
        '<a href="' + U.home + '">' + esc(t("nav.home")) + "</a>" + icon("arrowRight") +
        "<span>" + esc(t("nav.thanks")) + "</span>" +
      "</nav>" +
      '<div class="doc__head reveal">' +
        '<span class="eyebrow">' + icon("heart") + esc(t("thanks.eyebrow")) + "</span>" +
        "<h1>" + esc(t("thanks.title")) + "</h1>" +
        '<p class="doc__lead">' + esc(t("thanks.lead")) + "</p>" +
      "</div>" +
      '<div class="thanks-grid">' + items.map(function (c) {
        return '<a class="thanks-card reveal" href="' + esc(c.href || "#") + '" target="_blank" rel="noopener">' +
          '<span class="thanks-card__icon">' + icon(c.icon || "heart") + "</span>" +
          '<span class="thanks-card__body">' +
            "<b>" + esc(c.title) + "</b>" +
            "<span>" + esc(c.text) + "</span>" +
            (c.note ? '<span class="thanks-card__note">' + esc(c.note) + "</span>" : "") +
          "</span>" +
          '<span class="thanks-card__arrow">' + icon("external") + "</span>" +
        "</a>";
      }).join("") + "</div>" +
      '<div class="card thanks-people mt-28 reveal">' +
        '<span class="feature__icon">' + icon("heart") + "</span>" +
        "<div>" +
          "<h3>" + esc(t("thanks.peopleTitle")) + "</h3>" +
          "<p>" + esc(t("thanks.peopleText")) + "</p>" +
        "</div>" +
      "</div>" +
      '<div class="cta-strip mt-20 reveal">' +
        "<div>" +
          "<h3>" + esc(t("thanks.supportTitle")) + "</h3>" +
          "<p>" + esc(t("thanks.supportText")) + "</p>" +
        "</div>" +
        '<a class="btn btn--filled" href="' + LINKS.support + '" target="_blank" rel="noopener">' +
          icon("heart") + esc(t("thanks.supportBtn")) +
        "</a>" +
      "</div>" +
      '<div class="doc__foot">' +
        '<a class="btn btn--outline" href="' + U.home + '">' + icon("arrowLeft") + esc(t("action.home")) + "</a>" +
        '<a class="btn btn--tonal" href="' + U.kb + '">' + icon("book") + esc(t("action.kb")) + "</a>" +
      "</div>" +
    "</div></section>";
  }

  var RENDERERS = {
    home: renderHome,
    kb: renderKb,
    article: renderArticle,
    thanks: renderThanks,
    tos: function () { return renderDoc("tos"); },
    pp: function () { return renderDoc("pp"); },
    legal: function () { return renderDoc("legal"); }
  };

  /* Strings that live in the HTML shell rather than in a JS template. */
  function localizeStatics() {
    var n = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < n.length; i++) n[i].textContent = t(n[i].getAttribute("data-i18n"));
    var a = document.querySelectorAll("[data-i18n-aria]");
    for (var j = 0; j < a.length; j++) a[j].setAttribute("aria-label", t(a[j].getAttribute("data-i18n-aria")));
  }

  function renderAll() {
    var main = document.getElementById("main");
    if (!main) return;
    var fn = RENDERERS[PAGE] || renderHome;
    main.innerHTML = fn();
    hydrateIcons(main);
    initReveal();
    bindMain();
    renderHeader();
    renderFooter();
    localizeStatics();
  }

  /* ---------- modal ---------- */
  function openModal(html) {
    var modal = document.getElementById("downloadModal");
    if (!modal) return;
    lastFocus = document.activeElement;
    modal.querySelector("[data-modal-body]").innerHTML = html;
    hydrateIcons(modal);
    modal.setAttribute("data-open", "");
    document.body.style.overflow = "hidden";
    var focusable = modal.querySelector("button, a[href]");
    if (focusable) focusable.focus();
  }

  function closeModal() {
    var modal = document.getElementById("downloadModal");
    if (!modal) return;
    modal.removeAttribute("data-open");
    document.body.style.overflow = "";
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  function termsKey() {
    return "lm-terms:" + (config ? config.modVersion : "x");
  }

  function accepted() {
    try { return localStorage.getItem(termsKey()) === "1"; } catch (e) { return false; }
  }

  function goDownload() {
    var url = LINKS.releases;
    window.open(url, "_blank", "noopener");
    toast(t("toast.download"));
  }

  function requestDownload() {
    if (accepted()) { goDownload(); return; }
    var pts = get(dict || {}, lang + ".modal.points") || [];
    openModal(
      '<p class="modal-lead">' + esc(t("modal.intro")) + "</p>" +
      '<ul class="modal-list">' + pts.map(function (p) {
        return '<li><span class="modal-list__mark">' + icon("check") + "</span><span>" + esc(p) + "</span></li>";
      }).join("") + "</ul>" +
      '<div class="modal-docs">' +
        '<span class="modal-docs__title">' + esc(t("modal.more")) + "</span>" +
        '<a class="modal-doc" href="' + U.tos + '">' + icon("file") + "<span>" + esc(t("legal.tosTitle")) + "</span>" + icon("chevronRight") + "</a>" +
        '<a class="modal-doc" href="' + U.pp + '">' + icon("lock") + "<span>" + esc(t("legal.ppTitle")) + "</span>" + icon("chevronRight") + "</a>" +
      "</div>" +
      '<div class="modal__actions">' +
        '<button class="btn btn--text" type="button" data-modal-close>' + esc(t("modal.decline")) + "</button>" +
        '<button class="btn btn--filled" type="button" data-accept>' + icon("check") + esc(t("modal.accept")) + "</button>" +
      "</div>"
    );
  }

  /* ---------- page transitions ---------- */
  var leaving = false;

  function scrollToHashTarget(hash, smooth) {
    var id = decodeURIComponent(String(hash || "").replace(/^#/, ""));
    if (!id) return;
    var el = document.getElementById(id);
    if (!el) return;
    var bar = document.getElementById("topbar");
    var offset = (bar ? bar.offsetHeight : 0) + 14;
    var top = el.getBoundingClientRect().top + (window.scrollY || window.pageYOffset || 0) - offset;
    if (top < 0) top = 0;
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    try {
      window.scrollTo({ top: top, behavior: smooth && !reduce ? "smooth" : "auto" });
    } catch (err) {
      window.scrollTo(0, top);
    }
  }

  /* same-page anchor: smooth jump with sticky-header offset */
  function jumpToHash(a, e) {
    var next;
    try { next = new URL(a.href, location.href); } catch (err) { return false; }
    if (next.origin !== location.origin) return false;
    if (next.href.split("#")[0] !== location.href.split("#")[0]) return false;
    if (!next.hash || next.hash.length < 2) return false;
    if (!document.getElementById(decodeURIComponent(next.hash.slice(1)))) return false;
    e.preventDefault();
    if (window.history && history.pushState) history.pushState(null, "", next.hash);
    else location.hash = next.hash;
    scrollToHashTarget(next.hash, true);
    return true;
  }

  function navigateSmoothly(a) {
    if (leaving) return;
    var href = a.getAttribute("href");
    if (!href || href.charAt(0) === "#") return;
    if (a.target && a.target !== "_self") return;
    if (a.hasAttribute("download")) return;
    if (/^(mailto:|tel:|javascript:)/i.test(href)) return;

    var next;
    try { next = new URL(a.href, location.href); } catch (e) { return; }
    if (next.origin !== location.origin) return;

    var here = location.href.split("#")[0];
    var there = next.href.split("#")[0];
    if (here === there) return;              /* same page — handled by jumpToHash */

    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    leaving = true;
    document.documentElement.setAttribute("data-leaving", "1");
    setTimeout(function () { location.href = next.href; }, 165);
  }

  window.addEventListener("hashchange", function () {
    scrollToHashTarget(location.hash, true);
  });

  window.addEventListener("pageshow", function (e) {
    if (!e.persisted) return;
    leaving = false;
    document.documentElement.removeAttribute("data-leaving");
  });

  /* ---------- interactions ---------- */
  function bindMain() {
    var main = document.getElementById("main");
    if (!main) return;
    main.addEventListener("click", function (e) {
      var dl = e.target.closest("[data-download]");
      if (dl) { e.preventDefault(); requestDownload(); return; }
      var tog = e.target.closest("[data-toggle-updates]");
      if (tog) {
        var more = document.getElementById("moreUpdates");
        if (!more) return;
        var open = more.hasAttribute("hidden");
        if (open) more.removeAttribute("hidden"); else more.setAttribute("hidden", "");
        tog.querySelector("span").textContent = open
          ? t("updates.hideAll")
          : t("updates.showAll", { n: ((updates && updates.releases) || []).length });
        return;
      }
    });
  }

  function bindKbSearch() {
    document.addEventListener("input", function (e) {
      var input = e.target;
      if (!input || input.id !== "kbSearch") return;
      var q = input.value.trim().toLowerCase();
      var cats = document.querySelectorAll("#kbCats .kb-cat");
      var visible = 0;
      for (var i = 0; i < cats.length; i++) {
        var cards = cats[i].querySelectorAll(".kb-card");
        var catVisible = 0;
        for (var j = 0; j < cards.length; j++) {
          var hay = (cards[j].textContent || "").toLowerCase();
          var hit = !q || hay.indexOf(q) !== -1;
          cards[j].classList.toggle("kb-card--empty", !hit);
          cards[j].style.display = hit ? "" : "none";
          if (hit) catVisible++;
        }
        cats[i].style.display = catVisible ? "" : "none";
        visible += catVisible;
      }
      var empty = document.getElementById("kbEmpty");
      if (empty) empty.classList.toggle("hidden", visible > 0);
    });
  }

  function bindGlobal() {
    document.addEventListener("click", function (e) {
      var el;
      if ((el = e.target.closest("[data-theme-toggle]"))) {
        setTheme(document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light");
        return;
      }
      if ((el = e.target.closest("[data-lang-btn]"))) {
        setLang(el.getAttribute("data-lang-btn"), { url: true });
        return;
      }
      if ((el = e.target.closest("[data-drawer-open]"))) {
        var d = document.getElementById("drawer");
        if (d) { d.setAttribute("data-open", ""); document.body.style.overflow = "hidden"; }
        return;
      }
      if ((el = e.target.closest("[data-drawer-close]")) || e.target.id === "drawer") {
        var dd = document.getElementById("drawer");
        if (dd) { dd.removeAttribute("data-open"); document.body.style.overflow = ""; }
        return;
      }
      if ((el = e.target.closest("[data-modal-close]")) || e.target.id === "downloadModal") {
        if (e.target.id === "downloadModal" || (el && el.closest("[data-modal-close]"))) closeModal();
        return;
      }
      if ((el = e.target.closest("[data-accept]"))) {
        try { localStorage.setItem(termsKey(), "1"); } catch (err) {}
        closeModal();
        goDownload();
        return;
      }
      if ((el = e.target.closest("[data-to-top]"))) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      var drawerLink = e.target.closest("#drawer a");
      if (drawerLink) {
        var d2 = document.getElementById("drawer");
        if (d2) { d2.removeAttribute("data-open"); document.body.style.overflow = ""; }
      }

      /* seamless cross-page transition for internal links */
      var a = e.target.closest("a[href]");
      if (a && !e.defaultPrevented && e.button === 0 &&
          !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
        if (jumpToHash(a, e)) return;
        navigateSmoothly(a);
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      closeModal();
      var d = document.getElementById("drawer");
      if (d && d.hasAttribute("data-open")) { d.removeAttribute("data-open"); document.body.style.overflow = ""; }
    });

    var top = document.querySelector("[data-to-top]");
    var bar = document.getElementById("topbar");
    var onScroll = function () {
      var y = window.scrollY || window.pageYOffset;
      if (top) top.toggleAttribute("data-show", y > 640);
      if (bar) bar.toggleAttribute("data-stuck", y > 8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  var io = null;
  function initReveal() {    var nodes = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      for (var i = 0; i < nodes.length; i++) nodes[i].classList.add("is-in");
      return;
    }
    if (!io) {
      io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
        });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.06 });
    }
    for (var j = 0; j < nodes.length; j++) if (!nodes[j].classList.contains("is-in")) io.observe(nodes[j]);
  }

  /* ---------- boot ---------- */
  function skeleton() {
    return '<section class="section"><div class="wrap"><div class="skeleton" style="height:220px"></div>' +
      '<div class="skeleton mt-28" style="height:120px"></div></div></section>';
  }

  function boot() {
    initTheme();
    var main = document.getElementById("main");
    if (main) main.innerHTML = skeleton();
    bindGlobal();
    bindKbSearch();

    Promise.all([
      fetchJSON(BASE + "data/i18n.json"),
      fetchJSON(BASE + "config.json").catch(function () { return null; }),
      fetchJSON(BASE + "data/updates.json").catch(function () { return null; }),
      fetchJSON(BASE + "data/kb.json").catch(function () { return null; }),
      fetchJSON(BASE + "data/legal.json").catch(function () { return null; })
    ]).then(function (res) {
      dict = res[0];
      config = res[1];
      updates = res[2];
      kb = res[3];
      legal = res[4];
      if (!config) config = { appName: "like Max", modVersion: "0.1.4", originalVersion: "26.37.1 (6900)", androidVersion: "9~16", features: [] };
      var sw = document.querySelectorAll("[data-lang-btn]");
      for (var i = 0; i < sw.length; i++) {
        sw[i].setAttribute("aria-pressed", sw[i].getAttribute("data-lang-btn") === lang ? "true" : "false");
      }
      applyMeta();
      renderAll();
      document.documentElement.setAttribute("data-ready", "1");
      if (location.hash) {
        setTimeout(function () { scrollToHashTarget(location.hash, false); }, 0);
        setTimeout(function () { scrollToHashTarget(location.hash, false); }, 200);
        setTimeout(function () { scrollToHashTarget(location.hash, false); }, 420);
      }
    }).catch(function (err) {
      if (window.console) console.error(err);
      if (main) main.innerHTML = '<section class="section"><div class="wrap"><div class="card notice notice--warn">' +
        '<span class="notice__icon">' + icon("alert") + "</span><div><h3>" + esc(FALLBACKS[lang].loadError) + "</h3>" +
        "<p>" + esc(String(err && err.message ? err.message : err)) + "</p>" +
        '<p class="small dim">' + esc(BASE + "data/i18n.json") + "</p></div></div></div></section>";
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
