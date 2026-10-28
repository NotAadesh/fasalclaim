'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  ClaimCase, 
  UserRole, 
  ClaimDocument, 
  GrievanceDraft, 
  DiagnosisRuleConfig, 
  AuditLogEntry, 
  InstitutionalBottleneckStats 
} from '../lib/types';
import { 
  getHydratedDemoCases, 
  DEMO_INSTITUTIONAL_STATS, 
  DEMO_AUDIT_LOGS, 
  DEMO_RULE_CONFIGS 
} from '../lib/initial-data';
import { DiagnosisEngine } from '../lib/diagnosis-engine';
import { RadarEngine } from '../lib/radar-engine';

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  cases: ClaimCase[];
  activeCaseId: string;
  activeCase: ClaimCase;
  setActiveCaseId: (id: string) => void;
  addCase: (data: Partial<ClaimCase>) => string;
  updateCase: (id: string, updates: Partial<ClaimCase>) => void;
  runRadarOnCase: (caseId: string) => void;
  runDiagnosisOnCase: (caseId: string) => void;
  addDocumentToCase: (caseId: string, doc: Partial<ClaimDocument>) => void;
  updateGrievance: (caseId: string, grievanceId: string, updates: Partial<GrievanceDraft>) => void;
  addGrievance: (caseId: string, draft: Partial<GrievanceDraft>) => void;
  markGrievanceSubmitted: (
    caseId: string, 
    grievanceId: string, 
    refNumber: string, 
    channel: 'submitted_offline' | 'submitted_online'
  ) => void;
  language: 'en' | 'hi';
  setLanguage: (lang: 'en' | 'hi') => void;
  institutionalStats: InstitutionalBottleneckStats;
  ruleConfigs: DiagnosisRuleConfig[];
  updateRuleConfig: (id: string, updates: Partial<DiagnosisRuleConfig>) => void;
  auditLogs: AuditLogEntry[];
  addAuditLog: (action: string, caseNumber: string, details: string) => void;
  voiceModalOpen: boolean;
  setVoiceModalOpen: (open: boolean) => void;
  resetDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<UserRole>('farmer');
  const [cases, setCases] = useState<ClaimCase[]>([]);
  const [activeCaseId, setActiveCaseId] = useState<string>('case-demo-01');
  const [language, setLanguageState] = useState<'en' | 'hi'>('en');
  const [ruleConfigs, setRuleConfigs] = useState<DiagnosisRuleConfig[]>(DEMO_RULE_CONFIGS);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(DEMO_AUDIT_LOGS);
  const [voiceModalOpen, setVoiceModalOpen] = useState<boolean>(false);
  const [institutionalStats] = useState<InstitutionalBottleneckStats>(DEMO_INSTITUTIONAL_STATS);

  const setLanguage = (lang: 'en' | 'hi') => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('fasalclaim_lang', lang);
    }
  };

  // Initialize hydrated cases and saved language on client
  useEffect(() => {
    const initialCases = getHydratedDemoCases();
    setCases(initialCases);

    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('fasalclaim_lang') as 'en' | 'hi';
      if (savedLang === 'en' || savedLang === 'hi') {
        setLanguageState(savedLang);
      }
    }
  }, []);

  const activeCase = cases.find(c => c.id === activeCaseId) || cases[0] || getHydratedDemoCases()[0];

  const addAuditLog = (action: string, caseNumber: string, details: string) => {
    const newEntry: AuditLogEntry = {
      id: `aud-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      actor: role === 'farmer' ? 'Farmer (Self)' : role === 'institutional' ? 'Institutional Officer' : 'System Administrator',
      action,
      caseNumber,
      details,
      ipAddress: '103.21.124.9'
    };
    setAuditLogs(prev => [newEntry, ...prev]);
  };

  const addCase = (data: Partial<ClaimCase>): string => {
    const id = `case-custom-${Date.now()}`;
    const caseNumber = `FC-2024-${data.state ? data.state.slice(0, 2).toUpperCase() : 'IN'}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newClaim: ClaimCase = {
      id,
      caseNumber,
      farmerName: data.farmerName || 'Devendra Kumar Verma',
      phone: data.phone || '+91 98765 43210',
      aadhaarLast4: data.aadhaarLast4 || '4321',
      state: data.state || 'Madhya Pradesh',
      district: data.district || 'Dewas',
      taluka: data.taluka || 'Sonkatch',
      village: data.village || 'Pipliya',
      crop: data.crop || 'Wheat (Triticum aestivum)',
      season: data.season || 'Rabi',
      year: data.year || 2024,
      surveyNumber: data.surveyNumber || '102/4',
      insuredAreaHectares: data.insuredAreaHectares || 1.8,
      sumInsuredInr: data.sumInsuredInr || 72000,
      policyNumber: data.policyNumber || `PMFBY-2024-MP-${Math.floor(100000 + Math.random() * 900000)}`,
      applicationNumber: data.applicationNumber || `NCIP-APP-2024-${Math.floor(1000000 + Math.random() * 9000000)}`,
      insurerName: data.insurerName || 'AIC of India',
      bankName: data.bankName || 'State Bank of India',
      bankBranch: data.bankBranch || 'Sonkatch Branch',
      accountNumberLast4: data.accountNumberLast4 || '8921',
      ifscCode: data.ifscCode || 'SBIN0001290',
      lossDate: data.lossDate || '2024-09-20',
      lossReason: data.lossReason || 'Inundation / Waterlogging',
      applicationDate: data.applicationDate || '2024-07-28',
      claimIntimationDate: data.claimIntimationDate || '2024-09-22',
      status: 'under_review',
      documents: data.documents || [],
      radarFindings: [],
      diagnosisFindings: [],
      timeline: [
        {
          id: `t-${Date.now()}`,
          caseId: id,
          timestamp: new Date().toLocaleString(),
          title: 'Case Registered in FasalClaim',
          description: 'New crop insurance case registered for assurance tracking.',
          actor: 'farmer',
          type: 'creation'
        }
      ],
      grievances: [],
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };

    // Auto-run radar & diagnosis
    newClaim.radarFindings = RadarEngine.runRadarChecks(newClaim);
    const diag = DiagnosisEngine.diagnoseCase(newClaim);
    newClaim.diagnosisFindings = diag.findings;

    setCases(prev => [newClaim, ...prev]);
    setActiveCaseId(id);
    addAuditLog('New Case Registered', newClaim.caseNumber, `Registered ${newClaim.crop} claim for ${newClaim.farmerName}`);
    return id;
  };

  const updateCase = (id: string, updates: Partial<ClaimCase>) => {
    setCases(prev => prev.map(c => {
      if (c.id !== id) return c;
      const updated = { ...c, ...updates, updatedAt: new Date().toISOString().split('T')[0] };
      // re-run checks
      updated.radarFindings = RadarEngine.runRadarChecks(updated);
      updated.diagnosisFindings = DiagnosisEngine.diagnoseCase(updated).findings;
      return updated;
    }));
  };

  const runRadarOnCase = (caseId: string) => {
    setCases(prev => prev.map(c => {
      if (c.id !== caseId) return c;
      const radarFindings = RadarEngine.runRadarChecks(c);
      const timelineItem = {
        id: `t-${Date.now()}`,
        caseId,
        timestamp: new Date().toLocaleString(),
        title: 'Pre-Claim Error Radar Executed',
        description: `Checked documents against application. ${radarFindings.filter(f => f.status === 'potential_mismatch').length} potential mismatches identified.`,
        actor: 'system' as const,
        type: 'radar_check' as const
      };
      return {
        ...c,
        radarFindings,
        timeline: [timelineItem, ...c.timeline]
      };
    }));
    addAuditLog('Pre-Claim Radar Check', activeCase.caseNumber, 'Analyzed document metadata against claim entries.');
  };

  const runDiagnosisOnCase = (caseId: string) => {
    setCases(prev => prev.map(c => {
      if (c.id !== caseId) return c;
      const diag = DiagnosisEngine.diagnoseCase(c);
      const timelineItem = {
        id: `t-${Date.now()}`,
        caseId,
        timestamp: new Date().toLocaleString(),
        title: 'Evidence-Backed Diagnosis Generated',
        description: `Deterministic engine compiled ${diag.findings.length} findings with statutory citations.`,
        actor: 'system' as const,
        type: 'diagnosis' as const
      };
      return {
        ...c,
        diagnosisFindings: diag.findings,
        timeline: [timelineItem, ...c.timeline]
      };
    }));
    addAuditLog('Evidence-Backed Diagnosis', activeCase.caseNumber, 'Compiled diagnosis report citing PMFBY guidelines.');
  };

  const addDocumentToCase = (caseId: string, doc: Partial<ClaimDocument>) => {
    const newDoc: ClaimDocument = {
      id: `doc-${Date.now()}`,
      caseId,
      docType: doc.docType || 'other',
      title: doc.title || 'Supporting Document',
      fileName: doc.fileName || 'document_upload.pdf',
      fileSize: doc.fileSize || '1.1 MB',
      uploadedAt: new Date().toISOString().split('T')[0],
      status: doc.status || 'needs_review',
      extractedData: doc.extractedData || {},
      notes: doc.notes
    };

    setCases(prev => prev.map(c => {
      if (c.id !== caseId) return c;
      const updatedDocs = [...c.documents, newDoc];
      const updatedCase = { ...c, documents: updatedDocs };
      // re-run radar & diagnosis automatically
      updatedCase.radarFindings = RadarEngine.runRadarChecks(updatedCase);
      updatedCase.diagnosisFindings = DiagnosisEngine.diagnoseCase(updatedCase).findings;
      updatedCase.timeline = [
        {
          id: `t-${Date.now()}`,
          caseId,
          timestamp: new Date().toLocaleString(),
          title: `Document Uploaded: ${newDoc.title}`,
          description: `Uploaded ${newDoc.fileName} for automated verification.`,
          actor: 'farmer',
          type: 'update'
        },
        ...c.timeline
      ];
      return updatedCase;
    }));

    addAuditLog('Document Uploaded', activeCase.caseNumber, `Attached ${newDoc.title} (${newDoc.fileName})`);
  };

  const updateGrievance = (caseId: string, grievanceId: string, updates: Partial<GrievanceDraft>) => {
    setCases(prev => prev.map(c => {
      if (c.id !== caseId) return c;
      const updatedGrievances = c.grievances.map(g => {
        if (g.id !== grievanceId) return g;
        return { ...g, ...updates, updatedAt: new Date().toISOString().split('T')[0] };
      });
      return { ...c, grievances: updatedGrievances };
    }));
  };

  const addGrievance = (caseId: string, draft: Partial<GrievanceDraft>) => {
    const newGrievance: GrievanceDraft = {
      id: `grv-${Date.now()}`,
      caseId,
      recipientType: draft.recipientType || 'district_level_committee',
      recipientName: draft.recipientName || 'District Level Monitoring Committee (DLMC)',
      recipientAddress: draft.recipientAddress || 'Office of District Agriculture Officer',
      subject: draft.subject || `Grievance Petition for PMFBY Claim Ref #${activeCase.applicationNumber}`,
      draftBody: draft.draftBody || '',
      evidenceReferences: draft.evidenceReferences || [],
      missingDocsAttached: draft.missingDocsAttached || [],
      suggestedFollowUpDays: draft.suggestedFollowUpDays || 14,
      status: 'draft',
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };

    setCases(prev => prev.map(c => {
      if (c.id !== caseId) return c;
      return {
        ...c,
        status: 'escalation_prepared',
        grievances: [newGrievance, ...c.grievances],
        timeline: [
          {
            id: `t-${Date.now()}`,
            caseId,
            timestamp: new Date().toLocaleString(),
            title: 'Structured Grievance Draft Generated',
            description: `Prepared formal escalation letter addressed to ${newGrievance.recipientName}. Labeled as DRAFT until submitted.`,
            actor: 'system',
            type: 'escalation'
          },
          ...c.timeline
        ]
      };
    }));

    addAuditLog('Grievance Draft Created', activeCase.caseNumber, `Addressed to ${newGrievance.recipientName}`);
  };

  const markGrievanceSubmitted = (
    caseId: string, 
    grievanceId: string, 
    refNumber: string, 
    channel: 'submitted_offline' | 'submitted_online'
  ) => {
    setCases(prev => prev.map(c => {
      if (c.id !== caseId) return c;
      const updatedGrievances = c.grievances.map(g => {
        if (g.id !== grievanceId) return g;
        return {
          ...g,
          status: channel,
          submissionReferenceNumber: refNumber,
          submissionDate: new Date().toISOString().split('T')[0],
          submissionNotes: `Submitted by farmer via ${channel === 'submitted_online' ? 'Official PMFBY Portal / PGMS' : 'Physical In-Person Inward Registry at Collectorate'}.`
        };
      });
      return {
        ...c,
        status: 'grievance_submitted',
        grievances: updatedGrievances,
        timeline: [
          {
            id: `t-${Date.now()}`,
            caseId,
            timestamp: new Date().toLocaleString(),
            title: `Grievance Recorded as Submitted (${channel === 'submitted_online' ? 'Online' : 'In-Person'})`,
            description: `External reference #${refNumber} recorded. Follow-up clock started.`,
            actor: 'farmer',
            type: 'submission'
          },
          ...c.timeline
        ]
      };
    }));

    addAuditLog('Grievance Submission Recorded', activeCase.caseNumber, `Ref #${refNumber} via ${channel}`);
  };

  const updateRuleConfig = (id: string, updates: Partial<DiagnosisRuleConfig>) => {
    setRuleConfigs(prev => prev.map(r => r.id === id ? { ...r, ...updates, lastUpdated: new Date().toISOString().split('T')[0] } : r));
    addAuditLog('Rule Config Modified', 'ADMIN', `Updated rule definition for ${id}`);
  };

  const resetDemoData = () => {
    const fresh = getHydratedDemoCases();
    setCases(fresh);
    setActiveCaseId('case-demo-01');
    setRuleConfigs(DEMO_RULE_CONFIGS);
    setAuditLogs(DEMO_AUDIT_LOGS);
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        cases,
        activeCaseId,
        activeCase,
        setActiveCaseId,
        addCase,
        updateCase,
        runRadarOnCase,
        runDiagnosisOnCase,
        addDocumentToCase,
        updateGrievance,
        addGrievance,
        markGrievanceSubmitted,
        language,
        setLanguage,
        institutionalStats,
        ruleConfigs,
        updateRuleConfig,
        auditLogs,
        addAuditLog,
        voiceModalOpen,
        setVoiceModalOpen,
        resetDemoData
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

