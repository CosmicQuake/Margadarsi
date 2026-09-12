from models import VoiceQueryRequest, VoiceQueryResponse
from services.ml_service import need_classifier_service

class MultilingualVoicePipeline:
    def process_voice_query(self, req: VoiceQueryRequest) -> VoiceQueryResponse:
        text = req.speechText.strip()
        
        # Simple heuristic language identification
        telugu_chars = sum(1 for c in text if '\u0c00' <= c <= '\u0c7f')
        hindi_chars = sum(1 for c in text if '\u0900' <= c <= '\u097f')
        
        if telugu_chars > 0 or (req.language == 'te'):
            lang = 'Telugu'
        elif hindi_chars > 0 or (req.language == 'hi'):
            lang = 'Hindi'
        else:
            lang = 'English'

        category, severity, priority, intervention = need_classifier_service.classify_text(text)

        intent_map = {
            'Livelihood': 'Livelihood Asset Support Request',
            'Employment': 'Employment & Vocational Training Request',
            'Healthcare': 'Medical Assistance & Health Card Query',
            'Housing': 'Pucca House & Roof Repair Request',
            'Food': 'Emergency Food Security & Ration Escalation',
            'Emergency': 'CRITICAL EMERGENCY SOS DISPATCH',
            'Skill Development': 'Skill Center Training Enrollment'
        }
        intent = intent_map.get(category, 'General Welfare Scheme Query')

        if lang == 'Telugu':
            tts_response = f"మీ విన్నపం స్వీకరించబడింది. వర్గం: {category}. మీ కోసం తగిన మార్గదర్శి మరియు పథకం సిఫారసు చేయబడుతోంది."
        elif lang == 'Hindi':
            tts_response = f"आपका अनुरोध प्राप्त हुआ। श्रेणी: {category}। उपयुक्त मार्गदर्शी और योजना सहायता की जा रही है।"
        else:
            tts_response = f"Your voice request has been triaged. Category: {category}. We are connecting you with a Margadarsi mentor and government scheme support."

        return VoiceQueryResponse(
            detectedLanguage=lang,
            intent=intent,
            priority=priority,
            recognizedText=text,
            recommendedNextAction=intervention,
            categorizedNeed=category,
            ttsAudioSimulation=tts_response
        )

voice_pipeline_service = MultilingualVoicePipeline()
