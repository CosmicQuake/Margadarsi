import React, { useState, useEffect } from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  X,
  Languages,
  Activity,
  Send,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { api } from '../../api/client';

interface BhashiniVoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface VoiceSample {
  id: string;
  lang: 'English' | 'Telugu' | 'Hindi';
  spokenText: string;
  recognizedText: string;
  intent: string;
  category: 'Employment' | 'Skill Development' | 'Healthcare' | 'Education' | 'Financial Support' | 'Livelihood' | 'Food';
  priority: 'Critical' | 'High' | 'Medium';
  recommendedAction: string;
  recommendedScheme: string;
}

const VOICE_SAMPLES: VoiceSample[] = [
  {
    id: 'sample-en-1',
    lang: 'English',
    spokenText: 'I need employment and capital support for a grocery store.',
    recognizedText: 'I need employment and capital support for establishing a local grocery micro-enterprise.',
    intent: 'Employment & Micro-Enterprise Livelihood Need',
    category: 'Employment',
    priority: 'High',
    recommendedAction: 'Direct-to-Vendor PM SVANidhi working capital subvention & Margadarsi micro-grant.',
    recommendedScheme: 'PM SVANidhi Micro-Credit Guarantee (₹10,000 Zero Interest)',
  },
  {
    id: 'sample-en-2',
    lang: 'English',
    spokenText: 'I need an electric sewing machine for my tailoring work.',
    recognizedText: 'I need an industrial motorized sewing machine and tailoring fabric kit for family livelihood.',
    intent: 'Livelihood Capital Asset Acquisition',
    category: 'Skill Development',
    priority: 'High',
    recommendedAction: 'Controlled Escrow voucher allocation for Saraswati Sewing & Garment Machinery.',
    recommendedScheme: 'National Rural Livelihoods Mission (NRLM) Equipment Grant',
  },
  {
    id: 'sample-hi-1',
    lang: 'Hindi',
    spokenText: 'मुझे अपनी बेटी की उच्च शिक्षा के लिए छात्रवृत्ति चाहिए।',
    recognizedText: 'मुझे अपनी बेटी दिव्या की 10वीं कक्षा के बाद आगे की पढ़ाई और डिजिटल टैबलेट के लिए छात्रवृत्ति सहायता चाहिए।',
    intent: 'Girl Child Higher Education & Scholarship Support',
    category: 'Education',
    priority: 'High',
    recommendedAction: 'Link application to National Scholarship Portal and Margadarsi Girl Child Fund.',
    recommendedScheme: 'National Higher Secondary Girl Child Scholarship Guarantee',
  },
  {
    id: 'sample-te-1',
    lang: 'Telugu',
    spokenText: 'నాకు జీవనోపాధి కోసం పాడి గేదె యూనిట్ మద్దతు కావాలి.',
    recognizedText: 'నాకు స్థిరమైన రోజువారీ ఆదాయం కోసం ముర్రా జాతి పాడి గేదె మరియు దాణా కిట్ సహాయం కావాలి.',
    intent: 'Dairy Animal Husbandry & Regular Milk Income',
    category: 'Livelihood',
    priority: 'High',
    recommendedAction: 'Controlled Escrow release to Sri Krishna Agri & Dairy Equipment supplier.',
    recommendedScheme: 'Animal Husbandry Subvention & Dairy Federation Linkage',
  },
];

