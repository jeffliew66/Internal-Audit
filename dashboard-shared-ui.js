/**
 * Shared UI helpers for Dashboard.html (used by admin / internal audit settings modules).
 */
(function (global) {
  'use strict';

  function esc(v) {
    return String(v ?? '').replace(/[&<>"']/g, function (ch) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]);
    });
  }

  function tablePanel(title, note, headers, rows) {
    return (
      '<section class="panel"><div class="panel-head"><div><h2>' +
      esc(title) +
      '</h2><span>' +
      esc(note) +
      '</span></div><button class="btn primary small">+ Add</button></div><div class="table-wrap"><table><thead><tr>' +
      headers.map(function (h) {
        return '<th>' + esc(h) + '</th>';
      }).join('') +
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
})(typeof window !== 'undefined' ? window : this);
