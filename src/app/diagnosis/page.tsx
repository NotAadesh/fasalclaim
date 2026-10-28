'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { 
  Stethoscope, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle, 
  Calendar, 
  Download, 
  Send, 
  Clock, 
  Scale, 
  Info,
  Sparkles
} from 'lucide-react';

export default function DiagnosisPage() {
  const { 
    activeCase, 
    cases, 
    setActiveCaseId, 
    runDiagnosisOnCase,
    setVoiceModalOpen,
    language 
  } = useApp();

  const [selectedFindingId, setSelectedFindingId] = useState<string | null>(null);

  const isHi = language === 'hi';
  const findings = activeCase.diagnosisFindings || [];
  const activeFinding = findings.find(f => f.finding_id === selectedFindingId) || findings[0];

  const handleExportSummary = () => {
    const summaryText = `FASALCLAIM EVIDENCE-BACKED CLAIM DIAGNOSIS REPORT
Case Ref: ${activeCase.caseNumber}
Farmer Name: ${activeCase.farmerName}
Crop: ${activeCase.crop} (${activeCase.season} ${activeCase.year})
Insurer: ${activeCase.insurerName}
Generated: ${new Date().toLocaleDateString(isHi ? 'hi-IN' : 'en-IN')}

FINDINGS:
${findings.map((f, i) => `
${i + 1}. ${f.title} [Confidence: ${f.confidence_level.toUpperCase()} - ${f.confidence_percentage}%]
Category: ${f.category}
Evidence:
${f.evidence.map(e => `  • ${e}`).join('\n')}
Missing Information:
${f.missing_information.map(m => `  • ${m}`).join('\n')}
Statutory Source Reference:
  ${f.source_reference.title} - ${f.source_reference.ruleSection}
Recommended Next Practical Action:
  ${f.recommended_next_action}
Suggested Follow-up Date: ${f.suggested_follow_up_date}
Uncertainty Note: ${f.uncertainty_note}
`).join('\n----------------------------------------\n')}

NOTICE:
This is an independent evidence diagnosis report produced by FasalClaim. FasalClaim does not approve or reject claims. Official PMFBY guidelines and State Level Coordination Committees remain authoritative.`;

    const blob = new Blob([summaryText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `FasalClaim_Diagnosis_${activeCase.caseNumber}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const translateConfidence = (lvl: string) => {
    if (!isHi) return lvl.toUpperCase();
    switch (lvl) {
      case 'high': return 'उच्च (साक्ष्य-सत्यापित)';
      case 'moderate': return 'मध्यम (सत्यापन आवश्यक)';
      case 'tentative': return 'प्राथमिक';
      default: return 'अपर्याप्त साक्ष्य';
    }
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
                <span className="text-forest-900 font-semibold">{isHi ? 'डायग्नोसिस इंजन' : 'Diagnosis Engine'}</span>
              </div>
              <div className="flex items-center space-x-3">
                <h1 className="text-2xl sm:text-3xl font-display font-bold text-charcoal">
                  {isHi ? 'साक्ष्य-आधारित क्लेम डायग्नोसिस इंजन' : 'Evidence-Backed Claim Diagnosis Engine'}
                </h1>
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-forest-800 text-white shadow-xs">
                  {isHi ? 'प्रमुख विशेषता' : 'The Signature Differentiator'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-charcoal-muted mt-0.5">
                {isHi 
                  ? 'नियम-आधारित विश्लेषण जो सत्यापित तथ्यों, परिकल्पनाओं, अनिश्चितताओं और वैधानिक प्रक्रियाओं को अलग-अलग स्पष्ट करता है।'
                  : 'Deterministic rule-based analysis that separates verified facts from hypotheses, uncertainties, and procedural solutions.'}
              </p>
            </div>

            {/* Case Selector & Actions */}
            <div className="flex items-center space-x-2.5">
              <select
                value={activeCase.id}
                onChange={(e) => {
                  setActiveCaseId(e.target.value);
                  setSelectedFindingId(null);
                }}
                className="bg-ivory-100 border border-sage-300 rounded-xl px-3 py-2 text-xs font-semibold text-charcoal focus:outline-none"
              >
                {cases.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.caseNumber} — {c.farmerName} ({c.crop})
                  </option>
                ))}
              </select>

              <button
                onClick={handleExportSummary}
                className="flex items-center space-x-1.5 bg-ivory-100 hover:bg-sage-100 text-forest-800 border border-sage-300 px-3.5 py-2 rounded-xl text-xs font-semibold transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{isHi ? 'रिपोर्ट डाउनलोड करें' : 'Export Report'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Core Methodology Banner */}
        <div className="bg-forest-900 text-white rounded-3xl p-6 border border-forest-700 shadow-elevated flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              <span className="text-xs font-bold uppercase tracking-wider text-sage-200">
                {isHi ? `नियम इंजन स्थिति: सक्रिय • ${findings.length} निष्कर्ष पहचाने गए` : `Rule Engine Status: Operational • ${findings.length} Findings Identified`}
              </span>
            </div>
            <h3 className="font-display font-bold text-xl text-white">
              {isHi ? `केस #${activeCase.caseNumber} का डायग्नोसिस: ${activeCase.farmerName}` : `Diagnosis for Case #${activeCase.caseNumber}: ${activeCase.farmerName}`}
            </h3>
            <p className="text-xs text-sage-300 max-w-2xl leading-relaxed">
              {isHi 
                ? 'नीचे दिया गया प्रत्येक निष्कर्ष दस्तावेजी साक्ष्य और पीएमएफबीवाई परिचालन दिशानिर्देशों पर आधारित है। जहां साक्ष्य अपूर्ण हैं, वहां अनिश्चितता स्पष्ट प्रकट की गई है।'
                : 'Every finding below is anchored in documentary evidence and verified PMFBY operational guidelines. Where evidence is incomplete, uncertainty is explicitly stated.'}
            </p>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={() => runDiagnosisOnCase(activeCase.id)}
              className="bg-forest-800 hover:bg-forest-700 text-white border border-forest-600 px-4 py-2.5 rounded-xl text-xs font-semibold transition"
            >
              {isHi ? 'नियम पुनः जांचें' : 'Re-run Rule Checks'}
            </button>
            <button
              onClick={() => setVoiceModalOpen(true)}
              className="bg-ivory-100 hover:bg-white text-forest-900 px-4 py-2.5 rounded-xl text-xs font-semibold transition shadow-card flex items-center space-x-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-forest-700" />
              <span>{isHi ? 'वाणी से समझाएं' : 'Voice Explanation'}</span>
            </button>
          </div>
        </div>

        {/* Split-Screen Dashboard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT PANEL */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Case Summary Card */}
            <div className="bg-white rounded-3xl p-6 border border-sage-300 shadow-card space-y-4">
              <div className="flex items-center justify-between border-b border-sage-200 pb-3">
                <h3 className="font-display font-bold text-base text-charcoal">
                  {isHi ? 'केस सारांश' : 'Case Summary'}
                </h3>
                <span className="text-[10px] uppercase font-bold text-forest-800 bg-sage-200 px-2 py-0.5 rounded">
                  {isHi ? (activeCase.status === 'discrepancy_detected' ? 'विसंगति मिली' : 'समीक्षाधीन') : activeCase.status.replace('_', ' ')}
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-charcoal-muted font-medium block">{isHi ? 'दावेदार किसान:' : 'Applicant Farmer:'}</span>
                  <div className="text-sm font-bold text-charcoal">{activeCase.farmerName}</div>
                  <div className="text-charcoal-muted">{isHi ? 'आधार (अंतिम 4):' : 'Aadhaar (last 4):'} **** {activeCase.aadhaarLast4}</div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-sage-100">
                  <div>
                    <span className="text-charcoal-muted font-medium block">{isHi ? 'फसल और मौसम:' : 'Crop & Season:'}</span>
                    <div className="font-semibold text-charcoal">{activeCase.crop}</div>
                    <div className="text-charcoal-muted">{activeCase.season} {activeCase.year}</div>
                  </div>
                  <div>
                    <span className="text-charcoal-muted font-medium block">{isHi ? 'बीमित क्षेत्र:' : 'Insured Area:'}</span>
                    <div className="font-semibold text-charcoal">{activeCase.insuredAreaHectares} Ha</div>
                    <div className="text-charcoal-muted">₹{activeCase.sumInsuredInr.toLocaleString('en-IN')}</div>
                  </div>
                </div>

                <div className="pt-2 border-t border-sage-100">
                  <span className="text-charcoal-muted font-medium block">{isHi ? 'स्थान / इकाई:' : 'Location / Unit:'}</span>
                  <div className="font-semibold text-charcoal">
                    {isHi ? 'गांव' : 'Village'} {activeCase.village}, {isHi ? 'तालुका' : 'Taluka'} {activeCase.taluka}
                  </div>
                  <div className="text-charcoal-muted">{isHi ? 'जिला' : 'District'} {activeCase.district}, {activeCase.state}</div>
                </div>

                <div className="pt-2 border-t border-sage-100">
                  <span className="text-charcoal-muted font-medium block">{isHi ? 'बीमा कंपनी:' : 'Insurance Partner:'}</span>
                  <div className="font-semibold text-charcoal">{activeCase.insurerName}</div>
                  <div className="text-charcoal-muted">{isHi ? 'पॉलिसी #' : 'Policy #'}{activeCase.policyNumber}</div>
                </div>
              </div>
            </div>

            {/* Key Timeline Dates */}
            <div className="bg-white rounded-3xl p-6 border border-sage-300 shadow-card space-y-3">
              <h4 className="font-display font-bold text-sm text-charcoal flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-forest-700" />
                {isHi ? 'महत्वपूर्ण तिथियां' : 'Key Critical Dates'}
              </h4>

              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between p-2 rounded-xl bg-ivory-50 border border-sage-200">
                  <span className="text-charcoal-muted">{isHi ? 'नामांकन / आवेदन:' : 'Enrollment / Application:'}</span>
                  <span className="font-semibold text-charcoal">{activeCase.applicationDate}</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-xl bg-ivory-50 border border-sage-200">
                  <span className="text-charcoal-muted">{isHi ? 'फसल नुकसान तारीख:' : 'Loss Event Date:'}</span>
                  <span className="font-semibold text-charcoal">{activeCase.lossDate}</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-xl bg-ivory-50 border border-sage-200">
                  <span className="text-charcoal-muted">{isHi ? 'नुकसान सूचना दर्ज:' : 'Loss Intimation Lodged:'}</span>
                  <span className="font-semibold text-charcoal">{activeCase.claimIntimationDate}</span>
                </div>
              </div>
            </div>

            {/* Supporting Evidence References List */}
            <div className="bg-white rounded-3xl p-6 border border-sage-300 shadow-card space-y-3">
              <h4 className="font-display font-bold text-sm text-charcoal flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-forest-700" />
                {isHi ? 'सत्यापित दस्तावेजी साक्ष्य' : 'Verified Documentary Evidence'}
              </h4>

              <div className="space-y-2 text-xs">
                {activeCase.documents.map((doc) => (
                  <div key={doc.id} className="p-2.5 rounded-xl border border-sage-200 bg-ivory-50/50 space-y-1">
                    <div className="font-semibold text-charcoal flex items-center justify-between">
                      <span>{doc.title}</span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                        doc.status === 'verified' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {isHi ? (doc.status === 'verified' ? 'सत्यापित' : 'समीक्षा आवश्यक') : doc.status}
                      </span>
                    </div>
                    <div className="text-charcoal-muted">{doc.fileName}</div>
                  </div>
                ))}
              </div>

              <Link
                href="/radar"
                className="mt-2 inline-flex items-center text-xs font-semibold text-forest-800 hover:text-forest-900"
              >
                <span>{isHi ? 'रडार में और दस्तावेज़ जोड़ें →' : 'Add More Documents in Radar →'}</span>
              </Link>
            </div>

          </div>

          {/* MAIN PANEL */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Finding Selector Pills */}
            <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs">
              <span className="font-bold text-charcoal shrink-0 mr-1">
                {isHi ? `पहचाने गए निष्कर्ष (${findings.length}):` : `Findings (${findings.length}):`}
              </span>
              {findings.map((f, idx) => {
                const isSelected = (activeFinding && activeFinding.finding_id === f.finding_id);
                return (
                  <button
                    key={f.finding_id}
                    onClick={() => setSelectedFindingId(f.finding_id)}
                    className={`px-3 py-2 rounded-xl font-semibold transition shrink-0 flex items-center space-x-1.5 ${
                      isSelected
                        ? 'bg-forest-800 text-white shadow-card'
                        : 'bg-white text-charcoal hover:bg-ivory-100 border border-sage-300'
                    }`}
                  >
                    <span>#{idx + 1}</span>
                    <span>{f.title.slice(0, 24)}...</span>
                  </button>
                );
              })}
            </div>

            {/* Active Finding In-Depth Display */}
            {activeFinding ? (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sage-300 shadow-card space-y-6">
                
                {/* Finding Header */}
                <div className="border-b border-sage-200 pb-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-forest-800 bg-sage-200 px-3 py-1 rounded-full w-fit">
                      {isHi ? (activeFinding.category === 'banking_mismatch' ? 'बैंक विसंगति' : activeFinding.category === 'land_survey_variance' ? 'भूमि सर्वे अंतर' : activeFinding.category.replace('_', ' ')) : activeFinding.category.replace('_', ' ')}
                    </span>

                    {/* Confidence Indicator */}
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-charcoal-muted font-medium">
                        {isHi ? 'डायग्नोस्टिक सटीकता:' : 'Diagnostic Confidence:'}
                      </span>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                        activeFinding.confidence_level === 'high'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : activeFinding.confidence_level === 'moderate'
                          ? 'bg-amber-50 text-amber-800 border-amber-300'
                          : 'bg-ivory-100 text-charcoal border-sage-300'
                      }`}>
                        {translateConfidence(activeFinding.confidence_level)} ({activeFinding.confidence_percentage}%)
                      </span>
                    </div>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-display font-bold text-charcoal">
                    {activeFinding.title}
                  </h2>
                  <p className="text-sm text-charcoal-muted mt-1 leading-relaxed">
                    {activeFinding.description}
                  </p>
                </div>

                {/* 1. Potential Blocker */}
                <div className="bg-terracotta-50/70 border border-terracotta-200 rounded-2xl p-5 space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-terracotta-700 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" /> {isHi ? 'पहचाना गया संभावित प्रशासनिक अवरोध' : 'Potential Administrative Blocker'}
                  </div>
                  <p className="text-xs sm:text-sm text-charcoal leading-relaxed">
                    {isHi 
                      ? 'जब भी ऐसा अंतर पाया जाता है, सरकारी डीबीटी प्रणाली स्वतः भुगतान रोक देती है। बैंक बचत खाते में राशि जारी होने से पहले इसका लिपिकीय समाधान आवश्यक है।'
                      : 'Automated DBT clearance systems will halt payment disbursement whenever this variation is detected. It requires clerical reconciliation before funds can be released to your savings account.'}
                  </p>
                </div>

                {/* 2. Supporting Evidence Found */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-forest-800 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> {isHi ? 'फ़ाइल पर उपलब्ध साक्ष्य' : 'Supporting Evidence on File'}
                  </h4>
                  <div className="bg-ivory-50 rounded-2xl p-4 border border-sage-200 space-y-2 text-xs">
                    {activeFinding.evidence.map((ev, i) => (
                      <div key={i} className="flex items-start space-x-2 text-charcoal">
                        <span className="w-1.5 h-1.5 rounded-full bg-forest-700 mt-1.5 shrink-0"></span>
                        <span className="leading-relaxed">{ev}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Missing Information Needed */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-700 flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-amber-600" /> {isHi ? 'आवश्यक जानकारी / सत्यापन' : 'Information / Verification Still Needed'}
                  </h4>
                  <div className="bg-amber-50/50 rounded-2xl p-4 border border-amber-200 space-y-2 text-xs">
                    {activeFinding.missing_information.map((m, i) => (
                      <div key={i} className="flex items-start space-x-2 text-charcoal">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0"></span>
                        <span className="leading-relaxed">{m}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. Confidence & Uncertainty Note */}
                <div className="bg-ivory-100 border border-sage-300 rounded-2xl p-5 space-y-2 text-xs text-charcoal">
                  <div className="font-bold text-forest-900 flex items-center gap-1.5 text-xs">
                    <Info className="w-4 h-4 text-forest-700" />
                    {isHi ? 'अनिश्चितता और निष्पक्षता प्रकटीकरण' : 'Uncertainty & Fairness Disclosure'}
                  </div>
                  <p className="leading-relaxed text-charcoal-muted">
                    {activeFinding.uncertainty_note}
                  </p>
                </div>

                {/* 5. Statutory Rule Reference */}
                <div className="bg-forest-900 text-white rounded-2xl p-5 border border-forest-800 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold uppercase tracking-wider text-sage-200 flex items-center gap-1.5">
                      <Scale className="w-4 h-4 text-emerald-400" />
                      {isHi ? 'वैधानिक प्राधिकरण और नियम उद्धरण' : 'Statutory Authority & Rule Citation'}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-forest-800 text-emerald-300 font-semibold text-[10px] border border-forest-700">
                      {isHi ? 'सत्यापित नियम' : 'Rule Verified'}
                    </span>
                  </div>

                  <div className="text-sm font-bold text-white">
                    {activeFinding.source_reference.title}
                  </div>
                  <div className="text-xs text-sage-300">
                    {isHi ? 'धारा / खंड:' : 'Section / Clause:'} <strong>{activeFinding.source_reference.ruleSection}</strong>
                  </div>
                  <div className="text-[11px] text-sage-400 pt-1 border-t border-forest-800 flex items-center justify-between">
                    <span>{isHi ? 'जारीकर्ता:' : 'Issuing Body:'} {activeFinding.source_reference.issuingAuthority}</span>
                    <span>Rule Ver: {activeFinding.rule_version}</span>
                  </div>
                </div>

                {/* 6. Recommended Next Practical Action */}
                <div className="bg-ivory-50 border-2 border-forest-700/30 rounded-2xl p-6 space-y-4">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-forest-800 mb-1">
                      {isHi ? 'अनुशंसित व्यावहारिक अगला कदम' : 'Recommended Practical Next Step'}
                    </div>
                    <p className="text-sm font-semibold text-charcoal leading-relaxed">
                      {activeFinding.recommended_next_action}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-sage-200 text-xs">
                    <div className="flex items-center space-x-1.5 text-charcoal-muted">
                      <Clock className="w-4 h-4 text-forest-700" />
                      <span>{isHi ? 'अनुशंसित अनुवर्ती तारीख:' : 'Suggested Follow-up by:'} <strong>{activeFinding.suggested_follow_up_date}</strong></span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Link
                        href="/escalation"
                        className="bg-forest-800 hover:bg-forest-900 text-white px-4 py-2.5 rounded-xl font-semibold shadow-card transition flex items-center space-x-1.5"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>{isHi ? 'शिकायत पत्र तैयार करें' : 'Prepare Follow-up Grievance'}</span>
                      </Link>
                    </div>
                  </div>
                </div>

              </div>
            ) : null}

          </div>

        </div>

      </div>
    </div>
  );
}
