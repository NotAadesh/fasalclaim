import { 
  ClaimCase, 
  InstitutionalBottleneckStats, 
  AuditLogEntry, 
  DiagnosisRuleConfig 
} from './types';
import { DiagnosisEngine } from './diagnosis-engine';
import { RadarEngine } from './radar-engine';

export const INITIAL_DEMO_CASES: ClaimCase[] = [
  {
    id: 'case-demo-01',
    caseNumber: 'FC-2024-MH-8491',
    farmerName: 'Rameshwar Vitthal Patil',
    phone: '+91 98221 40912',
    aadhaarLast4: '7182',
    state: 'Maharashtra',
    district: 'Beed',
    taluka: 'Georai',
    village: 'Kolgaon',
    crop: 'Soybean (Glycine max)',
    season: 'Kharif',
    year: 2024,
    surveyNumber: '142/2A',
    insuredAreaHectares: 2.4,
    sumInsuredInr: 96000,
    policyNumber: 'PMFBY-2024-MH-994821',
    applicationNumber: 'NCIP-APP-2024-0019284',
    insurerName: 'Agriculture Insurance Company of India (AIC)',
    bankName: 'Bank of Maharashtra',
    bankBranch: 'Georai Rural Branch',
    accountNumberLast4: '3419',
    ifscCode: 'MAHB0000421',
    lossDate: '2024-09-14',
    lossReason: 'Inundation / Flooding (Localized Calamity)',
    applicationDate: '2024-07-12',
    claimIntimationDate: '2024-09-16',
    status: 'discrepancy_detected',
    documents: [
      {
        id: 'doc-01-passbook',
        caseId: 'case-demo-01',
        docType: 'bank_passbook',
        title: 'Bank of Maharashtra Passbook (Front Page)',
        fileName: 'passbook_front_scan.pdf',
        fileSize: '1.2 MB',
        uploadedAt: '2024-09-20',
        status: 'mismatch',
        extractedData: {
          farmerName: 'Ramesh Vitthal Patil',
          accountNumber: 'XXXX-XXXX-3419',
          ifscCode: 'MAHB0000421',
          bankName: 'Bank of Maharashtra'
        },
        notes: 'Spelling on passbook reads "Ramesh" instead of "Rameshwar"'
      },
      {
        id: 'doc-01-land',
        caseId: 'case-demo-01',
        docType: 'land_record_7_12',
        title: 'Digital 7/12 Extract (Mahabhulekh)',
        fileName: '7_12_extract_kolgaon.pdf',
        fileSize: '840 KB',
        uploadedAt: '2024-09-20',
        status: 'mismatch',
        extractedData: {
          surveyNumber: '142/2',
          farmerName: 'Rameshwar Vitthal Patil',
          landArea: '2.40'
        },
        notes: 'Survey in revenue record reads 142/2 without sub-division suffix A'
      },
      {
        id: 'doc-01-receipt',
        caseId: 'case-demo-01',
        docType: 'pmfby_receipt',
        title: 'NCIP Portal Acknowledgment Receipt',
        fileName: 'ncip_enrollment_receipt.pdf',
        fileSize: '512 KB',
        uploadedAt: '2024-09-21',
        status: 'verified',
        extractedData: {
          applicationRef: 'NCIP-APP-2024-0019284',
          cropName: 'Soybean',
          farmerName: 'Rameshwar Vitthal Patil'
        }
      }
    ],
    radarFindings: [],
    diagnosisFindings: [],
    timeline: [
      {
        id: 'time-1',
        caseId: 'case-demo-01',
        timestamp: '2024-07-12 11:20 AM',
        title: 'Policy Enrolled via CSC Center',
        description: 'Application successfully registered under PMFBY Kharif 2024 with farmer premium share ₹1,920 debited.',
        actor: 'farmer',
        type: 'creation'
      },
      {
        id: 'time-2',
        caseId: 'case-demo-01',
        timestamp: '2024-09-14 06:00 PM',
        title: 'Crop Inundation Calamity Occurred',
        description: 'Continuous heavy rainfall in Godavari river basin led to submergence of standing soybean crop for 48+ hours.',
        actor: 'farmer',
        type: 'update'
      },
      {
        id: 'time-3',
        caseId: 'case-demo-01',
        timestamp: '2024-09-16 02:40 PM',
        title: 'Claim Intimation Lodged via Helpline',
        description: 'Intimation reference #NCIP-LOSS-89312 logged within 48 hours of event.',
        actor: 'farmer',
        type: 'update'
      },
      {
        id: 'time-4',
        caseId: 'case-demo-01',
        timestamp: '2024-10-04 09:15 AM',
        title: 'Pre-Claim Radar Check Executed',
        description: 'Automated verification identified 2 discrepancies: Bank account name alias variance and Land parcel sub-division divergence.',
        actor: 'system',
        type: 'radar_check'
      },
      {
        id: 'time-5',
        caseId: 'case-demo-01',
        timestamp: '2024-10-04 09:16 AM',
        title: 'Evidence-Backed Diagnosis Generated',
        description: 'Diagnosis report compiled citing PMFBY Section 13.4 and Section 7.1 with clear non-adversarial resolution steps.',
        actor: 'system',
        type: 'diagnosis'
      }
    ],
    grievances: [
      {
        id: 'grv-01',
        caseId: 'case-demo-01',
        recipientType: 'district_level_committee',
        recipientName: 'District Level Grievance Redressal Committee (DLMC)',
        recipientAddress: 'Office of the District Agriculture Officer, Collectorate Campus, Beed, Maharashtra 431122',
        subject: 'Rectification of Name & Sub-Division Detail for Soybean Crop Loss Claim #NCIP-APP-2024-0019284',
        draftBody: `To,\nThe District Level Grievance Redressal Committee (DLMC),\nCollectorate Campus, Beed, Maharashtra 431122.\n\nRespected Sir/Madam,\n\nSubject: Request for clerical rectification of Name alias and Land Sub-division for Kharif 2024 PMFBY Claim Ref: NCIP-APP-2024-0019284.\n\nI, Rameshwar Vitthal Patil, resident of Village Kolgaon, Taluka Georai, District Beed, respectfully submit that my standing soybean crop over 2.40 Hectares in Survey No. 142/2A suffered complete inundation on 14th September 2024, intimated under Ref #NCIP-LOSS-89312.\n\nUpon reviewing my documentary verification on FasalClaim, I identified two administrative bottlenecks:\n1. Bank Passbook Name Alias: My bank passbook records my name as "Ramesh Vitthal Patil" whereas my Aadhaar and NCIP record state "Rameshwar Vitthal Patil". Attached is a bank branch manager endorsement confirming both refer to the identical account holder.\n2. Survey Sub-division: The policy mentions Survey 142/2A, corresponding to parent revenue parcel 142/2. Attached is the Talathi parcel confirmation.\n\nIn accordance with PMFBY Revised Operational Guidelines Section 13.4, I request the committee to direct the insurer (AIC of India) to accept these verified documents and release my legitimate claim disbursement via DBT.\n\nThanking you,\nYours faithfully,\nRameshwar Vitthal Patil\nPhone: +91 98221 40912`,
        evidenceReferences: [
          'Bank Passbook First Page showing Account #XXXX-3419',
          'Aadhaar e-KYC copy matching biometric credentials',
          'Talathi Joint Parcel Certificate for Survey 142/2',
          'PMFBY Claim Intimation Slip dated 16-Sep-2024'
        ],
        missingDocsAttached: [
          'Bank Branch Manager Name Endorsement Certificate',
          'Talathi Revenue Map Extract'
        ],
        suggestedFollowUpDays: 14,
        status: 'draft',
        createdAt: '2024-10-04',
        updatedAt: '2024-10-04'
      }
    ],
    createdAt: '2024-07-12',
    updatedAt: '2024-10-04'
  },
  {
    id: 'case-demo-02',
    caseNumber: 'FC-2024-GJ-3104',
    farmerName: 'Sumanben Mohanbhai Patel',
    phone: '+91 94280 19342',
    aadhaarLast4: '4910',
    state: 'Gujarat',
    district: 'Rajkot',
    taluka: 'Gondal',
    village: 'Moti Marad',
    crop: 'Groundnut (Arachis hypogaea)',
    season: 'Kharif',
    year: 2024,
    surveyNumber: '88/1',
    insuredAreaHectares: 3.1,
    sumInsuredInr: 124000,
    policyNumber: 'PMFBY-2024-GJ-881029',
    applicationNumber: 'NCIP-APP-2024-0081293',
    insurerName: 'SBI General Insurance Company',
    bankName: 'State Bank of India',
    bankBranch: 'Gondal Main Branch',
    accountNumberLast4: '9012',
    ifscCode: 'SBIN0000378',
    lossDate: '2024-08-28',
    lossReason: 'Drought / Prolonged Dry Spell (Widespread Calamity)',
    applicationDate: '2024-07-15',
    claimIntimationDate: '2024-09-02',
    status: 'under_review',
    documents: [
      {
        id: 'doc-02-passbook',
        caseId: 'case-demo-02',
        docType: 'bank_passbook',
        title: 'SBI Passbook Account Page',
        fileName: 'sbi_passbook_sumanben.pdf',
        fileSize: '950 KB',
        uploadedAt: '2024-09-05',
        status: 'verified',
        extractedData: {
          farmerName: 'Sumanben Mohanbhai Patel',
          accountNumber: 'XXXX-XXXX-9012',
          ifscCode: 'SBIN0000378'
        }
      },
      {
        id: 'doc-02-land',
        caseId: 'case-demo-02',
        docType: 'land_record_7_12',
        title: 'Digital RoR (AnyRoR Gujarat)',
        fileName: 'anyror_gondal_88_1.pdf',
        fileSize: '1.1 MB',
        uploadedAt: '2024-09-05',
        status: 'verified',
        extractedData: {
          surveyNumber: '88/1',
          farmerName: 'Sumanben Mohanbhai Patel',
          landArea: '3.10'
        }
      }
    ],
    radarFindings: [],
    diagnosisFindings: [],
    timeline: [
      {
        id: 'time-2-1',
        caseId: 'case-demo-02',
        timestamp: '2024-07-15 03:00 PM',
        title: 'Policy Enrolled via PACS',
        description: 'Premium payment processed for Groundnut insurance unit.',
        actor: 'farmer',
        type: 'creation'
      },
      {
        id: 'time-2-2',
        caseId: 'case-demo-02',
        timestamp: '2024-09-05 10:10 AM',
        title: 'Pre-Claim Error Radar Executed',
        description: 'Document check: Bank and Land information are completely consistent.',
        actor: 'system',
        type: 'radar_check'
      },
      {
        id: 'time-2-3',
        caseId: 'case-demo-02',
        timestamp: '2024-09-05 10:12 AM',
        title: 'Diagnosis Report Compiled',
        description: 'Issue diagnosed as awaiting Crop Cutting Experiment (CCE) Actual Yield data release by Directorate of Agriculture.',
        actor: 'system',
        type: 'diagnosis'
      }
    ],
    grievances: [],
    createdAt: '2024-07-15',
    updatedAt: '2024-09-05'
  },
  {
    id: 'case-demo-03',
    caseNumber: 'FC-2024-PB-1942',
    farmerName: 'Sukhdev Singh Dhillon',
    phone: '+91 98140 82194',
    aadhaarLast4: '8821',
    state: 'Punjab',
    district: 'Sangrur',
    taluka: 'Sunam',
    village: 'Chhajli',
    crop: 'Paddy (Basmati 1121)',
    season: 'Kharif',
    year: 2024,
    surveyNumber: '54/12',
    insuredAreaHectares: 4.0,
    sumInsuredInr: 160000,
    policyNumber: 'PMFBY-2024-PB-440192',
    applicationNumber: 'NCIP-APP-2024-0041289',
    insurerName: 'HDFC ERGO General Insurance',
    bankName: 'Punjab National Bank',
    bankBranch: 'Sunam Grain Market',
    accountNumberLast4: '5510',
    ifscCode: 'PUNB0128900',
    lossDate: '2024-10-02',
    lossReason: 'Post-Harvest Unseasonal Rain (Bundled Paddy Submersion)',
    applicationDate: '2024-07-20',
    claimIntimationDate: '2024-10-08',
    status: 'escalation_prepared',
    documents: [
      {
        id: 'doc-03-passbook',
        caseId: 'case-demo-03',
        docType: 'bank_passbook',
        title: 'PNB Passbook',
        fileName: 'pnb_passbook_sukhdev.pdf',
        fileSize: '780 KB',
        uploadedAt: '2024-10-10',
        status: 'verified',
        extractedData: {
          farmerName: 'Sukhdev Singh Dhillon',
          accountNumber: 'XXXX-XXXX-5510',
          ifscCode: 'PUNB0128900'
        }
      }
    ],
    radarFindings: [],
    diagnosisFindings: [],
    timeline: [
      {
        id: 'time-3-1',
        caseId: 'case-demo-03',
        timestamp: '2024-07-20 10:00 AM',
        title: 'Enrollment Confirmed',
        description: 'Kharif Paddy coverage activated.',
        actor: 'farmer',
        type: 'creation'
      },
      {
        id: 'time-3-2',
        caseId: 'case-demo-03',
        timestamp: '2024-10-10 11:30 AM',
        title: '72-Hour Intimation Window Flagged',
        description: 'Elapsed intimation time of 6 days flagged due to severe localized internet suspension in district.',
        actor: 'system',
        type: 'radar_check'
      }
    ],
    grievances: [
      {
        id: 'grv-03',
        caseId: 'case-demo-03',
        recipientType: 'district_level_committee',
        recipientName: 'District Level Monitoring Committee (DLMC), Sangrur',
        recipientAddress: 'DC Complex, Sangrur, Punjab 148001',
        subject: 'Condonation of 72-Hour Intimation Delay Due to District Telecom Disruption - Kharif 2024',
        draftBody: `To,\nThe Chairman, District Level Monitoring Committee (DLMC),\nDC Office, Sangrur, Punjab.\n\nRespected Sir,\n\nSubject: Request for condonation of intimation delay under PMFBY Section 11.2 for Post-Harvest loss of Paddy (Basmati) in Village Chhajli.\n\nI am Sukhdev Singh Dhillon, cultivating 4.0 Ha in Survey 54/12. My harvested paddy bundled for drying in field suffered severe waterlogging on 2nd October 2024. Due to widespread localized disruption, intimation was recorded on 8th October 2024.\n\nUnder statutory powers vested in the DLMC under Section 11.2 of PMFBY Guidelines, I appeal for condonation of delay and ordering of joint loss assessment.\n\nYours sincerely,\nSukhdev Singh Dhillon`,
        evidenceReferences: [
          'Photographs of waterlogged paddy stalks with timestamp GPS coordinates',
          'Notice of localized administrative telecom advisory'
        ],
        missingDocsAttached: ['Certified Sarpanch Panchnama'],
        suggestedFollowUpDays: 10,
        status: 'draft',
        createdAt: '2024-10-12',
        updatedAt: '2024-10-12'
      }
    ],
    createdAt: '2024-07-20',
    updatedAt: '2024-10-12'
  }
];

