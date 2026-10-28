'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { 
  FileSearch, 
  Upload, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle, 
  ArrowRight, 
  RefreshCw, 
  Check, 
  FileQuestion,
  Info
} from 'lucide-react';
import { DocumentType } from '@/lib/types';

export default function PreClaimRadarPage() {
  const { 
    activeCase, 
    cases, 
    setActiveCaseId, 
    addDocumentToCase, 
    runRadarOnCase,
    language 
  } = useApp();

  const [uploadDocType, setUploadDocType] = useState<DocumentType>('bank_passbook');
  const [selectedFileName, setSelectedFileName] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const isHi = language === 'hi';

  const handleSimulatedUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFileName) return;

    setIsAnalyzing(true);
    setTimeout(() => {
      let extractedData: any = {};
      let docTitle = isHi ? 'अपलोड किया गया दस्तावेज़' : 'Uploaded Document';
      let status: 'verified' | 'mismatch' | 'needs_review' = 'needs_review';

      if (uploadDocType === 'bank_passbook') {
        docTitle = isHi ? 'बैंक पासबुक / चेक' : 'Bank Passbook / Cheque Leaf';
        extractedData = {
          farmerName: activeCase.farmerName.replace(/war|bhai|singh/i, ''),
          accountNumber: `XXXX-XXXX-${activeCase.accountNumberLast4}`,
          ifscCode: activeCase.ifscCode,
          bankName: activeCase.bankName
        };
        status = 'mismatch';
      } else if (uploadDocType === 'land_record_7_12') {
        docTitle = isHi ? 'डिजिटल 7/12 खसरा (राजस्व)' : 'Digital 7/12 Extract (Revenue)';
        extractedData = {
          surveyNumber: activeCase.surveyNumber.replace(/[A-Z]/g, ''),
          farmerName: activeCase.farmerName,
          landArea: `${activeCase.insuredAreaHectares}`
        };
        status = 'mismatch';
      } else {
        docTitle = isHi ? 'आधार कार्ड / पहचान प्रमाण' : 'Aadhaar / Identity Proof';
        extractedData = {
          farmerName: activeCase.farmerName
        };
        status = 'verified';
      }

      addDocumentToCase(activeCase.id, {
        docType: uploadDocType,
        title: docTitle,
        fileName: selectedFileName,
        fileSize: '1.4 MB',
        status,
        extractedData
      });

      setSelectedFileName('');
      setIsAnalyzing(false);
    }, 800);
  };

  const findings = activeCase.radarFindings || [];
  const filteredFindings = findings.filter(f => {
    if (filterCategory === 'all') return true;
    return f.status === filterCategory;
  });

  const mismatches = findings.filter(f => f.status === 'potential_mismatch').length;
  const missing = findings.filter(f => f.status === 'missing_information').length;
  const consistent = findings.filter(f => f.status === 'looks_consistent').length;

  const translateStatus = (st: string) => {
    if (!isHi) return st.replace('_', ' ');
    switch (st) {
      case 'potential_mismatch': return 'संभावित विसंगति';
      case 'missing_information': return 'दस्तावेज़ अनुपलब्ध';
      case 'looks_consistent': return 'सुसंगत है';
      case 'needs_review': return 'समीक्षा आवश्यक';
      default: return st;
    }
  };

  return (
    <div className="bg-ivory-50/70 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-white border-b border-sage-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 text-xs text-charcoal-muted mb-1">
                <Link href="/" className="hover:text-forest-800">{isHi ? 'होम' : 'Home'}</Link>
                <span>/</span>
                <span className="text-forest-900 font-semibold">{isHi ? 'प्री-क्लेम एरर रडार' : 'Pre-Claim Error Radar'}</span>
              </div>
              <div className="flex items-center space-x-3">
                <h1 className="text-2xl sm:text-3xl font-display font-bold text-charcoal">
                  {isHi ? 'प्री-क्लेम एरर रडार' : 'Pre-Claim Error Radar'}
                </h1>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-sage-200 text-forest-800 border border-sage-300">
                  {isHi ? 'इंटरैक्टिव जांच' : 'Interactive Check'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-charcoal-muted mt-0.5">
                {isHi 
                  ? 'सरकारी जांच से पहले ही लिपिकीय विसंगतियों और छूटे हुए दस्तावेजों को पहचानें ताकि भुगतान न रुके।'
                  : 'Detect clerical inconsistencies and missing documentation before official scrutiny stalls your payout.'}
              </p>
            </div>

            {/* Case selector dropdown */}
            <div className="flex items-center space-x-3 bg-ivory-100 p-1.5 rounded-2xl border border-sage-300 text-xs">
              <span className="text-charcoal-muted font-medium pl-2">{isHi ? 'केस:' : 'Case:'}</span>
              <select
                value={activeCase.id}
                onChange={(e) => setActiveCaseId(e.target.value)}
                className="bg-white border border-sage-300 rounded-xl px-3 py-1.5 font-bold text-forest-900 focus:outline-none"
              >
                {cases.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.caseNumber} — {c.farmerName} ({c.crop})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Core Principles & Status Ribbon */}
        <div className="bg-white rounded-2xl p-5 border border-sage-200 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-forest-800 text-white flex items-center justify-center shrink-0">
              <FileSearch className="w-6 h-6 text-sage-200" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-charcoal">
                {isHi ? `रडार सत्यापन सारांश: ${activeCase.farmerName}` : `Radar Verification Summary: ${activeCase.farmerName}`}
              </h3>
              <p className="text-xs text-charcoal-muted">
                {isHi 
                  ? `${findings.length} मापदंडों की तुलना दर्ज जानकारी और ${activeCase.documents.length} संलग्न दस्तावेजों से की गई है।`
                  : `${findings.length} deterministic parameters checked across entered claim metadata and ${activeCase.documents.length} verified documents.`}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-xs font-semibold">
            <span className="px-3 py-1.5 rounded-xl bg-terracotta-50 text-terracotta-700 border border-terracotta-200">
              {mismatches} {isHi ? 'संभावित विसंगति' : 'Potential Mismatch'}
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-amber-50 text-amber-800 border border-amber-200">
              {missing} {isHi ? 'दस्तावेज़ अनुपलब्ध' : 'Missing Doc'}
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200">
              {consistent} {isHi ? 'सुसंगत' : 'Consistent'}
            </span>
          </div>
        </div>

        {/* Mandatory Guardrail Notice */}
        <div className="bg-sage-100/70 border border-sage-300 rounded-2xl p-4 text-xs text-charcoal flex items-start space-x-3">
          <Info className="w-4 h-4 text-forest-700 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong>{isHi ? 'महत्वपूर्ण आश्वासन सिद्धांत:' : 'Critical Assurance Principle:'}</strong>{' '}
            {isHi 
              ? 'एरर रडार द्वारा पहचानी गई विसंगति दावा अस्वीकृति या देरी का प्रमाण नहीं है। यह केवल एक प्रशासनिक सूचना है जिसे बैंक या पटवारी से सत्यापित करवाकर डीबीटी भुगतान सुगम बनाया जा सकता है।'
              : 'A discrepancy identified by the Error Radar is not proof of claim rejection or delay. Discrepancies indicate administrative flags that commonly pause electronic Direct Benefit Transfer (DBT) clearance until clarified with your bank or revenue officer.'}
          </div>
        </div>

        {/* Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Upload Area */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white rounded-3xl p-6 border border-sage-300 shadow-card space-y-4">
              <div className="flex items-center justify-between border-b border-sage-200 pb-3">
                <h3 className="font-display font-bold text-base text-charcoal">
                  {isHi ? 'दस्तावेज़ प्राप्ति और सत्यापन' : 'Document Intake & Verification'}
                </h3>
                <span className="text-[10px] uppercase font-bold text-forest-800 bg-sage-200 px-2 py-0.5 rounded">
                  {isHi ? 'निजी भंडारण' : 'Private Storage'}
                </span>
              </div>

              <form onSubmit={handleSimulatedUpload} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-charcoal mb-1">
                    {isHi ? 'दस्तावेज़ श्रेणी चुनें *' : 'Select Document Category *'}
                  </label>
                  <select
                    value={uploadDocType}
                    onChange={(e) => setUploadDocType(e.target.value as DocumentType)}
                    className="w-full border border-sage-300 rounded-xl p-2.5 text-xs text-charcoal bg-white"
                  >
                    <option value="bank_passbook">{isHi ? 'बैंक पासबुक (खाता और आईएफएससी पृष्ठ)' : 'Bank Passbook (Account & IFSC Page)'}</option>
                    <option value="land_record_7_12">{isHi ? 'भूमि रिकॉर्ड (7/12 खसरा, RoR)' : 'Land Record (7/12 Extract, Khasra, RoR)'}</option>
                    <option value="aadhaar">{isHi ? 'आधार कार्ड / पहचान प्रमाण' : 'Aadhaar Card / ID Proof'}</option>
                    <option value="pmfby_receipt">{isHi ? 'पीएमएफबीवाई पोर्टल आवेदन रसीद' : 'PMFBY Portal Application Receipt'}</option>
                    <option value="sowing_certificate">{isHi ? 'बुआई प्रमाण पत्र / पटवारी घोषणा' : 'Sowing Certificate / Patwari Declaration'}</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-charcoal mb-1">
                    {isHi ? 'दस्तावेज़ फ़ाइल (PDF, JPG, PNG)' : 'Document File (PDF, JPG, PNG)'}
                  </label>
                  <div className="border-2 border-dashed border-sage-300 hover:border-forest-600 rounded-2xl p-4 text-center cursor-pointer transition bg-ivory-50/50">
                    <Upload className="w-6 h-6 text-forest-700 mx-auto mb-1.5" />
                    <span className="text-xs font-semibold text-forest-800">
                      {selectedFileName ? selectedFileName : (isHi ? "फ़ाइल चुनें या नीचे दिए गए नमूने पर क्लिक करें" : "Choose file or click sample below")}
                    </span>
                    <p className="text-[10px] text-charcoal-muted mt-1">
                      {isHi ? 'अधिकतम फ़ाइल आकार: 10MB • सुरक्षित निजी संग्रह' : 'Max file size: 10MB • Handled privately'}
                    </p>
                  </div>
                </div>

                {/* Quick File Pickers */}
                <div className="pt-1">
                  <span className="text-[11px] font-semibold text-charcoal-muted block mb-1.5">
                    {isHi ? 'त्वरित नमूना दस्तावेज़ फ़ाइलें:' : 'Quick Sample Document Files:'}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    <button
                      type="button"
                      onClick={() => setSelectedFileName('bank_of_maharashtra_passbook.pdf')}
                      className="text-[11px] px-2 py-1 bg-sage-100 hover:bg-sage-200 rounded-lg text-forest-800 font-medium"
                    >
                      📄 Passbook_Scan.pdf
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedFileName('mahabhulekh_7_12_kolgaon.pdf')}
                      className="text-[11px] px-2 py-1 bg-sage-100 hover:bg-sage-200 rounded-lg text-forest-800 font-medium"
                    >
                      📄 7_12_Extract.pdf
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedFileName('pmfby_portal_receipt_2024.pdf')}
                      className="text-[11px] px-2 py-1 bg-sage-100 hover:bg-sage-200 rounded-lg text-forest-800 font-medium"
                    >
                      📄 PMFBY_Receipt.pdf
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!selectedFileName || isAnalyzing}
                  className="w-full bg-forest-800 hover:bg-forest-900 disabled:opacity-40 text-white font-semibold py-2.5 rounded-xl transition shadow-card flex items-center justify-center space-x-1.5 mt-2"
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>{isHi ? 'ओसीआर मेटाडेटा निकाला जा रहा है...' : 'Extracting OCR Metadata...'}</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>{isHi ? 'अपलोड करें और सत्यापन चलाएं' : 'Upload & Run Verification'}</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Uploaded Documents List */}
            <div className="bg-white rounded-3xl p-6 border border-sage-300 shadow-card space-y-3">
              <h4 className="font-display font-bold text-sm text-charcoal">
                {isHi ? `फ़ाइल पर उपलब्ध दस्तावेज़ (${activeCase.documents.length})` : `Documents on File (${activeCase.documents.length})`}
              </h4>

              <div className="space-y-2 text-xs">
                {activeCase.documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-3 rounded-xl border border-sage-200 bg-ivory-50/50 flex items-start justify-between"
                  >
                    <div className="space-y-0.5">
                      <div className="font-bold text-charcoal">{doc.title}</div>
                      <div className="text-charcoal-muted">
                        {doc.fileName} • {doc.fileSize}
                      </div>
                      {doc.notes && (
                        <div className="text-[11px] text-terracotta-700 font-medium">
                          {isHi ? 'नोट:' : 'Note:'} {doc.notes}
                        </div>
                      )}
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      doc.status === 'verified'
                        ? 'bg-emerald-100 text-emerald-800'
                        : doc.status === 'mismatch'
                        ? 'bg-terracotta-100 text-terracotta-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {translateStatus(doc.status)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Findings Matrix */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Filter Pills */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs">
                <span className="font-semibold text-charcoal">{isHi ? 'फ़िल्टर:' : 'Filter:'}</span>
                <button
                  onClick={() => setFilterCategory('all')}
                  className={`px-2.5 py-1 rounded-lg font-medium transition ${
                    filterCategory === 'all' ? 'bg-forest-800 text-white' : 'bg-white text-charcoal hover:bg-sage-100'
                  }`}
                >
                  {isHi ? `सभी (${findings.length})` : `All (${findings.length})`}
                </button>
                <button
                  onClick={() => setFilterCategory('potential_mismatch')}
                  className={`px-2.5 py-1 rounded-lg font-medium transition ${
                    filterCategory === 'potential_mismatch' ? 'bg-terracotta-600 text-white' : 'bg-white text-charcoal hover:bg-sage-100'
                  }`}
                >
                  {isHi ? `विसंगति (${mismatches})` : `Mismatches (${mismatches})`}
                </button>
                <button
                  onClick={() => setFilterCategory('missing_information')}
                  className={`px-2.5 py-1 rounded-lg font-medium transition ${
                    filterCategory === 'missing_information' ? 'bg-amber-600 text-white' : 'bg-white text-charcoal hover:bg-sage-100'
                  }`}
                >
                  {isHi ? `अनुपलब्ध (${missing})` : `Missing (${missing})`}
                </button>
                <button
                  onClick={() => setFilterCategory('looks_consistent')}
                  className={`px-2.5 py-1 rounded-lg font-medium transition ${
                    filterCategory === 'looks_consistent' ? 'bg-emerald-700 text-white' : 'bg-white text-charcoal hover:bg-sage-100'
                  }`}
                >
                  {isHi ? `सुसंगत (${consistent})` : `Consistent (${consistent})`}
                </button>
              </div>

              <button
                onClick={() => runRadarOnCase(activeCase.id)}
                className="flex items-center space-x-1 text-xs text-forest-800 hover:text-forest-900 font-semibold"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>{isHi ? 'पुनः जांचें' : 'Re-run Checks'}</span>
              </button>
            </div>

            {/* Findings Cards */}
            <div className="space-y-4">
              {filteredFindings.map((finding) => {
                const isMismatch = finding.status === 'potential_mismatch';
                const isMissing = finding.status === 'missing_information';

                return (
                  <div
                    key={finding.id}
                    className={`bg-white rounded-3xl p-6 border shadow-card transition space-y-4 ${
                      isMismatch
                        ? 'border-terracotta-200 ring-1 ring-terracotta-100'
                        : isMissing
                        ? 'border-amber-200'
                        : 'border-sage-200'
                    }`}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                          isMismatch 
                            ? 'bg-terracotta-50 text-terracotta-700' 
                            : isMissing 
                            ? 'bg-amber-50 text-amber-700' 
                            : 'bg-emerald-50 text-emerald-700'
                        }`}>
                          {isMismatch ? <AlertTriangle className="w-5 h-5" /> : isMissing ? <FileQuestion className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
                        </div>
                        <div>
                          <h4 className="font-display font-bold text-base text-charcoal">
                            {finding.title}
                          </h4>
                          <p className="text-xs text-charcoal-muted">
                            {isHi ? 'जांचा गया क्षेत्र:' : 'Field Checked:'} <strong>{finding.fieldChecked}</strong>
                          </p>
                        </div>
                      </div>

                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                        isMismatch
                          ? 'bg-terracotta-50 text-terracotta-800 border-terracotta-200'
                          : isMissing
                          ? 'bg-amber-50 text-amber-800 border-amber-200'
                          : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      }`}>
                        {translateStatus(finding.status)}
                      </span>
                    </div>

                    {/* Comparison Box */}
                    <div className="bg-ivory-50 rounded-2xl p-4 border border-sage-200 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-charcoal-muted font-medium block mb-0.5">
                          {isHi ? 'आवेदन में दर्ज मान:' : 'Entered Application Value:'}
                        </span>
                        <div className="font-semibold text-charcoal bg-white p-2 rounded-lg border border-sage-200">
                          {finding.enteredValue}
                        </div>
                      </div>

                      <div>
                        <span className="text-charcoal-muted font-medium block mb-0.5">
                          {isHi ? 'दस्तावेज़ से निकाला गया मान:' : 'Document Extracted Value:'}
                        </span>
                        <div className="font-semibold text-charcoal bg-white p-2 rounded-lg border border-sage-200">
                          {finding.documentValue}
                        </div>
                      </div>
                    </div>

                    {/* What appears inconsistent */}
                    <div className="text-xs space-y-1.5">
                      <div className="font-semibold text-charcoal">
                        {isHi ? 'विसंगति / निष्कर्ष:' : 'Inconsistency / Finding:'}
                      </div>
                      <p className="text-charcoal-muted leading-relaxed">
                        {finding.whatAppearsInconsistent}
                      </p>
                    </div>

                    {/* Why It Matters */}
                    <div className="text-xs space-y-1.5 bg-ivory-100/60 p-3.5 rounded-xl border border-sage-200">
                      <div className="font-semibold text-forest-800 flex items-center gap-1.5">
                        <HelpCircle className="w-3.5 h-3.5" /> {isHi ? 'यह क्यों महत्वपूर्ण है:' : 'Why this matters:'}
                      </div>
                      <p className="text-charcoal-muted leading-relaxed">
                        {finding.whyItMatters}
                      </p>
                    </div>

                    {/* Action Step */}
                    <div className="text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-sage-100">
                      <div>
                        <span className="font-semibold text-charcoal">{isHi ? 'अनुशंसित सुधार:' : 'Recommended Correction:'} </span>
                        <span className="text-forest-800 font-medium">{finding.howToVerifyOrCorrect}</span>
                      </div>

                      {isMismatch && (
                        <Link
                          href="/escalation"
                          className="inline-flex items-center text-xs font-bold text-forest-800 hover:text-forest-900 underline shrink-0"
                        >
                          {isHi ? 'सुधार आवेदन पत्र ड्राफ्ट करें →' : 'Draft Rectification Memo →'}
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Next step CTA */}
            <div className="p-6 rounded-3xl bg-forest-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-card">
              <div>
                <h4 className="font-display font-bold text-base">
                  {isHi ? 'सम्पूर्ण डायग्नोसिस रिपोर्ट के लिए तैयार हैं?' : 'Ready for Complete Diagnosis?'}
                </h4>
                <p className="text-xs text-sage-300">
                  {isHi 
                    ? 'डायग्नोसिस इंजन में वैधानिक सरकारी नियम संदर्भ और अगला व्यावहारिक कदम देखें।'
                    : 'Compile verified statutory citations and procedural next steps in the Diagnosis Engine.'}
                </p>
              </div>

              <Link
                href="/diagnosis"
                className="bg-ivory-100 hover:bg-white text-forest-900 font-semibold px-5 py-2.5 rounded-xl text-xs transition shadow-card flex items-center space-x-1 shrink-0"
              >
                <span>{isHi ? 'डायग्नोसिस इंजन खोलें' : 'Launch Diagnosis Engine'}</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
