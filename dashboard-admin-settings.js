/**
 * Firm admin settings panels (edit this file only for Admin Settings UI changes).
 */
(function (global) {
  'use strict';

  function render(activeAdminTab) {
    var S = global.DashboardShared;
    if (!S) return '<div class="empty">Dashboard UI helpers failed to load.</div>';
    var tablePanel = S.tablePanel;
    var formPanel = S.formPanel;
    var html = '';

    if (activeAdminTab === 'firmProfile') {
      html = formPanel('Firm profile', 'Core firm details used in reports and client workspaces.', [
        ['Firm legal name', 'input', 'Aura Internal Audit PLT'],
        ['Trading name', 'input', 'Aura IA'],
        ['Registration / license no.', 'input', 'IA-2026-001'],
        ['Registered address', 'textarea', 'Level 12, Menara Audit, Kuala Lumpur, Malaysia'],
        ['Default country', 'select', ['Malaysia', 'Singapore', 'United Kingdom']],
        ['Default currency', 'select', ['MYR', 'SGD', 'USD']],
        ['Report footer', 'textarea', 'Internal audit report prepared for management and audit committee use only.']
      ]);
    } else if (activeAdminTab === 'roles') {
      html = tablePanel(
        'Role-based access control',
        'Permission matrix for firm users and client users.',
        ['Role', 'Client directory', 'Client workspace', 'Settings', 'Report approval', 'Follow-up closure'],
        [
          ['Partner / Director', 'All clients', 'Full access', 'Admin + audit settings', 'Final approval', 'Can close / reopen'],
          ['Engagement Manager', 'Assigned clients', 'Planning, review, report draft', 'No admin settings', 'Review approval', 'Can validate closure'],
          ['Senior Auditor', 'Assigned clients', 'Fieldwork, findings, PBC', 'No', 'Prepare draft only', 'Submit validation'],
          ['Staff Auditor', 'Assigned tasks', 'Testing and evidence upload', 'No', 'No', 'No closure rights'],
          ['Client User', 'Own company only', 'PBC and management response', 'No', 'No', 'Upload evidence']
        ]
      );
    } else if (activeAdminTab === 'users') {
      html = tablePanel(
        'Users & team management',
        'Manage internal audit staff, reviewers, and client users.',
        ['Name', 'Email', 'Role', 'Team / group', 'Assigned clients', 'Status'],
        [
          ['Aina Rahman', 'aina@aura-ia.example', 'Partner / Director', 'Leadership', 'All high-risk clients', 'Active'],
          ['Jason Tan', 'jason@aura-ia.example', 'Engagement Manager', 'Group A', 'Bay Fintech, Satria Manufacturing', 'Active'],
          ['Priya Dev', 'priya@aura-ia.example', 'Senior Auditor', 'Group B', 'Meranti Retail, Nusa Healthcare', 'Active'],
          ['Daniel Lim', 'daniel@aura-ia.example', 'Staff Auditor', 'Group C', 'Meranti Retail, Tanjung Foods', 'Active']
        ]
      );
    } else if (activeAdminTab === 'clientAccess') {
      html = tablePanel(
        'Client access matrix',
        'Control which users can access each company workspace.',
        ['Client group', 'Default partner', 'Default manager', 'Default audit team', 'Client user access', 'Restriction rule'],
        [
          ['Group A', 'Aina Rahman', 'Jason Tan', 'Jason Tan, Mei Wong', 'PBC + management response', 'Manager approval for new users'],
          ['Group B', 'Aina Rahman', 'Priya Dev', 'Priya Dev, Daniel Lim', 'PBC + action plan only', 'No report access unless granted'],
          ['High Priority', 'Aina Rahman', 'Aina Rahman', 'Partner-assigned only', 'Restricted', 'Partner approval required']
        ]
      );
    } else if (activeAdminTab === 'preferences') {
      html = formPanel('Firm preferences', 'Default preferences applied to new client workspaces.', [
        'Client code format,input,IA-{CLIENT}-{YYYY}'.split(','),
        'Engagement code format,input,{CLIENT}-{AREA}-{YYYY}-{SEQ}'.split(','),
        ['Date format', 'select', ['DD MMM YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD']],
        ['Default audit status flow', 'textarea', 'Draft → Planning → Fieldwork → Reporting → Management Response → Follow-up → Closed']
      ]);
    } else if (activeAdminTab === 'security') {
      html = tablePanel(
        'Security settings',
        'Firm-level authentication, session, and access controls.',
        ['Setting', 'Current configuration', 'Applies to', 'Notes'],
        [
          ['MFA enforcement', 'Required', 'Internal users and client admins', 'Optional for basic client users'],
          ['Password expiry', '90 days', 'All password users', 'SSO users follow provider policy'],
          ['Session timeout', '8 hours', 'All users', 'Shorter timeout for restricted clients'],
          ['IP allowlist', 'Optional', 'Internal users', 'Useful for admin roles']
        ]
      );
    } else if (activeAdminTab === 'notifications') {
      html = tablePanel(
        'Notification rules',
        'Default reminders and escalation rules.',
        ['Trigger', 'Recipient', 'Timing', 'Channel', 'Escalation'],
        [
          ['PBC due soon', 'Client request owner', '3 days before due', 'Email', 'Notify senior if overdue'],
          ['Finding response due', 'Management action owner', '5 days before due', 'Email', 'Escalate high-risk to partner'],
          ['High-risk overdue', 'Manager + partner', 'Immediately', 'Email', 'Audit committee flag after 30 days']
        ]
      );
    } else if (activeAdminTab === 'activityLog') {
      html = tablePanel(
        'Activity log',
        'Firm-level audit trail.',
        ['Date / time', 'User', 'Area', 'Action'],
        [
          ['2026-05-05 15:20', 'Aina Rahman', 'Roles', 'Updated report approval permission'],
          ['2026-05-04 11:10', 'Jason Tan', 'Client Access', 'Added Bay Fintech client user'],
          ['2026-05-03 09:00', 'System', 'Notifications', 'Sent overdue finding reminders']
        ]
      );
    } else if (activeAdminTab === 'retention') {
      html = tablePanel(
        'Data retention & archive rules',
        'Retention policies for closed engagements and reports.',
        ['Data type', 'Retention period', 'Archive rule', 'Deletion approval'],
        [
          ['Closed client workspace', '7 years', 'Archive 90 days after closure', 'Partner approval required'],
          ['Final internal audit report', '7 years', 'Locked immediately after issue', 'Cannot delete without admin approval'],
          ['Activity log', '10 years', 'System archive annually', 'No manual deletion']
        ]
      );
    }

    return html || '<div class="empty">Unknown admin tab.</div>';
  }

  global.renderAdminSettings = render;
})(typeof window !== 'undefined' ? window : this);
