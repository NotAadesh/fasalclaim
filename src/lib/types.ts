export type UserRole = 'farmer' | 'institutional' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  state: string;
  district: string;
  role: UserRole;
  fpoOrOrgName?: string;
  createdAt: string;
}

export type DocumentType = 
  | 'aadhaar'
  | 'land_record_7_12'
  | 'bank_passbook'
  | 'sowing_certificate'
  | 'pmfby_receipt'
  | 'crop_loss_intimation'
  | 'other';

export type DocumentCheckStatus = 
  | 'verified'
  | 'mismatch'
  | 'missing'
  | 'needs_review';

export interface ClaimDocument {
  id: string;
  caseId: string;
  docType: DocumentType;
  title: string;
  fileName: string;
  fileSize: string;
  uploadedAt: string;
  status: DocumentCheckStatus;
  extractedData?: {
    farmerName?: string;
    surveyNumber?: string;
    accountNumber?: string;
    ifscCode?: string;
    bankName?: string;
    landArea?: string;
    cropName?: string;
    applicationRef?: string;
  };
  notes?: string;
}

export type CheckStatus = 
  | 'potential_mismatch'
  | 'missing_information'
  | 'looks_consistent'
  | 'needs_review';

export interface RadarCheckFinding {
  id: string;
  caseId: string;
  category: 'identity' | 'banking' | 'land' | 'policy' | 'timeline';
  title: string;
  fieldChecked: string;
  status: CheckStatus;
  whatWasChecked: string;
  whatAppearsInconsistent: string;
  enteredValue: string;
  documentValue: string;
  whyItMatters: string;
  howToVerifyOrCorrect: string;
  confidenceScore: number;
}

export type ConfidenceLevel = 
  | 'high'
  | 'moderate'
  | 'tentative'
  | 'insufficient_evidence';

export interface SourceReference {
  title: string;
  ruleSection: string;
  issuingAuthority: string;
  dateVerified: string;
  isVerified: boolean;
  notes?: string;
}

export interface DiagnosisFinding {
  finding_id: string;
  category: 
    | 'banking_mismatch'
    | 'land_survey_variance'
    | 'cce_yield_delay'
    | 'intimation_timeline'
    | 'area_discrepancy'
    | 'subsidy_pending';
  title: string;
  description: string;
  evidence: string[];
  missing_information: string[];
  confidence_level: ConfidenceLevel;
  confidence_percentage: number;
  uncertainty_note: string;
  recommended_next_action: string;
  suggested_follow_up_date: string;
  source_reference: SourceReference;
  rule_version: string;
  created_at: string;
}

export type ClaimStatus = 
  | 'draft'
  | 'under_review'
  | 'discrepancy_detected'
  | 'escalation_prepared'
  | 'grievance_submitted'
  | 'resolved';

export interface TimelineItem {
  id: string;
  caseId: string;
  timestamp: string;
  title: string;
  description: string;
  actor: 'farmer' | 'system' | 'institution' | 'insurer';
  type: 'creation' | 'radar_check' | 'diagnosis' | 'escalation' | 'submission' | 'update';
}

export interface GrievanceDraft {
  id: string;
  caseId: string;
  recipientType: 
    | 'district_level_committee'
    | 'state_grievance_committee'
    | 'insurer_nodal_officer'
    | 'bank_branch_manager';
  recipientName: string;
  recipientAddress: string;
  subject: string;
  draftBody: string;
  evidenceReferences: string[];
  missingDocsAttached: string[];
  suggestedFollowUpDays: number;
  status: 
    | 'draft'
    | 'pending_user_submission'
    | 'submitted_offline'
    | 'submitted_online'
    | 'acknowledged'
    | 'hearing_scheduled'
    | 'resolved';
  submissionDate?: string;
  submissionReferenceNumber?: string;
  submissionNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ClaimCase {
  id: string;
  caseNumber: string;
  farmerName: string;
  phone: string;
  aadhaarLast4: string;
  state: string;
  district: string;
  taluka: string;
  village: string;
  crop: string;
  season: string;
  year: number;
  surveyNumber: string;
  insuredAreaHectares: number;
  sumInsuredInr: number;
  policyNumber: string;
  applicationNumber: string;
  insurerName: string;
  bankName: string;
  bankBranch: string;
  accountNumberLast4: string;
  ifscCode: string;
  lossDate: string;
  lossReason: string;
  applicationDate: string;
  claimIntimationDate: string;
  status: ClaimStatus;
  documents: ClaimDocument[];
  radarFindings: RadarCheckFinding[];
  diagnosisFindings: DiagnosisFinding[];
  timeline: TimelineItem[];
  grievances: GrievanceDraft[];
  createdAt: string;
  updatedAt: string;
}

export interface InstitutionalBottleneckStats {
  totalDemoCases: number;
  bottlenecksIdentified: number;
  averageDelayDays: number;
  resolvedThroughEvidence: number;
  discrepanciesByCategory: {
    category: string;
    count: number;
    percentage: number;
    avgResolutionDays: number;
  }[];
  turnaroundMilestones: {
    stage: string;
    officialBenchmarkDays: number;
    actualAverageDays: number;
  }[];
  districtDistribution: {
    district: string;
    cases: number;
    discrepancyRate: number;
    status: 'High' | 'Moderate' | 'Low';
  }[];
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  caseNumber: string;
  details: string;
  ipAddress: string;
}

export interface DiagnosisRuleConfig {
  id: string;
  ruleCode: string;
  name: string;
  category: string;
  description: string;
  applicableScheme: string;
  statutorySource: string;
  ruleSection: string;
  isVerified: boolean;
  isActive: boolean;
  lastUpdated: string;
  ruleVersion: string;
}

