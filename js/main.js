document.addEventListener('DOMContentLoaded', () => {

  // --- 0. Lenis Smooth Scroll ---
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    smoothTouch: false
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  // Smooth scroll for anchors using Lenis
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        lenis.scrollTo(targetEl, {
          offset: -80
        });
      }
    });
  });

  // --- 1. Swiper Sliders ---
  const heroSwiper = new Swiper('.hero-slider', {
    loop: true,
    grabCursor: true,
    effect: 'fade',
    fadeEffect: { crossFade: true },
    speed: 900,
    autoplay: {
      delay: 5500,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.hero-pagination',
      clickable: true,
    },
  });

  const promoSwiper = new Swiper('.promo-slider', {
    slidesPerView: 1.1,
    spaceBetween: 16,
    loop: false, // Set to false to prevent glitching with only 3 slides on desktop view
    grabCursor: true,
    autoplay: { delay: 4000, disableOnInteraction: false },
    breakpoints: {
      480: { slidesPerView: 1.5 },
      768: { slidesPerView: 2.2 },
      1024: { slidesPerView: 3 }
    }
  });

  const trendsSwiper = new Swiper('.trends-slider', {
    slidesPerView: 1.2,
    spaceBetween: 16,
    grabCursor: true,
    navigation: { nextEl: '.trends-next', prevEl: '.trends-prev' },
    breakpoints: {
      480: { slidesPerView: 2.2 },
      768: { slidesPerView: 3.2 },
      1024: { slidesPerView: 4 }
    }
  });

  const gamesSwiper = new Swiper('.games-slider', {
    slidesPerView: 1.25,
    spaceBetween: 16,
    grabCursor: true,
    navigation: { nextEl: '.games-next', prevEl: '.games-prev' },
    loop: true,
    autoplay: { delay: 3500, disableOnInteraction: false },
    breakpoints: {
      480: { slidesPerView: 1.6 },
      576: { slidesPerView: 2.0 },
      768: { slidesPerView: 2.5 },
      992: { slidesPerView: 3.0 }
    }
  });

  // --- 2. Interactive Modals Setup ---
  const walletModal = document.getElementById('wallet-modal');
  const loginModal = document.getElementById('login-modal');
  const registerModal = document.getElementById('register-modal');

  const showModal = (modal) => {
    if (modal) {
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
  };

  const closeModal = (modal) => {
    if (modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  };

  document.querySelectorAll('.modal-close, .modal-overlay').forEach(element => {
    element.addEventListener('click', (e) => {
      if (e.target.closest('.modal-close') || e.target === element) {
        closeModal(walletModal);
        closeModal(loginModal);
        closeModal(registerModal);
      }
    });
  });

  const walletBtn = document.getElementById('header-wallet-btn');
  if (walletBtn) {
    walletBtn.addEventListener('click', () => showModal(walletModal));
  }

  document.querySelectorAll('.trigger-login').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      showModal(loginModal);
    });
  });

  document.querySelectorAll('.trigger-register').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      showModal(registerModal);
    });
  });

  // --- 3. Wallet Deposit Flow ---
  let userBalance = 5240.85;
  const balanceValEl = document.getElementById('header-balance-amount');

  const depositBtns = document.querySelectorAll('.deposit-method-btn');
  depositBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      depositBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  const depositForm = document.getElementById('deposit-form');
  if (depositForm) {
    depositForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const amountInput = document.getElementById('deposit-amount');
      const amount = parseFloat(amountInput.value) || 0;
      
      if (amount >= 10) {
        userBalance += amount;
        if (balanceValEl) {
          balanceValEl.textContent = `$${userBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
          balanceValEl.style.color = '#00ff64';
          balanceValEl.style.textShadow = '0 0 20px #00ff64';
          setTimeout(() => {
            balanceValEl.style.color = '';
            balanceValEl.style.textShadow = '';
          }, 1500);
        }
        closeModal(walletModal);
        alert(`Success! Deposit of $${amount.toFixed(2)} credited to balance.`);
      } else {
        alert('Minimum deposit amount is $10.');
      }
    });
  }

  // --- 4. Hot Games View More Toggle ---
  const viewMoreHotBtn = document.getElementById('hot-games-view-more');
  if (viewMoreHotBtn) {
    viewMoreHotBtn.addEventListener('click', () => {
      const extraGames = document.querySelectorAll('.extra-hot-game');
      const isExpanded = viewMoreHotBtn.classList.contains('expanded');
      
      extraGames.forEach(el => {
        el.style.display = isExpanded ? 'none' : 'block';
      });
      
      if (isExpanded) {
        viewMoreHotBtn.classList.remove('expanded');
        viewMoreHotBtn.innerHTML = 'View More <i class="fa-solid fa-chevron-down"></i>';
      } else {
        viewMoreHotBtn.classList.add('expanded');
        viewMoreHotBtn.innerHTML = 'Show Less <i class="fa-solid fa-chevron-up"></i>';
      }
    });
  }

  // --- 5. Live Events & Betting Engine ---
  const MATCHES = [
    { id: 1, sport: 'football', league: 'Premier League', team1: { name: 'Liverpool', emoji: '🔴' }, team2: { name: 'Man Utd', emoji: '⚫' }, score: '2 - 1', time: "68'", odds: { home: 1.85, draw: 3.40, away: 4.10 }, live: true },
    { id: 2, sport: 'basketball', league: 'NBA', team1: { name: 'Lakers', emoji: '🟣' }, team2: { name: 'Warriors', emoji: '💛' }, score: '104 - 99', time: 'Q4 6:15', odds: { home: 1.60, draw: null, away: 2.25 }, live: true },
    { id: 3, sport: 'cricket', league: 'Test Match', team1: { name: 'India', emoji: '🔵' }, team2: { name: 'Australia', emoji: '🟡' }, score: '185/3', time: '31.2 Ov', odds: { home: 1.55, draw: 12.0, away: 2.60 }, live: true },
    { id: 4, sport: 'football', league: 'Champions League', team1: { name: 'Real Madrid', emoji: '⚪' }, team2: { name: 'Barcelona', emoji: '🔵' }, score: '1 - 0', time: "45'", odds: { home: 2.10, draw: 3.20, away: 3.50 }, live: true },
    { id: 5, sport: 'tennis', league: 'Wimbledon', team1: { name: 'Djokovic', emoji: '🎾' }, team2: { name: 'Alcaraz', emoji: '🎾' }, score: '6-4, 3-2', time: 'Set 2', odds: { home: 1.75, draw: null, away: 2.05 }, live: true },
    { id: 6, sport: 'esports', league: 'CS2 Major', team1: { name: 'NaVi', emoji: '🎮' }, team2: { name: 'FaZe', emoji: '💀' }, score: '11 - 9', time: 'Map 2', odds: { home: 1.65, draw: null, away: 2.35 }, live: true },
    { id: 7, sport: 'esports', league: 'Dota 2 TI', team1: { name: 'Spirit', emoji: '🐉' }, team2: { name: 'Liquid', emoji: '💧' }, score: '1 - 1', time: 'Game 3', odds: { home: 1.90, draw: null, away: 1.90 }, live: true },
    { id: 8, sport: 'basketball', league: 'EuroLeague', team1: { name: 'CSKA', emoji: '⭐' }, team2: { name: 'Fenerbahce', emoji: '🟡' }, score: '78 - 82', time: 'Q3', odds: { home: 2.10, draw: null, away: 1.75 }, live: true }
  ];

  let betSlip = [];

  window.renderMatches = function(filter) {
    const grid = document.getElementById('match-grid');
    if (!grid) return;
    const filtered = filter === 'all' ? MATCHES : MATCHES.filter(m => m.sport === filter);
    
    // Live match count badge update
    const countBadge = document.getElementById('live-match-count');
    if (countBadge) {
      countBadge.textContent = `${filtered.length} Live`;
    }

    grid.innerHTML = filtered.map(m => {
      const drawOdds = m.odds.draw 
        ? `<button class="odds-btn-v2" onclick="addToBetSlip(${m.id},'Draw',${m.odds.draw})"><span class="odds-label-v2">X</span><span class="odds-value-v2">${m.odds.draw}</span></button>` 
        : `<div class="odds-btn-v2" style="opacity:0.3;cursor:default"><span class="odds-label-v2">-</span><span class="odds-value-v2">-</span></div>`;
        
      return `<div class="col-12 col-md-6 col-xl-4">
        <div class="match-card-v2">
          <div class="match-sport-bar">
            <span class="match-sport-label"><i class="fa-solid fa-circle" style="color:${m.live ? 'var(--color-glow)' : '#555'};font-size:0.5rem;margin-right:4px;"></i> ${m.league}</span>
            <span class="match-time-chip">${m.live ? '🔴 ' : ''}${m.time}</span>
          </div>
          <div class="match-teams-v2">
            <div class="team-block"><div class="team-emblem">${m.team1.emoji}</div><span class="team-name-v2">${m.team1.name}</span></div>
            <div class="vs-block"><span class="vs-text">VS</span><span class="score-display">${m.score}</span></div>
            <div class="team-block"><div class="team-emblem">${m.team2.emoji}</div><span class="team-name-v2">${m.team2.name}</span></div>
          </div>
          <div class="match-odds-v2">
            <button class="odds-btn-v2" onclick="addToBetSlip(${m.id},'${m.team1.name}',${m.odds.home})"><span class="odds-label-v2">1</span><span class="odds-value-v2">${m.odds.home}</span></button>
            ${drawOdds}
            <button class="odds-btn-v2" onclick="addToBetSlip(${m.id},'${m.team2.name}',${m.odds.away})"><span class="odds-label-v2">2</span><span class="odds-value-v2">${m.odds.away}</span></button>
          </div>
        </div>
      </div>`;
    }).join('');
  };

  window.addToBetSlip = function(matchId, selection, odds) {
    const match = MATCHES.find(m => m.id === matchId);
    if (!match) return;
    const existing = betSlip.findIndex(b => b.matchId === matchId);
    if (existing >= 0) {
      betSlip[existing] = { matchId, match: `${match.team1.name} vs ${match.team2.name}`, selection, odds, stake: betSlip[existing].stake || 10 };
    } else {
      betSlip.push({ matchId, match: `${match.team1.name} vs ${match.team2.name}`, selection, odds, stake: 10 });
    }
    updateBetSlipUI();
    openBetSlip();
  };

  window.removeBet = function(matchId) {
    betSlip = betSlip.filter(b => b.matchId !== matchId);
    updateBetSlipUI();
  };

  window.updateStake = function(matchId, val) {
    const b = betSlip.find(x => x.matchId === matchId);
    if (b) {
      b.stake = parseFloat(val) || 0;
      updateBetSlipUI();
    }
  };

  function updateBetSlipUI() {
    const count = betSlip.length;
    const countEl = document.getElementById('bet-slip-count');
    const body = document.getElementById('bet-slip-body');
    const footer = document.getElementById('bet-slip-footer');
    
    if (countEl) countEl.textContent = count;
    if (!body) return;
    
    if (count === 0) {
      if (footer) footer.style.display = 'none';
      body.innerHTML = `<div class="bet-slip-empty" id="bet-slip-empty"><i class="fa-solid fa-receipt"></i><p>Your bet slip is empty.<br>Click on any odds to add a selection.</p></div>`;
      return;
    }
    
    if (footer) footer.style.display = 'block';
    body.innerHTML = betSlip.map(b => `
      <div class="bet-slip-item">
        <button class="bet-remove" onclick="removeBet(${b.matchId})"><i class="fa-solid fa-xmark"></i></button>
        <div class="bet-slip-item-header">
          <span class="bet-selection">${b.selection}</span>
          <span class="bet-odds-chip">${b.odds}</span>
        </div>
        <div class="bet-match-info">${b.match}</div>
        <input type="number" class="bet-stake-input" value="${b.stake}" min="1" placeholder="Stake $" onchange="updateStake(${b.matchId}, this.value)">
      </div>`).join('');
      
    const totalStake = betSlip.reduce((s, b) => s + (parseFloat(b.stake) || 0), 0);
    const totalOdds = betSlip.reduce((o, b) => o * b.odds, 1);
    const potWin = totalStake * totalOdds;
    
    const ts = document.getElementById('total-stake'); if (ts) ts.textContent = '$' + totalStake.toFixed(2);
    const to = document.getElementById('total-odds'); if (to) to.textContent = totalOdds.toFixed(2);
    const pw = document.getElementById('potential-win'); if (pw) pw.textContent = '$' + potWin.toFixed(2);
  }

  function openBetSlip() {
    const modal = document.getElementById('bet-slip-modal');
    if (modal) modal.classList.add('open');
  }

  function closeBetSlip() {
    const modal = document.getElementById('bet-slip-modal');
    if (modal) modal.classList.remove('open');
  }

  const fab = document.getElementById('bet-slip-fab');
  if (fab) fab.addEventListener('click', openBetSlip);

  const closeBtn = document.getElementById('bet-slip-close');
  if (closeBtn) closeBtn.addEventListener('click', closeBetSlip);

  const placeBetBtn = document.getElementById('place-bet-btn');
  if (placeBetBtn) {
    placeBetBtn.addEventListener('click', function() {
      if (betSlip.length === 0) return;
      const totalStake = betSlip.reduce((s, b) => s + (parseFloat(b.stake) || 0), 0);
      const totalOdds = betSlip.reduce((o, b) => o * b.odds, 1);
      const potWin = (totalStake * totalOdds).toFixed(2);
      
      betSlip = [];
      updateBetSlipUI();
      closeBetSlip();
      setTimeout(() => showWinToast(potWin, 'Sports Bet'), 500);
    });
  }

  // Sport tab filter click events
  document.querySelectorAll('.sport-tab').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.sport-tab').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      renderMatches(this.dataset.sport);
    });
  });

  renderMatches('all');

  // --- 6. Live Activity Bet Ticker ---
  const tabWinners = document.getElementById('tab-winners');
  const tabBets = document.getElementById('tab-bets');
  const tableWinners = document.getElementById('table-winners');
  const tableBets = document.getElementById('table-bets');

  if (tabWinners && tabBets) {
    tabWinners.addEventListener('click', () => {
      tabWinners.classList.add('active');
      tabBets.classList.remove('active');
      if (tableWinners) tableWinners.style.display = 'table';
      if (tableBets) tableBets.style.display = 'none';
    });

    tabBets.addEventListener('click', () => {
      tabBets.classList.add('active');
      tabWinners.classList.remove('active');
      if (tableBets) tableBets.style.display = 'table';
      if (tableWinners) tableWinners.style.display = 'none';
    });
  }

  const users = ['CryptoRoller', 'LuckySpin', 'VipStaker', 'SatoshiRoll', 'BetHogFan', 'NebulaSpin', 'GoldPlinko', 'NeonShade', 'RedDigger', 'EtherStakes', 'SpribeMaster'];
  const games = ['Lucky 6 Roller', 'Spaceman', 'Lightning Roulette', 'Plinko Neon', 'Crazy Time', 'Limbo Crash', 'Mines Double', 'Baccarat Gold'];

  const winnersBody = tableWinners ? tableWinners.querySelector('tbody') : null;
  const betsBody = tableBets ? tableBets.querySelector('tbody') : null;

  const addInitialRows = () => {
    if (winnersBody && betsBody) {
      winnersBody.innerHTML = '';
      betsBody.innerHTML = '';
      for (let i = 0; i < 5; i++) {
        const wUser = users[Math.floor(Math.random() * users.length)];
        const wGame = games[Math.floor(Math.random() * games.length)];
        const wAmt = (Math.random() * 800 + 50).toFixed(2);
        winnersBody.innerHTML += `
          <tr>
            <td>${wUser}***</td>
            <td class="payout-glow">$${wAmt}</td>
            <td>${wGame}</td>
          </tr>
        `;

        const bUser = users[Math.floor(Math.random() * users.length)];
        const bMult = (Math.random() * 5 + 1.1).toFixed(2);
        const bPay = (Math.random() * 300 + 10).toFixed(2);
        betsBody.innerHTML += `
          <tr>
            <td>${bUser}***</td>
            <td><span class="multiplier-badge">${bMult}x</span></td>
            <td class="payout-glow">$${bPay}</td>
          </tr>
        `;
      }
    }
  };
  addInitialRows();

  setInterval(() => {
    if (winnersBody) {
      const wUser = users[Math.floor(Math.random() * users.length)];
      const wGame = games[Math.floor(Math.random() * games.length)];
      const wAmt = (Math.random() * 1200 + 50).toFixed(2);
      
      const newRow = document.createElement('tr');
      newRow.innerHTML = `
        <td>${wUser}***</td>
        <td class="payout-glow">$${wAmt}</td>
        <td>${wGame}</td>
      `;
      winnersBody.insertBefore(newRow, winnersBody.firstChild);
      if (winnersBody.children.length > 8) winnersBody.removeChild(winnersBody.lastChild);
    }

    if (betsBody) {
      const bUser = users[Math.floor(Math.random() * users.length)];
      const bMult = (Math.random() * 8 + 1.1).toFixed(2);
      const bPay = (Math.random() * 500 + 10).toFixed(2);
      
      const newRow = document.createElement('tr');
      newRow.innerHTML = `
        <td>${bUser}***</td>
        <td><span class="multiplier-badge">${bMult}x</span></td>
        <td class="payout-glow">$${bPay}</td>
      `;
      betsBody.insertBefore(newRow, betsBody.firstChild);
      if (betsBody.children.length > 8) betsBody.removeChild(betsBody.lastChild);
    }
  }, 4000);

  // --- 7. Win Toast Notification ---
  function showWinToast(amount, game) {
    const toast = document.getElementById('win-toast');
    const amtEl = document.getElementById('win-toast-amount');
    const gameEl = document.getElementById('win-toast-game');
    if (!toast) return;
    if (amtEl) amtEl.textContent = 'You Won $' + amount + '!';
    if (gameEl) gameEl.textContent = game;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4000);
  }

  // Periodic random wins
  const wins = [['3,240.00','Lightning Roulette'],['840.50','Aviator x12'],['1,120.00','Crazy Time'],['560.75','Speed Baccarat']];
  let wi = 0;
  setInterval(() => {
    const w = wins[wi % wins.length];
    showWinToast(w[0], w[1]);
    wi++;
  }, 15000);

  // --- 8. Mobile Drawer Menu & Bottom Bar ---
  const mobileDrawer = document.getElementById('mobile-drawer');
  const menuToggleBtn = document.getElementById('mobile-menu-toggle');
  const drawerCloseBtn = document.getElementById('drawer-close');
  const bottomMenuBtn = document.getElementById('bot-nav-menu');
  const bottomWalletBtn = document.getElementById('bot-nav-wallet');

  const openDrawer = () => {
    if (mobileDrawer) mobileDrawer.classList.add('active');
  };

  const closeDrawer = () => {
    if (mobileDrawer) mobileDrawer.classList.remove('active');
  };

  if (menuToggleBtn) menuToggleBtn.addEventListener('click', openDrawer);
  if (bottomMenuBtn) bottomMenuBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openDrawer();
  });
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);

  if (mobileDrawer) {
    mobileDrawer.addEventListener('click', (e) => {
      if (e.target === mobileDrawer) closeDrawer();
    });
  }

  if (bottomWalletBtn) {
    bottomWalletBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showModal(walletModal);
    });
  }

  const drawerLinks = document.querySelectorAll('.drawer-nav a');
  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      drawerLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      closeDrawer();
    });
  });

  const bottomNavItems = document.querySelectorAll('.bottom-nav-item');
  bottomNavItems.forEach(item => {
    item.addEventListener('click', () => {
      if (item.id !== 'bot-nav-wallet' && item.id !== 'bot-nav-menu') {
        bottomNavItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
      }
    });
  });

  // --- 9. Provider/Game Ticker category pill highlighting ---
  const tickerPills = document.querySelectorAll('.ticker-pill');
  tickerPills.forEach(pill => {
    pill.addEventListener('click', () => {
      tickerPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
    });
  });

  // --- 10. Category Selection filter button highlighting ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Search functionality alert
  const searchInput = document.getElementById('global-search');
  if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        alert(`Searching for: "${searchInput.value}"`);
      }
    });
  }

  // Dynamic Live Jackpot Counter
  const jackpotEl = document.querySelector('.hpc-jackpot-amount');
  if (jackpotEl) {
    let currentJackpot = 258419.00;
    setInterval(() => {
      const increment = Math.random() * 2.85;
      currentJackpot += increment;
      jackpotEl.textContent = `$${currentJackpot.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }, 1500);
  }
});
