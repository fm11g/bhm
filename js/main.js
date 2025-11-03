/* main.js — #lgStylerHero 배경 슬라이더 + 카운터(재실행) 초기화 */
(function () {
  'use strict';

  /** 유틸: 숫자 포맷 (compact: 한국어 '만' 축약 / plain: 콤마) */
  function formatNumber(n, mode) {
    if (mode === 'compact') {
      if (n >= 10000) {
        const man = Math.round(n / 10000);
        return man + '만';
      }
      return n.toLocaleString();
    }
    return n.toLocaleString(); // plain
  }

  /** 유틸: 이징 */
  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  /** 배경 이미지 프리로드 */
  function preloadImages(arr) {
    arr.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }

  /** 배경 슬라이더 초기화 */
  function initHeroSlider(root) {
    try {
      const deck = root.querySelector('.bg-deck');
      if (!deck) return;

      // 데이터 속성으로 이미지 배열을 받을 수도 있음: data-images="a.jpg,b.jpg,c.jpg"
      const dataImgs = root.getAttribute('data-images');
      const images = (dataImgs && dataImgs.split(',').map(s => s.trim()).filter(Boolean)) || [
        './img/2-1.jpg',
        './img/2-2.jpg',
        './img/2-3.jpg',
      ];

      const css = getComputedStyle(root);
      const interval = parseInt(css.getPropertyValue('--interval')) || 3800;
      const fade = parseInt(css.getPropertyValue('--fade-duration')) || 900;

      // 슬라이드 생성
      const slides = images.map(src => {
        const el = document.createElement('div');
        el.className = 'bg-slide';
        el.style.backgroundImage = `url("${src}")`;
        deck.appendChild(el);
        return el;
      });

      if (!slides.length) return;

      let curr = 0;
      slides[curr].classList.add('active'); // 첫 장 활성화

      function crossfade(next) {
        if (next === curr) return;

        const prevEl = slides[curr];
        const nextEl = slides[next];

        // 나가는 슬라이드: 현재 transform 유지 + 페이드아웃만
        if (prevEl) {
          const computed = getComputedStyle(prevEl).transform;
          prevEl.style.transform = (computed && computed !== 'none') ? computed : 'scale(1.08)';
          prevEl.style.animation = 'none';
          prevEl.classList.remove('active');
          prevEl.classList.add('leaving');

          setTimeout(() => {
            prevEl.classList.remove('leaving');
            prevEl.style.transform = '';
            prevEl.style.animation = '';
          }, fade + 60);
        }

        // 들어오는 슬라이드
        nextEl.classList.remove('leaving'); // 혹시나 붙어있다면 제거
        // reflow로 애니메이션 재시작 보장
        void nextEl.offsetWidth;
        nextEl.classList.add('active');

        curr = next;
      }

      // 순환 재생
      const loop = setInterval(() => {
        const next = (curr + 1) % slides.length;
        crossfade(next);
      }, interval);

      // 프리로드
      preloadImages(images);

      // 정리 함수(선택)
      root.__lgStylerHeroDestroySlider = () => clearInterval(loop);
    } catch (err) {
      console.warn('[lgStylerHero] slider init error:', err);
    }
  }

  /** 숫자 카운터 초기화 (가시영역 재등장 시 재실행) */
  function initHeroCounters(root) {
    try {
      const counters = Array.from(root.querySelectorAll('.count'));
      if (!counters.length) return;

      const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      function runCount(el) {
        const target = parseInt(el.dataset.target, 10) || 0;
        const dur = parseInt(el.dataset.duration, 10) || 1200;
        const mode = el.dataset.format || 'plain';

        if (prefersReduce) {
          el.textContent = formatNumber(target, mode);
          return;
        }

        const start = performance.now();
        const startVal = 0;

        function tick(now) {
          const t = Math.min(1, (now - start) / dur);
          const eased = easeOutCubic(t);
          const curr = Math.round(startVal + (target - startVal) * eased);
          el.textContent = formatNumber(curr, mode);
          if (t < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      }

      function resetCount(el) {
        const mode = el.dataset.format || 'plain';
        el.textContent = formatNumber(0, mode);
      }

      let ran = false;

      // 루트 섹션 가시성 기준으로 실행/리셋
      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.target !== root) return;
          if (entry.isIntersecting) {
            counters.forEach(runCount);
            ran = true;
          } else if (ran) {
            counters.forEach(resetCount);
            ran = false;
          }
        });
      }, { threshold: [0, 0.35, 0.6] });

      io.observe(root);

      // 정리 함수(선택)
      root.__lgStylerHeroDisconnectCounters = () => io.disconnect();
    } catch (err) {
      console.warn('[lgStylerHero] counters init error:', err);
    }
  }

  /** 초기화 엔트리 */
  function initAll() {
    const heroes = document.querySelectorAll('#lgStylerHero');
    heroes.forEach(root => {
      initHeroSlider(root);
      initHeroCounters(root);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll, { once: true });
  } else {
    initAll();
  }
})();


