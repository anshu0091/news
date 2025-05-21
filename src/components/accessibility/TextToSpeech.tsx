import React, { useState, useEffect } from 'react';
import textToSpeechService from '../../services/textToSpeechService';
import { Play, Pause, StopCircle, Volume2, VolumeX, SkipBack, SkipForward } from 'lucide-react';

interface TextToSpeechProps {
  text: string;
}

const TextToSpeech: React.FC<TextToSpeechProps> = ({ text }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [rate, setRate] = useState(1.0);
  const [isMuted, setIsMuted] = useState(false);
  const [previousRate, setPreviousRate] = useState(1.0);

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      textToSpeechService.stop();
    };
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      if (isPaused) {
        textToSpeechService.resume();
        setIsPaused(false);
      } else {
        textToSpeechService.pause();
        setIsPaused(true);
      }
    } else {
      textToSpeechService.speak(text, rate);
      setIsPlaying(true);
      setIsPaused(false);
    }
  };

  const stopSpeech = () => {
    textToSpeechService.stop();
    setIsPlaying(false);
    setIsPaused(false);
  };

  const toggleMute = () => {
    if (isMuted) {
      // Restore previous rate
      setRate(previousRate);
      if (isPlaying) {
        textToSpeechService.stop();
        textToSpeechService.speak(text, previousRate);
      }
    } else {
      // Store current rate and set to 0
      setPreviousRate(rate);
      if (isPlaying) {
        textToSpeechService.stop();
        textToSpeechService.speak(text, 0);
      }
      setRate(0);
    }
    setIsMuted(!isMuted);
  };

  const handleRateChange = (newRate: number) => {
    setRate(newRate);
    if (isPlaying) {
      textToSpeechService.stop();
      textToSpeechService.speak(text, newRate);
    }
    setIsMuted(false);
  };

  const decreaseRate = () => {
    const newRate = Math.max(0.5, rate - 0.25);
    handleRateChange(newRate);
  };

  const increaseRate = () => {
    const newRate = Math.min(2, rate + 0.25);
    handleRateChange(newRate);
  };

  return (
    <div className="bg-gray-100 rounded-lg p-4 mb-6">
      <h3 className="text-lg font-semibold mb-3">Listen to this article</h3>
      
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <button
            onClick={togglePlay}
            className="btn btn-primary px-4 py-2 flex items-center space-x-1"
            aria-label={isPlaying && !isPaused ? "Pause speech" : "Play speech"}
          >
            {isPlaying && !isPaused ? (
              <>
                <Pause size={20} />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play size={20} />
                <span>{isPaused ? "Resume" : "Listen"}</span>
              </>
            )}
          </button>
          
          {isPlaying && (
            <button
              onClick={stopSpeech}
              className="btn btn-secondary px-4 py-2 flex items-center"
              aria-label="Stop speech"
            >
              <StopCircle size={20} />
              <span className="ml-1">Stop</span>
            </button>
          )}
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={decreaseRate}
            className="btn btn-secondary p-2"
            disabled={rate <= 0.5}
            aria-label="Slow down speech"
          >
            <SkipBack size={18} />
          </button>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Speed: {rate.toFixed(1)}x</span>
          </div>
          
          <button
            onClick={increaseRate}
            className="btn btn-secondary p-2"
            disabled={rate >= 2}
            aria-label="Speed up speech"
          >
            <SkipForward size={18} />
          </button>
          
          <button
            onClick={toggleMute}
            className={`btn btn-secondary p-2 ${isMuted ? 'bg-gray-400' : ''}`}
            aria-label={isMuted ? "Unmute" : "Mute"}
            aria-pressed={isMuted}
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
        </div>
      </div>
      
      <div className="mt-3 text-sm text-gray-600">
        <p>This feature uses your device's text-to-speech capabilities to read the article aloud.</p>
      </div>
    </div>
  );
};

export default TextToSpeech;