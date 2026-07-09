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
     desc:"Bề mặt nhẫn được chế tác với những mặt cắt thủ công liên tiếp, mỗi mặt như một ký ức riêng biệt. Khi ánh sáng chuyển động, từng góc nhẫn phản chiếu một sắc độ khác nhau — như lời nhắc rằng tình yêu được tạo nên từ vô vàn điều bình dị mỗi ngày."},
    {id:"imperfect-facets", name:"Imperfect Facets", metal:"Vàng hồng", essence:"Không hoàn hảo mà trọn vẹn", img:"assets/rings/imperfect-facets.jpg",
     desc:"Không mối quan hệ nào chỉ có những ngày rực rỡ. Thiết kế sử dụng các mặt cắt bất đối xứng, để mỗi góc nhìn phản chiếu một sắc thái riêng của cảm xúc. Chính những điều không hoàn hảo ấy mới tạo nên một tình yêu trọn vẹn."},
    {id:"duong-van", name:"Đường Vân", metal:"Vàng vàng", essence:"Mọi hành trình đều hội tụ", img:"assets/rings/duong-van.jpg",
     desc:"Không phải hành trình nào cũng bằng phẳng. Bề mặt nhẫn được chạm khắc thủ công bằng những đường vân liên tiếp, mỗi đường cao thấp khác nhau nhưng cùng hội tụ trong một vòng tròn khép kín — như cách mọi trải nghiệm đều trở thành một phần của tình yêu."},
    {id:"red-field", name:"Red Field", metal:"Vàng hồng · Kim cương", essence:"Khác biệt được tôn vinh", img:"assets/rings/red-field.jpg",
     desc:"Hai chiếc nhẫn được chế tác từ cùng một khối vàng hồng, chung ngôn ngữ tạo hình nhưng mang hai sắc thái riêng qua chuỗi kim cương trắng và kim cương đen. Khác biệt không bị xóa bỏ, mà được tôn vinh như một phần tạo nên sự cân bằng."},
    {id:"the-bridge", name:"The Bridge", metal:"Vàng trắng", essence:"Nhịp cầu của sự đồng hành", img:"assets/rings/the-bridge.jpg",
     desc:"Lấy cảm hứng từ hình ảnh cây cầu — biểu tượng của sự kết nối — họa tiết trên thân nhẫn được chế tác như những mắt nối liên tiếp. Tình yêu bền vững không đến từ một khoảnh khắc lớn lao, mà từ vô vàn lần lựa chọn bước tiếp cùng nhau."},
    {id:"threetrees", name:"ThreeTrees", metal:"Vàng hồng · Kim cương", essence:"Không giống nhau, thuộc về nhau", img:"assets/rings/threetrees.jpg",
     desc:"Cặp nhẫn với hai ngôn ngữ thiết kế khác biệt: một chiếc nở rộ bởi những viên đá như vòng hoa khoe sắc, chiếc còn lại tối giản và vững chãi. Có người rực rỡ như cánh hoa, có người lặng lẽ như mảnh đất — không giống nhau nhưng thuộc về nhau."},
    {id:"again-again", name:"Again & Again", metal:"Vàng hồng · Kim cương", essence:"Yêu thương lặp lại mỗi ngày", img:"assets/rings/again-again.jpg",
     desc:"Again & Again được tạo nên với dải kim cương nhỏ nối tiếp theo đường cong mềm mại, tượng trưng cho những yêu thương âm thầm nhưng bền bỉ. Hạnh phúc không đến từ một khoảnh khắc, mà từ những điều giản dị được nuôi dưỡng mỗi ngày."},
    {id:"chung-ta", name:"Chúng Ta Thuộc Về Nhau", metal:"Vàng trắng", essence:"Lời hứa chỉ hai người hiểu", img:"assets/rings/chung-ta.jpg",
     desc:"Một cặp nhẫn với vẻ ngoài tối giản, ẩn chứa bên trong một lời hứa. Những dòng chữ khắc bên trong không dành cho thế giới nhìn thấy — chúng chỉ tồn tại cho hai người, mỗi lần nhìn nhẫn là một lần nhớ về lý do đã chọn nhau."},
    {id:"the-shape-of-us", name:"The Shape Of Us", metal:"Vàng trắng · Kim cương", essence:"Hai bản thể, một hành trình", img:"assets/rings/the-shape-of-us.jpg",
     desc:"Cùng ngôn ngữ thiết kế tổng thể nhưng khác nhau ở chi tiết — một chiếc giữ vẻ đẹp tối giản của kim loại, chiếc còn lại điểm xuyết kim cương trên chính những đường nét ấy. Kể cả khi hai tâm hồn trở thành một, mỗi người vẫn tỏa sáng theo cách riêng."}
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
    const toggleDrawer = (open) => {
      menuBtn.classList.toggle('open', open);
      drawer.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    };
    menuBtn.addEventListener('click', () => toggleDrawer(!drawer.classList.contains('open')));
    drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggleDrawer(false)));
  }

  /* ---- ring gallery render ---- */
  const selected = new Set();
  const grid = document.getElementById('ringGrid');
  if (grid) {
    RINGS.forEach(r => {
      const card = document.createElement('div');
      card.className = 'ring-card';
      card.dataset.id = r.id;
      card.innerHTML =
        '<div class="ring-thumb">' +
          '<span class="ring-tag">' + r.metal + '</span>' +
          '<img src="' + r.img + '" alt="Nhẫn cưới ' + r.name + '" loading="lazy" />' +
        '</div>' +
        '<div class="ring-body">' +
          '<div class="meta">' + r.metal + '</div>' +
          '<h3>' + r.name + '</h3>' +
          '<div class="essence">' + r.essence + '</div>' +
          '<p>' + r.desc + '</p>' +
          '<button type="button" class="ring-select"><span class="plus">+</span> <span class="lbl">Thêm vào buổi tư vấn</span></button>' +
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
    toastEl.innerHTML = '<span class="tk">✦</span><span>' + html + '</span><a class="tgo" href="#form">Xem →</a>';
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
        card.querySelector('.lbl').textContent = on ? 'Đã thêm' : 'Thêm vào buổi tư vấn';
        card.querySelector('.plus').textContent = on ? '✓' : '+';
      }
    });
    document.querySelectorAll('[data-add]').forEach(btn => {
      const on = selected.has(btn.dataset.add);
      btn.classList.toggle('on', on);
      const l = btn.querySelector('.l'); if (l) l.textContent = on ? 'Đã thêm' : 'Thêm vào buổi tư vấn';
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
    const cc = document.getElementById('chipsCount'); if (cc) cc.textContent = n;
    const fn = document.getElementById('floatN'); if (fn) fn.textContent = n;
    const fr = document.getElementById('fRings'); if (fr) fr.value = [...selected].map(id => RINGS.find(x => x.id === id).name).join(', ');
    const fc = document.getElementById('floatCart'); if (fc) fc.classList.toggle('show', n > 0);
    const mb = document.getElementById('mbPrimary'); if (mb) { const s = mb.querySelector('span'); if (s) s.textContent = n ? 'Đặt lịch (' + n + ' mẫu)' : 'Đặt lịch tư vấn'; }
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

  /* ---- cursor ---- */
  if (fine && !reduced) {
    const ring = document.getElementById('cursor');
    const dot = document.getElementById('cursorDot');
    if (ring && dot) {
      let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
      addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; dot.style.transform = 'translate(' + mx + 'px,' + my + 'px)'; });
      const loop = () => { rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16; ring.style.transform = 'translate(' + rx + 'px,' + ry + 'px)'; requestAnimationFrame(loop); };
      loop();
      const bind = () => document.querySelectorAll('a,button,[data-cursor],.ring-card').forEach(el => {
        if (el._cur) return; el._cur = 1;
        el.addEventListener('mouseenter', () => ring.classList.add('hover'));
        el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
      });
      bind(); setTimeout(bind, 500);
    }
  }

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
      btn.addEventListener('mousemove', (e) => {
        const r = btn.getBoundingClientRect();
        btn.style.transform = 'translate(' + ((e.clientX - r.left - r.width / 2) * s) + 'px,' + ((e.clientY - r.top - r.height / 2) * s) + 'px)';
      });
      btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    });
  }

  /* ---- lead form ---- */
  const form = document.getElementById('leadForm');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('fName').value.trim();
      const phone = document.getElementById('fPhone').value.trim();
      if (!name) { document.getElementById('fName').focus(); return; }
      if (!/^[0-9+\s().-]{8,}$/.test(phone)) { document.getElementById('fPhone').focus(); return; }

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
          await fetch(FORM_ENDPOINT, { method: 'POST', mode: 'no-cors', body: new URLSearchParams(d) });
        }
        if (window.fbq) { fbq('track', 'Lead'); }
      } catch (err) { /* vẫn hiển thị cảm ơn để không mất khách */ }

      const wrapEl = document.getElementById('formInner');
      const n = selected.size;
      const nameShort = (name.trim().split(/\s+/).slice(-1)[0]) || name;
      wrapEl.innerHTML =
        '<div class="form-done">' +
          '<span class="fd-gem">◆</span>' +
          '<h3>Đã gửi yêu cầu</h3>' +
          '<p>Cảm ơn bạn. Chuyên gia ThreeTrees Wedding sẽ liên hệ trong vòng 24 giờ.</p>' +
        '</div>';
      const mt = document.getElementById('modalTitle');
      const mm = document.getElementById('modalMsg');
      if (mt) mt.textContent = 'Cảm ơn ' + nameShort;
      if (mm) mm.innerHTML = n
        ? 'ThreeTrees Wedding đã ghi nhận <b>' + n + ' mẫu</b> bạn quan tâm. Chuyên gia của Maison sẽ liên hệ tư vấn & báo giá riêng cho bạn trong vòng 24 giờ.'
        : 'ThreeTrees Wedding đã nhận được thông tin của bạn. Chuyên gia của Maison sẽ liên hệ tư vấn trong vòng 24 giờ.';
      openModal();
    });
  }

  /* ---- thank-you modal ---- */
  function openModal() {
    const m = document.getElementById('thankModal');
    if (!m) return;
    m.classList.add('open'); m.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    const m = document.getElementById('thankModal');
    if (!m) return;
    m.classList.remove('open'); m.setAttribute('aria-hidden', 'true'); document.body.style.overflow = '';
  }
  document.querySelectorAll('#thankModal [data-close]').forEach(el => el.addEventListener('click', closeModal));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

  /* ---- quiz: gợi ý mẫu theo câu chuyện ---- */
  const RING_TAGS = {
    'memory-note':      { style: 'toi-gian', metal: 'trang', value: 'binh-di' },
    'imperfect-facets': { style: 'hien-dai', metal: 'hong',  value: 'ca-tinh' },
    'duong-van':        { style: 'co-dien',  metal: 'vang',  value: 'ben-vung' },
    'red-field':        { style: 'hien-dai', metal: 'hong',  value: 'ca-tinh' },
    'the-bridge':       { style: 'co-dien',  metal: 'trang', value: 'ben-vung' },
    'threetrees':       { style: 'hien-dai', metal: 'hong',  value: 'ca-tinh' },
    'again-again':      { style: 'toi-gian', metal: 'hong',  value: 'binh-di' },
    'chung-ta':         { style: 'toi-gian', metal: 'trang', value: 'ben-vung' },
    'the-shape-of-us':  { style: 'hien-dai', metal: 'trang', value: 'ca-tinh' }
  };
  const quizCard = document.querySelector('.quiz-card');
  if (quizCard) {
    const answers = {};
    quizCard.querySelectorAll('.quiz-q').forEach(q => {
      q.querySelectorAll('.quiz-opts button').forEach(b => {
        b.addEventListener('click', () => {
          q.querySelectorAll('.quiz-opts button').forEach(x => x.classList.remove('on'));
          b.classList.add('on');
          answers[q.dataset.q] = b.dataset.v;
          document.getElementById('quizSubmit').disabled = Object.keys(answers).length < 3;
        });
      });
    });
    document.getElementById('quizSubmit').addEventListener('click', () => {
      const scored = RINGS.map(r => {
        const t = RING_TAGS[r.id] || {};
        let s = 0;
        if (t.style === answers.style) s += 2;
        if (t.metal === answers.metal) s += 2;
        if (t.value === answers.value) s += 1;
        return { r, s };
      }).sort((a, b) => b.s - a.s).slice(0, 3);
      const res = document.getElementById('quizResult');
      res.innerHTML =
        '<span class="qr-eyebrow">Dựa trên câu trả lời của hai bạn</span>' +
        '<div class="qr-head">Gợi ý dành riêng cho hai bạn</div>' +
        '<div class="qr-grid">' + scored.map((o, i) =>
          '<div class="qr-item' + (i === 0 ? ' best' : '') + '">' +
            '<div class="qr-img">' +
              (i === 0 ? '<span class="qr-best">★ Phù hợp nhất</span>' : '') +
              '<span class="qr-tag">' + o.r.metal + '</span>' +
              '<img src="' + o.r.img + '" alt="Nhẫn ' + o.r.name + '" loading="lazy" />' +
            '</div>' +
            '<div class="qr-info">' +
              '<span class="qr-no">Gợi ý 0' + (i + 1) + '</span>' +
              '<b>' + o.r.name + '</b>' +
              '<span class="qr-essence">' + o.r.essence + '</span>' +
              '<p class="qr-desc">' + o.r.desc + '</p>' +
              '<button type="button" class="qr-add" data-add="' + o.r.id + '"><span class="i">+</span> <span class="l">Thêm vào buổi tư vấn</span></button>' +
            '</div>' +
          '</div>').join('') + '</div>' +
        '<div class="qr-hint">← Vuốt để xem các mẫu khác →</div>' +
        '<a href="#collection" class="qr-all">Xem toàn bộ bộ sưu tập →</a>';
      res.classList.add('show');
      res.querySelectorAll('[data-add]').forEach(btn => btn.addEventListener('click', (e) => { e.stopPropagation(); toggle(btn.dataset.add); }));
      syncAll();
      res.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }
})();
