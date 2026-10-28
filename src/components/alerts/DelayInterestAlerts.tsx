'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { 
  Clock, 
  AlertTriangle, 
  ShieldCheck, 
  Calendar, 
  HelpCircle, 
  FileWarning, 
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export function DelayInterestAlerts() {
  const { activeCase, ruleConfigs, language } = useApp();
  const [detailsOpen, setDetailsOpen] = useState(false);

  // Check if penal interest rule R105 is active & verified
  const interestRule = ruleConfigs.find(r => r.ruleCode === 'R105');
  const isRuleVerified = interestRule?.isVerified && interestRule?.isActive;

  // Calculate days elapsed since intimation
  const intimationDate = activeCase.claimIntimationDate ? new Date(activeCase.claimIntimationDate) : null;
  const daysElapsed = intimationDate 
    ? Math.max(1, Math.round((Date.now() - intimationDate.getTime()) / (1000 * 60 * 60 * 24)))
    : 45;

  const standardWindowDays = 21;
  const isBeyondWindow = daysElapsed > standardWindowDays;

  return (
    <div className="bg-white border border-sage-300 rounded-2xl p-5 shadow-card hover:shadow-card-hover transition">
      {/* Alert Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-ivory-100 border border-sage-300 flex items-center justify-center text-forest-800">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-display font-semibold text-charcoal text-base">
                {language === 'hi' ? 'समयरेखा और सांविधिक देरी ट्रैकर' : 'Timeline & Statutory Delay Tracker'}
              </h3>
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-sage-100 text-forest-800 border border-sage-200">
                {language === 'hi' ? 'केस' : 'Case'}: {activeCase.caseNumber}
              </span>
            </div>
            <p className="text-xs text-charcoal-muted mt-0.5">
              {language === 'hi' 
                ? `सूचना तिथि: ${activeCase.claimIntimationDate || '16-सितंबर-2024'} • पंजीकरण से ${daysElapsed} दिन बीत चुके हैं`
                : `Intimation Date: ${activeCase.claimIntimationDate || '16-Sep-2024'} • ${daysElapsed} days elapsed since registration`}
            </p>
          </div>
        </div>

        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center space-x-1 ${
          isBeyondWindow 
            ? 'bg-terracotta-50 text-terracotta-700 border border-terracotta-200' 
            : 'bg-sage-100 text-forest-800 border border-sage-200'
        }`}>
          <AlertTriangle className="w-3.5 h-3.5 mr-1" />
          {isBeyondWindow 
            ? (language === 'hi' ? 'विस्तारित समयरेखा ध्वज' : 'Extended Timeline Flag')
            : (language === 'hi' ? 'मानक प्रगति' : 'Standard Progress')}
        </span>
      </div>

      {/* Grid of Key Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mt-4">
        {/* Card 1: Next Action Deadline */}
        <div className="bg-ivory-50 border border-sage-200 rounded-xl p-3.5">
          <div className="flex items-center justify-between text-xs text-charcoal-muted mb-1">
            <span className="font-medium">
              {language === 'hi' ? 'अनुशंसित फॉलो-अप' : 'Recommended Follow-up'}
            </span>
            <Calendar className="w-3.5 h-3.5 text-forest-700" />
          </div>
          <div className="text-sm font-semibold text-charcoal">
            {new Date(Date.now() + 7 * 86400000).toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
          </div>
          <p className="text-xs text-forest-800 font-medium mt-1">
            {language === 'hi' ? 'बैंक पासबुक नाम सुधार हेतु शाखा से संपर्क करें' : 'Bank Passbook Rectification follow-up with branch'}
          </p>
        </div>

        {/* Card 2: Document Verification Hold */}
        <div className="bg-ivory-50 border border-sage-200 rounded-xl p-3.5">
          <div className="flex items-center justify-between text-xs text-charcoal-muted mb-1">
            <span className="font-medium">
              {language === 'hi' ? 'आवश्यक जानकारी' : 'Information Still Needed'}
            </span>
            <FileWarning className="w-3.5 h-3.5 text-terracotta-500" />
          </div>
          <div className="text-sm font-semibold text-terracotta-700">
            {activeCase.documents.filter(d => d.status === 'mismatch' || d.status === 'missing').length} {language === 'hi' ? 'दस्तावेजों की समीक्षा आवश्यक' : 'Items Need Review'}
          </div>
          <p className="text-xs text-charcoal-muted mt-1">
            {language === 'hi' ? 'पासबुक नाम उपनाम और पटवारी हिस्सा सत्यापन' : 'Passbook name alias & Talathi sub-division confirmation'}
          </p>
        </div>

        {/* Card 3: Statutory Interest Assessment */}
        <div className="bg-ivory-50 border border-sage-200 rounded-xl p-3.5">
          <div className="flex items-center justify-between text-xs text-charcoal-muted mb-1">
            <span className="font-medium">
              {language === 'hi' ? 'सांविधिक ब्याज नियम' : 'Statutory Interest Rule'}
            </span>
            <ShieldCheck className="w-3.5 h-3.5 text-forest-700" />
          </div>
          <div className="flex items-center space-x-1.5">
            <span className={`text-sm font-semibold ${isRuleVerified ? 'text-forest-800' : 'text-charcoal-muted'}`}>
              {isRuleVerified 
                ? (language === 'hi' ? '12% वार्षिक दंडात्मक ब्याज' : '12% p.a. Penal Interest')
                : (language === 'hi' ? 'नियम सत्यापन आवश्यक' : 'Rule Verification Required')}
            </span>
          </div>
          <p className="text-xs text-charcoal-muted mt-1">
            {isRuleVerified 
              ? (language === 'hi' ? 'केवल सब्सिडी जारी होने के बाद लागू' : 'Applicable only post-subsidy release')
              : (language === 'hi' ? 'आधिकारिक स्रोत जांच लंबित' : 'Official source check pending')}
          </p>
        </div>
      </div>

      {/* Accordion Toggle for Legal / Rule Caveat */}
      <div className="mt-4 pt-3 border-t border-sage-200">
        <button
          onClick={() => setDetailsOpen(!detailsOpen)}
          className="w-full flex items-center justify-between text-xs font-semibold text-forest-800 hover:text-forest-900 transition"
        >
          <span className="flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-forest-700" />
            {language === 'hi'
              ? 'सांविधिक नियम विवरण: पीएमएफबीवाई विलंबित भुगतान और 12% ब्याज प्रावधान'
              : 'Statutory Rule Details: PMFBY Delayed Settlement & Interest Provisions'}
          </span>
          {detailsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {detailsOpen && (
          <div className="mt-3 bg-ivory-100 rounded-xl p-4 text-xs text-charcoal space-y-2 border border-sage-300 animate-fadeIn">
            <div className="flex items-center justify-between font-semibold text-forest-900 border-b border-sage-200 pb-1.5">
              <span>
                {language === 'hi' 
                  ? 'नियम संदर्भ: धारा 15.2 (पीएमएफबीवाई संशोधित परिचालन दिशानिर्देश 2023)'
                  : 'Rule Reference: Section 15.2 (PMFBY Revised Operational Guidelines 2023)'}
              </span>
              <span className="px-2 py-0.5 rounded bg-forest-800 text-white text-[10px]">
                {language === 'hi' ? 'सत्यापित स्रोत' : 'Verified Source'}
              </span>
            </div>
            
            <p className="leading-relaxed">
              <strong>{language === 'hi' ? 'सांविधिक शर्त:' : 'Statutory Condition:'}</strong>{' '}
              {language === 'hi'
                ? 'कृषि एवं किसान कल्याण मंत्रालय के दिशानिर्देशों के तहत, यदि बीमा कंपनी केंद्र और राज्य सरकार के पूर्ण प्रीमियम सब्सिडी अंश प्राप्त होने के 21 दिनों से अधिक क्लेम भुगतान में देरी करती है, तो बीमा कंपनी प्रभावित किसान को 12% प्रति वर्ष की दर से दंडात्मक ब्याज का सीधे भुगतान करने के लिए उत्तरदायी है।'
                : 'Under Ministry of Agriculture guidelines, if an insurance company delays legitimate claim settlement beyond 21 days from the date of receipt of the full claim funds (including Central and State Government premium subsidy shares), the insurer is liable to pay penal interest at 12% per annum directly to the affected farmer.'}
            </p>

            <div className="p-2.5 rounded-lg bg-terracotta-50 border border-terracotta-200 text-terracotta-800">
              <strong>{language === 'hi' ? 'अनिवार्य पात्रता प्रकटीकरण:' : 'Mandatory Eligibility Caveat:'}</strong>{' '}
              {language === 'hi'
                ? 'कभी यह न मानें कि हर विलंबित दावा स्वतः 12% ब्याज का हकदार है। ब्याज तभी लागू होता है जब सभी पात्रता मानदंड पूरे हों, सभी अनिवार्य दस्तावेज सत्यापित हों, और देरी केवल बीमा कंपनी के स्तर पर हो। यदि आपके खाते या भूमि रिकॉर्ड में विसंगतियां हैं, तो पहले उन्हें ठीक करना अनिवार्य शर्त है।'
                : 'Never assume that every delayed claim automatically qualifies for 12% interest. Interest applies only when all eligibility parameters have been met, all mandatory documents are verified, and the delay is solely on the insurer after government subsidy release. If documentary discrepancies exist in your file, resolving them is the essential first prerequisite.'}
            </div>

            <div className="text-[11px] text-charcoal-muted flex items-center justify-between pt-1">
              <span>{language === 'hi' ? 'जारीकर्ता प्राधिकरण: कृषि एवं किसान कल्याण विभाग, नई दिल्ली' : 'Issuing Authority: Department of Agriculture & Farmers Welfare, New Delhi'}</span>
              <span>Rule Code: R105-V2.4</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
