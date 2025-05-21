class TextToSpeechService {
  private speech: SpeechSynthesis;
  private voices: SpeechSynthesisVoice[] = [];
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private defaultVoice: SpeechSynthesisVoice | null = null;

  constructor() {
    this.speech = window.speechSynthesis;
    this.loadVoices();
    
    // Voice list might not be available immediately
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = this.loadVoices.bind(this);
    }
  }

  private loadVoices(): void {
    this.voices = this.speech.getVoices();
    // Set default voice (English)
    this.defaultVoice = this.voices.find(voice => 
      voice.lang.includes('en-') && voice.localService
    ) || this.voices[0];
  }

  speak(text: string, rate: number = 1, pitch: number = 1): void {
    // Stop any current speech
    this.stop();
    
    // Create new utterance
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set properties
    utterance.voice = this.defaultVoice;
    utterance.rate = rate;  // 0.1 to 10
    utterance.pitch = pitch;  // 0 to 2
    utterance.volume = 1.0;  // 0 to 1
    
    // Store current utterance
    this.currentUtterance = utterance;
    
    // Start speaking
    this.speech.speak(utterance);
  }

  pause(): void {
    this.speech.pause();
  }

  resume(): void {
    this.speech.resume();
  }

  stop(): void {
    this.speech.cancel();
    this.currentUtterance = null;
  }

  isSpeaking(): boolean {
    return this.speech.speaking;
  }

  isPaused(): boolean {
    return this.speech.paused;
  }

  getAvailableVoices(): SpeechSynthesisVoice[] {
    return this.voices;
  }

  setVoice(voice: SpeechSynthesisVoice): void {
    this.defaultVoice = voice;
  }
}

// Singleton instance
const textToSpeechService = new TextToSpeechService();
export default textToSpeechService;