// Initialize radar and diagnosis findings for demo cases
export function getHydratedDemoCases(): ClaimCase[] {
  return INITIAL_DEMO_CASES.map(claim => {
    const radarFindings = RadarEngine.runRadarChecks(claim);
    const diagnosis = DiagnosisEngine.diagnoseCase(claim);
    return {
      ...claim,
      radarFindings,
      diagnosisFindings: diagnosis.findings
    };
  });
}

export const DEMO_INSTITUTIONAL_STATS: InstitutionalBottleneckStats = {
  totalDemoCases: 1480,
  bottlenecksIdentified: 894,
  averageDelayDays: 68,
  resolvedThroughEvidence: 642,
  discrepanciesByCategory: [
    {
      category: 'Bank Account & IFSC Mismatch',
      count: 366,
      percentage: 41,
      avgResolutionDays: 24
    },
    {
      category: 'Land Survey / Sub-Division Variance',
      count: 241,
      percentage: 27,
      avgResolutionDays: 38
    },
    {
      category: 'Yield Estimation (CCE) Tabulation Hold',
      count: 170,
      percentage: 19,
      avgResolutionDays: 74
    },
    {
      category: '72-Hour Loss Intimation Dispute',
      count: 117,
      percentage: 13,
      avgResolutionDays: 42
    }
  ],
  turnaroundMilestones: [
    {
      stage: 'Claim Intimation to Joint Survey',
      officialBenchmarkDays: 10,
      actualAverageDays: 28
    },
    {
      stage: 'Survey Submission to Insurer Decision',
      officialBenchmarkDays: 15,
      actualAverageDays: 39
    },
    {
      stage: 'Fund Sanction to DBT Credit',
      officialBenchmarkDays: 7,
      actualAverageDays: 26
    },
    {
      stage: 'Grievance Redressal Committee Review',
      officialBenchmarkDays: 15,
      actualAverageDays: 48
    }
  ],
  districtDistribution: [
    { district: 'Beed (Maharashtra)', cases: 412, discrepancyRate: 64, status: 'High' },
    { district: 'Rajkot (Gujarat)', cases: 286, discrepancyRate: 38, status: 'Moderate' },
    { district: 'Sangrur (Punjab)', cases: 210, discrepancyRate: 42, status: 'Moderate' },
    { district: 'Shivamogga (Karnataka)', cases: 198, discrepancyRate: 29, status: 'Low' },
    { district: 'Dewas (Madhya Pradesh)', cases: 224, discrepancyRate: 51, status: 'High' },
    { district: 'Cuttack (Odisha)', cases: 150, discrepancyRate: 33, status: 'Low' }
  ]
};

