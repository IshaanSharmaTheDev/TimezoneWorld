(function () {
  'use strict';
  let pinned = JSON.parse(localStorage.getItem('tz_pinned') || '[]');
  let filter = '';
  let ticker = null;

  function renderCards() {
    const zones = filter ? TimeZones.search(filter) : TimeZones.getAll();
    const container = document.getElementById('tz-grid');
    container.innerHTML = zones.map(z => {
      const time = TimeZones.getTime(z.tz);
      const offset = TimeZones.getOffset(z.tz);
      const day = TimeZones.isDaytime(z.tz);
      const isPinned = pinned.includes(z.tz);
      return `<div class="tz-card ${day ? 'day' : 'night'}">
        <div class="tz-top">
          <span class="tz-city">${z.name}</span>
          <button class="pin-btn ${isPinned ? 'pinned' : ''}" data-tz="${z.tz}" title="${isPinned ? 'Unpin' : 'Pin'}">📌</button>
        </div>
        <div class="tz-time">${time}</div>
        <div class="tz-bottom">
          <span class="tz-offset">${offset}</span>
          <span class="tz-region">${z.region}</span>
          <span class="tz-daynight">${day ? '☀️ Day' : '🌙 Night'}</span>
        </div>
      </div>`;
    }).join('') || '<div class="no-results">No timezones match</div>';

    container.querySelectorAll('.pin-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const tz = btn.dataset.tz;
        if (pinned.includes(tz)) pinned = pinned.filter(p => p !== tz);
        else pinned.push(tz);
        localStorage.setItem('tz_pinned', JSON.stringify(pinned));
        renderCards();
      });
    });
  }

  function startTicker() {
    ticker = setInterval(renderCards, 1000);
  }

  function renderMeeting() {
    const tzA = document.getElementById('meet-tz-a').value;
    const tzB = document.getElementById('meet-tz-b').value;
    const timeA = document.getElementById('meet-time').value || '09:00';
    const [h, m] = timeA.split(':').map(Number);
    const rows = [];
    for (let i = 0; i < 24; i++) {
      const totalA = (h + i) % 24;
      const diff = TimeZones.diffHours(tzB, tzA);
      const totalB = ((totalA + diff) % 24 + 24) % 24;
      const bh = Math.floor(totalB);
      const bm = Math.round((totalB - bh) * 60);
      const workA = totalA >= 9 && totalA < 18;
      const workB = bh >= 9 && bh < 18;
      const good = workA && workB;
      rows.push(`<tr class="${good ? 'good-slot' : ''}"><td>${String(totalA).padStart(2,'0')}:${String(m).padStart(2,'0')}</td><td>${String(bh).padStart(2,'0')}:${String(bm).padStart(2,'0')}</td><td>${good ? '✅ Good' : '—'}</td></tr>`);
    }
    document.getElementById('meeting-table').innerHTML = '<tr><th>'+tzA+'</th><th>'+tzB+'</th><th>Status</th></tr>' + rows.join('');
  }

  function populateMeetingSelects() {
    const zones = TimeZones.getAll();
    ['meet-tz-a','meet-tz-b'].forEach((id, i) => {
      const sel = document.getElementById(id);
      sel.innerHTML = zones.map(z => `<option value="${z.tz}">${z.name} (${z.tz})</option>`).join('');
      sel.selectedIndex = i === 0 ? 0 : 14;
    });
  }

  function init() {
    document.getElementById('search-tz').addEventListener('input', function() { filter = this.value; renderCards(); });
    document.getElementById('btn-find-meeting').addEventListener('click', renderMeeting);
    populateMeetingSelects();
    renderCards();
    startTicker();
  }
  document.addEventListener('DOMContentLoaded', init);
})();
