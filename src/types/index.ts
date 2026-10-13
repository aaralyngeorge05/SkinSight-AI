export type PageTab =
  | 'home'
  | 'detection'
  | 'abcde'
  | 'history'
  | 'dermatologists'
  | 'about';

export interface SavedScan {
  id: string;
  timestamp: string;
  imageThumbnail: string;
  prediction: string;
  probability: number;
  bodyLocation: string;
  primaryFinding: string;
  confidenceScore?: number;
  malignancyRisk?: string;
  notes?: string;
  fullResult?: any;
}

export interface AnalysisResult {
  prediction: 'Cancer' | 'Not Cancer';
  probability: number;
  malignancyRisk: 'High' | 'Moderate' | 'Low';
  confidenceScore: number;
  primaryFinding: string;
  differentialDiagnosis: Array<{
    condition: string;
    probability: number;
    category: 'Malignant' | 'Benign' | 'Premalignant';
    description: string;
  }>;
  abcdeCriteria: {
    asymmetry: { score: string; risk: string; findings: string };
    border: { score: string; risk: string; findings: string };
    color: { score: string; risk: string; findings: string };
    diameter: { score: string; risk: string; findings: string };
    evolution: { score: string; risk: string; findings: string };
  };
  dermatoscopyFeatures: string[];
  clinicalAction: {
    urgency: string;
    recommendation: string;
    redFlags: string[];
  };
  technicalDetails?: {
    opencvProcessing: string;
    cnnFeatureMapSummary: string;
  };
}

export interface DermatologistCenter {
  id: string;
  name: string;
  department: string;
  area: string;
  zone: 'South' | 'North' | 'Central' | 'East' | 'West';
  address: string;
  phone: string;
  websiteUrl: string;
  appointmentUrl: string;
  specialties: string[];
  hasOncologySpecialist: boolean;
  type: 'Private Tertiary Hospital' | 'Medical College Hospital' | 'Specialized Cancer Centre';
  description: string;
}
