export interface Employee {
  id: string;
  name: string;
  title: string;
  department: string;
  email: string;
  phone: string;
  office: string;
  avatar?: string;
  note?: {
    text: string;
    startDate: string;
    endDate: string;
    isActive: boolean;
  };
}

export interface Rule {
  id: string;
  order: number;
  name: string;
  who: string;
  appliesTo: 'External, new mail' | 'External' | 'Internal, replies' | 'Everything else';
  template: string;
  status: 'Live' | 'Pilot' | 'Draft';
}

export interface SignatureTemplate {
  id: string;
  name: string;
  tagline?: string;
  hasLogo: boolean;
  hasBanner: boolean;
  bannerText?: string;
  bannerColor?: string;
  disclaimer: string;
}

export interface ChangeHistoryItem {
  id: string;
  when: string;
  who: string;
  role: 'Admin' | 'Employee' | 'HR' | 'Legal';
  whatChanged: string;
  canRestore: boolean;
}

export interface StaffIssue {
  id: string;
  name: string;
  email: string;
  missingField: string;
  department: string;
}
