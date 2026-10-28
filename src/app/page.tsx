'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Sprout, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  FileSearch, 
  Stethoscope, 
  Send, 
  Mic, 
  Building2, 
  Clock, 
  ShieldCheck, 
  FileText, 
  ChevronRight, 
  Sparkles, 
  HelpCircle, 
  Scale
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { TRANSLATIONS } from '@/lib/translations';

export default function LandingPage() {
  const { setVoiceModalOpen, activeCase, language } = useApp();
  const tHero = TRANSLATIONS[language].hero;
  const tProblem = TRANSLATIONS[language].problem;
  const tDiff = TRANSLATIONS[language].diff;
  const tHow = TRANSLATIONS[language].how;
  const tPreviews = TRANSLATIONS[language].previews;
  const tTrust = TRANSLATIONS[language].trust;
  const tFinal = TRANSLATIONS[language].finalCta;

  return (
    <div className="flex flex-col min-h-screen">
      {/* =========================================================================
          HERO SECTION
          Two-column desktop layout with agricultural photography and floating claim card
         ========================================================================= */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-18 md:pb-28 bg-gradient-to-b from-ivory-100 via-ivory-50 to-white border-b border-sage-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Headlines & CTAs */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sage-200/80 border border-sage-300 text-forest-800 text-xs font-semibold uppercase tracking-wider">
                <Sprout className="w-3.5 h-3.5 text-forest-700" />
                <span>{tHero.eyebrow}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-charcoal tracking-tight leading-[1.14]">
                {tHero.headlinePart1} <span className="text-forest-800 underline decoration-sage-300 decoration-wavy decoration-2">{tHero.headlinePart2}</span>
              </h1>

              <p className="text-lg sm:text-xl text-charcoal/80 leading-relaxed max-w-xl font-normal">
                {tHero.subtitle}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
                <Link
                  href="/radar"
                  className="flex items-center justify-center space-x-2 bg-forest-800 hover:bg-forest-900 text-white px-7 py-3.5 rounded-xl font-semibold text-base shadow-card hover:shadow-card-hover transition active:scale-[0.98]"
                >
                  <FileSearch className="w-5 h-5 text-sage-200" />
                  <span>{tHero.ctaPrimary}</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>

                <a
                  href="#how-it-works"
                  className="flex items-center justify-center space-x-2 bg-white hover:bg-ivory-100 text-forest-800 border border-sage-300 px-6 py-3.5 rounded-xl font-semibold text-base transition shadow-subtle"
                >
                  <span>{tHero.ctaSecondary}</span>
                </a>
              </div>

              {/* Voice Button & Trust Note */}
              <div className="pt-4 border-t border-sage-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-charcoal-muted">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-forest-700 shrink-0" />
                  <span>{tHero.trustNote}</span>
                </div>
                <button
                  onClick={() => setVoiceModalOpen(true)}
                  className="inline-flex items-center space-x-1.5 text-forest-800 hover:text-forest-900 font-semibold"
                >
                  <Mic className="w-3.5 h-3.5 text-forest-700" />
                  <span>{tHero.tryVoice}</span>
                </button>
              </div>
            </div>

            {/* Right Column: Agricultural Photograph + Floating Claim Status Interface */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-elevated border border-sage-300 bg-forest-900 aspect-[4/3] sm:aspect-[16/11]">
                <img
                  src="https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?auto=format&fit=crop&w=1200&q=80"
                  alt="Indian farmer inspecting crop field in rural Maharashtra"
                  className="w-full h-full object-cover opacity-85 hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/90 via-forest-950/40 to-transparent"></div>

                <div className="absolute top-4 left-4 bg-forest-950/80 backdrop-blur-md px-3 py-1 rounded-full text-[11px] text-sage-200 border border-forest-700">
                  {tHero.photoTag}
                </div>

                {/* Floating Believable Claim Status Card */}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-elevated border border-sage-200">
                  <div className="flex items-center justify-between border-b border-sage-200 pb-3 mb-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-lg bg-terracotta-100 flex items-center justify-center text-terracotta-700">
                        <AlertTriangle className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-charcoal">{tHero.caseTitle}</div>
                        <div className="text-[11px] text-charcoal-muted">{tHero.farmerSub}</div>
                      </div>
                    </div>
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-terracotta-100 text-terracotta-800 border border-terracotta-200">
                      {tHero.needsReview}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-start space-x-2">
                      <span className="font-semibold text-charcoal shrink-0">{tHero.issueFoundLabel}</span>
                      <span className="text-charcoal-muted">{tHero.issueFoundVal}</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="font-semibold text-forest-800 shrink-0">{tHero.evidenceLabel}</span>
                      <span className="text-charcoal-muted">{tHero.evidenceVal}</span>
                    </div>
                    <div className="flex items-center justify-between pt-1 text-[11px] font-medium text-forest-800">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-forest-700" /> {tHero.followUp}
                      </span>
                      <Link href="/diagnosis" className="inline-flex items-center font-bold underline hover:text-forest-900">
                        {tHero.openDiagnosis} <ChevronRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>

                  <div className="mt-2 text-[10px] text-charcoal-muted/80 text-right">
                    {tHero.sampleNotice}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          PROBLEM SECTION
         ========================================================================= */}
      <section className="py-20 bg-ivory-100/60 border-b border-sage-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <span className="text-xs font-bold text-forest-800 uppercase tracking-widest bg-sage-200/80 px-3 py-1 rounded-full border border-sage-300">
              {tProblem.tag}
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-charcoal">
              {tProblem.title}
            </h2>
            <p className="text-base sm:text-lg text-charcoal-muted leading-relaxed">
              {tProblem.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-7 border border-sage-200 shadow-card hover:shadow-card-hover transition">
              <div className="w-12 h-12 rounded-xl bg-terracotta-50 text-terracotta-600 border border-terracotta-100 flex items-center justify-center mb-5">
                <HelpCircle className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-charcoal mb-2">
                {tProblem.p1Title}
              </h3>
              <p className="text-sm text-charcoal-muted leading-relaxed">
                {tProblem.p1Desc}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-7 border border-sage-200 shadow-card hover:shadow-card-hover transition">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 border border-amber-100 flex items-center justify-center mb-5">
                <FileSearch className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-charcoal mb-2">
                {tProblem.p2Title}
              </h3>
              <p className="text-sm text-charcoal-muted leading-relaxed">
                {tProblem.p2Desc}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-7 border border-sage-200 shadow-card hover:shadow-card-hover transition">
              <div className="w-12 h-12 rounded-xl bg-forest-50 text-forest-700 border border-forest-100 flex items-center justify-center mb-5">
                <Send className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-charcoal mb-2">
                {tProblem.p3Title}
              </h3>
              <p className="text-sm text-charcoal-muted leading-relaxed">
                {tProblem.p3Desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          THE SIX DIFFERENTIATORS SECTION
         ========================================================================= */}
      <section className="py-24 bg-white border-b border-sage-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <span className="text-xs font-bold text-terracotta-600 uppercase tracking-widest bg-terracotta-50 px-3 py-1 rounded-full border border-terracotta-200">
              {tDiff.tag}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-charcoal">
              {tDiff.titlePart1} <span className="text-forest-800">{tDiff.titlePart2}</span>
            </h2>
            <p className="text-base sm:text-lg text-charcoal-muted leading-relaxed">
              {tDiff.subtitle}
            </p>
          </div>

          {/* SIGNATURE CENTERPIECE: EVIDENCE-BACKED CLAIM DIAGNOSIS ENGINE */}
          <div className="bg-forest-900 rounded-3xl p-6 sm:p-10 text-white shadow-elevated border border-forest-700 mb-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-forest-700/20 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 border-b border-forest-700/80 pb-6 mb-8">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="px-3 py-1 rounded-full bg-forest-800 text-sage-200 text-xs font-bold uppercase tracking-wider border border-forest-600">
                    {tDiff.signatureTag}
                  </span>
                  <span className="text-xs text-sage-300">{tDiff.signatureSub}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-bold mt-2">
                  {tDiff.diagTitle}
                </h3>
                <p className="text-sm text-sage-300 max-w-2xl mt-1">
                  {tDiff.diagDesc}
                </p>
              </div>

              <Link
                href="/diagnosis"
                className="bg-ivory-100 hover:bg-white text-forest-900 font-semibold px-5 py-2.5 rounded-xl text-sm transition shadow-card flex items-center space-x-1.5 shrink-0"
              >
                <span>{tDiff.launchDiag}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Interactive Diagnosis Showcase Display */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-forest-950/70 rounded-2xl p-5 sm:p-7 border border-forest-800">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-sage-300">
                    {tDiff.liveCase}
                  </span>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
                    {tDiff.confidenceBadge}
                  </span>
                </div>

                <div className="bg-forest-900/90 rounded-xl p-4 border border-forest-700">
                  <div className="text-xs font-semibold text-terracotta-300 uppercase tracking-wide">
                    {tDiff.blockerTitle}
                  </div>
                  <div className="text-base font-bold text-white mt-0.5">
                    {tDiff.blockerHeading}
                  </div>
                  <p className="text-xs text-sage-300 mt-2 leading-relaxed">
                    {tDiff.blockerDesc}
                  </p>
                </div>

                <div className="bg-forest-900/60 rounded-xl p-4 border border-forest-700 space-y-2">
                  <div className="text-xs font-semibold text-sage-200 uppercase tracking-wide flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    {tDiff.evidenceTitle}
                  </div>
                  <ul className="text-xs text-sage-300 space-y-1.5 list-disc list-inside">
                    <li>{language === 'hi' ? 'अपलोड किया गया दस्तावेज़: बैंक ऑफ महाराष्ट्र पासबुक (फ्रंट स्कैन #3419)' : 'Uploaded document: Bank of Maharashtra Passbook (Front Scan #3419)'}</li>
                    <li>{language === 'hi' ? 'ओसीआर द्वारा निकाला गया नाम: "रमेश विट्ठल पाटिल"' : 'OCR Extracted Character Sequence: "Ramesh Vitthal Patil"'}</li>
                    <li>{language === 'hi' ? 'सरकारी पीएमएफबीवाई पोर्टल रिकॉर्ड: "रामेश्वर विट्ठल पाटिल"' : 'Government PMFBY Portal Record: "Rameshwar Vitthal Patil"'}</li>
                  </ul>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
                <div className="bg-forest-900/90 rounded-xl p-4 border border-forest-700 space-y-2.5">
                  <div className="text-xs font-semibold text-sage-200 uppercase tracking-wide">
                    {tDiff.whyMattersTitle}
                  </div>
                  <p className="text-xs text-sage-300 leading-relaxed">
                    {tDiff.whyMattersDesc}
                  </p>

                  <div className="pt-2 border-t border-forest-800 text-[11px] text-sage-400">
                    <span className="font-semibold text-sage-200">{tDiff.statutoryRef}</span>
                    <div>{tDiff.statutoryVal}</div>
                  </div>
                </div>

                <div className="bg-forest-800/90 rounded-xl p-4 border border-forest-600">
                  <div className="text-xs font-semibold text-amber-300 uppercase tracking-wide flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> {tDiff.nextStepTitle}
                  </div>
                  <p className="text-xs text-white mt-1 leading-relaxed">
                    {tDiff.nextStepDesc}
                  </p>
                  <Link
                    href="/escalation"
                    className="mt-3 inline-flex items-center text-xs font-bold text-sage-200 hover:text-white underline"
                  >
                    {tDiff.generateDraftCta} <ArrowRight className="w-3 h-3 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* FIVE OTHER DIFFERENTIATORS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Differentiator A */}
            <div className="bg-ivory-50 rounded-2xl p-6 border border-sage-300 shadow-card hover:shadow-card-hover transition flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-forest-800 text-white flex items-center justify-center mb-4">
                  <FileSearch className="w-5 h-5" />
                </div>
                <h4 className="font-display font-bold text-lg text-charcoal mb-2">
                  {tDiff.radarTitle}
                </h4>
                <p className="text-xs text-charcoal-muted leading-relaxed mb-4">
                  {tDiff.radarDesc}
                </p>
                <div className="bg-white rounded-xl p-3 border border-sage-200 text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-charcoal font-medium">{language === 'hi' ? 'बैंक IFSC कोड मिलान' : 'Bank IFSC Match'}</span>
                    <span className="text-emerald-700 font-semibold">{language === 'hi' ? 'सुसंगत है' : 'Looks consistent'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-charcoal font-medium">{language === 'hi' ? 'भूमि सर्वे 7/12 खसरा' : 'Land Survey 7/12'}</span>
                    <span className="text-terracotta-600 font-semibold">{language === 'hi' ? 'संभावित विसंगति' : 'Potential mismatch'}</span>
                  </div>
                </div>
              </div>

              <Link
                href="/radar"
                className="mt-5 inline-flex items-center text-xs font-bold text-forest-800 hover:text-forest-900 group"
              >
                <span>{tDiff.launchRadar}</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            {/* Differentiator C */}
            <div className="bg-ivory-50 rounded-2xl p-6 border border-sage-300 shadow-card hover:shadow-card-hover transition flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-forest-800 text-white flex items-center justify-center mb-4">
                  <Send className="w-5 h-5" />
                </div>
                <h4 className="font-display font-bold text-lg text-charcoal mb-2">
                  {tDiff.escalationTitle}
                </h4>
                <p className="text-xs text-charcoal-muted leading-relaxed mb-4">
                  {tDiff.escalationDesc}
                </p>
                <div className="bg-white rounded-xl p-3 border border-sage-200 text-xs text-charcoal-muted leading-relaxed">
                  ✓ {language === 'hi' ? 'साक्ष्य उद्धरण और कानूनी धाराएं स्वचालित जुड़ती हैं' : 'Pre-fills evidence citations & statutory clauses'}<br />
                  ✓ {language === 'hi' ? 'प्रिंट और कॉपी करने योग्य आवेदन पत्र' : 'Generates printable & copyable petition'}<br />
                  ✓ {language === 'hi' ? 'सरकारी आवक टोकन संख्या ट्रैकिंग' : 'Tracks official inward registration numbers'}
                </div>
              </div>

              <Link
                href="/escalation"
                className="mt-5 inline-flex items-center text-xs font-bold text-forest-800 hover:text-forest-900 group"
              >
                <span>{tDiff.prepareDraft}</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            {/* Differentiator D */}
            <div className="bg-ivory-50 rounded-2xl p-6 border border-sage-300 shadow-card hover:shadow-card-hover transition flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-forest-800 text-white flex items-center justify-center mb-4">
                  <Mic className="w-5 h-5" />
                </div>
                <h4 className="font-display font-bold text-lg text-charcoal mb-2">
                  {tDiff.voiceTitle}
                </h4>
                <p className="text-xs text-charcoal-muted leading-relaxed mb-4">
                  {tDiff.voiceDesc}
                </p>
                <div className="bg-white rounded-xl p-3 border border-sage-200 text-xs text-forest-800 font-medium">
                  {language === 'hi' 
                    ? '"मेरी क्लेम स्थिति क्या है?" • स्पीच-टू-टेक्स्ट और आवाज़ से बोलकर उत्तर।' 
                    : '"मेरी क्लेम स्थिति क्या है?" • Speech-to-Text & Spoken voice readouts with graceful fallbacks.'}
                </div>
              </div>

              <button
                onClick={() => setVoiceModalOpen(true)}
                className="mt-5 inline-flex items-center text-xs font-bold text-forest-800 hover:text-forest-900 group"
              >
                <span>{tDiff.openVoice}</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            {/* Differentiator E */}
            <div className="bg-ivory-50 rounded-2xl p-6 border border-sage-300 shadow-card hover:shadow-card-hover transition flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-forest-800 text-white flex items-center justify-center mb-4">
                  <Building2 className="w-5 h-5" />
                </div>
                <h4 className="font-display font-bold text-lg text-charcoal mb-2">
                  {tDiff.instTitle}
                </h4>
                <p className="text-xs text-charcoal-muted leading-relaxed mb-4">
                  {tDiff.instDesc}
                </p>
                <div className="bg-white rounded-xl p-3 border border-sage-200 text-xs text-charcoal-muted">
                  📊 {language === 'hi' ? 'तहसील स्तर पर देरी के कारण • निस्तारण समय का अध्ययन • शून्य किसान PII' : 'District turnaround averages • Discrepancy category breakdown • Zero farmer PII exposed.'}
                </div>
              </div>

              <Link
                href="/institutional"
                className="mt-5 inline-flex items-center text-xs font-bold text-forest-800 hover:text-forest-900 group"
              >
                <span>{tDiff.viewInst}</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            {/* Differentiator F */}
            <div className="bg-ivory-50 rounded-2xl p-6 border border-sage-300 shadow-card hover:shadow-card-hover transition flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-forest-800 text-white flex items-center justify-center mb-4">
                  <Clock className="w-5 h-5" />
                </div>
                <h4 className="font-display font-bold text-lg text-charcoal mb-2">
                  {tDiff.alertTitle}
                </h4>
                <p className="text-xs text-charcoal-muted leading-relaxed mb-4">
                  {tDiff.alertDesc}
                </p>
                <div className="bg-white rounded-xl p-3 border border-sage-200 text-xs text-charcoal-muted">
                  ⏱️ {language === 'hi' ? '21-दिवसीय सब्सिडी उपरांत क्लॉक • सख्त वैधानिक शर्तें • शून्य झूठे वादे' : '21-day post-subsidy clock • Strict legal caveats • Never misleads on eligibility.'}
                </div>
              </div>

              <Link
                href="/portal"
                className="mt-5 inline-flex items-center text-xs font-bold text-forest-800 hover:text-forest-900 group"
              >
                <span>{tDiff.viewAlerts}</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            {/* Quick Demo Case Selector */}
            <div className="bg-forest-800 rounded-2xl p-6 text-white shadow-card flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-forest-700 rounded text-sage-200">
                  {language === 'hi' ? 'इंटरैक्टिव डेमो' : 'Interactive Demo'}
                </span>
                <h4 className="font-display font-bold text-lg mt-2 mb-2">
                  {tDiff.demoCasesTitle}
                </h4>
                <p className="text-xs text-sage-300 leading-relaxed mb-4">
                  {tDiff.demoCasesDesc}
                </p>
                <div className="text-xs text-sage-200 bg-forest-900/80 p-3 rounded-xl border border-forest-700">
                  {language === 'hi' ? 'सक्रिय नमूना केस:' : 'Active Demo Case:'} <strong>{activeCase.farmerName}</strong> ({activeCase.crop})
                </div>
              </div>

              <Link
                href="/portal"
                className="mt-5 inline-flex items-center text-xs font-bold text-white hover:text-sage-200"
              >
                <span>{tDiff.openPortal}</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          HOW IT WORKS
         ========================================================================= */}
      <section id="how-it-works" className="py-20 bg-ivory-100/60 border-b border-sage-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
            <span className="text-xs font-bold text-forest-800 uppercase tracking-widest bg-sage-200 px-3 py-1 rounded-full border border-sage-300">
              {tHow.tag}
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-charcoal">
              {tHow.title}
            </h2>
            <p className="text-base text-charcoal-muted">
              {tHow.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            <div className="bg-white rounded-2xl p-6 border border-sage-200 shadow-subtle hover:shadow-card transition relative">
              <div className="w-10 h-10 rounded-full bg-forest-800 text-white font-bold text-base flex items-center justify-center mb-4">
                1
              </div>
              <h3 className="font-display font-bold text-base text-charcoal mb-1.5">
                {tHow.s1Title}
              </h3>
              <p className="text-xs text-charcoal-muted leading-relaxed">
                {tHow.s1Desc}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-sage-200 shadow-subtle hover:shadow-card transition relative">
              <div className="w-10 h-10 rounded-full bg-forest-800 text-white font-bold text-base flex items-center justify-center mb-4">
                2
              </div>
              <h3 className="font-display font-bold text-base text-charcoal mb-1.5">
                {tHow.s2Title}
              </h3>
              <p className="text-xs text-charcoal-muted leading-relaxed">
                {tHow.s2Desc}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-sage-200 shadow-subtle hover:shadow-card transition relative">
              <div className="w-10 h-10 rounded-full bg-forest-800 text-white font-bold text-base flex items-center justify-center mb-4">
                3
              </div>
              <h3 className="font-display font-bold text-base text-charcoal mb-1.5">
                {tHow.s3Title}
              </h3>
              <p className="text-xs text-charcoal-muted leading-relaxed">
                {tHow.s3Desc}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-sage-200 shadow-subtle hover:shadow-card transition relative">
              <div className="w-10 h-10 rounded-full bg-forest-800 text-white font-bold text-base flex items-center justify-center mb-4">
                4
              </div>
              <h3 className="font-display font-bold text-base text-charcoal mb-1.5">
                {tHow.s4Title}
              </h3>
              <p className="text-xs text-charcoal-muted leading-relaxed">
                {tHow.s4Desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          FARMER & INSTITUTIONAL DUAL PREVIEWS
         ========================================================================= */}
      <section className="py-20 bg-white border-b border-sage-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            
            <div className="bg-ivory-50 rounded-3xl p-8 border border-sage-300 shadow-card flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-forest-800 uppercase tracking-widest bg-sage-200 px-3 py-1 rounded-full">
                  {tPreviews.farmerTag}
                </span>
                <h3 className="text-2xl font-display font-bold text-charcoal mt-3 mb-2">
                  {tPreviews.farmerTitle}
                </h3>
                <p className="text-sm text-charcoal-muted mb-6 leading-relaxed">
                  {tPreviews.farmerDesc}
                </p>

                <div className="space-y-2.5 text-xs">
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-sage-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span className="font-medium text-charcoal">{tPreviews.farmerP1}</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-sage-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span className="font-medium text-charcoal">{tPreviews.farmerP2}</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-sage-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span className="font-medium text-charcoal">{tPreviews.farmerP3}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-sage-200">
                <Link
                  href="/portal"
                  className="inline-flex items-center justify-center w-full bg-forest-800 hover:bg-forest-900 text-white font-semibold py-3 px-4 rounded-xl text-sm transition shadow-card"
                >
                  <span>{tPreviews.exploreFarmer}</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Link>
              </div>
            </div>

            <div className="bg-forest-900 rounded-3xl p-8 text-white shadow-card flex flex-col justify-between border border-forest-800">
              <div>
                <span className="text-xs font-bold text-sage-300 uppercase tracking-widest bg-forest-800 px-3 py-1 rounded-full border border-forest-700">
                  {tPreviews.instTag}
                </span>
                <h3 className="text-2xl font-display font-bold text-white mt-3 mb-2">
                  {tPreviews.instTitle}
                </h3>
                <p className="text-sm text-sage-300 mb-6 leading-relaxed">
                  {tPreviews.instDesc}
                </p>

                <div className="space-y-2.5 text-xs">
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-forest-950/70 border border-forest-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="font-medium text-sage-200">{tPreviews.instP1}</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-forest-950/70 border border-forest-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="font-medium text-sage-200">{tPreviews.instP2}</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-forest-950/70 border border-forest-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="font-medium text-sage-200">{tPreviews.instP3}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-forest-800">
                <Link
                  href="/institutional"
                  className="inline-flex items-center justify-center w-full bg-ivory-100 hover:bg-white text-forest-900 font-semibold py-3 px-4 rounded-xl text-sm transition shadow-card"
                >
                  <span>{tPreviews.viewInstAnalytics}</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          TRUST & TRANSPARENCY SECTION
         ========================================================================= */}
      <section className="py-20 bg-ivory-100/50 border-b border-sage-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
            <span className="text-xs font-bold text-forest-800 uppercase tracking-widest bg-sage-200 px-3 py-1 rounded-full border border-sage-300">
              {tTrust.tag}
            </span>
            <h2 className="text-3xl font-display font-bold text-charcoal">
              {tTrust.title}
            </h2>
            <p className="text-sm sm:text-base text-charcoal-muted">
              {tTrust.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-sage-200 shadow-subtle">
              <h4 className="font-display font-bold text-sm text-charcoal mb-2 flex items-center gap-2">
                <Scale className="w-4 h-4 text-forest-800" /> {tTrust.t1Title}
              </h4>
              <p className="text-xs text-charcoal-muted leading-relaxed">
                {tTrust.t1Desc}
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-sage-200 shadow-subtle">
              <h4 className="font-display font-bold text-sm text-charcoal mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-terracotta-500" /> {tTrust.t2Title}
              </h4>
              <p className="text-xs text-charcoal-muted leading-relaxed">
                {tTrust.t2Desc}
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-sage-200 shadow-subtle">
              <h4 className="font-display font-bold text-sm text-charcoal mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> {tTrust.t3Title}
              </h4>
              <p className="text-xs text-charcoal-muted leading-relaxed">
                {tTrust.t3Desc}
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-sage-200 shadow-subtle">
              <h4 className="font-display font-bold text-sm text-charcoal mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4 text-forest-800" /> {tTrust.t4Title}
              </h4>
              <p className="text-xs text-charcoal-muted leading-relaxed">
                {tTrust.t4Desc}
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-sage-200 shadow-subtle">
              <h4 className="font-display font-bold text-sm text-charcoal mb-2 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-forest-800" /> {tTrust.t5Title}
              </h4>
              <p className="text-xs text-charcoal-muted leading-relaxed">
                {tTrust.t5Desc}
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-sage-200 shadow-subtle">
              <h4 className="font-display font-bold text-sm text-charcoal mb-2 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-amber-600" /> {tTrust.t6Title}
              </h4>
              <p className="text-xs text-charcoal-muted leading-relaxed">
                {tTrust.t6Desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          FINAL CALL TO ACTION
         ========================================================================= */}
      <section className="py-20 bg-forest-950 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-forest-800 text-sage-200 text-xs font-semibold uppercase tracking-wider">
            <Sprout className="w-3.5 h-3.5" />
            <span>{tFinal.tag}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight">
            {tFinal.title}
          </h2>

          <p className="text-base sm:text-lg text-sage-300 max-w-2xl mx-auto leading-relaxed">
            {tFinal.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/radar"
              className="w-full sm:w-auto bg-ivory-100 hover:bg-white text-forest-900 font-semibold px-8 py-3.5 rounded-xl text-base shadow-elevated transition active:scale-[0.98]"
            >
              {tFinal.btn1}
            </Link>

            <Link
              href="/institutional"
              className="w-full sm:w-auto bg-forest-800 hover:bg-forest-700 text-white font-semibold px-8 py-3.5 rounded-xl text-base border border-forest-600 transition"
            >
              {tFinal.btn2}
            </Link>
          </div>

          <p className="text-xs text-sage-400 pt-4">
            {tFinal.demoNote}
          </p>
        </div>
      </section>
    </div>
  );
}
