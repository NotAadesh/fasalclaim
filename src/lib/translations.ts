export type Language = 'en' | 'hi';

export const TRANSLATIONS = {
  en: {
    // Navigation
    nav: {
      platformTitle: 'FasalClaim Assurance Platform • Independent Agritech Service',
      currentCase: 'Current Case',
      role: 'Role',
      farmer: 'Farmer (Claimant)',
      institutional: 'FPO / Institutional',
      admin: 'Platform Admin',
      howItWorks: 'How It Works',
      radar: 'Pre-Claim Radar',
      diagnosis: 'Claim Diagnosis',
      escalation: 'Escalation Navigator',
      portal: 'Farmer Portal',
      institutions: 'For Institutions',
      adminConsole: 'Admin Console',
      voiceAssistant: 'Voice Assistant',
      checkMyClaim: 'Check My Claim',
      signature: 'Signature'
    },
    // Hero
    hero: {
      eyebrow: 'CROP INSURANCE, WITH MORE CLARITY',
      headlinePart1: 'Your claim deserves more than a',
      headlinePart2: 'waiting period.',
      subtitle: 'Understand possible claim issues, organize your evidence, and discover the next practical step — all in one place.',
      ctaPrimary: 'Check My Claim',
      ctaSecondary: 'Explore How It Works',
      trustNote: 'Independent claim assistance. Works alongside official crop insurance channels.',
      tryVoice: 'Try Voice Assistant',
      photoTag: '🌱 Kharif Soybean Assessment • Sample Case',
      caseTitle: 'Case #FC-2024-MH-8491',
      farmerSub: 'Rameshwar Vitthal Patil • Beed, MH',
      needsReview: 'Needs Review',
      issueFoundLabel: 'Issue Found:',
      issueFoundVal: 'Bank Passbook name alias ("Ramesh" vs "Rameshwar")',
      evidenceLabel: 'Evidence:',
      evidenceVal: 'Bank passbook scan differs from NCIP application entry',
      followUp: 'Follow-up: 7-day bank verification',
      openDiagnosis: 'Open Diagnosis',
      sampleNotice: '* Clearly labelled sample data for demonstration'
    },
    // Problem
    problem: {
      tag: 'The Reality of Agricultural Claims',
      title: 'An unclear claim creates more questions than answers.',
      subtitle: 'When harvest damage strikes, waiting months without understanding what is blocking your claim creates unnecessary anxiety for farming families.',
      p1Title: 'You do not know what is holding things up',
      p1Desc: 'Generic portal statuses like “Under Process” leave you guessing whether your application is stalled by a bank typo, land survey discrepancy, or pending state yield data.',
      p2Title: 'You are unsure which documents need attention',
      p2Desc: 'A single spelling discrepancy between your bank passbook and 7/12 extract can pause Direct Benefit Transfer (DBT) disbursement without any clear alert.',
      p3Title: 'You do not know what to do next or whom to contact',
      p3Desc: 'Navigating between the local CSC desk, bank branch, insurer desk, and District Agriculture Officer without structured written evidence results in endless visits.'
    },
    // Differentiators
    diff: {
      tag: 'OUR SIX CORE DIFFERENTIATORS',
      titlePart1: 'Not just claim tracking.',
      titlePart2: 'Claim understanding.',
      subtitle: 'We go beyond static tracking numbers to diagnose the evidentiary reasons behind claim delays and provide actionable paths forward.',
      signatureTag: 'SIGNATURE DIFFERENTIATOR',
      signatureSub: 'Deterministic Rules • Zero Hallucination',
      diagTitle: 'Evidence-Backed Claim Diagnosis Engine',
      diagDesc: 'Organizes complex crop insurance claims into verified facts, supporting evidence, uncertainty levels, and statutory citations.',
      launchDiag: 'Launch Diagnosis Engine',
      liveCase: 'Live Case Analysis: Case #FC-2024-MH-8491',
      confidenceBadge: 'Confidence: 88% (Verified Match)',
      blockerTitle: 'Identified Potential Blocker',
      blockerHeading: 'Bank Passbook Name Spelling Alias Discrepancy',
      blockerDesc: 'Name entered on claim portal (Rameshwar Vitthal Patil) differs from name printed on bank passbook (Ramesh Vitthal Patil). This causes automated PFMS DBT electronic transaction rejection.',
      evidenceTitle: 'Supporting Evidence on File',
      whyMattersTitle: 'Why It Matters & Uncertainty Caveat',
      whyMattersDesc: 'This difference indicates an administrative bottleneck that pauses electronic DBT transfers. It does not establish that the claim has been rejected or that crop loss is unverified.',
      statutoryRef: 'Applicable Statutory Source:',
      statutoryVal: 'PMFBY Revised Operational Guidelines Section 13.4 (DBT Rectification Protocols)',
      nextStepTitle: 'Recommended Next Practical Action',
      nextStepDesc: 'Submit a Bank Rectification Form endorsed by your branch manager to the District Nodal Officer within 7 days.',
      generateDraftCta: 'Generate Rectification Grievance Draft',
      
      radarTitle: 'Pre-Claim Error Radar',
      radarDesc: 'Interactive multi-document checking engine that detects discrepancies across names, land survey numbers, IFSC codes, and sowing declarations before official scrutiny.',
      launchRadar: 'Launch Error Radar',
      
      escalationTitle: 'Smart Escalation Navigator',
      escalationDesc: 'Generates structured, evidence-backed grievance drafts tailored for DLMC, State Grievance Committees, or Insurer Nodal desks. Clearly marked as drafts until officially filed.',
      prepareDraft: 'Prepare Grievance Draft',
      
      voiceTitle: 'Voice-First Claim Assistant',
      voiceDesc: 'Designed for users with varying digital literacy. Converse using natural speech in English or Hindi (हिंदी) with contextual guidance tailored to the active claim.',
      openVoice: 'Open Voice Assistant',
      
      instTitle: 'Institutional Bottleneck Intelligence',
      instDesc: 'Privacy-preserving aggregate analytics for Farmer Producer Organizations (FPOs), cooperatives, and agriculture departments to pinpoint systemic administrative bottlenecks.',
      viewInst: 'View Institutional Dashboard',
      
      alertTitle: 'Delay & Interest Alerts',
      alertDesc: 'Chronological deadline monitoring and statutory 12% per annum penal interest reviews under PMFBY Section 15.2, verified with statutory date and eligibility conditions.',
      viewAlerts: 'View Timeline & Alerts',

      demoCasesTitle: 'Test With Preloaded Cases',
      demoCasesDesc: 'Explore realistic sample scenarios: Bank Name Discrepancy (Beed), Drought CCE Yield Hold (Rajkot), or 72-hr Intimation Delay (Sangrur).',
      openPortal: 'Open Farmer Portal'
    },
    // How It Works
    how: {
      tag: 'Clear 4-Step Process',
      title: 'How FasalClaim Works',
      subtitle: 'Understand your claim bottleneck in under 15 seconds.',
      s1Title: 'Add Claim Details',
      s1Desc: 'Enter your crop, season, land survey number, and insurer reference, or load a pre-configured sample claim.',
      s2Title: 'Check Documents',
      s2Desc: 'Pre-Claim Error Radar cross-checks names, IFSC codes, and land records to highlight inconsistencies.',
      s3Title: 'Review Diagnosis',
      s3Desc: 'Inspect evidence-backed findings, statutory PMFBY citations, and clear confidence/uncertainty notes.',
      s4Title: 'Take the Next Step',
      s4Desc: 'Generate structured grievance drafts, gather required endorsements, and track external follow-up dates.'
    },
    // Previews
    previews: {
      farmerTag: 'Farmer Portal',
      farmerTitle: 'Built for Clarity on Mobile Phones',
      farmerDesc: 'A respectful, clutter-free workspace where farmers can organize claim receipts, understand what documents need attention, and prepare structured representations.',
      farmerP1: 'Plain-language case summary and follow-up timeline',
      farmerP2: 'Private document vault with automated mismatch radar',
      farmerP3: 'Voice assistant in English and Hindi for hands-free guidance',
      exploreFarmer: 'Explore Farmer Portal',
      instTag: 'For FPOs & Institutions',
      instTitle: 'Institutional Bottleneck Intelligence',
      instDesc: 'Empowering Farmer Producer Organizations (FPOs), cooperatives, and state departments to identify cluster-wide administrative delays without compromising individual farmer privacy.',
      instP1: 'Aggregate metrics on top discrepancy causes across talukas',
      instP2: 'Milestone turnaround benchmarking vs official statutory norms',
      instP3: 'Privacy-first anonymized case workflows and cluster reporting',
      viewInstAnalytics: 'View Institutional Analytics'
    },
    // Trust
    trust: {
      tag: 'Clear Boundaries & Security',
      title: 'Our Commitment to Trust & Transparency',
      subtitle: 'We operate with rigorous transparency, verifiable facts, and zero false promises.',
      t1Title: 'Independent Claim Assistance',
      t1Desc: 'FasalClaim is an independent technology platform. It is not an insurer, insurance broker, or official PMFBY grievance tribunal.',
      t2Title: 'A Mismatch is Not Rejection',
      t2Desc: 'Identifying a document discrepancy indicates an administrative bottleneck that needs verification. It does not mean your claim has been rejected.',
      t3Title: 'Official Rules Are Authoritative',
      t3Desc: 'Official PMFBY guidelines and State Level Coordination Committees (SLCCCI) remain the authoritative adjudicating bodies.',
      t4Title: 'Grievances are Labeled as Drafts',
      t4Desc: 'Letters generated by FasalClaim are clearly marked as DRAFTS until you review, sign, and submit them through official channels.',
      t5Title: 'Private Document Handling',
      t5Desc: 'Documents are handled with private storage access control (Supabase RLS) and are never exposed in public URLs.',
      t6Title: 'Explicit Uncertainty',
      t6Desc: 'When documentary evidence is insufficient to draw a verified conclusion, our diagnosis engine explicitly notes the uncertainty.'
    },
    // Final CTA
    finalCta: {
      tag: 'FasalClaim Assurance',
      title: 'Turn uncertainty into a clearer next step.',
      subtitle: 'Whether you are a farmer seeking clarity on a delayed Kharif claim, or an FPO looking to support member farmers, FasalClaim provides evidence-backed guidance.',
      btn1: 'Explore Your Claim',
      btn2: 'Partner With FasalClaim',
      demoNote: 'Demonstration mode enabled • Fictional sample records clearly designated'
    },
    // Footer
    footer: {
      noticeTitle: 'Independent Claim-Assurance & Advisory Notice',
      noticeDesc: 'FasalClaim is an independent agricultural crop-insurance claim-assurance platform. It is not a government portal, insurance company, claims adjudicator, or official PMFBY service. FasalClaim does not approve or reject claims and cannot guarantee monetary compensation. Official scheme guidelines, insurer adjudications, and statutory district/state grievance redressal committees remain authoritative.',
      tagline: 'Know what may be blocking your claim. Understand the evidence. Take the right next step.',
      featuresHeading: 'Platform Features',
      officialHeading: 'Official Grievance Channels',
      trustHeading: 'Trust & Transparency',
      rights: 'All rights reserved.',
      builtFor: 'Built with dedication for Indian farmers & institutions'
    }
  },

  hi: {
    // Navigation
    nav: {
      platformTitle: 'फसलक्लेम आश्वासन मंच • स्वतंत्र एग्रीटेक सेवा',
      currentCase: 'वर्तमान केस',
      role: 'भूमिका',
      farmer: 'किसान (दावेदार)',
      institutional: 'एफपीओ / संस्थागत',
      admin: 'मंच प्रशासक',
      howItWorks: 'यह कैसे काम करता है',
      radar: 'प्री-क्लेम रडार',
      diagnosis: 'क्लेम डायग्नोसिस',
      escalation: 'शिकायत निवारक',
      portal: 'किसान पोर्टल',
      institutions: 'संस्थानों के लिए',
      adminConsole: 'प्रशासक कंसोल',
      voiceAssistant: 'वाणी सहायक',
      checkMyClaim: 'मेरा क्लेम जांचें',
      signature: 'प्रमुख विशेषता'
    },
    // Hero
    hero: {
      eyebrow: 'फसल बीमा, पूरी स्पष्टता के साथ',
      headlinePart1: 'आपका क्लेम केवल एक',
      headlinePart2: 'प्रतीक्षा अवधि से अधिक का हकदार है।',
      subtitle: 'क्लेम की संभावित रुकावटें समझें, अपने साक्ष्य व्यवस्थित करें और अगला सही व्यावहारिक कदम जानें — सब एक ही स्थान पर।',
      ctaPrimary: 'मेरा क्लेम जांचें',
      ctaSecondary: 'प्रक्रिया समझें',
      trustNote: 'स्वतंत्र क्लेम सहायता। आधिकारिक फसल बीमा माध्यमों के साथ मिलकर काम करता है।',
      tryVoice: 'वाणी सहायक आज़माएं',
      photoTag: '🌱 खरीफ सोयाबीन मूल्यांकन • नमूना केस',
      caseTitle: 'केस #FC-2024-MH-8491',
      farmerSub: 'रामेश्वर विट्ठल पाटिल • बीड, महाराष्ट्र',
      needsReview: 'समीक्षा आवश्यक',
      issueFoundLabel: 'पहचानी गई समस्या:',
      issueFoundVal: 'बैंक पासबुक नाम उपनाम ("रमेश" बनाम "रामेश्वर")',
      evidenceLabel: 'उपलब्ध साक्ष्य:',
      evidenceVal: 'बैंक पासबुक स्कैन पीएमएफबीवाई आवेदन प्रविष्टि से भिन्न है',
      followUp: 'फॉलो-अप: 7-दिवसीय बैंक सत्यापन',
      openDiagnosis: 'डायग्नोसिस खोलें',
      sampleNotice: '* प्रदर्शन हेतु स्पष्ट रूप से अंकित काल्पनिक नमूना डेटा'
    },
    // Problem
    problem: {
      tag: 'कृषि बीमा दावों की जमीनी हकीकत',
      title: 'अस्पष्ट क्लेम समाधान से अधिक प्रश्न खड़े करता है।',
      subtitle: 'जब प्राकृतिक आपदा से फसल नष्ट होती है, तो महीनों बिना कारण समझे इंतज़ार करना किसान परिवारों के लिए अनावश्यक मानसिक तनाव पैदा करता है।',
      p1Title: 'आपको पता नहीं चलता कि क्लेम कहां अटका है',
      p1Desc: 'सरकारी पोर्टलों पर "प्रक्रियाधीन" जैसी सामान्य स्थितियां आपको अंधेरे में रखती हैं कि क्या भुगतान बैंक विसंगति, पटवारी सर्वे या राज्य उपज आंकड़ों के कारण रुका है।',
      p2Title: 'आपको यकीन नहीं होता कि किन दस्तावेजों पर ध्यान देना है',
      p2Desc: 'बैंक पासबुक और 7/12 खसरे के नाम में एक अक्षर का अंतर भी डीबीटी (DBT) भुगतान रोक सकता है, बिना किसी स्पष्ट चेतावनी के।',
      p3Title: 'आपको समझ नहीं आता कि आगे क्या करें या किससे संपर्क करें',
      p3Desc: 'बिना संरचित लिखित साक्ष्य के सीएससी केंद्र, बैंक शाखा, बीमा प्रतिनिधि और कृषि अधिकारी के बीच चक्कर काटने से समय नष्ट होता है।'
    },
    // Differentiators
    diff: {
      tag: 'हमारे छह प्रमुख विभेदक',
      titlePart1: 'केवल क्लेम ट्रैकिंग नहीं।',
      titlePart2: 'क्लेम की वास्तविक समझ।',
      subtitle: 'हम केवल सांख्यिकीय ट्रैकिंग नंबर दिखाने से आगे बढ़कर रुकावटों के दस्तावेजी कारणों का निदान करते हैं और व्यावहारिक समाधान देते हैं।',
      signatureTag: 'हस्ताक्षर विभेदक',
      signatureSub: 'नियम-आधारित जांच • शून्य काल्पनिक बातें',
      diagTitle: 'साक्ष्य-आधारित क्लेम डायग्नोसिस इंजन',
      diagDesc: 'जटिल फसल बीमा मामलों को सत्यापित तथ्यों, साक्ष्य, अनिश्चितता स्तर और आधिकारिक सरकारी नियमों में व्यवस्थित करता है।',
      launchDiag: 'डायग्नोसिस इंजन शुरू करें',
      liveCase: 'लाइव केस विश्लेषण: केस #FC-2024-MH-8491',
      confidenceBadge: 'सटीकता: 88% (साक्ष्य-सत्यापित)',
      blockerTitle: 'पहचाना गया संभावित अवरोध',
      blockerHeading: 'बैंक पासबुक नाम वर्तनी उपनाम विसंगति',
      blockerDesc: 'आवेदन में दर्ज नाम (रामेश्वर विट्ठल पाटिल) बैंक पासबुक पर मुद्रित नाम (रमेश विट्ठल पाटिल) से थोड़ा भिन्न है। इसके कारण स्वचालित पीएफएमएस डीबीटी लेन-देन अस्वीकृत हो जाता है।',
      evidenceTitle: 'फ़ाइल पर उपलब्ध साक्ष्य',
      whyMattersTitle: 'यह क्यों महत्वपूर्ण है और निष्पक्षता प्रकटीकरण',
      whyMattersDesc: 'यह अंतर एक प्रशासनिक अड़चन दर्शाता है जो डीबीटी हस्तांतरण रोकता है। इसका यह अर्थ कदापि नहीं है कि क्लेम खारिज हो चुका है या फसल नुकसान असत्यापित है।',
      statutoryRef: 'लागू आधिकारिक वैधानिक स्रोत:',
      statutoryVal: 'पीएमएफबीवाई संशोधित परिचालन दिशानिर्देश धारा 13.4 (डीबीटी सुधार प्रोटोकॉल)',
      nextStepTitle: 'अनुशंसित अगला व्यावहारिक कदम',
      nextStepDesc: 'शाखा प्रबंधक द्वारा प्रमाणित बैंक सुधार प्रपत्र और आधार सीडिंग घोषणा 7 दिनों के भीतर जिला नोडल अधिकारी को जमा करें।',
      generateDraftCta: 'सुधार शिकायत पत्र ड्राफ्ट तैयार करें',

      radarTitle: 'प्री-क्लेम एरर रडार',
      radarDesc: 'दस्तावेजों की स्वचालित तुलना जो नाम, सर्वे नंबर, आईएफएससी कोड और बुआई घोषणाओं में विसंगतियों को आधिकारिक जांच से पहले ही उजागर करती है।',
      launchRadar: 'एरर रडार शुरू करें',

      escalationTitle: 'स्मार्ट शिकायत निवारक',
      escalationDesc: 'जिला स्तरीय समिति (DLMC), राज्य समिति, या बीमा कंपनी नोडल अधिकारी के लिए संरचित साक्ष्य-युक्त शिकायत पत्र तैयार करता है। आधिकारिक जमा होने तक स्पष्ट रूप से ड्राफ्ट चिह्नित रहता है।',
      prepareDraft: 'शिकायत पत्र ड्राफ्ट बनाएं',

      voiceTitle: 'वाणी-प्रथम क्लेम सहायक',
      voiceDesc: 'सरल डिजिटल साक्षरता वाले उपयोगकर्ताओं के लिए विशेष रूप से निर्मित। हिंदी या अंग्रेज़ी में बोलकर अपने क्लेम की स्थिति और अगले कदम को समझें।',
      openVoice: 'वाणी सहायक खोलें',

      instTitle: 'संस्थागत अड़चन विश्लेषण',
      instDesc: 'एफपीओ (FPO), सहकारी समितियों और कृषि विभागों के लिए गोपनीयता-सुरक्षित समग्र विश्लेषण, ताकि सामूहिक देरी का समाधान हो सके।',
      viewInst: 'संस्थागत डैशबोर्ड देखें',

      alertTitle: 'देरी और 12% ब्याज अलर्ट',
      alertDesc: 'पीएमएफबीवाई धारा 15.2 के तहत राज्य सब्सिडी जारी होने के बाद 21 दिनों से अधिक की देरी पर 12% वार्षिक दंडात्मक ब्याज नियमों की सतर्क निगरानी।',
      viewAlerts: 'समयरेखा और अलर्ट देखें',

      demoCasesTitle: 'काल्पनिक केसों के साथ परीक्षण करें',
      demoCasesDesc: 'वास्तविक परिदृश्यों का अन्वेषण करें: बैंक नाम विसंगति (बीड), सूखा सीसीई उपज प्रतीक्षा (राजकोट), या 72-घंटे सूचना अपील (संगरूर)।',
      openPortal: 'किसान पोर्टल खोलें'
    },
    // How It Works
    how: {
      tag: 'सरल 4-चरणीय प्रक्रिया',
      title: 'फसलक्लेम कैसे काम करता है',
      subtitle: '15 सेकंड से भी कम समय में अपने क्लेम की स्थिति समझें।',
      s1Title: 'क्लेम विवरण जोड़ें',
      s1Desc: 'अपनी फसल, मौसम, सर्वे/खसरा नंबर और बीमा कंपनी संदर्भ दर्ज करें या नमूना केस चुनें।',
      s2Title: 'दस्तावेज़ जांचें',
      s2Desc: 'प्री-क्लेम एरर रडार नाम, आईएफएससी और 7/12 रिकॉर्ड की तुलना कर विसंगतियों की पहचान करता है।',
      s3Title: 'डायग्नोसिस समझें',
      s3Desc: 'साक्ष्य-समर्थित निष्कर्ष, आधिकारिक पीएमएफबीवाई नियम धाराएं और स्पष्ट निश्चितता स्तर देखें।',
      s4Title: 'अगला सही कदम उठाएं',
      s4Desc: 'संरचित शिकायत पत्र ड्राफ्ट बनाएं, आवश्यक प्रमाण संलग्न करें और आधिकारिक सबमिशन ट्रैक करें।'
    },
    // Previews
    previews: {
      farmerTag: 'किसान पोर्टल',
      farmerTitle: 'मोबाइल फोन पर सुगमता के लिए निर्मित',
      farmerDesc: 'एक स्पष्ट और सम्मानजनक डिजिटल कार्यक्षेत्र जहां किसान अपनी रसीदें सहेज सकते हैं, दस्तावेज़ कमियों को समझ सकते हैं और संरचित आवेदन तैयार कर सकते हैं।',
      farmerP1: 'सरल भाषा में केस विवरण और अनुवर्ती समयरेखा',
      farmerP2: 'स्वचालित विसंगति रडार के साथ सुरक्षित निजी दस्तावेज़ संग्रह',
      farmerP3: 'बिना टाइप किए बोलकर सहायता पाने के लिए हिंदी वाणी सहायक',
      exploreFarmer: 'किसान पोर्टल देखें',
      instTag: 'एफपीओ और संस्थानों के लिए',
      instTitle: 'संस्थागत अड़चन विश्लेषण',
      instDesc: 'किसान उत्पादक संगठनों (FPO), पैक्स (PACS) और कृषि विभागों को बिना व्यक्तिगत किसान जानकारी उजागर किए सामूहिक अड़चनों को दूर करने में सक्षम बनाता है।',
      instP1: 'तहसील स्तर पर प्रमुख विसंगतियों का सांख्यिकीय विवरण',
      instP2: 'सरकारी नियमों के विरुद्ध वास्तविक निस्तारण समय का तुलनात्मक अध्ययन',
      instP3: 'पूर्ण गोपनीयता के साथ अनाम कार्यप्रवाह और क्लस्टर रिपोर्टिंग',
      viewInstAnalytics: 'संस्थागत विश्लेषण देखें'
    },
    // Trust
    trust: {
      tag: 'स्पष्ट सीमाएं और सुरक्षा',
      title: 'विश्वास और पारदर्शिता के प्रति हमारी प्रतिबद्धता',
      subtitle: 'हम पूर्ण पारदर्शिता, सत्यापनीय तथ्यों और शून्य झूठे वादों के साथ काम करते हैं।',
      t1Title: 'स्वतंत्र क्लेम सहायता',
      t1Desc: 'फसलक्लेम एक स्वतंत्र प्रौद्योगिकी मंच है। यह कोई बीमा कंपनी, दलाल या आधिकारिक सरकारी न्यायाधिकरण नहीं है।',
      t2Title: 'विसंगति अस्वीकृति का प्रमाण नहीं है',
      t2Desc: 'दस्तावेज़ में अंतर पहचानना केवल एक प्रशासनिक रुकावट दर्शाता है जिसे सत्यापित करना आवश्यक है। यह दावा अस्वीकृति नहीं है।',
      t3Title: 'आधिकारिक नियम ही सर्वोपरि हैं',
      t3Desc: 'पीएमएफबीवाई के आधिकारिक दिशानिर्देश और जिला/राज्य स्तरीय समन्वय समितियां ही अंतिम निर्णयकर्ता हैं।',
      t4Title: 'शिकायत पत्र केवल ड्राफ्ट के रूप में होते हैं',
      t4Desc: 'फसलक्लेम द्वारा तैयार किए गए आवेदन पत्र केवल ड्राफ्ट होते हैं जिन्हें आपको समीक्षा कर स्वयं आधिकारिक कार्यालय में जमा करना होता है।',
      t5Title: 'निजी दस्तावेज़ सुरक्षा',
      t5Desc: 'सभी दस्तावेज़ निजी सुरक्षा नियमों (Supabase RLS) के साथ सुरक्षित रखे जाते हैं और सार्वजनिक नहीं किए जाते।',
      t6Title: 'साक्ष्य अपूर्ण होने पर स्पष्ट अनिश्चितता',
      t6Desc: 'जब उपलब्ध दस्तावेज़ किसी निश्चित निष्कर्ष तक पहुंचने के लिए अपर्याप्त होते हैं, तो हमारा सिस्टम स्पष्ट रूप से अनिश्चितता प्रकट करता है।'
    },
    // Final CTA
    finalCta: {
      tag: 'फसलक्लेम आश्वासन',
      title: 'अनिश्चितता को स्पष्ट अगले कदम में बदलें।',
      subtitle: 'चाहे आप खरीफ क्लेम में अटके किसान हों, या अपने सदस्य किसानों का समर्थन करने वाला एफपीओ, फसलक्लेम साक्ष्य-समर्थित मार्गदर्शन प्रदान करता है।',
      btn1: 'अपना क्लेम जांचें',
      btn2: 'फसलक्लेम से जुड़ें',
      demoNote: 'प्रदर्शन मोड सक्रिय • काल्पनिक नमूना रिकॉर्ड स्पष्ट रूप से चिह्नित'
    },
    // Footer
    footer: {
      noticeTitle: 'स्वतंत्र क्लेम-आश्वासन और परामर्श सूचना',
      noticeDesc: 'फसलक्लेम एक स्वतंत्र कृषि फसल बीमा क्लेम-आश्वासन मंच है। यह कोई सरकारी पोर्टल, बीमा कंपनी, क्लेम निर्णायक या आधिकारिक पीएमएफबीवाई सेवा नहीं है। फसलक्लेम क्लेम स्वीकृत या अस्वीकृत नहीं करता है और मौद्रिक मुआवजे की गारंटी नहीं देता है। आधिकारिक योजना दिशानिर्देश और सांविधिक जिला/राज्य शिकायत निवारण समितियां ही आधिकारिक हैं।',
      tagline: 'जानें कि आपका क्लेम कहां अटका हो सकता है। साक्ष्य समझें। सही अगला कदम उठाएं।',
      featuresHeading: 'मंच की सुविधाएं',
      officialHeading: 'आधिकारिक शिकायत निवारण माध्यम',
      trustHeading: 'विश्वास और पारदर्शिता',
      rights: 'सर्वाधिकार सुरक्षित।',
      builtFor: 'भारतीय किसानों और कृषि संस्थाओं के लिए समर्पित'
    }
  }
};