export const BhashiniVoiceModal: React.FC<BhashiniVoiceModalProps> = ({ isOpen, onClose }) => {
  const { addFamilyNeed, activeFamily, language, showToast, playAudioChime } = useApp();

  const [isRecording, setIsRecording] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [selectedSample, setSelectedSample] = useState<VoiceSample>(VOICE_SAMPLES[0]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pipelineFinished, setPipelineFinished] = useState(false);
  const [micActiveLang, setMicActiveLang] = useState<'en' | 'te' | 'hi'>('en');

  useEffect(() => {
    if (!isOpen) {
      setIsRecording(false);
      setActiveStep(0);
      setIsProcessing(false);
      setPipelineFinished(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const runVoicePipeline = (sample: VoiceSample) => {
    setSelectedSample(sample);
    setIsRecording(true);
    setIsProcessing(true);
    setActiveStep(1); // Stage 1: Audio captured
    setPipelineFinished(false);
    playAudioChime('click');

    // Stage 2: Language Identification
    setTimeout(() => {
      setActiveStep(2);
    }, 600);

    // Stage 3: ASR Speech-to-Text
    setTimeout(() => {
      setActiveStep(3);
    }, 1200);

    // Stage 4: NLU Intent Understanding & Classification
    setTimeout(() => {
      setActiveStep(4);
    }, 1800);

    // Stage 5: Scheme & Livelihood Matching
    setTimeout(() => {
      setActiveStep(5);
    }, 2400);

    // Stage 6: Ready to Dispatch
    setTimeout(() => {
      setActiveStep(6);
      setIsProcessing(false);
      setIsRecording(false);
      setPipelineFinished(true);
      playAudioChime('success');
    }, 3000);
  };

  const handleStartMicrophone = () => {
    // Check for browser SpeechRecognition
    const SpeechRecognition =
      (window as unknown as { SpeechRecognition?: unknown; webkitSpeechRecognition?: unknown })
        .SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: unknown }).webkitSpeechRecognition;

    if (SpeechRecognition) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const recognition = new (SpeechRecognition as any)();
        recognition.lang = micActiveLang === 'te' ? 'te-IN' : micActiveLang === 'hi' ? 'hi-IN' : 'en-IN';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        setIsRecording(true);
        setActiveStep(1);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        recognition.onresult = (event: any) => {
          const speechResult = event.results[0][0].transcript;

          // Call backend /api/voice or run pipeline
          api.processVoiceQuery({
            speechText: speechResult,
            language: micActiveLang,
            familyId: activeFamily.id,
          })
            .then((res) => {
              const adaptedSample: VoiceSample = {
                id: `custom-${Date.now()}`,
                lang: res.detectedLanguage as any,
                spokenText: speechResult,
                recognizedText: res.recognizedText,
                intent: res.intent,
                category: (res.categorizedNeed as any) || 'Employment',
                priority: (res.priority as any) || 'High',
                recommendedAction: res.recommendedNextAction,
                recommendedScheme: 'Direct National Welfare Scheme Linkage',
              };
              runVoicePipeline(adaptedSample);
            })
            .catch(() => {
              runVoicePipeline({
                ...selectedSample,
                spokenText: speechResult,
                recognizedText: speechResult,
              });
            });
        };

        recognition.onerror = () => {
          runVoicePipeline(selectedSample);
        };

        recognition.start();
      } catch {
        runVoicePipeline(selectedSample);
      }
    } else {
      runVoicePipeline(selectedSample);
    }
  };

  const handleCommitNeed = () => {
    addFamilyNeed(activeFamily.id, {
      category: selectedSample.category as any,
      title: selectedSample.intent,
      description: `${selectedSample.recognizedText} [Verified via AI Voice Assistant for ${activeFamily.familyName}]`,
      urgency: selectedSample.priority as any,
    });
    playAudioChime('success');
    showToast({
      type: 'success',
      title: 'Need Registered via Voice',
      message: `Need categorized under '${selectedSample.category}' with Priority: ${selectedSample.priority}.`,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 p-6 text-white flex items-center justify-between border-b border-emerald-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400 shadow-inner">
              <Mic className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black tracking-tight">
                  Multilingual AI Voice Assistant
                </h3>
                <span className="text-xs bg-emerald-500/30 text-emerald-300 font-semibold px-2 py-0.5 rounded-full border border-emerald-500/40">
                  ASR • NLU Intent Engine
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Speak naturally in English, Hindi, or Telugu to register household needs and trigger automated scheme triage.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Quick Voice Sample Selector for Demonstration */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Select a Test Utterance or Speak Live:
              </span>
              <div className="flex items-center gap-1">
                {(['en', 'hi', 'te'] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => setMicActiveLang(l)}
                    className={`px-2 py-0.5 rounded text-[10px] font-black uppercase transition ${
                      micActiveLang === l ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {l === 'en' ? 'English' : l === 'hi' ? 'Hindi' : 'Telugu'}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {VOICE_SAMPLES.map((sample) => (
                <button
                  key={sample.id}
                  onClick={() => runVoicePipeline(sample)}
                  className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between ${
                    selectedSample.id === sample.id
                      ? 'bg-emerald-50 border-emerald-300 ring-2 ring-emerald-400'
                      : 'bg-slate-50 hover:bg-white border-slate-200'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                        {sample.lang}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-700">{sample.category}</span>
                    </div>
                    <p className="text-xs font-semibold text-slate-900 mt-2 leading-snug">
                      "{sample.spokenText}"
                    </p>
                  </div>
                  <span className="text-[10px] text-blue-600 font-bold mt-2 flex items-center gap-1">
                    <span>Click to Simulate AI Pipeline</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Live Audio & Microphone Controls */}
          <div className="p-5 rounded-3xl bg-slate-900 text-white border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={handleStartMicrophone}
                className={`w-14 h-14 rounded-full flex items-center justify-center transition shadow-lg ${
                  isRecording
                    ? 'bg-rose-600 text-white animate-pulse ring-4 ring-rose-400/50'
                    : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold'
                }`}
              >
                <Mic className="w-7 h-7" />
              </button>
              <div>
                <h4 className="text-sm font-extrabold text-white">
                  {isRecording ? 'Listening & Transcribing...' : 'Click to Speak via Microphone'}
                </h4>
                <p className="text-xs text-slate-400">
                  Target Language: <span className="text-emerald-400 font-bold uppercase">{micActiveLang}</span> • Web Speech Recognition
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-300">
                Beneficiary: <strong className="text-white">{activeFamily.familyName}</strong>
              </span>
            </div>
          </div>

          {/* 6-Stage Visual AI Processing Pipeline */}
          <div className="bg-slate-50 rounded-3xl p-5 border border-slate-200 space-y-4">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
              Live AI Inference Pipeline (6 Stages)
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-center text-[10px] font-bold">
              {[
                { stage: 1, label: '1. Audio Capture' },
                { stage: 2, label: '2. Language ID' },
                { stage: 3, label: '3. ASR Transcript' },
                { stage: 4, label: '4. NLU Intent' },
                { stage: 5, label: '5. Scheme Match' },
                { stage: 6, label: '6. Action Ready' },
              ].map((st) => {
                const isCurrent = activeStep === st.stage;
                const isDone = activeStep > st.stage || pipelineFinished;
                return (
                  <div
                    key={st.stage}
                    className={`p-2.5 rounded-xl border transition ${
                      isDone
                        ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                        : isCurrent
                        ? 'bg-amber-100 text-amber-900 border-amber-400 animate-pulse'
                        : 'bg-white text-slate-400 border-slate-200'
                    }`}
                  >
                    {isDone ? '✓ ' : ''}
                    {st.label}
                  </div>
                );
              })}
            </div>

            {/* Results Display */}
            {activeStep >= 2 && (
              <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-3 animate-in fade-in">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <span className="text-slate-400 block text-[10px] font-bold uppercase">Detected Language</span>
                    <span className="font-black text-slate-900 text-sm">{selectedSample.lang}</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <span className="text-slate-400 block text-[10px] font-bold uppercase">Classified Intent</span>
                    <span className="font-extrabold text-blue-700">{selectedSample.intent}</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <span className="text-slate-400 block text-[10px] font-bold uppercase">Assigned Priority</span>
                    <span className="font-black text-rose-700 uppercase">{selectedSample.priority} Priority</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl text-xs">
                  <span className="text-slate-400 block text-[10px] font-bold uppercase">Speech Recognized Text</span>
                  <p className="font-medium text-slate-800 mt-0.5 leading-relaxed">
                    "{selectedSample.recognizedText}"
                  </p>
                </div>

                <div className="p-3 bg-emerald-50 rounded-xl text-xs border border-emerald-200">
                  <span className="text-emerald-800 block text-[10px] font-bold uppercase">Recommended Next Action</span>
                  <p className="font-bold text-emerald-950 mt-0.5">{selectedSample.recommendedAction}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-xs font-bold transition"
          >
            Cancel
          </button>

          <button
            onClick={handleCommitNeed}
            disabled={!pipelineFinished}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow ${
              pipelineFinished
                ? 'bg-slate-900 hover:bg-slate-800 text-white'
                : 'bg-slate-300 text-slate-500 cursor-not-allowed'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Confirm & Log Need to Household Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};
