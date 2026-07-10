/* =========================================================
   THREETREES WEDDING — interactions
   ========================================================= */
(function () {
  'use strict';
  const reduced = matchMedia('(prefers-reduced-motion:reduce)').matches;
  const fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
  /* enable JS-driven reveal only when this script actually runs
     (if it fails/doesn't load, content stays visible instead of blank) */
  document.documentElement.classList.add('js');

  /* =======================================================
     CONFIG — nơi nhận lead
     Dán URL Google Apps Script (/exec) hoặc Formspree/Zapier.
     Để trống "" thì form vẫn chạy (chế độ demo, hiện màn hình cảm ơn).
     ======================================================= */
  const FORM_ENDPOINT = 'https://script.google.com/macros/s/AKfycbyQ4Mfgtwhjesrs0Z39zsgBYZ9CgrnbGdHe2Y9TTcUjDd2C8akJI8nOCIeA3JNIUH3X/exec';
  const CONTACT_PHONE = '0862760663';

  /* ---- ring data ---- */
  const RINGS = [
    {id:"memory-note", name:"Memory Note", metal:"Vàng trắng", essence:"Ký ức nhỏ, tình yêu lớn", img:"assets/rings/memory-note.jpg",
     desc:"Bề mặt có nhiều mặt cắt nhỏ, tạo hiệu ứng ánh sáng thay đổi khi đeo. Mẫu này hợp với cặp đôi thích chi tiết thủ công nhưng vẫn muốn dáng nhẫn gọn, dễ dùng hằng ngày."},
    {id:"imperfect-facets", name:"Imperfect Facets", metal:"Vàng hồng", essence:"Không hoàn hảo mà trọn vẹn", img:"assets/rings/imperfect-facets.jpg",
     desc:"Các mặt cắt bất đối xứng tạo cảm giác tự nhiên, không quá bóng bẩy. Phù hợp với người thích vàng hồng và muốn bề mặt nhẫn có dấu ấn riêng khi nhìn gần."},
    {id:"duong-van", name:"Đường Vân", metal:"Vàng vàng", essence:"Mọi hành trình đều hội tụ", img:"assets/rings/duong-van.jpg",
     desc:"Bề mặt được xử lý bằng các đường vân liên tiếp, tạo độ sâu mà vẫn giữ dáng nhẫn đơn giản. Đây là lựa chọn dễ đeo cho cặp đôi thích vàng vàng và chi tiết tinh tế."},
    {id:"red-field", name:"Red Field", metal:"Vàng hồng · Kim cương", essence:"Khác biệt được tôn vinh", img:"assets/rings/red-field.jpg",
     desc:"Hai chiếc nhẫn dùng cùng nền vàng hồng nhưng khác sắc thái qua kim cương trắng và kim cương đen. Mẫu này hợp với cặp đôi muốn có cá tính rõ nhưng vẫn nhìn cùng bộ."},
    {id:"the-bridge", name:"The Bridge", metal:"Vàng trắng", essence:"Nhịp cầu của sự đồng hành", img:"assets/rings/the-bridge.jpg",
     desc:"Thiết kế có các đường nối đều trên thân nhẫn, tạo điểm nhận diện vừa đủ. Phù hợp với người thích vàng trắng, dáng gọn và muốn đeo thoải mái lâu dài."},
    {id:"again-again", name:"Again & Again", metal:"Vàng hồng · Kim cương", essence:"Yêu thương lặp lại mỗi ngày", img:"assets/rings/again-again.jpg",
     desc:"Dải kim cương nhỏ chạy theo đường cong mềm, tạo cảm giác sáng nhưng không quá nặng. Mẫu này hợp với cô dâu thích sự nữ tính, nhẹ và dễ phối với nhẫn đính hôn."},
    {id:"chung-ta", name:"Chúng Ta Thuộc Về Nhau", metal:"Vàng trắng", essence:"Lời hứa chỉ hai người hiểu", img:"assets/rings/chung-ta.jpg",
     desc:"Bên ngoài tối giản, điểm nhấn nằm ở phần khắc bên trong thân nhẫn. Phù hợp với cặp đôi thích nhẫn cưới kín đáo, ít chi tiết bên ngoài nhưng có ý nghĩa riêng."},
    {id:"the-shape-of-us", name:"The Shape Of Us", metal:"Vàng trắng · Kim cương", essence:"Hai bản thể, một hành trình", img:"assets/rings/the-shape-of-us.jpg",
     desc:"Hai chiếc nhẫn giữ cùng ngôn ngữ thiết kế nhưng khác mức độ điểm đá và bề mặt. Phù hợp với cặp đôi muốn đồng bộ khi đeo cùng nhau mà không cần giống hệt."},
    {id:"loi-ve", name:"Lối Về", metal:"Vàng hồng 18K", essence:"Không giữ nhau, nhưng luôn có nhau", img:"assets/rings/loi-ve.jpg",
     desc:"Nhẫn nam tối giản với bề mặt xước mờ, nhẫn nữ nổi bật bằng chi tiết lá vàng hồng ôm kim cương. Mẫu này hợp với người thích vàng hồng, dáng mềm và cảm giác lãng mạn vừa đủ."}
  ];

  /* ---- loader ---- */
  const hideLoader = () => { const l = document.getElementById('loader'); if (l) l.classList.add('done'); };
  window.addEventListener('load', () => setTimeout(hideLoader, 500));
  setTimeout(hideLoader, 2200); // safety cap

  /* ---- nav scroll + progress ---- */
  const nav = document.getElementById('nav');
  const progress = document.getElementById('progress');
  const onScroll = () => {
    if (nav) nav.classList.toggle('scrolled', scrollY > 40);
    if (progress) {
      const h = document.documentElement.scrollHeight - innerHeight;
      progress.style.width = (h > 0 ? (scrollY / h) * 100 : 0) + '%';
    }
  };
  addEventListener('scroll', onScroll, { passive: true });

  /* ---- drawer ---- */
  const menuBtn = document.getElementById('menuBtn');
  const drawer = document.getElementById('drawer');
  if (menuBtn && drawer) {
    const firstDrawerLink = drawer.querySelector('a');
    const toggleDrawer = (open, returnFocus) => {
      menuBtn.classList.toggle('open', open);
      drawer.classList.toggle('open', open);
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      drawer.setAttribute('aria-hidden', open ? 'false' : 'true');
      document.body.style.overflow = open ? 'hidden' : '';
      if (open && firstDrawerLink) firstDrawerLink.focus();
      else if (!open && returnFocus) menuBtn.focus();
    };
    menuBtn.addEventListener('click', () => toggleDrawer(!drawer.classList.contains('open'), true));
    drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggleDrawer(false, false)));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && drawer.classList.contains('open')) toggleDrawer(false, true); });
  }

  /* ---- ring gallery render ---- */
  const selected = new Set();
  const grid = document.getElementById('ringGrid');
  /* Collection hiển thị đủ mẫu để người dùng so sánh và chọn nhanh trước khi gửi form. */
  const GRID_EXCLUDE = [];
  if (grid) {
    RINGS.filter(r => !GRID_EXCLUDE.includes(r.id)).forEach(r => {
      const card = document.createElement('div');
      card.className = 'ring-card';
      card.dataset.id = r.id;
      card.innerHTML =
        '<div class="ring-thumb">' +
          '<img src="' + r.img + '" alt="Nhẫn cưới ' + r.name + '" loading="lazy" />' +
        '</div>' +
        '<div class="ring-body">' +
          '<div class="meta">' + r.metal + '</div>' +
          '<h3>' + r.name + '</h3>' +
          '<div class="essence">' + r.essence + '</div>' +
          '<p>' + r.desc + '</p>' +
          '<button type="button" class="ring-select" aria-pressed="false"><span class="plus">+</span> <span class="lbl">Tư vấn</span></button>' +
        '</div>';
      card.addEventListener('click', () => toggle(r.id));
      grid.appendChild(card);
    });
  }

  /* ---- featured select buttons ---- */
  document.querySelectorAll('[data-add]').forEach(btn => {
    btn.addEventListener('click', (e) => { e.stopPropagation(); toggle(btn.dataset.add); });
  });

  function toggle(id) {
    const adding = !selected.has(id);
    adding ? selected.add(id) : selected.delete(id);
    syncAll();
    renderChips();
    if (adding) {
      const r = RINGS.find(x => x.id === id);
      showToast('Đã thêm <b>' + (r ? r.name : '') + '</b> vào buổi tư vấn');
    }
  }

  /* ---- toast ---- */
  let toastEl, toastT;
  function showToast(html) {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.className = 'toast';
      document.body.appendChild(toastEl);
    }
    toastEl.innerHTML = '<span class="tk">✦</span><span>' + html + '</span><a class="tgo" href="#form">Gửi tư vấn →</a>';
    toastEl.querySelector('.tgo').addEventListener('click', () => { clearTimeout(toastT); toastEl.classList.remove('show'); });
    requestAnimationFrame(() => toastEl.classList.add('show'));
    clearTimeout(toastT);
    toastT = setTimeout(() => toastEl.classList.remove('show'), 2600);
  }

  function syncAll() {
    RINGS.forEach(r => {
      const on = selected.has(r.id);
      const card = grid && grid.querySelector('[data-id="' + r.id + '"]');
      if (card) {
        card.classList.toggle('selected', on);
        const selectBtn = card.querySelector('.ring-select');
        card.querySelector('.lbl').textContent = on ? 'Đã chọn' : 'Tư vấn';
        card.querySelector('.plus').textContent = on ? '✓' : '+';
        if (selectBtn) selectBtn.setAttribute('aria-pressed', on ? 'true' : 'false');
      }
    });
    document.querySelectorAll('[data-add]').forEach(btn => {
      const on = selected.has(btn.dataset.add);
      btn.classList.toggle('on', on);
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
      const l = btn.querySelector('.l'); if (l) l.textContent = on ? 'Đã chọn' : 'Tư vấn mẫu này';
      const i = btn.querySelector('.i'); if (i) i.textContent = on ? '✓' : '+';
    });
  }

  function renderChips() {
    const chips = document.getElementById('chips');
    const empty = document.getElementById('chipsEmpty');
    if (!chips) return;
    chips.querySelectorAll('.chip').forEach(c => c.remove());
    if (selected.size === 0) { if (empty) empty.style.display = ''; }
    else {
      if (empty) empty.style.display = 'none';
      selected.forEach(id => {
        const r = RINGS.find(x => x.id === id);
        const chip = document.createElement('span');
        chip.className = 'chip';
        chip.innerHTML = r.name + ' <button type="button" aria-label="Bỏ chọn">×</button>';
        chip.querySelector('button').addEventListener('click', (e) => { e.stopPropagation(); toggle(id); });
        chips.appendChild(chip);
      });
    }
    const n = selected.size;
    chips.classList.toggle('has-selection', n > 0);
    const cc = document.getElementById('chipsCount'); if (cc) cc.textContent = n;
    const fn = document.getElementById('floatN'); if (fn) fn.textContent = n;
    const fr = document.getElementById('fRings'); if (fr) fr.value = [...selected].map(id => RINGS.find(x => x.id === id).name).join(', ');
    const fc = document.getElementById('floatCart'); if (fc) fc.classList.toggle('show', n > 0);
      const mb = document.getElementById('mbPrimary'); if (mb) { const s = mb.querySelector('span'); if (s) s.textContent = n ? 'Tư vấn ' + n + ' mẫu' : 'Nhận tư vấn'; }
  }

  /* ---- reveal (with graceful fallback) ---- */
  const rvEls = document.querySelectorAll('.rv');
  if (reduced || !('IntersectionObserver' in window)) {
    rvEls.forEach(el => el.classList.add('in'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          e.target.style.transitionDelay = Math.min(i * 60, 240) + 'ms';
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -6% 0px' });
    rvEls.forEach(el => io.observe(el));
    /* safety: reveal anything still hidden shortly after load */
    addEventListener('load', () => setTimeout(() => {
      rvEls.forEach(el => { const r = el.getBoundingClientRect(); if (r.top < innerHeight) el.classList.add('in'); });
    }, 600));
  }

  /* ---- counters ---- */
  const cio = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target, target = +el.dataset.count;
      if (reduced) { el.textContent = target; cio.unobserve(el); return; }
      let n = 0; const step = Math.max(1, Math.round(target / 30));
      const tick = () => { n = Math.min(target, n + step); el.textContent = n; if (n < target) requestAnimationFrame(tick); };
      tick(); cio.unobserve(el);
    });
  }, { threshold: 0.6 });
  document.querySelectorAll('[data-count]').forEach(c => cio.observe(c));

  /* ---- parallax ---- */
  const px = [...document.querySelectorAll('[data-parallax]')];
  if (px.length && !reduced && matchMedia('(min-width:761px)').matches) {
    let ticking = false;
    const update = () => {
      const vh = innerHeight;
      px.forEach(el => {
        const r = el.getBoundingClientRect();
        const center = r.top + r.height / 2;
        const off = (center - vh / 2) * parseFloat(el.dataset.parallax);
        el.style.transform = 'translate3d(0,' + off.toFixed(1) + 'px,0)';
      });
      ticking = false;
    };
    addEventListener('scroll', () => { if (!ticking) { requestAnimationFrame(update); ticking = true; } }, { passive: true });
    update();
  }

  /* ---- magnetic buttons ---- */
  if (fine && !reduced) {
    document.querySelectorAll('[data-magnetic]').forEach(btn => {
      const s = 0.26;
      let r = null;
      btn.addEventListener('mouseenter', () => { r = btn.getBoundingClientRect(); });
      btn.addEventListener('mousemove', (e) => {
        if (!r) r = btn.getBoundingClientRect();
        btn.style.transform = 'translate(' + ((e.clientX - r.left - r.width / 2) * s) + 'px,' + ((e.clientY - r.top - r.height / 2) * s) + 'px)';
      });
      btn.addEventListener('mouseleave', () => { btn.style.transform = ''; r = null; });
    });
  }

  /* ---- lead form ---- */
  const form = document.getElementById('leadForm');
  if (form) {
    form.addEventListener('focusin', () => document.body.classList.add('form-active'));
    form.addEventListener('focusout', () => {
      setTimeout(() => {
        if (!form.contains(document.activeElement)) document.body.classList.remove('form-active');
      }, 80);
    });

    function setFieldError(inputEl, errEl, message) {
      inputEl.classList.toggle('invalid', !!message);
      inputEl.setAttribute('aria-invalid', message ? 'true' : 'false');
      if (errEl) { errEl.textContent = message || ''; errEl.classList.toggle('show', !!message); }
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const nameEl = document.getElementById('fName');
      const phoneEl = document.getElementById('fPhone');
      const name = nameEl.value.trim();
      const phone = phoneEl.value.trim();
      const nameValid = !!name;
      const phoneValid = /^[0-9+\s().-]{8,}$/.test(phone);
      setFieldError(nameEl, document.getElementById('fNameErr'), nameValid ? '' : 'Vui lòng nhập họ và tên.');
      setFieldError(phoneEl, document.getElementById('fPhoneErr'), phoneValid ? '' : 'Số điện thoại chưa hợp lệ (tối thiểu 8 số).');
      if (!nameValid) { nameEl.focus(); return; }
      if (!phoneValid) { phoneEl.focus(); return; }

      const d = new FormData(form);
      d.set('selected_rings', document.getElementById('fRings').value);
      d.set('source', 'Landing Page - Facebook Ads');
      d.set('submitted_at', new Date().toISOString());

      const btn = document.getElementById('submitBtn');
      const span = btn.querySelector('span');
      const orig = span ? span.textContent : btn.textContent;
      if (span) span.textContent = 'Đang gửi…'; else btn.textContent = 'Đang gửi…';
      btn.disabled = true;

      const usable = /script\.google\.com/.test(FORM_ENDPOINT) || /formspree|zapier|make\.com|hooks/.test(FORM_ENDPOINT);
      try {
        if (usable) {
          const ctrl = new AbortController();
          const t = setTimeout(() => ctrl.abort(), 8000);
          await fetch(FORM_ENDPOINT, { method: 'POST', mode: 'no-cors', body: new URLSearchParams(d), signal: ctrl.signal });
          clearTimeout(t);
        }
        if (window.fbq) { fbq('track', 'Lead'); }
      } catch (err) { /* vẫn hiển thị cảm ơn để không mất khách, kể cả khi timeout */ }

      const wrapEl = document.getElementById('formInner');
      const n = selected.size;
      const nameShort = (name.trim().split(/\s+/).slice(-1)[0]) || name;
      wrapEl.innerHTML =
        '<div class="form-done">' +
          '<span class="fd-gem">◆</span>' +
          '<h3>Đã gửi yêu cầu</h3>' +
          '<p>Cảm ơn bạn. ThreeTrees Wedding sẽ liên hệ trong vòng 24 giờ để tư vấn mẫu và khoảng giá.</p>' +
        '</div>';
      const mt = document.getElementById('modalTitle');
      const mm = document.getElementById('modalMsg');
      if (mt) mt.textContent = 'Cảm ơn ' + nameShort;
      if (mm) mm.innerHTML = n
        ? 'ThreeTrees Wedding đã ghi nhận <b>' + n + ' mẫu</b> bạn quan tâm. Đội ngũ tư vấn sẽ liên hệ để gợi ý chất liệu, khoảng giá và lịch xem mẫu phù hợp.'
        : 'ThreeTrees Wedding đã nhận được thông tin của bạn. Đội ngũ tư vấn sẽ liên hệ trong vòng 24 giờ.';
      openModal();
    });
  }

  /* ---- thank-you modal ---- */
  let modalReturnFocus = null;
  function openModal() {
    const m = document.getElementById('thankModal');
    if (!m) return;
    modalReturnFocus = document.activeElement;
    m.classList.add('open'); m.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden';
    const closeBtn = m.querySelector('.modal-close');
    if (closeBtn) closeBtn.focus();
  }
  function closeModal() {
    const m = document.getElementById('thankModal');
    if (!m) return;
    m.classList.remove('open'); m.setAttribute('aria-hidden', 'true'); document.body.style.overflow = '';
    if (modalReturnFocus && modalReturnFocus.focus) modalReturnFocus.focus();
    modalReturnFocus = null;
  }
  document.querySelectorAll('#thankModal [data-close]').forEach(el => el.addEventListener('click', closeModal));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
})();
