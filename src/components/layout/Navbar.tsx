'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { TRANSLATIONS } from '@/lib/translations';
import { 
  Sprout, 
  Mic, 
  User, 
  Building2, 
  ShieldCheck, 
  Menu, 
  X, 
  ChevronDown, 
  Sparkles,
  FileSearch,
  Stethoscope,
  Send,
  SlidersHorizontal,
  Layers
} from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const { role, setRole, language, setLanguage, setVoiceModalOpen, activeCase } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const t = TRANSLATIONS[language].nav;

  const navLinks = [
    { label: t.howItWorks, href: '/#how-it-works' },
    { label: t.radar, href: '/radar', icon: FileSearch },
    { label: t.diagnosis, href: '/diagnosis', icon: Stethoscope, badge: t.signature },
    { label: t.escalation, href: '/escalation', icon: Send },
    { label: t.portal, href: '/portal', icon: Layers },
    { label: t.institutions, href: '/institutional', icon: Building2 },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-sage-200">
      {/* Demo role indicator bar */}
      <div className="bg-forest-900 text-ivory-100 px-4 py-1.5 text-xs flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-[11px] font-medium tracking-wide">
            {t.platformTitle}
          </span>
          <span className="hidden sm:inline-block text-sage-400">|</span>
          <span className="hidden sm:inline-block text-[11px] text-sage-300">
            {t.currentCase}: <strong>{activeCase?.caseNumber || 'FC-2024-MH-8491'}</strong> ({activeCase?.farmerName || 'Rameshwar Patil'})
          </span>
        </div>

        {/* Role & Demo Switcher */}
        <div className="flex items-center space-x-3">
          <div className="relative">
            <button
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className="flex items-center space-x-1.5 bg-forest-800 hover:bg-forest-700 px-2.5 py-0.5 rounded text-[11px] font-medium text-white border border-forest-600 transition"
            >
              <span>{t.role}: <strong className="capitalize text-sage-200">
                {role === 'farmer' ? t.farmer.split(' ')[0] : role === 'institutional' ? t.institutional.split(' ')[0] : t.admin}
              </strong></span>
              <ChevronDown className="w-3 h-3 text-sage-300" />
            </button>

            {roleDropdownOpen && (
              <div className="absolute right-0 mt-1 w-48 bg-white border border-sage-300 rounded-xl shadow-elevated py-1.5 z-50 text-charcoal text-xs">
                <div className="px-3 py-1 font-semibold text-[10px] text-charcoal-muted uppercase tracking-wider border-b border-sage-100">
                  {language === 'hi' ? 'भूमिका बदलें' : 'Switch Active Role'}
                </div>
                <button
                  onClick={() => { setRole('farmer'); setRoleDropdownOpen(false); }}
                  className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-ivory-100 ${role === 'farmer' ? 'bg-sage-100 font-semibold text-forest-800' : ''}`}
                >
                  <span className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-forest-700" /> {t.farmer}
                  </span>
                  {role === 'farmer' && <span className="w-1.5 h-1.5 rounded-full bg-forest-700"></span>}
                </button>
                <button
                  onClick={() => { setRole('institutional'); setRoleDropdownOpen(false); }}
                  className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-ivory-100 ${role === 'institutional' ? 'bg-sage-100 font-semibold text-forest-800' : ''}`}
                >
                  <span className="flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5 text-forest-700" /> {t.institutional}
                  </span>
                  {role === 'institutional' && <span className="w-1.5 h-1.5 rounded-full bg-forest-700"></span>}
                </button>
                <button
                  onClick={() => { setRole('admin'); setRoleDropdownOpen(false); }}
                  className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-ivory-100 ${role === 'admin' ? 'bg-sage-100 font-semibold text-forest-800' : ''}`}
                >
                  <span className="flex items-center gap-2">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-forest-700" /> {t.admin}
                  </span>
                  {role === 'admin' && <span className="w-1.5 h-1.5 rounded-full bg-forest-700"></span>}
                </button>
              </div>
            )}
          </div>

          {/* Language Toggle */}
          <div className="flex bg-forest-950 rounded p-0.5 text-[11px]">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-0.5 rounded transition ${language === 'en' ? 'bg-forest-800 text-white font-bold shadow-xs' : 'text-sage-400 hover:text-white'}`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('hi')}
              className={`px-2 py-0.5 rounded transition ${language === 'hi' ? 'bg-forest-800 text-white font-bold shadow-xs' : 'text-sage-400 hover:text-white'}`}
            >
              हिंदी
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-forest-800 group-hover:bg-forest-900 transition flex items-center justify-center text-ivory-100 shadow-subtle">
              <Sprout className="w-6 h-6 text-sage-200 group-hover:scale-105 transition-transform" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-display font-bold text-xl text-forest-900 tracking-tight">
                  {language === 'hi' ? 'फसल' : 'Fasal'}<span className="text-forest-700 font-normal">{language === 'hi' ? 'क्लेम' : 'Claim'}</span>
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 bg-sage-200 text-forest-800 rounded">
                  {language === 'hi' ? 'एग्रीटेक' : 'Agritech'}
                </span>
              </div>
              <p className="text-[10px] text-charcoal-muted font-medium -mt-1 hidden sm:block">
                {language === 'hi' ? 'फसल-बीमा क्लेम आश्वासन' : 'Crop-Insurance Claim Assurance'}
              </p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-xl text-sm font-medium transition flex items-center space-x-1.5 relative ${
                    isActive 
                      ? 'bg-sage-100 text-forest-900 font-semibold shadow-subtle' 
                      : 'text-charcoal hover:text-forest-800 hover:bg-ivory-100'
                  }`}
                >
                  {Icon && <Icon className={`w-4 h-4 ${isActive ? 'text-forest-800' : 'text-charcoal-muted'}`} />}
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="text-[9px] font-bold uppercase tracking-wide px-1.5 py-0.2 rounded bg-terracotta-500 text-white shadow-xs">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}

            {/* Admin link if role is admin */}
            {role === 'admin' && (
              <Link
                href="/admin"
                className={`px-3 py-2 rounded-xl text-sm font-medium transition flex items-center space-x-1.5 ${
                  pathname === '/admin' ? 'bg-sage-100 text-forest-900 font-semibold' : 'text-charcoal hover:bg-ivory-100'
                }`}
              >
                <SlidersHorizontal className="w-4 h-4 text-forest-800" />
                <span>{t.adminConsole}</span>
              </Link>
            )}
          </nav>

          {/* Right Action Group */}
          <div className="hidden sm:flex items-center space-x-2.5">
            {/* Voice Assistant Shortcut */}
            <button
              onClick={() => setVoiceModalOpen(true)}
              className="flex items-center space-x-2 px-3 py-2 rounded-xl border border-sage-300 bg-ivory-50 hover:bg-sage-100 text-forest-800 text-xs font-semibold shadow-subtle transition group"
              title={language === 'hi' ? "हिंदी या अंग्रेजी में बोलकर सवाल पूछें" : "Speak or ask questions in plain language (English & Hindi)"}
            >
              <div className="w-6 h-6 rounded-full bg-forest-800 text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                <Mic className="w-3.5 h-3.5" />
              </div>
              <span className="hidden md:inline">{t.voiceAssistant}</span>
            </button>

            {/* Primary CTA */}
            <Link
              href="/radar"
              className="flex items-center space-x-2 bg-forest-800 hover:bg-forest-900 text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow-card hover:shadow-card-hover transition active:scale-[0.98]"
            >
              <FileSearch className="w-4 h-4 text-sage-200" />
              <span>{t.checkMyClaim}</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center space-x-2">
            <button
              onClick={() => setVoiceModalOpen(true)}
              className="p-2 rounded-lg bg-ivory-100 text-forest-800 border border-sage-300"
            >
              <Mic className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-charcoal hover:bg-sage-100 transition"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-sage-300 px-4 pt-3 pb-5 space-y-2 animate-fadeIn">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium ${
                  isActive ? 'bg-sage-100 text-forest-900 font-semibold' : 'text-charcoal hover:bg-ivory-100'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  {Icon && <Icon className="w-4 h-4 text-forest-700" />}
                  <span>{link.label}</span>
                </div>
                {link.badge && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-terracotta-500 text-white">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}

          <Link
            href="/admin"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center space-x-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium text-charcoal hover:bg-ivory-100"
          >
            <SlidersHorizontal className="w-4 h-4 text-forest-700" />
            <span>{t.adminConsole}</span>
          </Link>

          <div className="pt-2 border-t border-sage-200">
            <Link
              href="/radar"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center space-x-2 bg-forest-800 text-white px-4 py-3 rounded-xl text-sm font-semibold shadow-card"
            >
              <FileSearch className="w-4 h-4" />
              <span>{t.checkMyClaim}</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
