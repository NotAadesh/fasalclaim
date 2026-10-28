'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { 
  Plus, 
  FileSearch, 
  Stethoscope, 
  Send, 
  Mic, 
  AlertTriangle, 
  CheckCircle2, 
  ChevronRight
} from 'lucide-react';
import { DelayInterestAlerts } from '@/components/alerts/DelayInterestAlerts';

export default function FarmerPortalPage() {
  const { 
    cases, 
    activeCaseId, 
    setActiveCaseId, 
    activeCase, 
    setVoiceModalOpen,
    addCase,
    language 
  } = useApp();

  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);
  const [formData, setFormData] = useState({
    farmerName: 'Balasaheb Shinde',
    phone: '+91 94220 55102',
    aadhaarLast4: '3941',
    state: 'Maharashtra',
    district: 'Ahmednagar',
    taluka: 'Rahuri',
    village: 'Vambori',
    crop: 'Cotton (Bt Cotton)',
    season: 'Kharif',
    year: 2024,
    surveyNumber: '76/1B',
    insuredAreaHectares: 2.0,
    sumInsuredInr: 80000,
    policyNumber: 'PMFBY-2024-MH-771920',
    applicationNumber: 'NCIP-APP-2024-91208',
    insurerName: 'AIC of India',
    bankName: 'Bank of India',
    bankBranch: 'Vambori Branch',
    accountNumberLast4: '4109',
    ifscCode: 'BKID0001092',
    lossDate: '2024-09-18',
    lossReason: 'Inundation / Waterlogging',
    claimIntimationDate: '2024-09-20'
  });

  const handleInputChange = (field: string, val: any) => {
    setFormData(prev => ({ ...prev, [field]: val }));
  };

  const handleCreateCase = (e: React.FormEvent) => {
    e.preventDefault();
    addCase(formData);
    setRegisterModalOpen(false);
    setWizardStep(1);
  };

  const isHi = language === 'hi';

  const translateStatus = (st: string) => {
    if (!isHi) return st.replace('_', ' ');
    switch (st) {
      case 'discrepancy_detected': return 'विसंगति मिली';
      case 'escalation_prepared': return 'शिकायत तैयार';
      case 'grievance_submitted': return 'शिकायत जमा';
      case 'under_review': return 'समीक्षाधीन';
      default: return 'सक्रिय';
    }
  };

  return (
    <div className="bg-ivory-50/70 min-h-screen pb-20">
      {/* Top Banner / Breadcrumb */}
      <div className="bg-white border-b border-sage-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 text-xs text-charcoal-muted mb-1">
                <Link href="/" className="hover:text-forest-800">{isHi ? 'होम' : 'Home'}</Link>
                <span>/</span>
                <span className="text-forest-900 font-semibold">{isHi ? 'किसान पोर्टल' : 'Farmer Portal'}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-display font-bold text-charcoal">
                {isHi ? 'किसान क्लेम आश्वासन कार्यक्षेत्र' : 'Farmer Claim Assurance Workspace'}
              </h1>
              <p className="text-xs sm:text-sm text-charcoal-muted mt-0.5">
                {isHi 
                  ? 'अपने सक्रिय फसल बीमा मामलों की समीक्षा करें, संभावित अड़चनों को समझें और साक्ष्य सुरक्षित रखें।'
                  : 'Review your active crop insurance cases, identify bottlenecks, and maintain evidence.'}
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center space-x-2.5">
              <button
                onClick={() => setVoiceModalOpen(true)}
                className="flex items-center space-x-2 px-3.5 py-2.5 rounded-xl border border-sage-300 bg-ivory-100 hover:bg-sage-100 text-forest-800 text-xs font-semibold shadow-subtle transition"
              >
                <Mic className="w-4 h-4 text-forest-700" />
                <span>{isHi ? 'वाणी सहायता' : 'Voice Help'}</span>
              </button>

              <button
                onClick={() => setRegisterModalOpen(true)}
                className="flex items-center space-x-2 bg-forest-800 hover:bg-forest-900 text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold shadow-card hover:shadow-card-hover transition"
              >
                <Plus className="w-4 h-4" />
                <span>{isHi ? 'नया क्लेम दर्ज करें' : 'Register New Claim'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Metric Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-sage-200 shadow-subtle">
            <div className="text-xs font-medium text-charcoal-muted mb-1">
              {isHi ? 'कुल ट्रैक किए गए क्लेम' : 'Total Claims Tracked'}
            </div>
            <div className="text-2xl sm:text-3xl font-display font-bold text-charcoal">
              {cases.length}
            </div>
            <div className="text-[11px] text-forest-700 font-medium mt-1">
              {isHi ? 'सभी दर्ज मौसम' : 'All seasons on record'}
            </div>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-sage-200 shadow-subtle">
            <div className="text-xs font-medium text-charcoal-muted mb-1">
              {isHi ? 'पहचानी गई विसंगतियां' : 'Discrepancies Flagged'}
            </div>
            <div className="text-2xl sm:text-3xl font-display font-bold text-terracotta-600">
              {cases.reduce((acc, c) => acc + c.radarFindings.filter(f => f.status === 'potential_mismatch').length, 0)}
            </div>
            <div className="text-[11px] text-terracotta-700 font-medium mt-1">
              {isHi ? 'बैंक या भूमि सत्यापन आवश्यक' : 'Requires bank or land verification'}
            </div>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-sage-200 shadow-subtle">
            <div className="text-xs font-medium text-charcoal-muted mb-1">
              {isHi ? 'तैयार शिकायत पत्र' : 'Grievance Drafts Ready'}
            </div>
            <div className="text-2xl sm:text-3xl font-display font-bold text-forest-800">
              {cases.reduce((acc, c) => acc + c.grievances.length, 0)}
            </div>
            <div className="text-[11px] text-forest-700 font-medium mt-1">
              {isHi ? 'DLMC / नोडल अधिकारी हेतु तैयार' : 'Ready for DLMC / Nodal submission'}
            </div>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-sage-200 shadow-subtle">
            <div className="text-xs font-medium text-charcoal-muted mb-1">
              {isHi ? 'कुल बीमा सुरक्षा राशि' : 'Total Sum Insured'}
            </div>
            <div className="text-2xl sm:text-3xl font-display font-bold text-charcoal">
              ₹{(cases.reduce((acc, c) => acc + c.sumInsuredInr, 0) / 1000).toFixed(0)}k
            </div>
            <div className="text-[11px] text-charcoal-muted mt-1">
              {isHi ? 'सक्रिय बीमा सुरक्षा' : 'Under coverage assurance'}
            </div>
          </div>
        </div>

        {/* Delay & Interest Alerts Integration */}
        <DelayInterestAlerts />

        {/* Main Grid: Left Cases List, Right Active Case Spotlight */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: My Claims List */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display font-bold text-lg text-charcoal">
                {isHi ? `मेरे क्लेम रिकॉर्ड्स (${cases.length})` : `My Claim Records (${cases.length})`}
              </h2>
              <span className="text-xs text-charcoal-muted">
                {isHi ? 'समीक्षा हेतु केस चुनें' : 'Select case to review'}
              </span>
            </div>

            <div className="space-y-3">
              {cases.map((claim) => {
                const isSelected = claim.id === activeCaseId;
                const mismatchCount = claim.radarFindings.filter(f => f.status === 'potential_mismatch').length;

                return (
                  <div
                    key={claim.id}
                    onClick={() => setActiveCaseId(claim.id)}
                    className={`p-4 rounded-2xl border transition cursor-pointer text-left ${
                      isSelected 
                        ? 'bg-white border-forest-800 shadow-card ring-2 ring-forest-800/10' 
                        : 'bg-white/80 border-sage-200 hover:bg-white hover:border-sage-300 shadow-subtle'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-xs font-bold text-forest-800">
                          {claim.caseNumber}
                        </div>
                        <h4 className="font-display font-bold text-base text-charcoal mt-0.5">
                          {claim.crop}
                        </h4>
                        <p className="text-xs text-charcoal-muted">
                          {claim.season} {claim.year} • {claim.village}, {claim.district}
                        </p>
                      </div>

                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                        claim.status === 'discrepancy_detected'
                          ? 'bg-terracotta-50 text-terracotta-700 border-terracotta-200'
                          : claim.status === 'escalation_prepared'
                          ? 'bg-amber-50 text-amber-800 border-amber-200'
                          : claim.status === 'grievance_submitted'
                          ? 'bg-blue-50 text-blue-800 border-blue-200'
                          : 'bg-sage-100 text-forest-800 border-sage-300'
                      }`}>
                        {translateStatus(claim.status)}
                      </span>
                    </div>

                    <div className="mt-3 pt-3 border-t border-sage-100 flex items-center justify-between text-xs">
                      <span className="text-charcoal-muted">
                        {isHi ? 'बीमाकर्ता:' : 'Insurer:'} <strong>{claim.insurerName.split(' ')[0]}</strong>
                      </span>
                      {mismatchCount > 0 ? (
                        <span className="text-terracotta-600 font-semibold flex items-center gap-1">
                          <AlertTriangle className="w-3.5 h-3.5" /> {mismatchCount} {isHi ? 'विसंगति' : 'Discrepancy'}
                        </span>
                      ) : (
                        <span className="text-emerald-700 font-medium flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> {isHi ? 'सुसंगत' : 'Consistent'}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Active Claim In-Depth Spotlight */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-sage-300 shadow-card space-y-6">
              
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-sage-200 pb-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-sage-200 text-forest-800">
                      {isHi ? 'सक्रिय केस' : 'Active Case'}
                    </span>
                    <span className="text-xs text-charcoal-muted">Ref #{activeCase.applicationNumber}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-charcoal mt-1">
                    {activeCase.farmerName}
                  </h3>
                  <p className="text-xs text-charcoal-muted">
                    {activeCase.crop} • {isHi ? 'सर्वे #' : 'Survey #'}{activeCase.surveyNumber} • {activeCase.insuredAreaHectares} Ha ({isHi ? 'बीमित राशि:' : 'Sum Insured:'} ₹{activeCase.sumInsuredInr.toLocaleString('en-IN')})
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <Link
                    href="/radar"
                    className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-ivory-100 hover:bg-sage-100 text-forest-800 border border-sage-300 text-xs font-semibold transition"
                  >
                    <FileSearch className="w-3.5 h-3.5" />
                    <span>{isHi ? 'रडार जांच' : 'Radar Checks'}</span>
                  </Link>

                  <Link
                    href="/diagnosis"
                    className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-forest-800 hover:bg-forest-900 text-white text-xs font-semibold shadow-card transition"
                  >
                    <Stethoscope className="w-3.5 h-3.5" />
                    <span>{isHi ? 'डायग्नोसिस खोलें' : 'Open Diagnosis'}</span>
                  </Link>
                </div>
              </div>

              {/* Four Key Pillars Preview */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {/* Bank Verification */}
                <div className="p-3.5 rounded-xl bg-ivory-50 border border-sage-200 space-y-1">
                  <div className="text-charcoal-muted font-medium">{isHi ? 'बैंक डीबीटी मार्ग' : 'Bank DBT Route'}</div>
                  <div className="text-sm font-bold text-charcoal">{activeCase.bankName}</div>
                  <div className="text-charcoal-muted">
                    A/C: ****{activeCase.accountNumberLast4} • IFSC: {activeCase.ifscCode}
                  </div>
                </div>

                {/* Land Records */}
                <div className="p-3.5 rounded-xl bg-ivory-50 border border-sage-200 space-y-1">
                  <div className="text-charcoal-muted font-medium">{isHi ? 'भूमि जोत' : 'Land Holding'}</div>
                  <div className="text-sm font-bold text-charcoal">{isHi ? 'सर्वे #' : 'Survey #'}{activeCase.surveyNumber}</div>
                  <div className="text-charcoal-muted">
                    {activeCase.village}, {isHi ? 'तालुका' : 'Taluka'} {activeCase.taluka}, {activeCase.district}
                  </div>
                </div>
              </div>

              {/* Radar Status Summary in active case */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-charcoal uppercase tracking-wider">
                    {isHi ? 'दस्तावेज़ विसंगति रडार निष्कर्ष' : 'Document Mismatch Radar Findings'}
                  </span>
                  <Link href="/radar" className="text-forest-800 font-semibold hover:underline">
                    {isHi ? 'विस्तार से देखें →' : 'View Details →'}
                  </Link>
                </div>

                <div className="space-y-2">
                  {activeCase.radarFindings.slice(0, 3).map((finding) => (
                    <div 
                      key={finding.id}
                      className="p-3 rounded-xl border border-sage-200 bg-white flex items-start justify-between text-xs"
                    >
                      <div className="space-y-0.5">
                        <div className="font-semibold text-charcoal">{finding.title}</div>
                        <div className="text-charcoal-muted">{finding.whatAppearsInconsistent}</div>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold shrink-0 ml-2 ${
                        finding.status === 'potential_mismatch'
                          ? 'bg-terracotta-50 text-terracotta-700'
                          : finding.status === 'looks_consistent'
                          ? 'bg-emerald-50 text-emerald-800'
                          : 'bg-amber-50 text-amber-800'
                      }`}>
                        {finding.status.replace('_', ' ')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Case Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <Link
                  href="/escalation"
                  className="w-full sm:w-1/2 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-forest-800 hover:bg-forest-900 text-white font-semibold text-xs shadow-card transition"
                >
                  <Send className="w-4 h-4" />
                  <span>{isHi ? 'शिकायत पत्र तैयार करें' : 'Prepare Grievance Letter'}</span>
                </Link>

                <Link
                  href="/diagnosis"
                  className="w-full sm:w-1/2 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-ivory-100 hover:bg-sage-100 border border-sage-300 text-forest-800 font-semibold text-xs transition"
                >
                  <Stethoscope className="w-4 h-4" />
                  <span>{isHi ? 'साक्ष्य विश्लेषण देखें' : 'View Evidence Breakdown'}</span>
                </Link>
              </div>

              {/* Chronological Timeline */}
              <div className="pt-4 border-t border-sage-200 space-y-3">
                <h4 className="font-display font-bold text-sm text-charcoal">
                  {isHi ? 'केस गतिविधि और अनुवर्ती इतिहास' : 'Case Activity & Follow-up History'}
                </h4>
                <div className="space-y-2.5">
                  {activeCase.timeline.map((item) => (
                    <div key={item.id} className="flex items-start space-x-3 text-xs">
                      <div className="w-2 h-2 rounded-full bg-forest-700 mt-1.5 shrink-0"></div>
                      <div>
                        <div className="font-semibold text-charcoal flex items-center space-x-2">
                          <span>{item.title}</span>
                          <span className="text-[10px] text-charcoal-muted font-normal">• {item.timestamp}</span>
                        </div>
                        <p className="text-charcoal-muted mt-0.5">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* MULTI-STEP WIZARD MODAL */}
      {registerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white border border-sage-300 w-full max-w-2xl rounded-3xl shadow-elevated overflow-hidden flex flex-col max-h-[90vh]">
            <div className="bg-forest-800 text-white p-6 flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider text-sage-300 font-semibold">
                  {isHi ? `चरण ${wizardStep} (कुल 3)` : `Step ${wizardStep} of 3`}
                </span>
                <h3 className="text-xl font-display font-bold text-white mt-0.5">
                  {isHi ? 'फसल बीमा क्लेम दर्ज करें' : 'Register Crop Insurance Claim'}
                </h3>
              </div>
              <button
                onClick={() => setRegisterModalOpen(false)}
                className="text-sage-300 hover:text-white p-2 rounded-lg hover:bg-forest-700"
              >
                ✕
              </button>
            </div>

            <div className="w-full bg-sage-200 h-1.5">
              <div 
                className="bg-forest-800 h-1.5 transition-all duration-300"
                style={{ width: `${(wizardStep / 3) * 100}%` }}
              ></div>
            </div>

            <form onSubmit={handleCreateCase} className="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
              {wizardStep === 1 && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="font-semibold text-sm text-charcoal border-b border-sage-200 pb-2">
                    {isHi ? '1. किसान और स्थान का विवरण' : '1. Farmer & Geography Details'}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-charcoal font-medium mb-1">
                        {isHi ? 'किसान का पूरा नाम *' : 'Farmer Full Name *'}
                      </label>
                      <input
                        type="text"
                        value={formData.farmerName}
                        onChange={(e) => handleInputChange('farmerName', e.target.value)}
                        className="w-full border border-sage-300 rounded-xl p-2.5 text-xs text-charcoal"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-charcoal font-medium mb-1">
                        {isHi ? 'मोबाइल नंबर *' : 'Phone Number *'}
                      </label>
                      <input
                        type="text"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full border border-sage-300 rounded-xl p-2.5 text-xs text-charcoal"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-charcoal font-medium mb-1">{isHi ? 'राज्य' : 'State'}</label>
                      <input
                        type="text"
                        value={formData.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        className="w-full border border-sage-300 rounded-xl p-2.5 text-xs text-charcoal"
                      />
                    </div>
                    <div>
                      <label className="block text-charcoal font-medium mb-1">{isHi ? 'जिला' : 'District'}</label>
                      <input
                        type="text"
                        value={formData.district}
                        onChange={(e) => handleInputChange('district', e.target.value)}
                        className="w-full border border-sage-300 rounded-xl p-2.5 text-xs text-charcoal"
                      />
                    </div>
                    <div>
                      <label className="block text-charcoal font-medium mb-1">{isHi ? 'तालुका' : 'Taluka'}</label>
                      <input
                        type="text"
                        value={formData.taluka}
                        onChange={(e) => handleInputChange('taluka', e.target.value)}
                        className="w-full border border-sage-300 rounded-xl p-2.5 text-xs text-charcoal"
                      />
                    </div>
                    <div>
                      <label className="block text-charcoal font-medium mb-1">{isHi ? 'गांव' : 'Village'}</label>
                      <input
                        type="text"
                        value={formData.village}
                        onChange={(e) => handleInputChange('village', e.target.value)}
                        className="w-full border border-sage-300 rounded-xl p-2.5 text-xs text-charcoal"
                      />
                    </div>
                  </div>
                </div>
              )}

              {wizardStep === 2 && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="font-semibold text-sm text-charcoal border-b border-sage-200 pb-2">
                    {isHi ? '2. फसल, भूमि और पॉलिसी का विवरण' : '2. Crop, Land & Policy Information'}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-charcoal font-medium mb-1">{isHi ? 'फसल का नाम *' : 'Crop Name *'}</label>
                      <input
                        type="text"
                        value={formData.crop}
                        onChange={(e) => handleInputChange('crop', e.target.value)}
                        className="w-full border border-sage-300 rounded-xl p-2.5 text-xs text-charcoal"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-charcoal font-medium mb-1">{isHi ? 'मौसम' : 'Season'}</label>
                      <select
                        value={formData.season}
                        onChange={(e) => handleInputChange('season', e.target.value)}
                        className="w-full border border-sage-300 rounded-xl p-2.5 text-xs text-charcoal"
                      >
                        <option value="Kharif">{isHi ? 'खरीफ' : 'Kharif'}</option>
                        <option value="Rabi">{isHi ? 'रबी' : 'Rabi'}</option>
                        <option value="Zaid / Summer">{isHi ? 'जायद / ग्रीष्मकालीन' : 'Zaid / Summer'}</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-charcoal font-medium mb-1">{isHi ? 'वर्ष' : 'Year'}</label>
                      <input
                        type="number"
                        value={formData.year}
                        onChange={(e) => handleInputChange('year', parseInt(e.target.value))}
                        className="w-full border border-sage-300 rounded-xl p-2.5 text-xs text-charcoal"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-charcoal font-medium mb-1">{isHi ? 'सर्वे / खसरा नंबर *' : 'Survey / Khasra No *'}</label>
                      <input
                        type="text"
                        value={formData.surveyNumber}
                        onChange={(e) => handleInputChange('surveyNumber', e.target.value)}
                        className="w-full border border-sage-300 rounded-xl p-2.5 text-xs text-charcoal"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-charcoal font-medium mb-1">{isHi ? 'बीमित क्षेत्र (हेक्टेयर) *' : 'Insured Area (Ha) *'}</label>
                      <input
                        type="number"
                        step="0.1"
                        value={formData.insuredAreaHectares}
                        onChange={(e) => handleInputChange('insuredAreaHectares', parseFloat(e.target.value))}
                        className="w-full border border-sage-300 rounded-xl p-2.5 text-xs text-charcoal"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-charcoal font-medium mb-1">{isHi ? 'बीमित राशि (₹)' : 'Sum Insured (₹)'}</label>
                      <input
                        type="number"
                        value={formData.sumInsuredInr}
                        onChange={(e) => handleInputChange('sumInsuredInr', parseInt(e.target.value))}
                        className="w-full border border-sage-300 rounded-xl p-2.5 text-xs text-charcoal"
                      />
                    </div>
                  </div>
                </div>
              )}

              {wizardStep === 3 && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="font-semibold text-sm text-charcoal border-b border-sage-200 pb-2">
                    {isHi ? '3. बैंक विवरण और नुकसान का कारण' : '3. Banking Credentials & Loss Reason'}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-charcoal font-medium mb-1">{isHi ? 'बैंक का नाम *' : 'Bank Name *'}</label>
                      <input
                        type="text"
                        value={formData.bankName}
                        onChange={(e) => handleInputChange('bankName', e.target.value)}
                        className="w-full border border-sage-300 rounded-xl p-2.5 text-xs text-charcoal"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-charcoal font-medium mb-1">{isHi ? 'आईएफएससी कोड *' : 'IFSC Code *'}</label>
                      <input
                        type="text"
                        value={formData.ifscCode}
                        onChange={(e) => handleInputChange('ifscCode', e.target.value)}
                        className="w-full border border-sage-300 rounded-xl p-2.5 text-xs text-charcoal"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-charcoal font-medium mb-1">{isHi ? 'खाता नंबर (अंतिम 4 अंक)' : 'Account Last 4 Digits'}</label>
                      <input
                        type="text"
                        value={formData.accountNumberLast4}
                        onChange={(e) => handleInputChange('accountNumberLast4', e.target.value)}
                        className="w-full border border-sage-300 rounded-xl p-2.5 text-xs text-charcoal"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-charcoal font-medium mb-1">{isHi ? 'नुकसान का कारण / आपदा' : 'Loss Reason / Calamity'}</label>
                      <input
                        type="text"
                        value={formData.lossReason}
                        onChange={(e) => handleInputChange('lossReason', e.target.value)}
                        className="w-full border border-sage-300 rounded-xl p-2.5 text-xs text-charcoal"
                      />
                    </div>
                    <div>
                      <label className="block text-charcoal font-medium mb-1">{isHi ? 'नुकसान की तारीख' : 'Date of Loss Event'}</label>
                      <input
                        type="date"
                        value={formData.lossDate}
                        onChange={(e) => handleInputChange('lossDate', e.target.value)}
                        className="w-full border border-sage-300 rounded-xl p-2.5 text-xs text-charcoal"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-sage-200 flex items-center justify-between">
                {wizardStep > 1 ? (
                  <button
                    type="button"
                    onClick={() => setWizardStep(wizardStep - 1)}
                    className="px-4 py-2 rounded-xl border border-sage-300 text-charcoal font-medium"
                  >
                    {isHi ? 'पीछे' : 'Back'}
                  </button>
                ) : (
                  <div></div>
                )}

                {wizardStep < 3 ? (
                  <button
                    type="button"
                    onClick={() => setWizardStep(wizardStep + 1)}
                    className="px-5 py-2.5 rounded-xl bg-forest-800 text-white font-semibold"
                  >
                    {isHi ? 'आगे बढ़ें' : 'Continue'}
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-forest-800 hover:bg-forest-900 text-white font-semibold shadow-card"
                  >
                    {isHi ? 'सहेजें और डायग्नोसिस चलाएं' : 'Save & Run Diagnosis'}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