export const DEMO_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'aud-01',
    timestamp: '2024-10-28 10:14:22',
    actor: 'Farmer (Self)',
    action: 'Radar Check Executed',
    caseNumber: 'FC-2024-MH-8491',
    details: 'Automated 5-point document validation run. Identified IFSC and Name alias mismatch.',
    ipAddress: '103.21.124.9'
  },
  {
    id: 'aud-02',
    timestamp: '2024-10-28 10:18:40',
    actor: 'Farmer (Self)',
    action: 'Grievance Draft Generated',
    caseNumber: 'FC-2024-MH-8491',
    details: 'Generated DLMC petition citing PMFBY Section 13.4 and Bank Endorsement.',
    ipAddress: '103.21.124.9'
  },
  {
    id: 'aud-03',
    timestamp: '2024-10-27 16:45:10',
    actor: 'Institutional Officer (Beed FPO)',
    action: 'Bottleneck Aggregate Query',
    caseNumber: 'N/A (Aggregate)',
    details: 'Filtered district cases by Kharif 2024 Soybean. Exported anonymized summary.',
    ipAddress: '115.110.82.44'
  },
  {
    id: 'aud-04',
    timestamp: '2024-10-25 11:02:18',
    actor: 'System Administrator',
    action: 'Rule Engine Version Update',
    caseNumber: 'GLOBAL',
    details: 'Updated Rule R101 (Bank Rectification) citing DA&FW Circular Ref #13015/2023.',
    ipAddress: '14.139.120.2'
  }
];

