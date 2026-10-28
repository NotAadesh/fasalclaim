'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { TRANSLATIONS } from '@/lib/translations';
import { Sprout, ShieldAlert, ExternalLink, CheckCircle2 } from 'lucide-react';

export function Footer() {
  const { language } = useApp();
  const t = TRANSLATIONS[language].footer;

  return (
    <footer className="bg-forest-950 text-sage-200 pt-16 pb-12 border-t border-forest-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Important Trust Notice Banner */}
        <div className="bg-forest-900/90 border border-forest-700/80 rounded-2xl p-6 mb-12 shadow-card">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-3 md:space-y-0 md:space-x-4">
            <div className="w-12 h-12 rounded-xl bg-forest-800 border border-forest-600 flex items-center justify-center shrink-0 text-amber-300">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div className="flex-1 text-xs leading-relaxed text-sage-300">
              <strong className="text-white text-sm block mb-1">
                {t.noticeTitle}
              </strong>
              {t.noticeDesc}
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-forest-800 flex items-center justify-center text-sage-200">
                <Sprout className="w-5 h-5" />
              </div>
              <span className="font-display font-bold text-xl text-white tracking-tight">
                {language === 'hi' ? 'फसल' : 'Fasal'}<span className="text-sage-300 font-normal">{language === 'hi' ? 'क्लेम' : 'Claim'}</span>
              </span>
            </div>
            <p className="text-xs text-sage-400 leading-relaxed">
              {t.tagline}
            </p>
            <div className="text-[11px] text-sage-400 space-y-1">
              <div>🌾 {language === 'hi' ? 'भारतीय कृषि के लिए समर्पित' : 'Designed for Indian Agriculture'}</div>
              <div>🔒 {language === 'hi' ? 'गोपनीयता-संरक्षित एग्रीटेक सास मंच' : 'Privacy-Preserving Agritech SaaS Architecture'}</div>
            </div>
          </div>

          {/* Core Tools */}
          <div>
            <h4 className="font-display font-semibold text-sm text-white uppercase tracking-wider mb-3">
              {t.featuresHeading}
            </h4>
            <ul className="space-y-2 text-xs text-sage-300">
              <li>
                <Link href="/radar" className="hover:text-white transition">
                  {language === 'hi' ? 'प्री-क्लेम एरर रडार' : 'Pre-Claim Error Radar'}
                </Link>
              </li>
              <li>
                <Link href="/diagnosis" className="hover:text-white transition">
                  {language === 'hi' ? 'साक्ष्य-आधारित क्लेम डायग्नोसिस' : 'Evidence-Backed Claim Diagnosis'}
                </Link>
              </li>
              <li>
                <Link href="/escalation" className="hover:text-white transition">
                  {language === 'hi' ? 'स्मार्ट शिकायत निवारक' : 'Smart Escalation Navigator'}
                </Link>
              </li>
              <li>
                <Link href="/portal" className="hover:text-white transition">
                  {language === 'hi' ? 'किसान क्लेम पोर्टल' : 'Farmer Claim Portal'}
                </Link>
              </li>
              <li>
                <Link href="/institutional" className="hover:text-white transition">
                  {language === 'hi' ? 'संस्थागत अड़चन विश्लेषण' : 'Institutional Bottleneck Intelligence'}
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-white transition">
                  {language === 'hi' ? 'नियम प्रबंधन और ऑडिट कंसोल' : 'Rule Config & Audit Console'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Official Resources */}
          <div>
            <h4 className="font-display font-semibold text-sm text-white uppercase tracking-wider mb-3">
              {t.officialHeading}
            </h4>
            <ul className="space-y-2 text-xs text-sage-300">
              <li>
                <a 
                  href="https://pmfby.gov.in" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white transition inline-flex items-center gap-1"
                >
                  {language === 'hi' ? 'पीएमएफबीवाई राष्ट्रीय पोर्टल' : 'PMFBY National Portal'} <ExternalLink className="w-3 h-3 text-sage-400" />
                </a>
              </li>
              <li>
                <a 
                  href="https://pgportal.gov.in" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white transition inline-flex items-center gap-1"
                >
                  {language === 'hi' ? 'सीपीजीआरएएमएस लोक शिकायत' : 'CPGRAMS Public Grievance'} <ExternalLink className="w-3 h-3 text-sage-400" />
                </a>
              </li>
              <li>
                <span className="text-sage-400">{language === 'hi' ? 'किसान कॉल सेंटर: 1800-180-1551' : 'Kisan Call Centre: 1800-180-1551'}</span>
              </li>
              <li>
                <span className="text-sage-400">{language === 'hi' ? 'राष्ट्रीय उपभोक्ता हेल्पलाइन: 1915' : 'National Consumer Helpline: 1915'}</span>
              </li>
              <li>
                <span className="text-sage-400">{language === 'hi' ? 'कलेक्ट्रेट में जिला स्तरीय समिति (DLMC)' : 'DLMC at Collectorate Offices'}</span>
              </li>
            </ul>
          </div>

          {/* Trust & Principles */}
          <div>
            <h4 className="font-display font-semibold text-sm text-white uppercase tracking-wider mb-3">
              {t.trustHeading}
            </h4>
            <ul className="space-y-2 text-xs text-sage-300">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-sage-400" />
                <span>{language === 'hi' ? 'नियम-आधारित पारदर्शी जांच' : 'Deterministic rule-based checks'}</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-sage-400" />
                <span>{language === 'hi' ? 'शून्य काल्पनिक उद्धरण' : 'Zero fabricated citations'}</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-sage-400" />
                <span>{language === 'hi' ? 'जमा करने तक ड्राफ्ट लेबलिंग' : 'Draft labeling until submitted'}</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-sage-400" />
                <span>{language === 'hi' ? 'निजी दस्तावेज़ भंडारण' : 'Private document storage'}</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-sage-400" />
                <span>{language === 'hi' ? 'अनाम संस्थागत सांख्यिकी' : 'Anonymized aggregate insights'}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-forest-900 flex flex-col sm:flex-row items-center justify-between text-xs text-sage-400">
          <p>© {new Date().getFullYear()} {language === 'hi' ? 'फसलक्लेम एग्रीटेक। ' : 'FasalClaim Agritech. '}{t.rights}</p>
          <p className="mt-2 sm:mt-0 flex items-center gap-1">
            {t.builtFor}
          </p>
        </div>
      </div>
    </footer>
  );
}