/* ./js/main.js — 모든 인라인 스크립트 통합 */
(() => {
  'use strict';

  /* ------------------------------ 공통 유틸 ------------------------------ */
  const onReady = (fn) =>
    (document.readyState === 'loading')
      ? document.addEventListener('DOMContentLoaded', fn, { once: true })
      : fn();

  const prefersReduce = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

  /* 숫자 포맷 (compact: 한국어 '만' 축약 / plain: 콤마) */
  function formatNumber(n, mode) {
    if (mode === 'compact') {
      if (n >= 10000) {
        const man = Math.round(n / 10000);
        return man + '만';
      }
      return n.toLocaleString();
    }
    return n.toLocaleString();
  }

  const preloadImages = (arr) => arr.forEach(src => { const img = new Image(); img.src = src; });

  /* ------------------------------ 1) #lgStylerHero 배경 슬라이더 ------------------------------ */
  function initHeroSlider() {
    const root = document.getElementById('lgStylerHero');
    if (!root) return;

    const deck = root.querySelector('.bg-deck');
    if (!deck) return;

    // data-images="a.jpg,b.jpg" 지원 (없으면 기본값)
    const dataImgs = root.getAttribute('data-images');
    const images = (dataImgs && dataImgs.split(',').map(s => s.trim()).filter(Boolean)) || [
       './img/2-1.jpg',
        './img/2-2.jpg',
        './img/2-3.jpg',
    ];

    const css = getComputedStyle(root);
    const interval = parseInt(css.getPropertyValue('--interval')) || 3800;
    const fade = parseInt(css.getPropertyValue('--fade-duration')) || 900;

    const slides = images.map(src => {
      const el = document.createElement('div');
      el.className = 'bg-slide';
      el.style.backgroundImage = `url("${src}")`;
      deck.appendChild(el);
      return el;
    });
    if (!slides.length) return;

    let curr = 0;
    slides[curr].classList.add('active');

    function crossfade(next) {
      if (next === curr) return;
      const prevEl = slides[curr];
      const nextEl = slides[next];

      if (prevEl) {
        const computed = getComputedStyle(prevEl).transform;
        prevEl.style.transform = (computed && computed !== 'none') ? computed : 'scale(1.08)';
        prevEl.style.animation = 'none';
        prevEl.classList.remove('active');
        prevEl.classList.add('leaving');
        setTimeout(() => {
          prevEl.classList.remove('leaving');
          prevEl.style.transform = '';
          prevEl.style.animation = '';
        }, fade + 60);
      }
      nextEl.classList.remove('leaving');
      void nextEl.offsetWidth; // reflow
      nextEl.classList.add('active');
      curr = next;
    }

    setInterval(() => {
      const next = (curr + 1) % slides.length;
      crossfade(next);
    }, interval);

    preloadImages(images);
  }

  /* ------------------------------ 2) #lgStylerHero 숫자 카운터(재실행) ------------------------------ */
  function initHeroCounters() {
    const root = document.getElementById('lgStylerHero');
    if (!root) return;

    const counters = Array.from(root.querySelectorAll('.count'));
    if (!counters.length) return;

    function runCount(el) {
      const target = parseInt(el.dataset.target, 10) || 0;
      const dur = parseInt(el.dataset.duration, 10) || 1200;
      const mode = el.dataset.format || 'plain';

      if (prefersReduce()) {
        el.textContent = formatNumber(target, mode);
        return;
      }

      const start = performance.now();
      const startVal = 0;
      function tick(now) {
        const t = Math.min(1, (now - start) / dur);
        const eased = easeOutCubic(t);
        const curr = Math.round(startVal + (target - startVal) * eased);
        el.textContent = formatNumber(curr, mode);
        if (t < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }

    function resetCount(el) {
      const mode = el.dataset.format || 'plain';
      el.textContent = formatNumber(0, mode);
    }

    let ran = false;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.target !== root) return;
        if (entry.isIntersecting) {
          counters.forEach(runCount);
          ran = true;
        } else if (ran) {
          counters.forEach(resetCount);
          ran = false;
        }
      });
    }, { threshold: [0, 0.35, 0.6] });

    io.observe(root);
  }

  /* ------------------------------ 3) <title>/<meta>의 "월" 자동 최신화 ------------------------------ */
  function initHeadMonthReplace() {
    const monthText = (new Date().getMonth() + 1) + '월';
    const selectors = [
      "title",
      "meta[name='description']",
      "meta[name='keywords']",
      "meta[property='og:title']",
      "meta[property='og:description']"
    ];
    selectors.forEach(sel => {
      const el = document.querySelector(sel);
      if (!el) return;
      if (el.tagName.toLowerCase() === 'title') {
        el.textContent = el.textContent.replace(/\d{1,2}월/g, monthText);
      } else {
        const content = el.getAttribute('content');
        if (content) el.setAttribute('content', content.replace(/\d{1,2}월/g, monthText));
      }
    });
  }

  /* ------------------------------ 4) 알림/카운트다운/롤링/Topbar ------------------------------ */
  function initAlertBoard() {
    const todayEl = document.getElementById('todayDate');
    if (todayEl) {
      const now = new Date();
      todayEl.textContent = `${now.getFullYear()}년 ${now.getMonth() + 1}월 ${now.getDate()}일 기준`;
    }

    // 카운트다운
    const $H = document.getElementById('al_hh'),
          $M = document.getElementById('al_mm'),
          $S = document.getElementById('al_ss');
    if ($H && $M && $S) {
      function getDailyDeadline() {
        const now = new Date();
        const end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
        if (now.getTime() > end.getTime()) {
          const t = new Date(now.getTime() + 24 * 60 * 60 * 1000);
          return new Date(t.getFullYear(), t.getMonth(), t.getDate(), 23, 59, 59, 999);
        }
        return end;
      }
      function pad2(n) { return String(n).padStart(2, '0'); }
      function scheduleReloadAtMidnight() {
        const now = new Date();
        const auto = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 1, 0);
        const ms = auto.getTime() - now.getTime();
        if (ms > 0) setTimeout(() => location.reload(), ms);
      }
      let deadline = getDailyDeadline();
      scheduleReloadAtMidnight();
      function tick() {
        const diff = deadline.getTime() - Date.now();
        if (diff <= 0) { $H.textContent = $M.textContent = $S.textContent = '00'; return; }
        const h = Math.floor(diff / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);
        $H.textContent = pad2(h); $M.textContent = pad2(m); $S.textContent = pad2(s);
      }
      tick(); setInterval(tick, 1000);
    }

    // 롤링 리스트
    const track = document.getElementById('al_track');
    if (track) {
      const phones = [
        '010-33**-****','010-64**-****','010-72**-****','010-30**-****','010-67**-****',
        '010-51**-****','010-92**-****','010-44**-****','010-18**-****','010-79**-****',
        '010-83**-****','010-25**-****','010-36**-****','010-58**-****','010-11**-****',
        '010-93**-****','010-27**-****','010-71**-****','010-15**-****','010-48**-****',
        '010-62**-****','010-14**-****','010-95**-****','010-24**-****','010-86**-****',
        '010-03**-****','010-59**-****','010-77**-****','010-05**-****','010-88**-****'
      ];
      const names = [
        '김*수','이*수','박*현','최*윤','정*호','한*연','윤*후','장*늘','오*준','강*호',
        '조*정','배*인','권*온','문*준','서*안','신*린','노*윤','임*우','홍*아','안*준',
        '곽*율','표*원','설*윤','고*윤','하*우','심*우','송*유','유*린','전*윤','백*진'
      ];
      const products = [
        '[LG] 식기 세척기','[애플] 맥북 에어 15 노트북','[LG] 75인치 QNED TV+제습기',
        '[삼성] 갤럭시북5 프로 360','[LG] 그램 17형 노트북','[애플] iPad Air + 펜슬',
        '[MSI] 게이밍 노트북 GF76','[삼성] 비스포크 제트 청소기','[LG] 오브제 냉장고',
        '[삼성] 75인치 QLED TV','[애플] 맥북 프로 14','[LG] 코드제로 A9S',
        '[삼성] 갤럭시탭 S9','[LG] 워시타워 오브제','[애플] 아이폰 15 프로',
        '[삼성] 갤럭시 S24','[LG] 스탠바이미 TV','[삼성] 건조기 그랑데','[LG] 스타일러',
        '[애플] 에어팟 프로2'
      ];
      for (let i = 0; i < 30; i++) {
        const row = document.createElement('div');
        row.className = 'row';
        row.innerHTML = `
          <div class="phone">${phones[i % phones.length]}</div>
          <div class="name">${names[i % names.length]}</div>
          <div class="prod">${products[i % products.length]}</div>
          <div><span class="btn">접수중</span></div>
        `;
        track.appendChild(row);
      }
      track.innerHTML += track.innerHTML;

      const ROW_H = 52, TOTAL = 30, MOVE_MS = 600, PAUSE_MS = 1600;
      let index = 0, timer = null;
      function stepOnce() {
        index++;
        const y = -index * ROW_H;
        track.style.transition = `transform ${MOVE_MS}ms ease`;
        track.style.transform = `translateY(${y}px)`;
        clearTimeout(timer);
        timer = setTimeout(() => {
          if (index >= TOTAL) {
            index = 0;
            track.style.transition = 'none';
            track.style.transform = 'translateY(0)';
            void track.offsetHeight;
          }
          timer = setTimeout(stepOnce, PAUSE_MS);
        }, MOVE_MS);
      }
      timer = setTimeout(stepOnce, PAUSE_MS);
    }

    // 상단 고정 Topbar & CTA
    const section = document.getElementById('applyListSection');
    const topbar = document.getElementById('al_topbar');
    const cta = document.getElementById('applyStickyBtn');
    if (section && topbar && cta) {
      const sentinel = section.querySelector('.topbar-sentinel') || section;
      let sentinelVisible = true;
      const thresholdPx = () => Math.max(1, Math.round(window.innerHeight * 0.01));
      const isScrolledPast = () => (window.scrollY || window.pageYOffset) > thresholdPx();

      function updateFixed() {
        if (!sentinelVisible && isScrolledPast()) topbar.classList.add('is-fixed');
        else topbar.classList.remove('is-fixed');
      }

      const io = new IntersectionObserver((entries) => {
        sentinelVisible = entries[0].isIntersecting;
        updateFixed();
      }, { root: null, threshold: 0 });
      io.observe(sentinel);

      window.addEventListener('scroll', updateFixed, { passive: true });
      window.addEventListener('resize', updateFixed, { passive: true });

      const smoothToForm = () => {
        const target = document.getElementById('form1');
        if (!target) { console.warn('#form1 요소를 찾을 수 없습니다.'); return; }
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      };

      cta.addEventListener('click', (e) => { e.preventDefault(); smoothToForm(); }, { passive: false });
      cta.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); smoothToForm(); }
      });
      topbar.addEventListener('click', (e) => {
        if (topbar.classList.contains('is-fixed')) { e.preventDefault(); smoothToForm(); }
      });
    }
  }

  /* ------------------------------ 5) #eventList1 리스트 순차 강조 ------------------------------ */
  function initEventList1Rotation() {
    const items = document.querySelectorAll('#eventList1 .item');
    if (!items.length) return;
    let idx = -1;
    setInterval(() => {
      items.forEach(i => i.classList.remove('active'));
      idx = (idx + 1) % items.length;
      items[idx].classList.add('active');
    }, 2200);
  }

  /* ------------------------------ 6) 형광펜 밑줄 하이라이트 (멀티라인 대응, 공용) ------------------------------ */
  function initMarkers(scopeSel) {
    const scope = document.querySelector(scopeSel);
    if (!scope) return;
    const targets = scope.querySelectorAll('[data-marker]');
    if (!targets.length) return;

    if (!('IntersectionObserver' in window)) {
      targets.forEach(el => el.classList.add('on'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const el = entry.target;
        if (entry.isIntersecting) el.classList.add('on');
        else el.classList.remove('on');
      });
    }, { threshold: 0.35 });
    targets.forEach(el => io.observe(el));
  }

  /* ------------------------------ 7) #kakaoProofWall 무한 롤러 ------------------------------ */
  function initKakaoProofWall() {
    const root = document.querySelector('#kakaoProofWall');
    if (!root) return;

    root.querySelectorAll('.col').forEach(col => {
      const delay = -(1 + Math.random() * 2).toFixed(2) + 's';
      col.style.setProperty('--start-offset', delay);
    });

    root.querySelectorAll('.track[data-dup="true"]').forEach(track => {
      const clones = track.cloneNode(true);
      clones.removeAttribute('data-dup');
      track.parentNode.appendChild(clones);
    });

    root.querySelectorAll('.col').forEach(col => {
      const setState = (state) => col.querySelectorAll('.track').forEach(t => t.style.animationPlayState = state);
      col.addEventListener('mouseenter', () => setState('paused'));
      col.addEventListener('mouseleave', () => setState('running'));
    });

    const debounce = (fn, ms = 120) => { let id; return (...args) => { clearTimeout(id); id = setTimeout(() => fn(...args), ms); }; };
    root.querySelectorAll('.col').forEach(col => {
      const tracks = col.querySelectorAll('.track');
      const pause = () => tracks.forEach(t => t.style.animationPlayState = 'paused');
      const resume = debounce(() => tracks.forEach(t => t.style.animationPlayState = 'running'), 140);

      col.addEventListener('touchstart', pause, { passive: true });
      col.addEventListener('touchmove', pause, { passive: true });
      col.addEventListener('touchend', resume, { passive: true });
      col.addEventListener('touchcancel', resume, { passive: true });
      col.addEventListener('wheel', () => { pause(); resume(); }, { passive: true });
    });

    const ensureRunning = () => {
      const tracks = root.querySelectorAll('.track');
      tracks.forEach(t => t.style.animationPlayState = 'running');
    };
    requestAnimationFrame(() => requestAnimationFrame(ensureRunning));
    void root.offsetHeight;
  }

  /* ------------------------------ 8) #mosaicGalleryLite 라이트박스 + 리빌 + 마지막 줄 정렬 ------------------------------ */
  function initMosaicGalleryLite() {
    const scope = document.querySelector('#mosaicGalleryLite');
    if (!scope) return;

    /* Lightbox */
    (function () {
      const cards = Array.from(scope.querySelectorAll('.image_container'));
      const lb = scope.querySelector('[data-lightbox]');
      if (!lb || !cards.length) return;

      const dialog = lb.querySelector('.lb-dialog');
      const imgEl = lb.querySelector('.lb-img');
      const nameEl = lb.querySelector('.lb-name');
      const ratingEl = lb.querySelector('.lb-rating');
      const reviewEl = lb.querySelector('.lb-review');
      const btnPrev = lb.querySelector('.lb-prev');
      const btnNext = lb.querySelector('.lb-next');
      const btnClose = lb.querySelector('.lb-x');
      const btnCloseFixed = lb.querySelector('.lb-x-fixed');
      const swipeArea = lb.querySelector('[data-swipe-area]');

      const items = cards.map((card, idx) => ({
        idx,
        src: card.querySelector('img')?.getAttribute('src'),
        alt: card.querySelector('img')?.getAttribute('alt') || '고객 후기 이미지',
        name: card.dataset.name || '고객',
        rating: parseFloat(card.dataset.rating || '5'),
        review: card.dataset.review || ''
      }));
      let current = 0;
      function stars(n) {
        const pct = Math.max(0, Math.min(100, (n / 5) * 100));
        return `<span class="stars" style="--w:${pct}%;" aria-hidden="true"></span><span class="rating-num">(${n.toFixed(1)})</span>`;
      }
      function render(index) { const it = items[index]; current = index; imgEl.src = it.src; imgEl.alt = it.alt; nameEl.textContent = it.name; ratingEl.innerHTML = stars(it.rating); reviewEl.textContent = it.review; }
      function open(i) { render(i); lb.classList.add('show'); const preferFixed = window.matchMedia('(max-width: 720px)').matches; setTimeout(() => (preferFixed ? btnCloseFixed : btnNext).focus(), 0); document.documentElement.style.overflow = 'hidden'; }
      function close() { lb.classList.remove('show'); document.documentElement.style.overflow = ''; }
      function prev() { render((current - 1 + items.length) % items.length); }
      function next() { render((current + 1) % items.length); }
      cards.forEach((c, i) => c.addEventListener('click', () => open(i), { passive: true }));
      btnPrev?.addEventListener('click', prev);
      btnNext?.addEventListener('click', next);
      btnClose?.addEventListener('click', close);
      btnCloseFixed?.addEventListener('click', close);
      document.addEventListener('keydown', (e) => { if (!lb.classList.contains('show')) return; if (e.key === 'Escape') close(); if (e.key === 'ArrowLeft') prev(); if (e.key === 'ArrowRight') next(); });
      lb.addEventListener('click', (e) => { if (!dialog.contains(e.target)) close(); });

      // Swipe
      let down = false, sx = 0, dx = 0, th = 50;
      function setX(x) { imgEl.style.transform = `translateX(${x}px)`; }
      function clearX() { imgEl.style.transition = 'transform .18s ease'; imgEl.style.transform = 'translateX(0)'; setTimeout(() => { imgEl.style.transition = ''; }, 200); }
      function onDown(e) { if (!lb.classList.contains('show')) return; down = true; sx = (e.touches ? e.touches[0].clientX : e.clientX); dx = 0; }
      function onMove(e) { if (!down) return; const x = (e.touches ? e.touches[0].clientX : e.clientX); dx = x - sx; setX(dx * .9); }
      function onUp() { if (!down) return; down = false; if (Math.abs(dx) > th) { dx < 0 ? next() : prev(); } clearX(); }
      swipeArea?.addEventListener('mousedown', onDown);
      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseup', onUp);
      swipeArea?.addEventListener('touchstart', onDown, { passive: true });
      swipeArea?.addEventListener('touchmove', onMove, { passive: true });
      swipeArea?.addEventListener('touchend', onUp);
      swipeArea?.addEventListener('dblclick', e => e.preventDefault());
    })();

    /* 카드 fadeInUp 리빌 */
    (function () {
      const cards = Array.from(scope.querySelectorAll('.image_container'));
      if (!cards.length) return;
      cards.forEach((el, i) => { el.classList.add('mgl-reveal'); el.style.setProperty('--i', i % 8); });
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const el = entry.target;
          if (entry.isIntersecting) { el.classList.remove('in'); requestAnimationFrame(() => el.classList.add('in')); }
          else { el.classList.remove('in'); }
        });
      }, { threshold: 0, rootMargin: '0px' });
      cards.forEach(el => io.observe(el));
    })();

    /* 마지막 줄 정렬 */
    (function () {
      const grid = scope.querySelector('.gallary_container');
      if (!grid) return;

      const mqMobile = window.matchMedia('(max-width: 640px)');
      const originals = Array.from(grid.children);

      function restoreOrder() {
        originals.forEach(node => grid.appendChild(node));
        Array.from(grid.children).forEach(el => {
          el.style.gridColumn = '';
          el.style.gridRow = '';
          el.removeAttribute('data-lastfill');
        });
      }

      function colCount() {
        const cols = getComputedStyle(grid).gridTemplateColumns;
        return cols ? cols.split(' ').length : 1;
      }

      function groupRows() {
        const items = Array.from(grid.children);
        const map = new Map();
        items.forEach(el => {
          const t = el.offsetTop;
          if (!map.has(t)) map.set(t, []);
          map.get(t).push(el);
        });
        const rows = Array.from(map.entries()).sort((a, b) => a[0] - b[0]).map(([, els]) => els);
        return rows;
      }

      function distributeSpans(list, cols) {
        const n = list.length;
        const base = Math.floor(cols / n);
        let rem = cols % n;
        list.forEach((el, i) => {
          const span = base + (i < rem ? 1 : 0);
          el.style.gridColumn = `span ${span} / auto`;
          el.dataset.lastfill = '1';
        });
      }

      function layoutLastRow() {
        if (mqMobile.matches) { restoreOrder(); return; }
        restoreOrder();
        const cols = colCount();
        if (cols <= 0) return;
        const rows = groupRows();
        if (rows.length === 0) return;
        const last = rows[rows.length - 1];
        const n = last.length;

        if (n === 1 && rows.length >= 2) {
          const prev = rows[rows.length - 2].slice();
          const single = last[0];
          const anchor = prev[prev.length - 1];
          grid.insertBefore(single, anchor.nextSibling);
          const merged = [...prev, single];
          distributeSpans(merged, cols);
        } else if (n > 1 && n < cols) {
          distributeSpans(last, cols);
        }
      }

      const debounce = (fn, ms = 120) => { let t; return () => { clearTimeout(t); t = setTimeout(fn, ms); }; };
      const onResize = debounce(layoutLastRow);
      window.addEventListener('resize', onResize);
      window.addEventListener('load', layoutLastRow);
      setTimeout(layoutLastRow, 300);
      setTimeout(layoutLastRow, 900);
    })();
  }
  /* ------------------------------ 9) 상품 타일 자동 배지 ------------------------------ */
