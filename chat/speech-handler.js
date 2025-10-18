// Speech Recognition Handler for ODIADEV Chat Widget
// Uses Web Speech API for browser-based speech-to-text

import { CONFIG } from './config.js';

export class SpeechHandler {
  constructor() {
    this.recognition = null;
    this.isRecording = false;
    this.onResult = null;
    this.onError = null;
    this.onStart = null;
    this.onEnd = null;
    
    this.initRecognition();
  }

  initRecognition() {
    // Check browser support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      console.warn('Speech Recognition not supported in this browser');
      return;
    }

    this.recognition = new SpeechRecognition();
    
    // Configure recognition
    this.recognition.lang = CONFIG.speech.language;
    this.recognition.continuous = CONFIG.speech.continuous;
    this.recognition.interimResults = CONFIG.speech.interimResults;
    this.recognition.maxAlternatives = CONFIG.speech.maxAlternatives;

    // Event handlers
    this.recognition.onstart = () => {
      this.isRecording = true;
      if (this.onStart) this.onStart();
      console.log('Speech recognition started');
    };

    this.recognition.onresult = (event) => {
      const results = event.results;
      const lastResult = results[results.length - 1];
      
      if (lastResult.isFinal) {
        const transcript = lastResult[0].transcript;
        console.log('Speech recognized:', transcript);
        if (this.onResult) this.onResult(transcript);
      }
    };

    this.recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      this.isRecording = false;
      
      let errorMessage = 'Speech recognition error';
      
      switch (event.error) {
        case 'no-speech':
          errorMessage = 'No speech detected. Please try again.';
          break;
        case 'audio-capture':
          errorMessage = 'No microphone found. Please check your device.';
          break;
        case 'not-allowed':
          errorMessage = 'Microphone access denied. Please enable microphone permissions.';
          break;
        case 'network':
          errorMessage = 'Network error. Please check your connection.';
          break;
        case 'aborted':
          errorMessage = 'Speech recognition aborted.';
          break;
        default:
          errorMessage = `Speech recognition error: ${event.error}`;
      }
      
      if (this.onError) this.onError(errorMessage);
    };

    this.recognition.onend = () => {
      this.isRecording = false;
      if (this.onEnd) this.onEnd();
      console.log('Speech recognition ended');
    };
  }

  isSupported() {
    return this.recognition !== null;
  }

  start() {
    if (!this.recognition) {
      if (this.onError) {
        this.onError('Speech recognition not supported in this browser. Please use Chrome, Edge, or Safari.');
      }
      return false;
    }

    if (this.isRecording) {
      console.warn('Already recording');
      return false;
    }

    try {
      this.recognition.start();
      return true;
    } catch (error) {
      console.error('Failed to start recognition:', error);
      if (this.onError) {
        this.onError('Failed to start speech recognition. Please try again.');
      }
      return false;
    }
  }

  stop() {
    if (!this.recognition || !this.isRecording) {
      return;
    }

    try {
      this.recognition.stop();
    } catch (error) {
      console.error('Failed to stop recognition:', error);
    }
  }

  toggle() {
    if (this.isRecording) {
      this.stop();
    } else {
      this.start();
    }
  }

  // Set callback handlers
  setOnResult(callback) {
    this.onResult = callback;
  }

  setOnError(callback) {
    this.onError = callback;
  }

  setOnStart(callback) {
    this.onStart = callback;
  }

  setOnEnd(callback) {
    this.onEnd = callback;
  }
}
