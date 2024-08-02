export interface Customer {
  name: string;
  location: string;
  signupDate: string;
  requestSource: 'phone' | 'web app';
  investmentDate: string;
  investmentTime: string;
  refundRequestDate: string;
  refundRequestTime: string;
}

export interface ApprovalLimits {
  oldTOS: number;
  newTOS: number;
}

export const approvalLimits: Record<'phone' | 'web app', ApprovalLimits> = {
  phone: { oldTOS: 4, newTOS: 24 },
  'web app': { oldTOS: 8, newTOS: 16 }
};

export const timezoneMap: Record<string, string> = {
  PST: 'America/Los_Angeles',
  EST: 'America/New_York',
  CET: 'Europe/Paris',
  GMT: 'Europe/London'
};
