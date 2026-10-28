'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '@/context/AppContext';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  X, 
  Send, 
  Sparkles, 
  HelpCircle, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  FileText
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'assistant' | 'user';
  text: string;
  hindiText?: string;
  actionHint?: string;
  actionUrl?: string;
}

export function VoiceAssistantModal() {
  const { voiceModalOpen, setVoiceModalOpen, activeCase, language, setLanguage } = useApp();
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(true);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Initialize initial greeting based on active case
  useEffect(() => {
    if (!activeCase) return;

    const initialGreeting: ChatMessage = {
      id: 'msg-welcome',
      sender: 'assistant',
      text: language === 'hi' 
        ? `नमस्ते ${activeCase.farmerName}! मैं आपकी फसल बीमा सहायता सहायक हूँ। आपके क्लेम (${activeCase.caseNumber}) के दस्तावेज़ और स्थिति समझने में मैं आपकी मदद कर सकती हूँ। आप क्या जानना चाहते हैं?`
        : `Namaste ${activeCase.farmerName}! I am your FasalClaim voice assistant. I can explain your claim (${activeCase.caseNumber}) in simple words and help you take the right next step. What would you like to check?`,
      actionHint: language === 'hi' ? 'नीचे दिए गए सुझावों पर टैप करें' : 'Tap any quick question below or ask in your own words'
    };
    setMessages([initialGreeting]);
  }, [activeCase, language]);

  // Setup Web Speech API for listening
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        setSpeechSupported(true);
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = language === 'hi' ? 'hi-IN' : 'en-IN';

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          if (transcript) {
            handleSendMessage(transcript);
          }
          setIsListening(false);
        };

        recognition.onerror = () => {
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    }
  }, [language]);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Text to speech playback
  const speakText = (text: string) => {
    if (!ttsEnabled || typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  };

  const toggleListening = () => {
    if (!speechSupported || !recognitionRef.current) {
      alert(language === 'hi' ? 'आपके ब्राउज़र में आवाज़ इनपुट समर्थित नहीं है। कृपया लिखकर पूछें।' : 'Microphone input is not supported in this browser. Please type your question.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    // Generate responsive context-aware response
    setTimeout(() => {
      const lower = query.toLowerCase();
      let reply = '';
      let actionHint = '';
      let actionUrl = '';

      if (lower.includes('bank') || lower.includes('ifsc') || lower.includes('बैंक') || lower.includes('खाता') || lower.includes('mismatch')) {
        reply = language === 'hi'
          ? `आपके बैंक पासबुक और पोर्टल नाम में थोड़ा अंतर है। पासबुक पर 'रमेश' लिखा है और आवेदन में 'रामेश्वर'। चिंता न करें, यह क्लेम रिजेक्शन नहीं है। अपने बैंक मैनेजर से एक छोटा नाम सत्यापन पत्र लें और इसे नोडल कार्यालय में जमा करें।`
          : `We found a difference in your bank name. Your passbook shows "${activeCase.documents.find(d => d.docType === 'bank_passbook')?.extractedData?.farmerName || 'Ramesh'}" while your claim says "${activeCase.farmerName}". This does not mean rejection. You simply need a verification slip from your bank branch.`;
        actionHint = language === 'hi' ? 'बैंक सुधार आवेदन ड्राफ्ट देखें' : 'View bank rectification grievance draft';
        actionUrl = '/escalation';
      } else if (lower.includes('survey') || lower.includes('khasra') || lower.includes('7/12') || lower.includes('खसरा') || lower.includes('सर्वे')) {
        reply = language === 'hi'
          ? `आपके 7/12 खसरे में सर्वे नंबर ${activeCase.documents.find(d => d.docType === 'land_record_7_12')?.extractedData?.surveyNumber || '142/2'} है जबकि पॉलिसी में ${activeCase.surveyNumber} है। पटवारी से हिस्सा सत्यापन पत्र लेना सबसे सही कदम होगा।`
          : `Your land record shows Survey #${activeCase.documents.find(d => d.docType === 'land_record_7_12')?.extractedData?.surveyNumber || '142/2'}, while your policy lists #${activeCase.surveyNumber}. You can get a parcel confirmation certificate from your village Patwari.`;
        actionHint = language === 'hi' ? 'दस्तावेज़ रडार पर जांचें' : 'Check in Pre-Claim Error Radar';
        actionUrl = '/radar';
      } else if (lower.includes('status') || lower.includes('स्थिति') || lower.includes('kya hua') || lower.includes('kab milega')) {
        reply = language === 'hi'
          ? `आपका क्लेम केस #${activeCase.caseNumber} वर्तमान में 'समीक्षाधीन' है। संभावित रुकावटों का विवरण हमारे डायग्नोसिस इंजन में तैयार है।`
          : `Your claim #${activeCase.caseNumber} is currently under evidence review. We have identified 2 potential administrative blockers that you can resolve.`;
        actionHint = language === 'hi' ? 'साक्ष्य आधारित डायग्नोसिस रिपोर्ट देखें' : 'Open Evidence-Backed Diagnosis';
        actionUrl = '/diagnosis';
      } else if (lower.includes('grievance') || lower.includes('shikayat') || lower.includes('शिकायत') || lower.includes('letter') || lower.includes('पत्र')) {
        reply = language === 'hi'
          ? `हमने आपकी जिला शिकायत निवारण समिति (DLMC) के लिए एक औपचारिक आवेदन ड्राफ्ट तैयार किया है। आप इसे पढ़कर डाउनलोड कर सकते हैं।`
          : `We have prepared a formal grievance draft addressed to the District Level Grievance Redressal Committee. You can review, copy, and submit it officially.`;
        actionHint = language === 'hi' ? 'शिकायत पत्र ड्राफ्ट खोलें' : 'Open Grievance Draft Workspace';
        actionUrl = '/escalation';
      } else {
        reply = language === 'hi'
          ? `मैंने आपका सवाल दर्ज कर लिया है। आपके फसल बीमा केस #${activeCase.caseNumber} के लिए सबसे महत्वपूर्ण अगला कदम बैंक पासबुक और पटवारी सत्यापन का समाधान करना है।`
          : `Understood. For your crop insurance claim #${activeCase.caseNumber}, the primary recommended step is verifying your bank passbook name alias with your local branch manager.`;
        actionHint = language === 'hi' ? 'डायग्नोसिस रिपोर्ट देखें' : 'View full diagnosis report';
        actionUrl = '/diagnosis';
      }

      const assistantMsg: ChatMessage = {
        id: `ast-${Date.now()}`,
        sender: 'assistant',
        text: reply,
        actionHint,
        actionUrl
      };

      setMessages(prev => [...prev, assistantMsg]);
      speakText(reply);
    }, 450);
  };

  if (!voiceModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-ivory-50 border border-sage-300 w-full max-w-xl rounded-2xl shadow-elevated flex flex-col max-h-[85vh] overflow-hidden">
        {/* Header */}
        <div className="bg-forest-800 text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-forest-700 border border-forest-600 flex items-center justify-center text-sage-200">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-display font-semibold text-base text-white">
                  {language === 'hi' ? 'फसलक्लेम वाणी सहायक' : 'FasalClaim Voice Assistant'}
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-forest-700/80 text-sage-200 border border-forest-600 font-medium">
                  {language === 'hi' ? 'सरल आवाज़ मोड' : 'Voice-First'}
                </span>
              </div>
              <p className="text-xs text-sage-300">
                {activeCase.farmerName} • {activeCase.crop} ({activeCase.season})
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Language toggle */}
            <div className="flex bg-forest-900 rounded-lg p-0.5 border border-forest-700 text-xs">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 rounded font-medium transition ${language === 'en' ? 'bg-forest-700 text-white' : 'text-sage-400 hover:text-white'}`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('hi')}
                className={`px-2 py-1 rounded font-medium transition ${language === 'hi' ? 'bg-forest-700 text-white' : 'text-sage-400 hover:text-white'}`}
              >
                हिंदी
              </button>
            </div>

            {/* TTS Mute Toggle */}
            <button
              onClick={() => setTtsEnabled(!ttsEnabled)}
              title={ttsEnabled ? "Mute voice read-out" : "Enable voice read-out"}
              className="p-2 rounded-lg bg-forest-700 text-sage-200 hover:text-white hover:bg-forest-600 transition"
            >
              {ttsEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-terracotta-300" />}
            </button>

            <button
              onClick={() => {
                if (typeof window !== 'undefined' && window.speechSynthesis) {
                  window.speechSynthesis.cancel();
                }
                setVoiceModalOpen(false);
              }}
              className="p-2 rounded-lg text-sage-300 hover:text-white hover:bg-forest-700 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notice */}
        <div className="bg-sage-100 border-b border-sage-200 px-4 py-2 text-xs text-charcoal flex items-center justify-between">
          <span className="flex items-center gap-1.5 font-medium text-forest-800">
            <ShieldCheck className="w-4 h-4 text-forest-700" />
            {language === 'hi' 
              ? 'आसान भाषा में सहायता • आधिकारिक पीएमएफबीवाई का विकल्प नहीं है'
              : 'Plain-language claim guidance • Works alongside official grievance channels'}
          </span>
          <span className="text-[11px] text-charcoal-muted">Case: {activeCase.caseNumber}</span>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-ivory-50/70">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-forest-800 text-white rounded-br-xs'
                    : 'bg-white border border-sage-200 text-charcoal shadow-subtle rounded-bl-xs'
                }`}
              >
                <p>{msg.text}</p>
                {msg.actionHint && (
                  <div className="mt-2.5 pt-2 border-t border-sage-100 flex items-center justify-between text-xs text-forest-700 font-medium">
                    <span>{msg.actionHint}</span>
                    {msg.actionUrl && (
                      <a
                        href={msg.actionUrl}
                        onClick={() => setVoiceModalOpen(false)}
                        className="inline-flex items-center text-forest-800 underline hover:text-forest-900 ml-2"
                      >
                        {language === 'hi' ? 'जाएं' : 'Open'} <ArrowRight className="w-3 h-3 ml-0.5" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Guided Quick Prompts */}
        <div className="px-4 py-2.5 bg-white border-t border-sage-200 flex flex-wrap gap-1.5">
          <span className="text-[11px] font-semibold text-charcoal-muted self-center mr-1">
            {language === 'hi' ? 'पूछें:' : 'Quick ask:'}
          </span>
          <button
            onClick={() => handleSendMessage(language === 'hi' ? 'बैंक नाम में क्या गड़बड़ है?' : 'What is the bank passbook mismatch?')}
            className="text-xs px-2.5 py-1 rounded-full bg-sage-100 hover:bg-sage-200 text-forest-800 border border-sage-300 font-medium transition"
          >
            {language === 'hi' ? '🏦 बैंक नाम गड़बड़ी' : '🏦 Bank Name Mismatch'}
          </button>
          <button
            onClick={() => handleSendMessage(language === 'hi' ? 'खसरा / सर्वे नंबर में क्या अंतर है?' : 'What is the land survey variance?')}
            className="text-xs px-2.5 py-1 rounded-full bg-sage-100 hover:bg-sage-200 text-forest-800 border border-sage-300 font-medium transition"
          >
            {language === 'hi' ? '🌾 सर्वे 7/12 अंतर' : '🌾 Survey # Variance'}
          </button>
          <button
            onClick={() => handleSendMessage(language === 'hi' ? 'अगला सही कदम क्या है?' : 'What is my recommended next action?')}
            className="text-xs px-2.5 py-1 rounded-full bg-sage-100 hover:bg-sage-200 text-forest-800 border border-sage-300 font-medium transition"
          >
            {language === 'hi' ? '⚡ अगला सही कदम' : '⚡ Next Step'}
          </button>
          <button
            onClick={() => handleSendMessage(language === 'hi' ? 'शिकायत पत्र का ड्राफ्ट कैसे मिलेगा?' : 'How to prepare a grievance letter?')}
            className="text-xs px-2.5 py-1 rounded-full bg-sage-100 hover:bg-sage-200 text-forest-800 border border-sage-300 font-medium transition"
          >
            {language === 'hi' ? '📝 शिकायत पत्र ड्राफ्ट' : '📝 Grievance Draft'}
          </button>
        </div>

        {/* Bottom Input Area with Microphone */}
        <div className="p-3 bg-ivory-100 border-t border-sage-200 flex items-center space-x-2">
          {/* Mic Button */}
          <button
            onClick={toggleListening}
            className={`p-3 rounded-full transition relative flex items-center justify-center ${
              isListening 
                ? 'bg-terracotta-500 text-white animate-pulse shadow-md' 
                : 'bg-forest-800 hover:bg-forest-900 text-white'
            }`}
            title={isListening ? "Listening... click to stop" : "Click to speak in your language"}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          {/* Text Input */}
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={
                isListening 
                  ? (language === 'hi' ? 'सुन रहा हूँ... बोलिए' : 'Listening... speak now')
                  : (language === 'hi' ? 'यहाँ सवाल लिखें या माइक दबाएं...' : 'Type your question or speak...')
              }
              className="w-full bg-white border border-sage-300 rounded-xl px-4 py-2.5 text-sm text-charcoal placeholder-charcoal-muted focus:outline-none focus:ring-2 focus:ring-forest-600 focus:border-transparent"
            />
          </div>

          {/* Send Button */}
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputText.trim()}
            className="p-2.5 rounded-xl bg-forest-800 hover:bg-forest-900 disabled:opacity-40 disabled:hover:bg-forest-800 text-white transition flex items-center justify-center"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

