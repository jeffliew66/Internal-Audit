/**
 * Internal audit methodology settings panels (edit this file only for IA Settings UI changes).
 */
(function (global) {
  'use strict';

  function render(activeAuditTab) {
    var S = global.DashboardShared;
    if (!S) return '<div class="empty">Dashboard UI helpers failed to load.</div>';
    var tablePanel = S.tablePanel;
    var html = '';

    if (activeAuditTab === 'universe') {
      html = tablePanel(
        'Master audit universe templates',
        'Reusable auditable areas copied into client workspaces.',
        ['Auditable area', 'Category', 'Typical scope', 'Common risks', 'Default frequency'],
        [
          ['Procurement', 'Operations / Fraud', 'Vendor onboarding, tender, PO approval', 'Bribery, fake vendor, split purchase', 'Annual'],
          ['IT Access Management', 'Technology', 'User provisioning, privileged access, leavers', 'Data leak, excessive access', 'Annual'],
          ['Payroll', 'HR / Finance', 'Employee master, salary changes, leavers', 'Ghost employee, salary manipulation', '2 years'],
          ['Inventory & Warehouse', 'Operations', 'Stock count, receiving, dispatch', 'Stock loss, inaccurate records', 'Annual']
        ]
      );
    } else if (activeAuditTab === 'riskLibrary') {
      html = tablePanel(
        'Risk library',
        'Standard risks for client risk assessment.',
        ['Risk category', 'Risk statement', 'Affected areas', 'Suggested audit response'],
        [
          ['Fraud', 'Dishonest action causes financial loss', 'Procurement, Payroll, Claims', 'Fraud-focused testing'],
          ['Bribery / corruption', 'Third party influences business decision improperly', 'Procurement, Tender', 'COI review and tender testing'],
          ['Data leakage', 'Sensitive information accessed without authorization', 'IT, HR, Finance', 'Access review'],
          ['Compliance breach', 'Failure to comply with law or policy', 'Compliance, Finance', 'Policy mapping and sample testing']
        ]
      );
    } else if (activeAuditTab === 'scoring') {
      html = tablePanel(
        'Risk scoring model',
        'How inherent and residual risk are calculated.',
        ['Component', 'Scale / value', 'Meaning', 'Usage'],
        [
          ['Likelihood', '1–5', 'Probability risk occurs', 'Used with impact'],
          ['Impact', '1–5', 'Severity of consequence', 'Used with likelihood'],
          ['Inherent risk', 'Likelihood × Impact', 'Risk before controls', 'Initial priority'],
          ['Control effectiveness', 'Strong / Moderate / Weak', 'How well controls reduce risk', 'Adjusts residual risk'],
          ['Residual risk', 'Low / Medium / High / Critical', 'Risk after controls', 'Determines audit depth']
        ]
      );
    } else if (activeAuditTab === 'annualPlan') {
      html = tablePanel(
        'Annual audit plan template',
        'Default fields for each client annual audit plan.',
        ['Field', 'Purpose', 'Required?', 'Example'],
        [
          ['Audit name', 'Name of planned audit', 'Yes', 'Procurement Process Audit'],
          ['Auditable area', 'Links audit to universe', 'Yes', 'Procurement'],
          ['Reason for selection', 'Risk-based rationale', 'Yes', 'High residual fraud risk'],
          ['Priority', 'High / Medium / Low', 'Yes', 'High'],
          ['Quarter / timing', 'Target execution period', 'Yes', 'Q1 2026'],
          ['Estimated audit days', 'Resource planning', 'Yes', '22 days']
        ]
      );
    } else if (activeAuditTab === 'engagement') {
      html = tablePanel(
        'Engagement templates',
        'Templates used once an audit is selected.',
        ['Template', 'Main sections', 'Used by', 'Output'],
        [
          ['Planning memo', 'Objective, scope, methodology, team', 'Audit manager', 'Approved plan'],
          ['Risk Control Matrix', 'Risk, control, test, result, conclusion', 'Senior auditor', 'RCM workpaper'],
          ['PBC request list', 'Document, owner, due date, status', 'Auditor + auditee', 'Document tracker'],
          ['Audit program', 'Procedure, sample, evidence, result', 'Auditor', 'Testing workpaper']
        ]
      );
    } else if (activeAuditTab === 'finding') {
      html = tablePanel(
        'Finding template',
        'Standard finding structure.',
        ['Section', 'Purpose', 'Example'],
        [
          ['Title', 'Short issue name', 'Vendor approval not consistently performed'],
          ['Criteria', 'What should happen', 'Policy requires approval before vendor creation'],
          ['Condition', 'What was found', '8 of 25 vendors had no approval evidence'],
          ['Cause', 'Why it happened', 'Workflow is manual'],
          ['Impact', 'Risk or consequence', 'Fake vendor and unauthorized payment risk'],
          ['Recommendation', 'What should be fixed', 'Implement system-enforced approval']
        ]
      );
    } else if (activeAuditTab === 'report') {
      html = tablePanel(
        'Internal audit report template',
        'Default report structure.',
        ['Report section', 'Content', 'Owner'],
        [
          ['Executive summary', 'Overall conclusion and key themes', 'Audit manager'],
          ['Audit objective and scope', 'What was reviewed and excluded', 'Senior auditor'],
          ['Overall audit rating', 'Satisfactory, needs improvement, unsatisfactory', 'Audit manager'],
          ['Detailed findings', 'Finding, rating, criteria, condition, impact', 'Auditor'],
          ['Management response', 'Action, owner and due date', 'Client management']
        ]
      );
    } else if (activeAuditTab === 'followUp') {
      html = tablePanel(
        'Follow-up settings',
        'How findings move from open to closed.',
        ['Setting', 'Default value', 'Purpose'],
        [
          ['Action statuses', 'Open → In progress → Evidence submitted → IA reviewing → Closed', 'Standard workflow'],
          ['Overdue rule', 'Due date passed and not closed', 'Flags overdue actions'],
          ['High-risk escalation', 'Escalate after 30 overdue days', 'Makes serious matters visible'],
          ['Closure evidence required', 'Yes', 'Prevents closure without proof']
        ]
      );
    }

    return html;
  }

  global.renderInternalAuditSettings = render;
})(typeof window !== 'undefined' ? window : this);
