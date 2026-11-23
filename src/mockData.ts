import { Employee, Rule, SignatureTemplate, ChangeHistoryItem, StaffIssue } from './types';

export const INITIAL_EMPLOYEES: Employee[] = [
  {
    id: 'emp-1',
    name: 'Vikram Rajput',
    title: 'Lead Cloud Solutions Architect',
    department: 'Digital Solutions',
    email: 'vikram.kumar@compunnel.com',
    phone: '+1 (609) 606-9010',
    office: 'New Jersey, USA',
    note: {
      text: 'I am on leave from Nov 28 to Dec 02. For urgent matters please contact digital-support@compunnel.com.',
      startDate: '2026-11-28',
      endDate: '2026-12-02',
      isActive: true,
    },
  },
  {
    id: 'emp-2',
    name: 'Sarah Jenkins',
    title: 'VP of Marketing & Brand',
    department: 'Marketing',
    email: 'sjenkins@compunnel.com',
    phone: '+1 (609) 606-9022',
    office: 'New York, USA',
  },
  {
    id: 'emp-3',
    name: 'Amitabh Sharma',
    title: 'Senior Enterprise Account Executive',
    department: 'Enterprise Sales',
    email: 'asharma@compunnel.com',
    phone: '+1 (609) 606-9034',
    office: 'London, UK',
  },
  {
    id: 'emp-4',
    name: 'Elena Rostova',
    title: 'Director of People Operations',
    department: 'Human Resources',
    email: 'erostova@compunnel.com',
    phone: '+1 (609) 606-9045',
    office: 'New Jersey, USA',
  },
  {
    id: 'emp-5',
    name: 'David Chen',
    title: 'Principal Software Engineer',
    department: 'Engineering',
    email: 'dchen@compunnel.com',
    phone: '+1 (609) 606-9051',
    office: 'Toronto, Canada',
  },
];

export const INITIAL_RULES: Rule[] = [
  {
    order: 1,
    id: 'rule-1',
    name: 'Executive & Brand External',
    who: 'Leadership & Marketing',
    appliesTo: 'External, new mail',
    template: 'Brand Impact Template (with dynamic campaign banner)',
    status: 'Live',
  },
  {
    order: 2,
    id: 'rule-2',
    name: 'Sales & Client Facing',
    who: 'Enterprise Sales',
    appliesTo: 'External',
    template: 'Client Focused Template with meeting link',
    status: 'Live',
  },
  {
    order: 3,
    id: 'rule-3',
    name: 'Internal Collaboration & Threads',
    who: 'All staff',
    appliesTo: 'Internal, replies',
    template: 'Short Compact Template',
    status: 'Live',
  },
  {
    order: 4,
    id: 'rule-4',
    name: 'Default Corporate Standard',
    who: 'All staff',
    appliesTo: 'Everything else',
    template: 'Compunnel Standard Corporate Template',
    status: 'Pilot',
  },
];

export const INITIAL_TEMPLATES: SignatureTemplate[] = [
  {
    id: 'tpl-standard',
    name: 'Compunnel Standard Corporate Template',
    tagline: 'Clean, professional corporate layout with M365 directory sync',
    hasLogo: true,
    hasBanner: false,
    disclaimer: 'CONFIDENTIALITY NOTICE: This transmission, including any attachments, is intended solely for the addressee(s).',
  },
  {
    id: 'tpl-banner',
    name: 'Brand Impact Template (with dynamic campaign banner)',
    tagline: 'Marketing promotional banner with clickable link and tracking',
    hasLogo: true,
    hasBanner: true,
    bannerText: '🚀 Explore Compunnel AI Solutions 2026 • Discover the Future of Workplace AI',
    bannerColor: 'from-blue-600 to-indigo-700',
    disclaimer: 'This email and attachments are confidential and intended solely for the recipient. Compunnel Digital Inc.',
  },
  {
    id: 'tpl-short',
    name: 'Short Compact Template',
    tagline: 'Streamlined design for internal emails and long reply threads',
    hasLogo: false,
    hasBanner: false,
    disclaimer: 'Internal Compunnel Communication.',
  },
];

export const INITIAL_HISTORY: ChangeHistoryItem[] = [
  {
    id: 'hist-1',
    when: 'Today at 07:15 PM',
    who: 'Admin (IT)',
    role: 'Admin',
    whatChanged: 'Updated Legal Disclaimer text across all external templates',
    canRestore: true,
  },
  {
    id: 'hist-2',
    when: 'Today at 05:40 PM',
    who: 'Vikram Rajput',
    role: 'Employee',
    whatChanged: 'Personal leave note added: "On leave Nov 28 to Dec 02"',
    canRestore: false,
  },
  {
    id: 'hist-3',
    when: 'Today at 02:30 PM',
    who: 'Admin (Marketing)',
    role: 'Admin',
    whatChanged: 'Replaced Fall Campaign Banner with "AI Solutions 2026"',
    canRestore: true,
  },
  {
    id: 'hist-4',
    when: 'Yesterday at 04:15 PM',
    who: 'Admin (IT)',
    role: 'Admin',
    whatChanged: 'Rule order priority updated for "Sales & Client Facing"',
    canRestore: true,
  },
];

export const INITIAL_STAFF_ISSUES: StaffIssue[] = [
  { id: 'iss-1', name: 'Marcus Bell', email: 'mbell@compunnel.com', missingField: 'Direct Phone', department: 'Consulting' },
  { id: 'iss-2', name: 'Priya Narayanan', email: 'pnarayanan@compunnel.com', missingField: 'Job Title', department: 'Talent Acquisition' },
  { id: 'iss-3', name: 'Keith Robinson', email: 'krobinson@compunnel.com', missingField: 'Office Location', department: 'Operations' },
];
