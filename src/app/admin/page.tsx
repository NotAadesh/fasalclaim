'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { 
  Users, 
  BookOpen, 
  FileText, 
  History, 
  Save
} from 'lucide-react';
import { DiagnosisRuleConfig } from '@/lib/types';

export default function AdminConsolePage() {
  const { 
    role, 
    setRole, 
    ruleConfigs, 
    updateRuleConfig, 
    auditLogs, 
    resetDemoData,
    language 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'rules' | 'audit' | 'roles' | 'templates'>('rules');
  const [editingRuleId, setEditingRuleId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<DiagnosisRuleConfig>>({});

  const isHi = language === 'hi';

  const handleStartEdit = (rule: DiagnosisRuleConfig) => {
    setEditingRuleId(rule.id);
    setEditFormData(rule);
  };

  const handleSaveRule = (id: string) => {
    updateRuleConfig(id, editFormData);
    setEditingRuleId(null);
  };

  return (
    <div className="bg-ivory-50/70 min-h-screen pb-24">
      {/* Page Header */}
      <div className="bg-white border-b border-sage-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 text-xs text-charcoal-muted mb-1">
                <Link href="/" className="hover:text-forest-800">{isHi ? 'होम' : 'Home'}</Link>
                <span>/</span>
                <span className="text-forest-900 font-semibold">{isHi ? 'प्रशासक कंसोल' : 'Admin Console'}</span>
              </div>
              <div className="flex items-center space-x-3">
                <h1 className="text-2xl sm:text-3xl font-display font-bold text-charcoal">
                  {isHi ? 'मंच प्रशासन और ऑडिट कंसोल' : 'Platform Administration & Audit Console'}
                </h1>
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-forest-900 text-white">
                  {isHi ? 'विशेषाधिकार मोड' : 'Privileged Mode'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-charcoal-muted mt-0.5">
                {isHi 
                  ? 'नियम-आधारित डायग्नोसिस विन्यास, आधिकारिक सांविधिक उद्धरण, भूमिका पहुंच और पूर्ण ऑडिट ट्रेल।'
                  : 'Deterministic diagnosis rule configuration, statutory citations, access control, and comprehensive audit trails.'}
              </p>
            </div>

            <div className="flex items-center space-x-2.5">
              <button
                onClick={resetDemoData}
                className="bg-ivory-100 hover:bg-sage-100 text-forest-800 border border-sage-300 px-3.5 py-2 rounded-xl text-xs font-semibold transition"
              >
                {isHi ? 'डेमो डेटा रीसेट करें' : 'Reset Demo State'}
              </button>

              {role !== 'admin' && (
                <button
                  onClick={() => setRole('admin')}
                  className="bg-forest-800 hover:bg-forest-900 text-white px-3.5 py-2 rounded-xl text-xs font-semibold shadow-card transition"
                >
                  {isHi ? 'प्रशासक भूमिका में बदलें' : 'Elevate to Admin Role'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Navigation Tabs */}
        <div className="flex items-center space-x-2 border-b border-sage-300 pb-2 text-xs">
          <button
            onClick={() => setActiveTab('rules')}
            className={`px-4 py-2.5 rounded-xl font-bold transition flex items-center space-x-2 ${
              activeTab === 'rules'
                ? 'bg-forest-800 text-white shadow-card'
                : 'bg-white text-charcoal hover:bg-ivory-100 border border-sage-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>{isHi ? `डायग्नोसिस नियम (${ruleConfigs.length})` : `Diagnosis Rules Engine (${ruleConfigs.length})`}</span>
          </button>

          <button
            onClick={() => setActiveTab('audit')}
            className={`px-4 py-2.5 rounded-xl font-bold transition flex items-center space-x-2 ${
              activeTab === 'audit'
                ? 'bg-forest-800 text-white shadow-card'
                : 'bg-white text-charcoal hover:bg-ivory-100 border border-sage-200'
            }`}
          >
            <History className="w-4 h-4" />
            <span>{isHi ? `ऑडिट ट्रेल लॉग्स (${auditLogs.length})` : `Audit Trail Logs (${auditLogs.length})`}</span>
          </button>

          <button
            onClick={() => setActiveTab('roles')}
            className={`px-4 py-2.5 rounded-xl font-bold transition flex items-center space-x-2 ${
              activeTab === 'roles'
                ? 'bg-forest-800 text-white shadow-card'
                : 'bg-white text-charcoal hover:bg-ivory-100 border border-sage-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>{isHi ? 'भूमिका और अधिकार सीमाएं' : 'Role & Authorization Boundaries'}</span>
          </button>

          <button
            onClick={() => setActiveTab('templates')}
            className={`px-4 py-2.5 rounded-xl font-bold transition flex items-center space-x-2 ${
              activeTab === 'templates'
                ? 'bg-forest-800 text-white shadow-card'
                : 'bg-white text-charcoal hover:bg-ivory-100 border border-sage-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>{isHi ? 'शिकायत पत्र टेम्पलेट्स' : 'Grievance Templates'}</span>
          </button>
        </div>

        {/* TAB 1: DIAGNOSIS RULES ENGINE */}
        {activeTab === 'rules' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white rounded-3xl p-6 border border-sage-300 shadow-card space-y-4">
              <div className="flex items-center justify-between border-b border-sage-200 pb-4">
                <div>
                  <h3 className="font-display font-bold text-base text-charcoal">
                    {isHi ? 'कॉन्फ़िगर किए गए नियम (v2.4.1)' : 'Configured Deterministic Rules (v2.4.1)'}
                  </h3>
                  <p className="text-xs text-charcoal-muted mt-0.5">
                    {isHi ? 'नियमों में संशोधन सीधे सभी सक्रिय दावों के निष्कर्षों को अद्यतन करता है।' : 'Modifying rules directly influences the findings generated by the Diagnosis Engine across all active claims.'}
                  </p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded bg-sage-200 text-forest-800">
                  {isHi ? 'शून्य कृत्रिम कल्पना' : 'Zero LLM Hallucination Allowed'}
                </span>
              </div>

              <div className="space-y-4">
                {ruleConfigs.map((rule) => {
                  const isEditing = editingRuleId === rule.id;

                  return (
                    <div
                      key={rule.id}
                      className="p-5 rounded-2xl border border-sage-200 bg-ivory-50/50 space-y-3 text-xs"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-mono font-bold px-2 py-0.5 rounded bg-forest-800 text-white text-[11px]">
                            {rule.ruleCode}
                          </span>
                          <span className="font-display font-bold text-sm text-charcoal">
                            {rule.name}
                          </span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            rule.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-charcoal-muted/20 text-charcoal'
                          }`}>
                            {rule.isActive ? (isHi ? 'सक्रिय नियम' : 'Active Rule') : (isHi ? 'निष्क्रिय' : 'Inactive')}
                          </span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            rule.isVerified ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {rule.isVerified ? (isHi ? 'सत्यापित वैधानिक उद्धरण' : 'Verified Statutory Citation') : (isHi ? 'सत्यापन लंबित' : 'Verification Pending')}
                          </span>
                        </div>
                      </div>

                      {isEditing ? (
                        <div className="space-y-3 pt-2 bg-white p-4 rounded-xl border border-sage-300">
                          <div>
                            <label className="block font-semibold text-charcoal mb-1">{isHi ? 'नियम विवरण' : 'Rule Description'}</label>
                            <input
                              type="text"
                              value={editFormData.description || ''}
                              onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                              className="w-full border border-sage-300 rounded-lg p-2 text-xs"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block font-semibold text-charcoal mb-1">{isHi ? 'सांविधिक धारा' : 'Statutory Section'}</label>
                              <input
                                type="text"
                                value={editFormData.ruleSection || ''}
                                onChange={(e) => setEditFormData({ ...editFormData, ruleSection: e.target.value })}
                                className="w-full border border-sage-300 rounded-lg p-2 text-xs"
                              />
                            </div>
                            <div>
                              <label className="block font-semibold text-charcoal mb-1">{isHi ? 'प्राधिकरण स्रोत' : 'Statutory Authority Source'}</label>
                              <input
                                type="text"
                                value={editFormData.statutorySource || ''}
                                onChange={(e) => setEditFormData({ ...editFormData, statutorySource: e.target.value })}
                                className="w-full border border-sage-300 rounded-lg p-2 text-xs"
                              />
                            </div>
                          </div>

                          <div className="flex items-center justify-end space-x-2 pt-2">
                            <button
                              onClick={() => setEditingRuleId(null)}
                              className="px-3 py-1.5 rounded-lg border border-sage-300 font-medium"
                            >
                              {isHi ? 'रद्द करें' : 'Cancel'}
                            </button>
                            <button
                              onClick={() => handleSaveRule(rule.id)}
                              className="px-4 py-1.5 rounded-lg bg-forest-800 text-white font-semibold flex items-center gap-1"
                            >
                              <Save className="w-3.5 h-3.5" /> {isHi ? 'नियम सहेजें' : 'Save Rule'}
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <p className="text-charcoal leading-relaxed">{rule.description}</p>
                          <div className="flex flex-wrap items-center justify-between gap-2 mt-2 pt-2 border-t border-sage-200 text-[11px] text-charcoal-muted">
                            <span>{isHi ? 'वैधानिक आधार:' : 'Statutory Basis:'} <strong>{rule.statutorySource} ({rule.ruleSection})</strong></span>
                            <div className="flex items-center space-x-3">
                              <span>Version: {rule.ruleVersion}</span>
                              <span>{isHi ? 'अद्यतन:' : 'Updated:'} {rule.lastUpdated}</span>
                              <button
                                onClick={() => handleStartEdit(rule)}
                                className="text-forest-800 font-bold hover:underline"
                              >
                                {isHi ? 'संपादित करें' : 'Edit Rule'}
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: AUDIT TRAIL LOGS */}
        {activeTab === 'audit' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-sage-300 shadow-card space-y-4">
              <div className="flex items-center justify-between border-b border-sage-200 pb-4">
                <div>
                  <h3 className="font-display font-bold text-base text-charcoal">
                    {isHi ? 'अपरिवर्तनीय ऑडिट ट्रेल लॉग्स' : 'Immutable Audit Log Entries'}
                  </h3>
                  <p className="text-xs text-charcoal-muted mt-0.5">
                    {isHi ? 'संवेदनशील कार्रवाइयों, नियम परीक्षणों और शिकायत पत्रों के निर्माण का समयबद्ध रिकॉर्ड।' : 'Chronological record of sensitive actions, diagnosis rule invocations, and grievance creations.'}
                  </p>
                </div>
                <span className="text-xs font-semibold text-charcoal-muted">{isHi ? 'सर्वर-सत्यापित' : 'Server-Side Verified'}</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-ivory-50 border-b border-sage-200 text-charcoal font-semibold">
                    <tr>
                      <th className="py-3 px-4">{isHi ? 'समय (IST)' : 'Timestamp (IST)'}</th>
                      <th className="py-3 px-4">{isHi ? 'उपयोगकर्ता' : 'Actor'}</th>
                      <th className="py-3 px-4">{isHi ? 'कार्रवाई' : 'Action'}</th>
                      <th className="py-3 px-4">{isHi ? 'केस संख्या' : 'Case #'}</th>
                      <th className="py-3 px-4">{isHi ? 'विवरण' : 'Details'}</th>
                      <th className="py-3 px-4 text-right">{isHi ? 'आईपी पता' : 'Client IP'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-sage-200">
                    {auditLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-ivory-50/50 transition">
                        <td className="py-3 px-4 font-mono text-[11px] text-charcoal-muted whitespace-nowrap">
                          {log.timestamp}
                        </td>
                        <td className="py-3 px-4 font-semibold text-charcoal">{log.actor}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded bg-sage-100 text-forest-800 font-medium text-[11px]">
                            {log.action}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-mono font-bold text-forest-900">{log.caseNumber}</td>
                        <td className="py-3 px-4 text-charcoal max-w-xs truncate">{log.details}</td>
                        <td className="py-3 px-4 font-mono text-charcoal-muted text-right">{log.ipAddress}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ROLES & AUTHORIZATION */}
        {activeTab === 'roles' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white rounded-3xl p-6 border border-sage-300 shadow-card space-y-4">
              <div className="border-b border-sage-200 pb-3">
                <h3 className="font-display font-bold text-base text-charcoal">
                  {isHi ? 'अधिकार सीमाएं और भूमिका क्षेत्र' : 'Access Control Boundaries & Role Scopes'}
                </h3>
                <p className="text-xs text-charcoal-muted mt-0.5">
                  {isHi ? 'पोस्टग्रेस आरएलएस (Row Level Security) द्वारा प्रवर्तित तीन स्तरीय सुरक्षा।' : 'Three distinct authorization tiers enforcing PostgreSQL Row Level Security (RLS).'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                {/* Farmer */}
                <div className={`p-5 rounded-2xl border ${role === 'farmer' ? 'border-forest-800 bg-ivory-50 ring-2 ring-forest-800/10' : 'border-sage-200 bg-white'}`}>
                  <div className="font-bold text-sm text-charcoal mb-1 flex items-center justify-between">
                    <span>{isHi ? '१. किसान भूमिका' : '1. Farmer Role'}</span>
                    {role === 'farmer' && <span className="text-[10px] px-2 py-0.5 rounded bg-forest-800 text-white">{isHi ? 'सक्रिय' : 'Active'}</span>}
                  </div>
                  <p className="text-charcoal-muted leading-relaxed mb-3">
                    {isHi ? 'व्यक्तिगत क्लेम दर्ज करना, निजी दस्तावेज़ अपलोड, प्री-क्लेम एरर रडार, साक्ष्य डायग्नोसिस और केवल अपनी जोत के लिए शिकायत पत्र निर्माण।' : 'Personal claim intake, private document uploads, Pre-Claim Error Radar, Evidence Diagnosis, and Grievance Draft generation for own parcels only.'}
                  </p>
                  <div className="text-[11px] text-forest-800 font-semibold">
                    RLS Policy: <code>WHERE auth.uid() = claim_case.farmer_user_id</code>
                  </div>
                  <button
                    onClick={() => setRole('farmer')}
                    className="mt-4 w-full py-2 rounded-xl border border-sage-300 font-semibold hover:bg-sage-100"
                  >
                    {isHi ? 'किसान दृश्य चुनें' : 'Select Farmer View'}
                  </button>
                </div>

                {/* Institutional */}
                <div className={`p-5 rounded-2xl border ${role === 'institutional' ? 'border-forest-800 bg-ivory-50 ring-2 ring-forest-800/10' : 'border-sage-200 bg-white'}`}>
                  <div className="font-bold text-sm text-charcoal mb-1 flex items-center justify-between">
                    <span>{isHi ? '२. संस्थागत भूमिका' : '2. Institutional User'}</span>
                    {role === 'institutional' && <span className="text-[10px] px-2 py-0.5 rounded bg-forest-800 text-white">{isHi ? 'सक्रिय' : 'Active'}</span>}
                  </div>
                  <p className="text-charcoal-muted leading-relaxed mb-3">
                    {isHi ? 'एफपीओ, सहकारी समितियां और भागीदार। क्लस्टर के सांख्यिकीय रुझान और अनाम कार्यप्रवाह तक पहुंच। शून्य व्यक्तिगत किसान विवरण।' : 'FPOs, Cooperatives, and authorized partners. Accesses aggregate cluster metrics, bottleneck frequencies, and anonymized workflows. Zero farmer PII.'}
                  </p>
                  <div className="text-[11px] text-forest-800 font-semibold">
                    RLS Policy: <code>SELECT aggregate_analytics WHERE fpo_id = membership</code>
                  </div>
                  <button
                    onClick={() => setRole('institutional')}
                    className="mt-4 w-full py-2 rounded-xl border border-sage-300 font-semibold hover:bg-sage-100"
                  >
                    {isHi ? 'संस्थागत दृश्य चुनें' : 'Select Institutional View'}
                  </button>
                </div>

                {/* Admin */}
                <div className={`p-5 rounded-2xl border ${role === 'admin' ? 'border-forest-800 bg-ivory-50 ring-2 ring-forest-800/10' : 'border-sage-200 bg-white'}`}>
                  <div className="font-bold text-sm text-charcoal mb-1 flex items-center justify-between">
                    <span>{isHi ? '३. प्रशासक भूमिका' : '3. Administrator'}</span>
                    {role === 'admin' && <span className="text-[10px] px-2 py-0.5 rounded bg-forest-800 text-white">{isHi ? 'सक्रिय' : 'Active'}</span>}
                  </div>
                  <p className="text-charcoal-muted leading-relaxed mb-3">
                    {isHi ? 'मंच प्रबंधक भूमिका जिसके पास नियम संपादन, सांविधिक संदर्भ अद्यतन, ऑडिट समीक्षा और सुरक्षा अधिकार उपलब्ध हैं।' : 'Platform architect role with permission to edit diagnosis rules, publish statutory citations, audit system activity, and manage feature flags.'}
                  </p>
                  <div className="text-[11px] text-forest-800 font-semibold">
                    RLS Policy: <code>GRANT ALL ON rules_config TO service_admin</code>
                  </div>
                  <button
                    onClick={() => setRole('admin')}
                    className="mt-4 w-full py-2 rounded-xl bg-forest-800 text-white font-semibold hover:bg-forest-900"
                  >
                    {isHi ? 'प्रशासक दृश्य चुनें' : 'Select Admin View'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: GRIEVANCE TEMPLATES */}
        {activeTab === 'templates' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white rounded-3xl p-6 border border-sage-300 shadow-card space-y-4">
              <div className="border-b border-sage-200 pb-3">
                <h3 className="font-display font-bold text-base text-charcoal">
                  {isHi ? 'सांविधिक शिकायत पत्र टेम्पलेट्स' : 'Statutory Grievance Letter Templates'}
                </h3>
                <p className="text-xs text-charcoal-muted mt-0.5">
                  {isHi ? 'पीएमएफबीवाई शिकायत दिशानिर्देश 2023 के अनुरूप मानक संचालन प्रक्रिया (SOP) प्रारूप।' : 'Standard Operating Procedure (SOP) representations aligned with PMFBY Grievance Guidelines 2023.'}
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-4 rounded-xl border border-sage-200 bg-ivory-50/50 flex items-start justify-between">
                  <div>
                    <div className="font-bold text-charcoal">{isHi ? 'डीएलएमसी आवेदन (धारा 13.4 सुधार)' : 'DLMC Petition (Section 13.4 Rectification)'}</div>
                    <div className="text-charcoal-muted mt-0.5">
                      {isHi ? 'बैंक नाम उपनाम और भूमि उप-विभाजन अंतर के समाधान हेतु जिला स्तरीय समिति को औपचारिक पत्र।' : 'District Level Monitoring Committee petition for resolving bank name aliases and sub-division variances.'}
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-forest-800 text-white">{isHi ? 'सक्रिय टेम्पलेट' : 'Active Template'}</span>
                </div>

                <div className="p-4 rounded-xl border border-sage-200 bg-ivory-50/50 flex items-start justify-between">
                  <div>
                    <div className="font-bold text-charcoal">{isHi ? '72-घंटे विलंब माफ़ी अपील (धारा 11.2)' : '72-Hour Condonation Appeal (Section 11.2)'}</div>
                    <div className="text-charcoal-muted mt-0.5">
                      {isHi ? 'प्राकृतिक आपदा या नेटवर्क बाधा के कारण नुकसान सूचना में हुई देरी की वैधानिक माफ़ी अपील।' : 'Statutory appeal citing force majeure weather/connectivity disruption for delayed loss intimation.'}
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-forest-800 text-white">{isHi ? 'सक्रिय टेम्पलेट' : 'Active Template'}</span>
                </div>

                <div className="p-4 rounded-xl border border-sage-200 bg-ivory-50/50 flex items-start justify-between">
                  <div>
                    <div className="font-bold text-charcoal">{isHi ? 'सांविधिक 12% दंडात्मक ब्याज मांग (धारा 15.2)' : 'Statutory 12% Penal Interest Demand (Section 15.2)'}</div>
                    <div className="text-charcoal-muted mt-0.5">
                      {isHi ? 'सब्सिडी जारी होने के 21 दिनों से अधिक की देरी पर बीमा कंपनी को 12% ब्याज सहित भुगतान नोटिस।' : 'Notice to insurer for settlement delays exceeding 21 days from receipt of claims funds / subsidy.'}
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-forest-800 text-white">{isHi ? 'सक्रिय टेम्पलेट' : 'Active Template'}</span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
