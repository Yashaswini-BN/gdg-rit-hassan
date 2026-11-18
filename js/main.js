/* ==========================================================
   GDG on Campus – RIT Hassan  |  main.js
   ========================================================== */
(function () {
  "use strict";

  var DATA = window.SITE_DATA || { tracks: [], events: [], team: [] };
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function esc(str) {
    var d = document.createElement("div");
    d.textContent = str;
    return d.innerHTML;
  }

  /* ---------- Theme toggle ---------- */
  var root = document.documentElement;
  var themeBtn = $("#theme-toggle");
  function setTheme(t) {
    root.setAttribute("data-theme", t);
    try { localStorage.setItem("theme", t); } catch (e) {}
    themeBtn.setAttribute("aria-label", t === "dark" ? "Switch to light theme" : "Switch to dark theme");
  }
  if (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    setTheme("dark");
  } else {
    setTheme(root.getAttribute("data-theme") || "light");
  }
  themeBtn.addEventListener("click", function () {
    setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
  });

  /* ---------- Mobile menu ---------- */
  var menuBtn = $("#menu-toggle");
  var nav = $("#primary-nav");
  function closeMenu() {
    nav.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.setAttribute("aria-label", "Open menu");
  }
  menuBtn.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
  $$("a", nav).forEach(function (a) { a.addEventListener("click", closeMenu); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenu(); });

  /* ---------- Scroll progress + active link ---------- */
  var bar = $("#scroll-progress");
  var links = $$(".nav-link");
  var sections = links.map(function (l) { return $(l.getAttribute("href")); });
  function onScroll() {
    var h = document.documentElement;
    var pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    bar.style.width = pct + "%";
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if ("IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          links.forEach(function (l) {
            l.classList.toggle("active", l.getAttribute("href") === "#" + en.target.id);
          });
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { if (s) spy.observe(s); });
  }

  /* ---------- Render tracks ---------- */
  var tracksGrid = $("#tracks-grid");
  tracksGrid.innerHTML = DATA.tracks.map(function (t) {
    return '<button type="button" class="card track c-' + t.color + ' reveal" aria-expanded="false">' +
      '<div class="t-ic" aria-hidden="true">' + t.icon + '</div>' +
      '<h3>' + esc(t.title) + '</h3>' +
      '<p>' + esc(t.desc) + '</p>' +
      '<div class="more"><ul>' + t.topics.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + '</ul></div>' +
      '<span class="toggle">Show topics +</span>' +
      '</button>';
  }).join("");
  $$(".track", tracksGrid).forEach(function (card) {
    card.addEventListener("click", function () {
      var open = card.classList.toggle("open");
      card.setAttribute("aria-expanded", String(open));
      $(".toggle", card).textContent = open ? "Hide topics –" : "Show topics +";
    });
  });

  /* ---------- Events: search + filter ---------- */
  var grid = $("#events-grid");
  var searchInput = $("#event-search");
  var countEl = $("#event-count");
  var emptyEl = $("#events-empty");
  var filterBtns = $$("#event-filters .pill");
  var activeFilter = "all";
  var typeLabel = { workshop: "Workshop", hackathon: "Hackathon", talk: "Talk", studyjam: "Study Jam" };

  function fmtDate(iso) {
    var d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  }

  function renderEvents() {
    var q = searchInput.value.trim().toLowerCase();
    var list = DATA.events.filter(function (e) {
      var okType = activeFilter === "all" || e.type === activeFilter;
      var hay = (e.title + " " + e.desc + " " + e.venue + " " + typeLabel[e.type]).toLowerCase();
      return okType && (!q || hay.indexOf(q) !== -1);
    }).sort(function (a, b) {
      // upcoming first (soonest first), then past (latest first)
      if (a.status !== b.status) return a.status === "upcoming" ? -1 : 1;
      return a.status === "upcoming" ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date);
    });

    grid.innerHTML = list.map(function (e) {
      return '<article class="card event c-' + e.color + '">' +
        '<div class="event-top"></div><div class="event-body">' +
        '<span class="badge">' + esc(typeLabel[e.type]) + '</span>' +
        '<h3>' + esc(e.title) + '</h3><p>' + esc(e.desc) + '</p>' +
        '<div class="meta"><span>📅 ' + fmtDate(e.date) + '</span><span>🕒 ' + esc(e.time) + '</span><span>📍 ' + esc(e.venue) + '</span>' +
        '<span class="status">' + (e.status === "upcoming" ? "Upcoming" : "Completed") + '</span></div>' +
        '</div></article>';
    }).join("");

    countEl.textContent = list.length + (list.length === 1 ? " event" : " events") + " shown";
    emptyEl.hidden = list.length !== 0;
  }

  searchInput.addEventListener("input", renderEvents);
  filterBtns.forEach(function (b) {
    b.addEventListener("click", function () {
      activeFilter = b.dataset.filter;
      filterBtns.forEach(function (x) {
        var on = x === b;
        x.classList.toggle("is-active", on);
        x.setAttribute("aria-pressed", String(on));
      });
      renderEvents();
    });
  });
  renderEvents();

  /* ---------- Team ---------- */
  $("#team-grid").innerHTML = DATA.team.map(function (m) {
    var initials = m.name.split(" ").map(function (w) { return w[0]; }).join("").slice(0, 2).toUpperCase();
    return '<article class="card member c-' + m.color + ' reveal"><div class="avatar" aria-hidden="true">' + esc(initials) + '</div>' +
      '<h3>' + esc(m.name) + '</h3><p>' + esc(m.role) + '</p></article>';
  }).join("");

  /* ---------- Contact email from data ---------- */
  var emailLink = $("#contact-email");
  if (DATA.contactEmail) {
    emailLink.href = "mailto:" + DATA.contactEmail;
    emailLink.textContent = DATA.contactEmail;
  }

  /* ---------- Contact form (validation + mailto) ---------- */
  var form = $("#contact-form");
  var status = $("#form-status");
  function setErr(input, msg) {
    var field = input.closest(".field");
    field.classList.toggle("invalid", !!msg);
    $(".err", field).textContent = msg || "";
    input.setAttribute("aria-invalid", msg ? "true" : "false");
  }
  function validate() {
    var ok = true;
    var name = form.elements.name, email = form.elements.email, msg = form.elements.message;
    if (name.value.trim().length < 2) { setErr(name, "Please enter your name."); ok = false; } else setErr(name, "");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) { setErr(email, "Please enter a valid email."); ok = false; } else setErr(email, "");
    if (msg.value.trim().length < 10) { setErr(msg, "Message should be at least 10 characters."); ok = false; } else setErr(msg, "");
    return ok;
  }
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    status.textContent = "";
    if (!validate()) return;
    var subject = "[GDG RIT Hassan] " + form.elements.topic.value;
    var body = "Name: " + form.elements.name.value + "\nEmail: " + form.elements.email.value + "\n\n" + form.elements.message.value;
    window.location.href = "mailto:" + (DATA.contactEmail || "") + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    status.textContent = "Thanks! Your email app should open with the message ready to send.";
    form.reset();
  });

  /* ---------- Reveal on scroll ---------- */
  var revealEls = $$(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Animated counters ---------- */
  function runCounter(el) {
    var target = +el.dataset.count, suffix = el.dataset.suffix || "";
    if (reduceMotion) { el.textContent = target + suffix; return; }
    var start = null, dur = 1400;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var counters = $$("[data-count]");
  if ("IntersectionObserver" in window) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { runCounter(en.target); co.unobserve(en.target); } });
    }, { threshold: 0.6 });
    counters.forEach(function (c) { co.observe(c); });
  } else { counters.forEach(runCounter); }

  /* ---------- Hero particles (canvas) ---------- */
  var canvas = $("#particles");
  if (canvas && !reduceMotion) {
    var ctx = canvas.getContext("2d");
    var colors = ["#4285F4", "#EA4335", "#FBBC04", "#34A853"];
    var pts = [], W, H, raf, mouse = { x: -999, y: -999 };

    function resize() {
      var r = canvas.getBoundingClientRect();
      W = canvas.width = r.width; H = canvas.height = r.height;
      var n = Math.min(70, Math.floor(W / 18));
      pts = [];
      for (var i = 0; i < n; i++) {
        pts.push({ x: Math.random() * W, y: Math.random() * H, r: 2 + Math.random() * 3,
          vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5, c: colors[i % 4] });
      }
    }
    function draw() {
      ctx.clearRect(0, 0, W, H);
      pts.forEach(function (p) {
        var dx = p.x - mouse.x, dy = p.y - mouse.y, d = Math.sqrt(dx * dx + dy * dy);
        if (d < 110) { p.x += dx / d * 1.5; p.y += dy / d * 1.5; }
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        ctx.globalAlpha = 0.7;
        ctx.fillStyle = p.c;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      });
      ctx.globalAlpha = 0.12;
      ctx.strokeStyle = "#4285F4";
      for (var i = 0; i < pts.length; i++) {
        for (var j = i + 1; j < pts.length; j++) {
          var a = pts[i], b = pts[j], dx = a.x - b.x, dy = a.y - b.y;
          if (dx * dx + dy * dy < 120 * 120) { ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
        }
      }
      raf = requestAnimationFrame(draw);
    }
    resize(); draw();
    window.addEventListener("resize", resize);
    canvas.parentElement.parentElement.addEventListener("mousemove", function (e) {
      var r = canvas.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    });
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) cancelAnimationFrame(raf); else draw();
    });
  }

  /* ---------- Footer year ---------- */
  $("#year").textContent = new Date().getFullYear();
})();
