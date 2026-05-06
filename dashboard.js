/**
 * Firm dashboard: shared UI helpers (DashboardShared) + client list, filters, navigation.
 * Load before dashboard-admin-settings.js and dashboard-internal-audit-settings.js.
 */
(function (global) {
  'use strict';

  function esc(v) {
    return String(v ?? '').replace(/[&<>"']/g, function (ch) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
    });
  }

  function tablePanel(title, note, headers, rows) {
    return (
      '<section class="panel"><div class="panel-head"><div><h2>' +
      esc(title) +
      '</h2><span>' +
      esc(note) +
      '</span></div><button class="btn primary small">+ Add</button></div><div class="table-wrap"><table><thead><tr>' +
      headers
        .map(function (h) {
          return '<th>' + esc(h) + '</th>';
        })
        .join('') +
      '</tr></thead><tbody>' +
      rows
        .map(function (r) {
          return (
            '<tr>' +
            r
              .map(function (c, i) {
                return '<td>' + (i === 0 ? '<strong>' : '') + esc(c) + (i === 0 ? '</strong>' : '') + '</td>';
              })
              .join('') +
            '</tr>'
          );
        })
        .join('') +
      '</tbody></table></div></section>'
    );
  }

  function formPanel(title, note, fields) {
    return (
      '<section class="panel"><div class="panel-head"><div><h2>' +
      esc(title) +
      '</h2><span>' +
      esc(note) +
      '</span></div><button class="btn primary small">Save</button></div><div class="form-grid">' +
      fields
        .map(function (f) {
          if (f[1] === 'textarea') {
            return '<div class="field"><label>' + esc(f[0]) + '</label><textarea>' + esc(f[2]) + '</textarea></div>';
          }
          if (f[1] === 'select') {
            return (
              '<div class="field"><label>' +
              esc(f[0]) +
              '</label><select>' +
              f[2].map(function (v) {
                return '<option>' + esc(v) + '</option>';
              }).join('') +
              '</select></div>'
            );
          }
          return '<div class="field"><label>' + esc(f[0]) + '</label><input value="' + esc(f[2]) + '"></div>';
        })
        .join('') +
      '</div></section>'
    );
  }

  function cards(items) {
    return (
      '<section class="settings-grid">' +
      items
        .map(function (i) {
          return (
            '<article class="setting-card"><h3>' +
            esc(i[0]) +
            '</h3><p>' +
            esc(i[1]) +
            '</p><button class="btn small ghost">Configure</button></article>'
          );
        })
        .join('') +
      '</section>'
    );
  }

  global.DashboardShared = {
    esc: esc,
    tablePanel: tablePanel,
    formPanel: formPanel,
    cards: cards
  };

  function companyWorkspaceHref(id) {
    return 'company.html?clientId=' + encodeURIComponent(id);
  }

  var clients = [
    {
      id: 'langit-logistics',
      name: 'Langit Logistics Bhd',
      group: 'Group A',
      industry: 'Transport & Logistics',
      owner: 'Aina Rahman',
      team: ['Aina Rahman', 'Jason Tan', 'Priya Dev'],
      risk: 'High',
      status: 'Active',
      activeAudits: 3,
      openFindings: 14,
      highFindings: 4,
      overdueActions: 2,
      lastUpdated: '2026-05-03'
    },
    {
      id: 'bay-fintech',
      name: 'Bay Fintech Sdn Bhd',
      group: 'Group A',
      industry: 'Financial Services',
      owner: 'Jason Tan',
      team: ['Jason Tan', 'Mei Wong'],
      risk: 'High',
      status: 'Active',
      activeAudits: 2,
      openFindings: 9,
      highFindings: 3,
      overdueActions: 1,
      lastUpdated: '2026-05-01'
    },
    {
      id: 'meranti-retail',
      name: 'Meranti Retail Group',
      group: 'Group B',
      industry: 'Retail',
      owner: 'Priya Dev',
      team: ['Priya Dev', 'Daniel Lim'],
      risk: 'Medium',
      status: 'Active',
      activeAudits: 1,
      openFindings: 6,
      highFindings: 1,
      overdueActions: 0,
      lastUpdated: '2026-04-29'
    },
    {
      id: 'nusa-healthcare',
      name: 'Nusa Healthcare Network',
      group: 'Group B',
      industry: 'Healthcare',
      owner: 'Aina Rahman',
      team: ['Aina Rahman', 'Priya Dev'],
      risk: 'Medium',
      status: 'Active',
      activeAudits: 2,
      openFindings: 11,
      highFindings: 2,
      overdueActions: 3,
      lastUpdated: '2026-05-04'
    },
    {
      id: 'satria-manufacturing',
      name: 'Satria Manufacturing Sdn Bhd',
      group: 'Group C',
      industry: 'Manufacturing',
      owner: 'Jason Tan',
      team: ['Jason Tan'],
      risk: 'Low',
      status: 'Onboarding',
      activeAudits: 0,
      openFindings: 0,
      highFindings: 0,
      overdueActions: 0,
      lastUpdated: '2026-04-20'
    },
    {
      id: 'tanjung-foods',
      name: 'Tanjung Foods Group',
      group: 'Group C',
      industry: 'FMCG',
      owner: 'Mei Wong',
      team: ['Mei Wong', 'Daniel Lim', 'Priya Dev'],
      risk: 'Medium',
      status: 'Active',
      activeAudits: 2,
      openFindings: 8,
      highFindings: 1,
      overdueActions: 0,
      lastUpdated: '2026-05-02'
    },
    {
      id: 'kemuning-energy',
      name: 'Kemuning Energy Berhad',
      group: 'High Priority',
      industry: 'Energy',
      owner: 'Aina Rahman',
      team: ['Aina Rahman', 'Jason Tan'],
      risk: 'High',
      status: 'Active',
      activeAudits: 4,
      openFindings: 18,
      highFindings: 5,
      overdueActions: 4,
      lastUpdated: '2026-05-05'
    }
  ];

  var filters = { search: '', group: 'all', risk: 'all', status: 'all', owner: 'all', outstanding: 'all' };
  var activeAdminTab = 'firmProfile';
  var activeAuditTab = 'universe';

  function slug(v) {
    return String(v || '')
      .toLowerCase()
      .trim()
      .replaceAll(' ', '-')
      .replaceAll('/', '-');
  }

  function pill(v) {
    return '<span class="pill ' + esc(slug(v)) + '">' + esc(v) + '</span>';
  }

  function showMainView(view) {
    document.querySelectorAll('.view').forEach(function (el) {
      el.classList.remove('active');
    });
    document.getElementById(view + 'View').classList.add('active');
    document.querySelectorAll('[data-main-view]').forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.mainView === view);
    });
  }

  function groups() {
    return ['all', ...new Set(clients.map(function (c) { return c.group; }))];
  }

  function owners() {
    return [...new Set(clients.map(function (c) { return c.owner; }))];
  }

  function renderGroupPills() {
    document.getElementById('groupPills').innerHTML = groups()
      .map(function (g) {
        return (
          '<button class="group-pill ' +
          (filters.group === g ? 'active' : '') +
          '" data-group="' +
          esc(g) +
          '">' +
          (g === 'all' ? 'All groups' : esc(g)) +
          '</button>'
        );
      })
      .join('');
    document.querySelectorAll('[data-group]').forEach(function (btn) {
      btn.onclick = function () {
        filters.group = btn.dataset.group;
        renderClients();
      };
    });
  }

  function renderOwnerOptions() {
    document.getElementById('ownerFilter').innerHTML =
      '<option value="all">All owners</option>' +
      owners()
        .map(function (o) {
          return '<option value="' + esc(o) + '">' + esc(o) + '</option>';
        })
        .join('');
  }

  function filteredClients() {
    var q = filters.search.toLowerCase().trim();
    return clients.filter(function (c) {
      var hay = [c.name, c.group, c.industry, c.owner, c.team.join(' '), c.risk, c.status].join(' ').toLowerCase();
      if (q && !hay.includes(q)) return false;
      if (filters.group !== 'all' && c.group !== filters.group) return false;
      if (filters.risk !== 'all' && c.risk !== filters.risk) return false;
      if (filters.status !== 'all' && c.status !== filters.status) return false;
      if (filters.owner !== 'all' && c.owner !== filters.owner) return false;
      if (filters.outstanding === 'open' && !c.openFindings) return false;
      if (filters.outstanding === 'high' && !c.highFindings) return false;
      if (filters.outstanding === 'overdue' && !c.overdueActions) return false;
      return true;
    });
  }

  function renderTeam(c) {
    return (
      '<ul class="tiny-list">' +
      c.team
        .map(function (n) {
          return (
            '<li class="' +
            (n === c.owner ? 'team-lead' : '') +
            '">' +
            esc(n) +
            (n === c.owner ? '<span class="pill lead-tag">Lead</span>' : '') +
            '</li>'
          );
        })
        .join('') +
      '</ul>'
    );
  }

  function renderClients() {
    renderGroupPills();
    var list = filteredClients();
    document.getElementById('clientCount').textContent = list.length + ' shown';
    if (!list.length) {
      document.getElementById('clientTable').innerHTML =
        '<div class="empty">No clients match the current filters.</div>';
      return;
    }
    var headers = [
      'Client',
      'Group',
      'Status',
      'Risk',
      'Team',
      'Active audits',
      'Open findings',
      'High-risk',
      'Overdue',
      'Last updated',
      ''
    ];
    var rows = list
      .map(function (c) {
        var openHref = companyWorkspaceHref(c.id);
        return (
          '<tr><td class="client-name-cell"><strong>' +
          esc(c.name) +
          '</strong><div class="muted">' +
          esc(c.industry) +
          '</div></td><td>' +
          pill(c.group) +
          '</td><td>' +
          pill(c.status) +
          '</td><td>' +
          pill(c.risk) +
          '</td><td class="team-cell">' +
          renderTeam(c) +
          '</td><td>' +
          c.activeAudits +
          '</td><td>' +
          c.openFindings +
          '</td><td>' +
          (c.highFindings ? pill(c.highFindings + ' high') : '<span class="muted">0</span>') +
          '</td><td>' +
          (c.overdueActions ? pill(c.overdueActions + ' overdue') : pill('On track')) +
          '</td><td>' +
          esc(c.lastUpdated) +
          '</td><td class="action-cell"><a class="btn primary small" href="' +
          openHref +
          '">Open</a></td></tr>'
        );
      })
      .join('');
    document.getElementById('clientTable').innerHTML =
      '<div class="table-wrap"><table><thead><tr>' +
      headers
        .map(function (h) {
          return '<th>' + h + '</th>';
        })
        .join('') +
      '</tr></thead><tbody>' +
      rows +
      '</tbody></table></div>';
  }

  function renderAdmin() {
    var fn = typeof global.renderAdminSettings === 'function' ? global.renderAdminSettings : null;
    document.getElementById('adminContent').innerHTML = fn
      ? fn(activeAdminTab)
      : '<div class="empty">Admin settings script missing.</div>';
    document.querySelectorAll('[data-admin-tab]').forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.adminTab === activeAdminTab);
    });
  }

  function renderAudit() {
    var fn =
      typeof global.renderInternalAuditSettings === 'function' ? global.renderInternalAuditSettings : null;
    document.getElementById('auditContent').innerHTML = fn
      ? fn(activeAuditTab)
      : '<div class="empty">Internal audit settings script missing.</div>';
    document.querySelectorAll('[data-audit-tab]').forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.auditTab === activeAuditTab);
    });
  }

  function addClient() {
    var name = prompt('Client company name');
    if (!name) return;
    var id = slug(name) || 'client-' + Date.now();
    clients.push({
      id: id,
      name: name,
      group: 'Group A',
      industry: 'New client',
      owner: owners()[0] || 'Unassigned',
      team: [],
      risk: 'Medium',
      status: 'Onboarding',
      activeAudits: 0,
      openFindings: 0,
      highFindings: 0,
      overdueActions: 0,
      lastUpdated: '2026-05-06'
    });
    renderOwnerOptions();
    renderClients();
  }

  function wire() {
    document.querySelectorAll('[data-main-view]').forEach(function (btn) {
      btn.onclick = function () {
        showMainView(btn.dataset.mainView);
      };
    });
    document.querySelectorAll('[data-admin-tab]').forEach(function (btn) {
      btn.onclick = function () {
        activeAdminTab = btn.dataset.adminTab;
        renderAdmin();
      };
    });
    document.querySelectorAll('[data-audit-tab]').forEach(function (btn) {
      btn.onclick = function () {
        activeAuditTab = btn.dataset.auditTab;
        renderAudit();
      };
    });
    document.getElementById('searchInput').oninput = function (e) {
      filters.search = e.target.value;
      renderClients();
    };
    document.getElementById('riskFilter').onchange = function (e) {
      filters.risk = e.target.value;
      renderClients();
    };
    document.getElementById('statusFilter').onchange = function (e) {
      filters.status = e.target.value;
      renderClients();
    };
    document.getElementById('ownerFilter').onchange = function (e) {
      filters.owner = e.target.value;
      renderClients();
    };
    document.getElementById('outstandingFilter').onchange = function (e) {
      filters.outstanding = e.target.value;
      renderClients();
    };
    document.getElementById('clearFiltersBtn').onclick = function () {
      filters = { search: '', group: 'all', risk: 'all', status: 'all', owner: 'all', outstanding: 'all' };
      document.getElementById('searchInput').value = '';
      document.getElementById('riskFilter').value = 'all';
      document.getElementById('statusFilter').value = 'all';
      document.getElementById('ownerFilter').value = 'all';
      document.getElementById('outstandingFilter').value = 'all';
      renderClients();
    };
    document.getElementById('addClientBtn').onclick = addClient;
    document.getElementById('addClientMainBtn').onclick = addClient;
    document.getElementById('resetDemoBtn').onclick = function () {
      location.reload();
    };
  }

  function initFirmDashboard() {
    renderOwnerOptions();
    renderClients();
    renderAdmin();
    renderAudit();
    wire();
  }

  global.initFirmDashboard = initFirmDashboard;
})(typeof window !== 'undefined' ? window : this);
