'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { 
  Copy, 
  Check, 
  Download, 
  CheckCircle2, 
  Clock, 
  FileText, 
  ShieldCheck, 
  ExternalLink
} from 'lucide-react';
import { GrievanceDraft } from '@/lib/types';

export default function EscalationNavigatorPage() {
  const { 
    activeCase, 
    cases, 
    setActiveCaseId, 
    updateGrievance, 
    addGrievance, 
    markGrievanceSubmitted,
    language 
  } = useApp();

  const [copied, setCopied] = useState(false);
  const [selectedRecipient, setSelectedRecipient] = useState<
    'district_level_committee' | 'state_grievance_committee' | 'insurer_nodal_officer' | 'bank_branch_manager'
  >('district_level_committee');

  const [submissionModalOpen, setSubmissionModalOpen] = useState(false);
  const [submissionRef, setSubmissionRef] = useState('');
  const [submissionChannel, setSubmissionChannel] = useState<'submitted_offline' | 'submitted_online'>('submitted_offline');

  const isHi = language === 'hi';
  const currentGrievance: GrievanceDraft | undefined = activeCase.grievances[0];

  const handleGenerateNewDraft = () => {
    let recipientName = isHi 
      ? 'जिला स्तरीय शिकायत निवारण समिति (DLMC)' 
      : 'District Level Grievance Redressal Committee (DLMC)';
    let recipientAddress = isHi
      ? `कार्यालय: जिला कलेक्टर / जिला कृषि अधिकारी, ${activeCase.district}, ${activeCase.state}`
      : `Office of District Collector / Agriculture Officer, ${activeCase.district}, ${activeCase.state}`;

    if (selectedRecipient === 'state_grievance_committee') {
      recipientName = isHi ? 'राज्य स्तरीय शिकायत निवारण समिति (SGRC)' : 'State Level Grievance Redressal Committee (SGRC)';
      recipientAddress = isHi ? `कृषि निदेशालय, राज्य समन्वय प्रकोष्ठ, ${activeCase.state}` : `Directorate of Agriculture, State Coordination Cell, ${activeCase.state}`;
    } else if (selectedRecipient === 'insurer_nodal_officer') {
      recipientName = isHi ? `शिकायत निवारण नोडल अधिकारी, ${activeCase.insurerName}` : `Grievance Redressal Nodal Officer, ${activeCase.insurerName}`;
      recipientAddress = isHi ? `क्षेत्रीय क्लेम कार्यालय, ${activeCase.district} संभाग` : `Regional Claims Office, ${activeCase.district} Division`;
    } else if (selectedRecipient === 'bank_branch_manager') {
      recipientName = isHi ? `शाखा प्रबंधक, ${activeCase.bankName}` : `Branch Manager, ${activeCase.bankName}`;
      recipientAddress = `${activeCase.bankBranch || 'Local Branch'}, ${activeCase.taluka}`;
    }

    const draftText = isHi ? `प्रति,
${recipientName},
${recipientAddress}।

विषय: पीएमएफबीवाई क्लेम संदर्भ संख्या: ${activeCase.applicationNumber} (${activeCase.crop}, ${activeCase.season} ${activeCase.year}) के भुगतान में आ रही लिपिकीय रुकावट के समाधान हेतु औपचारिक अभ्यावेदन।

महोदय/महोदया,

मैं, ${activeCase.farmerName}, निवासी ग्राम ${activeCase.village}, तालुका ${activeCase.taluka}, जिला ${activeCase.district}, सादर निवेदन करता हूँ कि मेरी फसल बीमा पॉलिसी संख्या #${activeCase.policyNumber} (${activeCase.insurerName}) के तहत दर्ज क्लेम अभी तक अनिर्णीत है।

१. क्लेम का संक्षिप्त विवरण:
- बीमित किसान का नाम: ${activeCase.farmerName} (आधार अंतिम ४ अंक: ${activeCase.aadhaarLast4})
- बीमित भूमि पार्सल: सर्वे/खसरा संख्या #${activeCase.surveyNumber}, कुल क्षेत्र: ${activeCase.insuredAreaHectares} हेक्टेयर
- फसल एवं मौसम: ${activeCase.crop} (${activeCase.season} ${activeCase.year})
- प्राकृतिक आपदा का कारण: ${activeCase.lossReason} (आपदा तिथि: ${activeCase.lossDate})
- नुकसान सूचना संदर्भ: ${activeCase.claimIntimationDate} को विधिवत दर्ज

२. प्रशासनिक रुकावट एवं संलग्न साक्ष्य:
फसलक्लेम द्वारा स्वतंत्र दस्तावेजी परीक्षण के उपरांत निम्नलिखित साक्ष्य सत्यापित किए गए हैं:
- बैंक खाता विवरण: बचत खाता संख्या ****${activeCase.accountNumberLast4}, ${activeCase.bankName} (आईएफएससी: ${activeCase.ifscCode})। डीबीटी सत्यापन हेतु बैंक पासबुक की प्रति संलग्न है।
- भूमि अधिकार: राजस्व 7/12 खसरा उद्धरण पुष्टि करता है कि सर्वे संख्या #${activeCase.surveyNumber} पर मेरा वैध कृषक हित है।

३. वैधानिक आधार:
पीएमएफबीवाई संशोधित परिचालन दिशानिर्देश धारा 13.4 (डीबीटी सुधार प्रोटोकॉल) और धारा 15.2 के तहत, सभी सत्यापित दस्तावेजों वाले पात्र किसानों के दावों का त्वरित निस्तारण अनिवार्य है।

अतः श्रीमान जी से सविनय प्रार्थना है कि संलग्न प्रमाणित दस्तावेजों का संज्ञान लेते हुए बीमा कंपनी को मेरे वैध क्लेम की डीबीटी राशि अविलंब जारी करने का आदेश प्रदान करें।

धन्यवाद,
भवदीय,

___________________________
${activeCase.farmerName}
मोबाइल: ${activeCase.phone}
दिनांक: ${new Date().toLocaleDateString('hi-IN')}` : `To,
The ${recipientName},
${recipientAddress}.

Subject: Formal Representation regarding Settlement Bottleneck for PMFBY Claim Ref: ${activeCase.applicationNumber} (${activeCase.crop}, ${activeCase.season} ${activeCase.year})

Respected Authority,

I, ${activeCase.farmerName}, residing at Village ${activeCase.village}, Taluka ${activeCase.taluka}, District ${activeCase.district}, respectfully submit this representation concerning my pending crop insurance claim registered under Policy #${activeCase.policyNumber} with ${activeCase.insurerName}.

1. PARTICULARS OF THE CLAIM:
- Insured Farmer: ${activeCase.farmerName} (Aadhaar last 4: ${activeCase.aadhaarLast4})
- Insured Parcel: Survey/Khasra #${activeCase.surveyNumber}, Area: ${activeCase.insuredAreaHectares} Ha
- Crop & Season: ${activeCase.crop} (${activeCase.season} ${activeCase.year})
- Loss Event: ${activeCase.lossReason} occurred on ${activeCase.lossDate}
- Intimation Ref: Lodged on ${activeCase.claimIntimationDate}

2. NATURE OF ADMINISTRATIVE BOTTLENECK & EVIDENCE:
Upon independent verification through FasalClaim, the following evidentiary clarifications are established:
- Bank Details: Savings A/C #${activeCase.accountNumberLast4} at ${activeCase.bankName} (IFSC: ${activeCase.ifscCode}). Passbook copy attached for DBT verification.
- Land Rights: 7/12 / Revenue RoR extract confirms insurable interest over parcel #${activeCase.surveyNumber}.

3. STATUTORY GROUND FOR EXPEDITION:
In accordance with PMFBY Revised Operational Guidelines Section 13.4 (DBT Rectification Protocols) and Section 15.2, legitimate claims with rectified documentation must be expedited to prevent agrarian hardship.

I request the committee/office to review the attached attested documents, record this representation, and direct the insurance company to release the legitimate claim disbursement.

Thanking you,
Yours sincerely,

___________________________
${activeCase.farmerName}
Contact: ${activeCase.phone}
Date: ${new Date().toLocaleDateString('en-IN')}`;

    addGrievance(activeCase.id, {
      recipientType: selectedRecipient,
      recipientName,
      recipientAddress,
      subject: isHi ? `क्लेम संदर्भ: ${activeCase.applicationNumber} हेतु औपचारिक अभ्यावेदन` : `Representation for Claim Ref: ${activeCase.applicationNumber}`,
      draftBody: draftText,
      evidenceReferences: [
        `Bank Passbook Account Page (${activeCase.bankName})`,
        `Digital 7/12 Extract (Survey #${activeCase.surveyNumber})`,
        `NCIP Enrollment Slip dated ${activeCase.applicationDate}`
      ],
      missingDocsAttached: [
        'Aadhaar Self-Attested Photocopy',
        'Bank Account Rectification Slip'
      ],
      suggestedFollowUpDays: 14
    });
  };

  const handleCopyDraft = () => {
    if (!currentGrievance) return;
    navigator.clipboard.writeText(currentGrievance.draftBody);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRecordSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentGrievance || !submissionRef) return;
    markGrievanceSubmitted(activeCase.id, currentGrievance.id, submissionRef, submissionChannel);
    setSubmissionModalOpen(false);
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
                <span className="text-forest-900 font-semibold">{isHi ? 'स्मार्ट शिकायत निवारक' : 'Smart Escalation Navigator'}</span>
              </div>
              <div className="flex items-center space-x-3">
                <h1 className="text-2xl sm:text-3xl font-display font-bold text-charcoal">
                  {isHi ? 'स्मार्ट शिकायत निवारक' : 'Smart Escalation Navigator'}
                </h1>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-forest-800 text-white">
                  {isHi ? 'शिकायत कार्यक्षेत्र' : 'Grievance Workspace'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-charcoal-muted mt-0.5">
                {isHi 
                  ? 'संरचित, साक्ष्य-युक्त शिकायत पत्र तैयार करें और आधिकारिक माध्यमों से हुए सबमिशन को ट्रैक करें।'
                  : 'Generate structured, evidence-backed grievance drafts and track formal submissions through official channels.'}
              </p>
            </div>

            {/* Case selector */}
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
        
        {/* Mandatory Transparency Guardrail */}
        <div className="bg-white border-2 border-forest-800/40 rounded-3xl p-6 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-forest-800 text-white flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-sage-200" />
            </div>
            <div className="text-xs leading-relaxed">
              <strong className="text-sm font-display font-bold text-charcoal block mb-0.5">
                {isHi ? 'सांविधिक ड्राफ्ट लेबलिंग प्रोटोकॉल' : 'Statutory Draft Labeling Protocol'}
              </strong>
              {isHi
                ? 'इस कार्यक्षेत्र में तैयार किए गए सभी पत्र औपचारिक ड्राफ्ट हैं। फसलक्लेम आपकी ओर से सीधे शिकायत दर्ज नहीं करता है और न ही आधिकारिक सबमिशन का दावा करता है। आपको इस पत्र को प्रिंट/कॉपी करके संबंधित जिला स्तरीय समिति (DLMC), बीमा कंपनी नोडल डेस्क, या CPGRAMS पोर्टल पर स्वयं जमा करना होगा।'
                : 'All representations prepared in this workspace are formal drafts. FasalClaim does not file grievances directly on your behalf and does not simulate official submission. You must print/copy this petition and file it with the designated District Level Monitoring Committee (DLMC), Insurer Nodal Desk, or CPGRAMS portal.'}
            </div>
          </div>

          <div className="shrink-0 flex items-center space-x-2">
            <span className={`text-xs font-bold px-3 py-1.5 rounded-xl border ${
              currentGrievance?.status === 'submitted_offline' || currentGrievance?.status === 'submitted_online'
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                : 'bg-amber-50 text-amber-800 border-amber-300'
            }`}>
              {currentGrievance?.status === 'submitted_offline'
                ? (isHi ? 'व्यक्तिगत जमा किया गया' : 'Submitted In-Person')
                : currentGrievance?.status === 'submitted_online'
                ? (isHi ? 'ऑनलाइन जमा किया गया' : 'Submitted Online')
                : (isHi ? 'केवल ड्राफ्ट (जमा नहीं हुआ)' : 'Draft Only (Not Submitted)')}
            </span>
          </div>
        </div>

        {/* Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Pathway Selector */}
            <div className="bg-white rounded-3xl p-6 border border-sage-300 shadow-card space-y-4">
              <div className="border-b border-sage-200 pb-3">
                <h3 className="font-display font-bold text-base text-charcoal">
                  {isHi ? '1. शिकायत माध्यम चुनें' : '1. Select Escalation Channel'}
                </h3>
                <p className="text-xs text-charcoal-muted mt-0.5">
                  {isHi ? 'अपनी समस्या के अनुसार सक्षम वैधानिक प्राधिकरण चुनें।' : 'Choose the statutory authority based on your verified issue.'}
                </p>
              </div>

              <div className="space-y-2.5 text-xs">
                <label className={`p-3.5 rounded-2xl border transition cursor-pointer block ${
                  selectedRecipient === 'district_level_committee'
                    ? 'border-forest-800 bg-ivory-50 ring-1 ring-forest-800'
                    : 'border-sage-200 hover:bg-ivory-50/50'
                }`}>
                  <div className="flex items-center space-x-2 font-bold text-charcoal">
                    <input
                      type="radio"
                      name="recipient"
                      checked={selectedRecipient === 'district_level_committee'}
                      onChange={() => setSelectedRecipient('district_level_committee')}
                      className="accent-forest-800"
                    />
                    <span>{isHi ? 'जिला स्तरीय शिकायत निवारण (DLMC)' : 'District Level Grievance (DLMC)'}</span>
                  </div>
                  <p className="text-charcoal-muted mt-1 ml-5">
                    {isHi ? 'जिला कृषि अधिकारी / कलेक्ट्रेट। सर्वे अंतर, देरी, या स्थानीय विवादों के लिए सर्वोत्तम।' : 'District Agriculture Officer / Collectorate. Best for area discrepancies, delayed surveys, or local dispute appeals.'}
                  </p>
                </label>

                <label className={`p-3.5 rounded-2xl border transition cursor-pointer block ${
                  selectedRecipient === 'bank_branch_manager'
                    ? 'border-forest-800 bg-ivory-50 ring-1 ring-forest-800'
                    : 'border-sage-200 hover:bg-ivory-50/50'
                }`}>
                  <div className="flex items-center space-x-2 font-bold text-charcoal">
                    <input
                      type="radio"
                      name="recipient"
                      checked={selectedRecipient === 'bank_branch_manager'}
                      onChange={() => setSelectedRecipient('bank_branch_manager')}
                      className="accent-forest-800"
                    />
                    <span>{isHi ? 'बैंक शाखा प्रबंधक सुधार पत्र' : 'Bank Branch Manager Rectification'}</span>
                  </div>
                  <p className="text-charcoal-muted mt-1 ml-5">
                    {isHi ? 'नाम में अंतर, आईएफएससी कोड विलय और एनपीसीआई आधार सीडिंग सुधार हेतु।' : 'Direct branch petition for spelling variance, IFSC merger updation, and NPCI Aadhaar seeding.'}
                  </p>
                </label>

                <label className={`p-3.5 rounded-2xl border transition cursor-pointer block ${
                  selectedRecipient === 'insurer_nodal_officer'
                    ? 'border-forest-800 bg-ivory-50 ring-1 ring-forest-800'
                    : 'border-sage-200 hover:bg-ivory-50/50'
                }`}>
                  <div className="flex items-center space-x-2 font-bold text-charcoal">
                    <input
                      type="radio"
                      name="recipient"
                      checked={selectedRecipient === 'insurer_nodal_officer'}
                      onChange={() => setSelectedRecipient('insurer_nodal_officer')}
                      className="accent-forest-800"
                    />
                    <span>{isHi ? 'बीमा कंपनी नोडल अधिकारी' : 'Insurance Company Nodal Officer'}</span>
                  </div>
                  <p className="text-charcoal-muted mt-1 ml-5">
                    {isHi ? 'सब्सिडी जारी होने के 21 दिनों से अधिक विलंबित दावों पर ब्याज सहित भुगतान हेतु।' : 'For claims delayed beyond 21 days from state subsidy release under Section 15.2.'}
                  </p>
                </label>

                <label className={`p-3.5 rounded-2xl border transition cursor-pointer block ${
                  selectedRecipient === 'state_grievance_committee'
                    ? 'border-forest-800 bg-ivory-50 ring-1 ring-forest-800'
                    : 'border-sage-200 hover:bg-ivory-50/50'
                }`}>
                  <div className="flex items-center space-x-2 font-bold text-charcoal">
                    <input
                      type="radio"
                      name="recipient"
                      checked={selectedRecipient === 'state_grievance_committee'}
                      onChange={() => setSelectedRecipient('state_grievance_committee')}
                      className="accent-forest-800"
                    />
                    <span>{isHi ? 'राज्य स्तरीय समिति (SGRC)' : 'State Level Grievance (SGRC)'}</span>
                  </div>
                  <p className="text-charcoal-muted mt-1 ml-5">
                    {isHi ? 'राज्य स्तरीय अपीलीय संस्था, यदि DLMC में 30 दिनों में समाधान न हुआ हो।' : 'State Coordination Cell appellate authority if DLMC has not resolved matter within 30 days.'}
                  </p>
                </label>
              </div>

              <button
                onClick={handleGenerateNewDraft}
                className="w-full bg-forest-800 hover:bg-forest-900 text-white font-semibold py-2.5 rounded-xl text-xs transition shadow-card flex items-center justify-center space-x-1.5"
              >
                <FileText className="w-4 h-4" />
                <span>{isHi ? 'संरचित ड्राफ्ट तैयार करें' : 'Generate Tailored Draft'}</span>
              </button>
            </div>

            {/* Attachments Checklist */}
            <div className="bg-white rounded-3xl p-6 border border-sage-300 shadow-card space-y-3">
              <h4 className="font-display font-bold text-sm text-charcoal">
                {isHi ? '2. अनिवार्य संलग्नक चेकलिस्ट' : '2. Mandatory Attachments Checklist'}
              </h4>
              <p className="text-xs text-charcoal-muted">
                {isHi ? 'हस्ताक्षरित आवेदन पत्र के साथ इन दस्तावेजों की स्व-प्रमाणित प्रतियां नत्थी करें:' : 'Ensure these supporting documents are stapled to your signed physical petition:'}
              </p>

              <div className="space-y-2 text-xs">
                <div className="flex items-center space-x-2 p-2 rounded-xl bg-ivory-50 border border-sage-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-charcoal">{isHi ? 'आधार कार्ड की स्व-हस्ताक्षरित छायाप्रति' : 'Aadhaar Card self-attested copy'}</span>
                </div>
                <div className="flex items-center space-x-2 p-2 rounded-xl bg-ivory-50 border border-sage-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-charcoal">{isHi ? 'बैंक पासबुक प्रथम पृष्ठ / निरस्त चेक' : 'Bank Passbook 1st page / Cancelled Cheque'}</span>
                </div>
                <div className="flex items-center space-x-2 p-2 rounded-xl bg-ivory-50 border border-sage-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-charcoal">{isHi ? 'डिजिटल 7/12 खसरा राजस्व अभिलेख' : 'Digital 7/12 extract or Revenue Record'}</span>
                </div>
                <div className="flex items-center space-x-2 p-2 rounded-xl bg-ivory-50 border border-sage-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-charcoal">{isHi ? 'पीएमएफबीवाई राष्ट्रीय पोर्टल नामांकन रसीद' : 'PMFBY NCIP Enrollment Receipt'}</span>
                </div>
              </div>
            </div>

            {/* Submission Status Box */}
            <div className="bg-white rounded-3xl p-6 border border-sage-300 shadow-card space-y-3">
              <h4 className="font-display font-bold text-sm text-charcoal">
                {isHi ? '3. सबमिशन स्थिति ट्रैकर' : '3. Submission Status Tracker'}
              </h4>

              {currentGrievance?.status === 'submitted_offline' || currentGrievance?.status === 'submitted_online' ? (
                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs space-y-1">
                  <div className="font-bold text-emerald-800 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    {isHi ? 'बाहरी सबमिशन दर्ज है' : 'External Submission Confirmed'}
                  </div>
                  <div className="text-charcoal">
                    {isHi ? 'टोकन संख्या:' : 'Ref #:'} <strong>{currentGrievance.submissionReferenceNumber}</strong>
                  </div>
                  <div className="text-charcoal-muted text-[11px]">
                    {isHi ? 'माध्यम:' : 'Channel:'} {currentGrievance.status === 'submitted_online' ? (isHi ? 'ऑनलाइन पीजीएमएस पोर्टल' : 'Online PGMS Portal') : (isHi ? 'कलेक्ट्रेट आवक अनुभाग' : 'Collectorate Inward Desk')}
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-xs text-charcoal-muted">
                    {isHi 
                      ? 'क्या आपने यह पत्र अपने संबंधित कार्यालय में जमा कर दिया है? आधिकारिक समयसीमा शुरू करने के लिए पावती टोकन नंबर दर्ज करें।'
                      : 'Have you printed and submitted this grievance to your local authority? Record your receipt number to start the official response countdown clock.'}
                  </p>
                  <button
                    onClick={() => setSubmissionModalOpen(true)}
                    className="w-full bg-ivory-100 hover:bg-sage-100 text-forest-800 border border-sage-300 font-semibold py-2.5 rounded-xl text-xs transition"
                  >
                    {isHi ? 'बाहरी सबमिशन दर्ज करें' : 'Record External Submission'}
                  </button>
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Editable Draft Canvas */}
          <div className="lg:col-span-8 space-y-4">
            
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-sage-300 shadow-card space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-sage-200 pb-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                      {isHi ? 'ड्राफ्ट अभ्यावेदन' : 'Draft Petition'}
                    </span>
                    <span className="text-xs text-charcoal-muted">
                      {isHi ? 'निर्मित:' : 'Created:'} {currentGrievance?.createdAt || 'Today'}
                    </span>
                  </div>
                  <h3 className="text-lg font-display font-bold text-charcoal mt-1">
                    {currentGrievance?.subject || (isHi ? `${activeCase.farmerName} के लिए शिकायत पत्र ड्राफ्ट` : `Grievance Draft for ${activeCase.farmerName}`)}
                  </h3>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleCopyDraft}
                    className="flex items-center space-x-1.5 bg-ivory-100 hover:bg-sage-100 text-forest-800 border border-sage-300 px-3.5 py-2 rounded-xl text-xs font-semibold transition"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? (isHi ? 'कॉपी हो गया!' : 'Copied!') : (isHi ? 'पत्र कॉपी करें' : 'Copy Letter')}</span>
                  </button>

                  <button
                    onClick={() => window.print()}
                    className="flex items-center space-x-1.5 bg-forest-800 hover:bg-forest-900 text-white px-3.5 py-2 rounded-xl text-xs font-semibold shadow-card transition"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{isHi ? 'पत्र प्रिंट करें' : 'Print Letter'}</span>
                  </button>
                </div>
              </div>

              {/* Editable Textarea Letter Canvas */}
              <div>
                <label className="block text-xs font-semibold text-charcoal-muted mb-1.5">
                  {isHi ? 'औपचारिक ड्राफ्ट सामग्री की समीक्षा करें (पूर्णतः संपादन योग्य):' : 'Review & Personalize Formal Draft Content (Fully Editable):'}
                </label>
                <textarea
                  rows={18}
                  value={currentGrievance?.draftBody || ''}
                  onChange={(e) => {
                    if (currentGrievance) {
                      updateGrievance(activeCase.id, currentGrievance.id, { draftBody: e.target.value });
                    }
                  }}
                  className="w-full bg-ivory-50/70 border border-sage-300 rounded-2xl p-4 sm:p-5 text-xs text-charcoal font-mono leading-relaxed focus:bg-white focus:outline-none focus:ring-2 focus:ring-forest-800"
                ></textarea>
              </div>

              {/* Follow-up Timeline Guide */}
              <div className="pt-2 border-t border-sage-200 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-charcoal-muted gap-2">
                <span className="flex items-center gap-1.5 font-medium text-forest-800">
                  <Clock className="w-4 h-4 text-forest-700" />
                  {isHi ? 'सांविधिक निस्तारण अवधि: ' : 'Statutory Resolution Window: '}
                  <strong>{isHi ? '15 कार्य दिवस (PMFBY SLA)' : '15 Working Days (PMFBY SLA)'}</strong>
                </span>
                <span>{isHi ? 'प्राप्तकर्ता:' : 'Recipient:'} {currentGrievance?.recipientName}</span>
              </div>
            </div>

            {/* Official Online Grievance Portals Links */}
            <div className="bg-ivory-100 rounded-2xl p-5 border border-sage-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <span className="font-bold text-forest-900 block">
                  {isHi ? 'क्या आप सीधे ऑनलाइन शिकायत दर्ज करना चाहते हैं?' : 'Want to submit online directly?'}
                </span>
                <span className="text-charcoal-muted">
                  {isHi ? 'आप ऊपर दिए गए टेक्स्ट को कॉपी करके सीधे आधिकारिक सरकारी पोर्टलों पर पेस्ट कर सकते हैं।' : 'You can copy the above text and paste it directly into official grievance portals.'}
                </span>
              </div>
              <div className="flex items-center space-x-2 shrink-0">
                <a
                  href="https://pmfby.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white hover:bg-sage-100 text-forest-800 border border-sage-300 px-3 py-1.5 rounded-xl font-semibold transition inline-flex items-center gap-1"
                >
                  PMFBY Portal <ExternalLink className="w-3 h-3 text-sage-400" />
                </a>
                <a
                  href="https://pgportal.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white hover:bg-sage-100 text-forest-800 border border-sage-300 px-3 py-1.5 rounded-xl font-semibold transition inline-flex items-center gap-1"
                >
                  CPGRAMS <ExternalLink className="w-3 h-3 text-sage-400" />
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* RECORD SUBMISSION MODAL */}
      {submissionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white border border-sage-300 w-full max-w-md rounded-3xl shadow-elevated p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-sage-200 pb-3">
              <h3 className="font-display font-bold text-base text-charcoal">
                {isHi ? 'बाहरी सबमिशन विवरण दर्ज करें' : 'Record External Submission'}
              </h3>
              <button
                onClick={() => setSubmissionModalOpen(false)}
                className="text-charcoal-muted hover:text-charcoal"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleRecordSubmission} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-charcoal mb-1">
                  {isHi ? 'सबमिशन का माध्यम *' : 'Submission Channel *'}
                </label>
                <select
                  value={submissionChannel}
                  onChange={(e) => setSubmissionChannel(e.target.value as any)}
                  className="w-full border border-sage-300 rounded-xl p-2.5 text-xs text-charcoal bg-white"
                >
                  <option value="submitted_offline">{isHi ? 'कलेक्ट्रेट आवक रजिस्ट्री (व्यक्तिगत जमा)' : 'Physical Inward Registry (Collectorate / DLMC)'}</option>
                  <option value="submitted_online">{isHi ? 'राष्ट्रीय पीएमएफबीवाई / सीपीजीआरएएमएस ऑनलाइन पोर्टल' : 'Online National PMFBY / CPGRAMS Portal'}</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-charcoal mb-1">
                  {isHi ? 'आवक संख्या / स्पीडपोस्ट / शिकायत टोकन नंबर *' : 'Inward / Speedpost / Grievance Token Number *'}
                </label>
                <input
                  type="text"
                  placeholder="e.g. DLMC/BEED/2024/9182 or CPGRAMS-2024-819"
                  value={submissionRef}
                  onChange={(e) => setSubmissionRef(e.target.value)}
                  className="w-full border border-sage-300 rounded-xl p-2.5 text-xs text-charcoal"
                  required
                />
              </div>

              <div className="p-3 rounded-xl bg-ivory-100 border border-sage-200 text-charcoal-muted">
                {isHi 
                  ? 'ℹ️ इस टोकन संख्या को दर्ज करने से आपकी समयरेखा पर 15-दिवसीय सरकारी समीक्षा क्लॉक शुरू हो जाएगी।'
                  : 'ℹ️ Recording this token number will start the 15-day statutory DLMC review countdown on your FasalClaim timeline.'}
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSubmissionModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-sage-300 text-charcoal font-medium"
                >
                  {isHi ? 'रद्द करें' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-forest-800 text-white font-semibold shadow-card hover:bg-forest-900"
                >
                  {isHi ? 'पुष्टि करें और ट्रैकर शुरू करें' : 'Confirm & Start Tracker'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