export const DEMO_RULE_CONFIGS: DiagnosisRuleConfig[] = [
  {
    id: 'rule-cfg-101',
    ruleCode: 'R101',
    name: 'Bank Account & IFSC Rectification Protocol',
    category: 'Banking / DBT',
    description: 'Verifies character sequence of farmer name and validates IFSC routing active status.',
    applicableScheme: 'PMFBY / Restructured WBCIS',
    statutorySource: 'Revised Operational Guidelines (Section 13.4)',
    ruleSection: 'Section 13.4 & PFMS DBT Manual',
    isVerified: true,
    isActive: true,
    lastUpdated: '2024-06-15',
    ruleVersion: 'v2.4.1'
  },
  {
    id: 'rule-cfg-102',
    ruleCode: 'R102',
    name: 'Cadastral Survey Number & Sub-Division Validation',
    category: 'Land Records',
    description: 'Cross-references digitized land RoR (7/12, Khasra, Khatauni) with insurance policy schedule.',
    applicableScheme: 'PMFBY Cadastral Protocol',
    statutorySource: 'State Revenue Department & SLCCCI Standards',
    ruleSection: 'Section 7.1 (Area Discrepancy Regulations)',
    isVerified: true,
    isActive: true,
    lastUpdated: '2024-05-10',
    ruleVersion: 'v2.4.1'
  },
  {
    id: 'rule-cfg-103',
    ruleCode: 'R103',
    name: 'Localized Calamity 72-Hour Loss Intimation & Condonation',
    category: 'Timeline / Eligibility',
    description: 'Calculates elapsed hours between loss event and intimation; validates DLMC condonation criteria.',
    applicableScheme: 'PMFBY Localized Calamities',
    statutorySource: 'Ministry of Agriculture Guidelines',
    ruleSection: 'Section 11.2 (Mandatory 72-Hour Notice)',
    isVerified: true,
    isActive: true,
    lastUpdated: '2024-07-01',
    ruleVersion: 'v2.4.1'
  },
  {
    id: 'rule-cfg-104',
    ruleCode: 'R104',
    name: 'CCE Actual Yield Threshold Shortfall Calculation',
    category: 'Yield Assessment',
    description: 'Determines shortfall percentage: (Threshold Yield - Actual Yield) / Threshold Yield * Sum Insured.',
    applicableScheme: 'PMFBY Area-Yield Units',
    statutorySource: 'Directorate of Economics & Statistics',
    ruleSection: 'Section 12.1 (Assessment of Yield Loss)',
    isVerified: true,
    isActive: true,
    lastUpdated: '2024-07-01',
    ruleVersion: 'v2.4.1'
  },
  {
    id: 'rule-cfg-105',
    ruleCode: 'R105',
    name: 'Delayed Claim 12% Per Annum Penal Interest Assessment',
    category: 'Interest & Penalty',
    description: 'Assesses statutory 12% annual interest liability on insurer if claim settlement is delayed beyond 21 days from receipt of claims funds / subsidy.',
    applicableScheme: 'PMFBY Circular 2020/2023',
    statutorySource: 'PMFBY Revised Guidelines Section 15.2',
    ruleSection: 'Section 15.2 (Penal Interest Provisions)',
    isVerified: true,
    isActive: true,
    lastUpdated: '2024-08-01',
    ruleVersion: 'v2.4.1'
  }
];