function initAutoBadges() {
  function ensureBadgeStack(thumb) {
    let stack = thumb.querySelector('.badge-stack');
    if (!stack) {
      stack = document.createElement('div');
      stack.className = 'badge-stack';
      thumb.appendChild(stack);
    } else {
      stack.innerHTML = '';
    }
    return stack;
  }

  // 배지는 append 기준으로 넣고, 호출 순서로 표시 순서를 보장합니다.
  function addBadge(stack, type, text) {
    const el = document.createElement('div');
    el.className = 'badge ' + type;
    el.textContent = text;
    stack.appendChild(el);
  }

  const H2_2025_START = new Date('2025-07-01');
  const meta = {
    "삼성 비스포크 AI 콤보[25/15㎏] + 공기청정기": { release: "2025-08-15", hot: true },
    "LG 오브제 뷰II 2IN1 에어컨 + 공기청정기": { release: "2025-03-01", hot: true },
    "LG 오브제 뷰II 2in1 에어컨": { release: "2025-03-01", hot: true },
    "삼성 비스포크 하이브리드 냉장고 889ℓ": { release: "2025-08-19", hot: true, limited: true },
    "LG 86인치 UHD TV + 스탠바이미": { release: "2025-01-15", hot: true },
    "LG 86인치 UHD TV + 사운드바": { release: "2025-01-15", hot: true },
    "삼성 갤럭시북4 울트라 노트북": { release: "2024-01-02", hot: true },
    "MSI 게이밍 노트북(17.3\")": { release: "2025-08-01", hot: true },
    "바디프랜드 헬스케어로봇 [팔콘S]": { hot: true, limited: true },
    "바디프랜드 라클라우드 이지모션베드(SS)": { hot: true, limited: true },
    "바디프랜드 라클라우드 헬스모션베드(Q)": { hot: true, limited: true },
    "아츠아크 소파 [코멜리]": { limited: true },
    "아츠아크 소파 [루베르] + 고급스툴": { limited: true },
    "삼성 비스포크 AI 스팀 로봇청소기 + 공기청정기": { release: "2025-06-01", hot: true },
    "삼성 비스포크 제트청소기": { hot: true },
    "LG 오브제 스탠드 에어컨(18평)": { release: "2025-03-01", hot: true },
    "삼성 홈멀티 에어컨 [17+6평형]": { release: "2025-03-01", hot: true },
    "LG 오브제 세탁기(24kg)+ 건조기(22kg)": { release: "2024-12-01", hot: true, limited: false },
    "LG 17인치 그램 노트북": { release: "2025-02-01", hot: true },
    "아이패드 프로 M4칩(11인치) + 애플 펜슬 Pro+ 스마트 폴리오(블랙)": { release: "2024-05-01", hot: true, limited: true },
    "삼성 75인치 QLED TV + 사운드바": { release: "2025-04-01", hot: true, limited: true },
    "LG 오브제 스타일러 + 오브제 코드제로 A7": { release: "2024-09-01", hot: true },
    "LG 오브제 김치냉장고": { hot: true },
    "LG 오브제 김치냉장고(김치톡톡) 324e": { hot: true },
    "LG 오브제 AI 공기청정기": { release: "2025-02-01", hot: true },
    "LG 스탠바이미GO(TV) + 공기청정기": { hot: true, limited: true },
    "삼성 비스포크 에어드레서 + 공기청정기": { hot: true },
    "LG 오브제 식기세척기": { hot: true },
    "LG 오브제 청소기 + 공기청정기": { hot: true },
    "LG 오브제 얼음정수기": { hot: true },
    "쿠쿠 얼음정수기(60개월) + 인스퓨어 비데(60개월)": { hot: true, limited: true },
    "쿠쿠 벽걸이 에어컨 + 제습기": { hot: true, limited: true },
    "쿠쿠 레스티노 매트리스K+프레임": { limited: true },
    "쿠쿠 레스티노 매트리스SS + 프레임SS": { limited: true },
    "소노시즌 컴포터블 매트리스SS + 프레임": { limited: true },
    "소노시즌 컴포터블 매트리스 SS + 침구 SET": { limited: true }
  };

  document.querySelectorAll('.tile').forEach(tile => {
    const labelEl = tile.querySelector('.label');
    const thumb = tile.querySelector('.thumb');
    if (!labelEl || !thumb) return;

    const key = labelEl.textContent.trim().replace(/\s+/g, ' ');
    const m = meta[key];
    if (!m) return;

    const stack = ensureBadgeStack(thumb);

    const isNew = !!m.release && !isNaN(new Date(m.release)) && (new Date(m.release) >= H2_2025_START);
    const isHot = !!m.hot;
    const isLimited = !!m.limited;

    // ✅ 표시 순서: 인기 → 신상품 → 한정 수량
    if (isHot)     addBadge(stack, 'best',   '인기');
    if (isNew)     addBadge(stack, 'new',    '신상품');
    if (isLimited) addBadge(stack, 'limited','한정 수량');
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAutoBadges);
} else {
  initAutoBadges();
}


  /* ------------------------------ 10) #applianceGuideMenu: 월/리빌 ------------------------------ */
  function initApplianceGuideMenu() {
    const root = document.getElementById('applianceGuideMenu');
    if (!root) return;

    const monthEl = root.querySelector('.month-text');
    if (monthEl) {
      const nowSeoul = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Seoul' }));
      const monthNumber = nowSeoul.getMonth() + 1;
      monthEl.textContent = monthNumber + '월';
      monthEl.setAttribute('aria-label', monthNumber + '월');
    }

    const effects = ['fadeInUp'];
    const targets = [
      ...root.querySelectorAll('.head > *'),
      ...root.querySelectorAll('.grid .tile')
    ];
    targets.forEach((el, idx) => {
      el.classList.add('reveal');
      if (![...el.classList].some(c => effects.includes(c))) {
        el.classList.add(effects[idx % effects.length]);
      }
      el.style.setProperty('--i', idx % 10);
    });

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const el = entry.target;
        if (entry.isIntersecting) {
          el.classList.remove('in');
          requestAnimationFrame(() => el.classList.add('in'));
        } else {
          el.classList.remove('in');
        }
      });
    }, { root: null, threshold: 0.15, rootMargin: '0px 0px -10% 0px' });

    targets.forEach(t => io.observe(t));
  }

  /* ------------------------------ 11) #whoCanPartner: 카드 리빌 ------------------------------ */
  function initWhoCanPartnerReveal() {
    const root = document.getElementById('whoCanPartner');
    if (!root) return;
    const targets = root.querySelectorAll('.card.reveal');
    if (!targets.length) return;

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('show');
        else entry.target.classList.remove('show');
      });
    }, { threshold: .18, rootMargin: '0px 0px -5% 0px' });

    targets.forEach(el => io.observe(el));
  }

  /* ------------------------------ 12) #eventList: 순차 강조 + 하이라이트 ------------------------------ */
  function initEventList() {
    const items = document.querySelectorAll('#eventList .item');
    if (items.length) {
      let idx = -1;
      setInterval(() => {
        items.forEach(i => i.classList.remove('active'));
        idx = (idx + 1) % items.length;
        items[idx].classList.add('active');
      }, 2000);
    }
    initMarkers('#eventList');
  }

  /* ------------------------------ 초기화 실행 ------------------------------ */
  onReady(() => {
    initHeroSlider();
    initHeroCounters();

    initHeadMonthReplace();
    initAlertBoard();

    initEventList1Rotation();
    initMarkers('#eventList1'); // 멀티라인 밑줄 하이라이트 (지금 신청해야 하는 이유 포함)

    initKakaoProofWall();
    initMosaicGalleryLite();

    initAutoBadges();
    initApplianceGuideMenu();
    initWhoCanPartnerReveal();
    initEventList();
  });
})();