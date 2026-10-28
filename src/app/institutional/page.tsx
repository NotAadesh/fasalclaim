'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { 
  ShieldCheck, 
  Filter, 
  Download
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';

export default function InstitutionalDashboardPage() {
  const { role, setRole, institutionalStats, language } = useApp();

  const [selectedSeason, setSelectedSeason] = useState('Kharif 2024');
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const isHi = language === 'hi';

  const handleExportCSV = () => {
    const csvContent = `FASALCLAIM INSTITUTIONAL BOTTLENECK INTELLIGENCE EXPORT
Scope: ${selectedSeason} • Filter: ${selectedDistrict} • Category: ${selectedCategory}
Generated: ${new Date().toLocaleDateString(isHi ? 'hi-IN' : 'en-IN')}

METRIC,VALUE
Total Analyzed Cases,${institutionalStats.totalDemoCases}
Bottlenecks Identified,${institutionalStats.bottlenecksIdentified}
Average Recorded Delay Days,${institutionalStats.averageDelayDays}
Resolved With Document Evidence,${institutionalStats.resolvedThroughEvidence}

DISCREPANCY BREAKDOWN BY CATEGORY
${institutionalStats.discrepanciesByCategory.map(d => `${d.category},${d.count} cases,${d.percentage}%,${d.avgResolutionDays} avg days to resolve`).join('\n')}

DISTRICT BREAKDOWN
${institutionalStats.districtDistribution.map(d => `${d.district},${d.cases} cases,${d.discrepancyRate}% rate,${d.status}`).join('\n')}

NOTICE:
Privacy-Preserving Aggregate Analytics. No Farmer Personally Identifiable Information (PII) is exposed. Demo Data.`;

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `FasalClaim_Institutional_Bottlenecks_${selectedSeason.replace(' ', '_')}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-ivory-50/70 min-h-screen pb-24">
      {/* Top Header */}
      <div className="bg-white border-b border-sage-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 text-xs text-charcoal-muted mb-1">
                <Link href="/" className="hover:text-forest-800">{isHi ? 'होम' : 'Home'}</Link>
                <span>/</span>
                <span className="text-forest-900 font-semibold">{isHi ? 'संस्थागत विश्लेषण' : 'Institutional Intelligence'}</span>
              </div>
              <div className="flex items-center space-x-3">
                <h1 className="text-2xl sm:text-3xl font-display font-bold text-charcoal">
                  {isHi ? 'संस्थागत अड़चन विश्लेषण' : 'Institutional Bottleneck Intelligence'}
                </h1>
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-forest-800 text-white">
                  {isHi ? 'एफपीओ और भागीदार पोर्टल' : 'FPO & Partner Portal'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-charcoal-muted mt-0.5">
                {isHi 
                  ? 'फसल बीमा क्लस्टरों में प्रणालीगत प्रशासनिक अड़चनों पर गोपनीयता-सुरक्षित समग्र निदान।'
                  : 'Privacy-preserving aggregate diagnostics on systemic administrative bottlenecks across crop insurance clusters.'}
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2.5">
              <button
                onClick={handleExportCSV}
                className="flex items-center space-x-1.5 bg-ivory-100 hover:bg-sage-100 text-forest-800 border border-sage-300 px-3.5 py-2 rounded-xl text-xs font-semibold transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{isHi ? 'समग्र CSV निर्यात करें' : 'Export Aggregate CSV'}</span>
              </button>

              {role !== 'institutional' && (
                <button
                  onClick={() => setRole('institutional')}
                  className="bg-forest-800 hover:bg-forest-900 text-white px-3.5 py-2 rounded-xl text-xs font-semibold shadow-card transition"
                >
                  {isHi ? 'संस्थागत भूमिका में बदलें' : 'Switch to Institutional Role'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Privacy & Demo Banner */}
        <div className="bg-forest-900 text-white rounded-3xl p-6 border border-forest-700 shadow-elevated flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-forest-800 flex items-center justify-center shrink-0 text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold uppercase tracking-wider text-sage-200">
                  {isHi ? 'गोपनीयता-प्रथम समग्र सांख्यिकी' : 'Privacy-First Aggregate Modeling'}
                </span>
                <span className="text-[10px] bg-forest-800 px-2 py-0.5 rounded text-amber-300 font-semibold border border-forest-700">
                  {isHi ? 'डेमो डेटासेट: 1,480 केस' : 'Demo Dataset: 1,480 Cases'}
                </span>
              </div>
              <p className="text-xs text-sage-300 mt-1 max-w-2xl leading-relaxed">
                {isHi 
                  ? 'व्यक्तिगत किसान का नाम, आधार विवरण और संपर्क नंबर पूरी तरह से हटा दिए गए हैं। यह विश्लेषण एफपीओ को बीमा कंपनियों और राज्य समितियों के साथ सामूहिक रुकावटों का समाधान करने में सक्षम बनाता है।'
                  : 'Personal farmer names, Aadhaar details, and contact numbers are strictly stripped from aggregate views. Metrics enable FPOs and district federations to address systemic blockages with insurers and state committees.'}
              </p>
            </div>
          </div>
        </div>

        {/* Global Filters */}
        <div className="bg-white rounded-2xl p-4 border border-sage-200 shadow-subtle flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-bold text-charcoal flex items-center gap-1.5">
              <Filter className="w-4 h-4 text-forest-700" /> {isHi ? 'क्लस्टर फ़िल्टर:' : 'Filter Cluster:'}
            </span>

            <select
              value={selectedSeason}
              onChange={(e) => setSelectedSeason(e.target.value)}
              className="bg-ivory-50 border border-sage-300 rounded-xl px-3 py-1.5 text-xs text-charcoal font-medium"
            >
              <option value="Kharif 2024">{isHi ? 'खरीफ 2024 (सक्रिय मौसम)' : 'Kharif 2024 (Active Season)'}</option>
              <option value="Rabi 2023-24">{isHi ? 'रबी 2023-24' : 'Rabi 2023-24'}</option>
              <option value="Kharif 2023">{isHi ? 'खरीफ 2023' : 'Kharif 2023'}</option>
            </select>

            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="bg-ivory-50 border border-sage-300 rounded-xl px-3 py-1.5 text-xs text-charcoal font-medium"
            >
              <option value="all">{isHi ? 'सभी 6 भागीदार जिले' : 'All Participating Districts (6)'}</option>
              <option value="Beed">बीड, महाराष्ट्र</option>
              <option value="Rajkot">राजकोट, गुजरात</option>
              <option value="Sangrur">संगरूर, पंजाब</option>
              <option value="Dewas">देवास, मध्य प्रदेश</option>
              <option value="Shivamogga">शिवमोग्गा, कर्नाटक</option>
              <option value="Cuttack">कटक, ओडिशा</option>
            </select>
          </div>

          <span className="text-[11px] text-charcoal-muted">
            {isHi ? 'समग्र मॉडल देख रहे हैं • अद्यतन: 28-अक्टूबर-2024' : 'Viewing aggregate model • Updated 28-Oct-2024'}
          </span>
        </div>

        {/* 4 Core Aggregate Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-sage-200 shadow-card">
            <div className="text-xs text-charcoal-muted font-medium mb-1">
              {isHi ? 'कुल विश्लेषित केस' : 'Total Cases Monitored'}
            </div>
            <div className="text-2xl sm:text-3xl font-display font-bold text-charcoal">
              {institutionalStats.totalDemoCases.toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] text-forest-700 font-medium mt-1">
              {isHi ? '6 डेमो जिलों में' : 'Across 6 demo districts'}
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-sage-200 shadow-card">
            <div className="text-xs text-charcoal-muted font-medium mb-1">
              {isHi ? 'पहचाने गए प्रशासनिक अवरोध' : 'Bottlenecks Identified'}
            </div>
            <div className="text-2xl sm:text-3xl font-display font-bold text-terracotta-600">
              {institutionalStats.bottlenecksIdentified.toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] text-terracotta-700 font-medium mt-1">
              {isHi ? '60.4% विसंगति दर' : '60.4% discrepancy rate'}
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-sage-200 shadow-card">
            <div className="text-xs text-charcoal-muted font-medium mb-1">
              {isHi ? 'औसत दर्ज देरी' : 'Avg recorded delay'}
            </div>
            <div className="text-2xl sm:text-3xl font-display font-bold text-charcoal">
              {institutionalStats.averageDelayDays} {isHi ? 'दिन' : 'Days'}
            </div>
            <div className="text-[11px] text-charcoal-muted mt-1">
              {isHi ? 'सरकारी नियम: 21 दिन' : 'vs 21 days PMFBY SLA'}
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-sage-200 shadow-card">
            <div className="text-xs text-charcoal-muted font-medium mb-1">
              {isHi ? 'साक्ष्य द्वारा निस्तारित' : 'Evidence-Backed Resolved'}
            </div>
            <div className="text-2xl sm:text-3xl font-display font-bold text-emerald-700">
              {institutionalStats.resolvedThroughEvidence.toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] text-emerald-800 font-medium mt-1">
              {isHi ? '71.8% सफलता दर' : '71.8% success post-evidence'}
            </div>
          </div>
        </div>

        {/* Recharts Analytics Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Chart 1: Category Breakdown Bar Chart */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-sage-300 shadow-card space-y-4">
            <div className="flex items-center justify-between border-b border-sage-200 pb-3">
              <div>
                <h3 className="font-display font-bold text-base text-charcoal">
                  {isHi ? 'बार-बार आने वाली अड़चनों की श्रेणियां' : 'Recurring Bottleneck Categories'}
                </h3>
                <p className="text-xs text-charcoal-muted mt-0.5">
                  {isHi ? 'विशिष्ट लिपिकीय और सर्वेक्षण समस्याओं से प्रभावित दावों का अनुपात' : 'Proportion of claims impacted by specific clerical and survey issues'}
                </p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-sage-100 text-forest-800">
                1,480 {isHi ? 'केस' : 'Cases'}
              </span>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={institutionalStats.discrepanciesByCategory}
                  margin={{ top: 10, right: 10, left: -20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#EDF3EC" />
                  <XAxis 
                    dataKey="category" 
                    tick={{ fontSize: 10, fill: '#70786F' }}
                    interval={0}
                    angle={-10}
                    textAnchor="end"
                  />
                  <YAxis tick={{ fontSize: 11, fill: '#70786F' }} />
                  <Tooltip 
                    formatter={(val: any) => [`${val} ${isHi ? 'केस' : 'cases'}`, isHi ? 'संख्या' : 'Occurrences']}
                    contentStyle={{ borderRadius: '12px', border: '1px solid #DDE7DA', fontSize: '12px' }}
                  />
                  <Bar dataKey="count" fill="#173F2B" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="text-xs text-charcoal-muted leading-relaxed bg-ivory-50 p-3 rounded-xl border border-sage-200">
              💡 <strong>{isHi ? 'प्रणालीगत अंतर्दृष्टि:' : 'Systemic Insight:'}</strong>{' '}
              {isHi
                ? 'बैंक खाता और आईएफएससी विसंगतियां कुल विलंबित भुगतानों का 41% हिस्सा हैं। एकल-खिड़की बैंक शिविर आयोजित करने वाले एफपीओ ने इन मामलों को 24 दिनों से कम समय में हल कर लिया।'
                : 'Bank Account / IFSC discrepancies account for 41% of all delayed disbursements. FPOs organizing single-window branch endorsement camps resolved these bottlenecks in under 24 days.'}
            </div>
          </div>

          {/* Chart 2: Milestone SLA Benchmarking */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-sage-300 shadow-card space-y-4">
            <div className="flex items-center justify-between border-b border-sage-200 pb-3">
              <div>
                <h3 className="font-display font-bold text-base text-charcoal">
                  {isHi ? 'निस्तारण समयसीमा के चरण' : 'Turnaround Milestones'}
                </h3>
                <p className="text-xs text-charcoal-muted mt-0.5">
                  {isHi ? 'आधिकारिक सरकारी मानक बनाम वास्तविक क्लस्टर औसत' : 'Official statutory benchmarks vs actual cluster averages'}
                </p>
              </div>
            </div>

            <div className="space-y-4 text-xs pt-1">
              {institutionalStats.turnaroundMilestones.map((m, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between font-semibold text-charcoal">
                    <span>{m.stage}</span>
                    <span className="text-terracotta-700 font-bold">{m.actualAverageDays} {isHi ? 'दिन' : 'Days'}</span>
                  </div>
                  
                  <div className="w-full bg-sage-100 h-2.5 rounded-full overflow-hidden flex">
                    <div 
                      className="bg-forest-800 h-2.5" 
                      style={{ width: `${(m.officialBenchmarkDays / m.actualAverageDays) * 100}%` }}
                    ></div>
                    <div 
                      className="bg-terracotta-400 h-2.5 flex-1"
                    ></div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-charcoal-muted">
                    <span>{isHi ? 'मानक अवधि:' : 'Statutory Benchmark:'} {m.officialBenchmarkDays}d</span>
                    <span className="text-terracotta-600 font-medium">+{m.actualAverageDays - m.officialBenchmarkDays}d {isHi ? 'अतिरिक्त देरी' : 'delay'}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 text-[11px] text-charcoal-muted text-right">
              {isHi ? '* स्रोत: पीएमएफबीवाई एसएलए और एसएलसीसीसीआई मानक' : '* Source: PMFBY SLA Standards & SLCCCI Recorded Benchmarks'}
            </div>
          </div>

        </div>

        {/* District Distribution Table */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-sage-300 shadow-card space-y-4">
          <div className="flex items-center justify-between border-b border-sage-200 pb-4">
            <div>
              <h3 className="font-display font-bold text-base text-charcoal">
                {isHi ? 'जिलों के अनुसार क्लस्टर विसंगति तालिका' : 'Cluster Discrepancy Heatmap by District'}
              </h3>
              <p className="text-xs text-charcoal-muted mt-0.5">
                {isHi ? 'संस्थागत हस्तक्षेप के लिए प्राथमिकता क्षेत्रों को दर्शाने वाली स्कोर तालिका' : 'Aggregated vulnerability scores indicating priority areas for institutional intervention'}
              </p>
            </div>
            <span className="text-xs font-semibold text-charcoal-muted">{isHi ? 'डेमो डेटा' : 'Demo Aggregates'}</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-ivory-50 border-b border-sage-200 text-charcoal font-semibold">
                <tr>
                  <th className="py-3 px-4">{isHi ? 'जिला और राज्य' : 'District & State'}</th>
                  <th className="py-3 px-4">{isHi ? 'सक्रिय केस' : 'Active Cases'}</th>
                  <th className="py-3 px-4">{isHi ? 'विसंगति दर' : 'Discrepancy Rate'}</th>
                  <th className="py-3 px-4">{isHi ? 'प्राथमिकता स्तर' : 'Vulnerability Status'}</th>
                  <th className="py-3 px-4 text-right">{isHi ? 'कार्रवाई' : 'Recommended Action'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sage-200">
                {institutionalStats.districtDistribution.map((dist, idx) => (
                  <tr key={idx} className="hover:bg-ivory-50/50 transition">
                    <td className="py-3 px-4 font-bold text-charcoal">{dist.district}</td>
                    <td className="py-3 px-4 text-charcoal">{dist.cases}</td>
                    <td className="py-3 px-4 font-semibold text-charcoal">{dist.discrepancyRate}%</td>
                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        dist.status === 'High'
                          ? 'bg-terracotta-100 text-terracotta-800'
                          : dist.status === 'Moderate'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {isHi ? (dist.status === 'High' ? 'उच्च प्राथमिकता' : dist.status === 'Moderate' ? 'मध्यम प्राथमिकता' : 'सामान्य') : `${dist.status} Priority`}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="text-forest-800 font-semibold hover:underline cursor-pointer">
                        {isHi ? 'क्लस्टर देखें →' : 'View District Cluster →'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
