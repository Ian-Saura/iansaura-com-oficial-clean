export interface Week {
  week: number;
  title: string;
  points: string[];
}

export interface Cohort {
  status: string;
  label: string;
}

export interface CTAButton {
  label: string;
  href: string;
  external?: boolean;
}

export interface CTA {
  primary: CTAButton;
  secondary: CTAButton;
  extras?: CTAButton[];
}
export interface FAQ {
  question: string;
  answer: string;
}

export interface Methodology {
  weeklyFlow: string[];
  resources: string[];
}

export interface PricingInfo {
  price: string;
  paymentOptions: string[];
  includes: string[];
}

export interface ScheduleItem {
  name: string;
  startDate: string;
  classes: string;
  capacity?: string;
}

export interface FinalCTA {
  title: string;
  actions: CTAButton[];
}

export interface InstructorInfo {
  main: string;
  collaborator?: {
    name: string;
    linkedin: string;
    title: string;
    credentials: string;
  };
}

export interface Bootcamp {
  slug: string;
  title: string;
  subtitle?: string;
  instructor_info?: InstructorInfo;
  duration: string;
  capacity: number;
  cohort: Cohort;
  cta: CTA;
  audience: string[];
  outcomes: string[];
  project: string[];
  projectTitle?: string;
  projectSummary?: string;
  projectNote?: string;
  skills?: string[];
  methodology?: Methodology;
  pricing?: PricingInfo;
  schedule?: ScheduleItem[];
  finalCta?: FinalCTA;
  syllabus: Week[];
  faq: FAQ[];
}


