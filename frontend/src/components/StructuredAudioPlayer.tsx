import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, Pause, Download, Volume2, VolumeX, Headphones, Mic, 
  Volume1, Sparkles, Bell, Radio, AlertCircle, CheckCircle2 
} from 'lucide-react';
import { AudioResponse } from '../types/api';
import { api } from '../services/api';

interface StructuredAudioPlayerProps {
  audio: AudioResponse | null;
  summaryText: string;
  onGenerateAudio?: () => void;
  isGenerating?: boolean;
}

export const StructuredAudioPlayer: React.FC<StructuredAudioPlayerProps> = ({
  audio,
  summaryText,
  onGenerateAudio,
  isGenerating = false
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1.0);
  const [isMuted, setIsMuted] = useState(false);
  const [audioMode, setAudioMode] = useState<'mp3' | 'webAudio' | 'speechSynthesis'>('mp3');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [soundCheckStatus, setSoundCheckStatus] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const bufferSourceRef = useRef<AudioBufferSourceNode | null>(null);

  // Audio URL from API
  const audioUrl = audio?.audio_id ? api.getAudioUrl(audio.audio_id) : null;

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    stopAllAudio();
  }, [audio?.audio_id]);

  const stopAllAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    if (bufferSourceRef.current) {
      try { bufferSourceRef.current.stop(); } catch {}
      bufferSourceRef.current = null;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
  };

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // ---------------------------------------------------------
  // 1. Direct Speaker Sound Check (Hardware / OS Level Tone)
  // ---------------------------------------------------------
  const playSpeakerTestChime = async () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) {
        setSoundCheckStatus("Web Audio API not supported in this browser.");
        return;
      }
      const ctx = new AudioContextClass();
      if (ctx.state === 'suspended') {
        await ctx.resume();
      }

      // Play 2-tone harmonic chime (587Hz -> 880Hz)
      const now = ctx.currentTime;
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(587.33, now); // D5
      gain1.gain.setValueAtTime(0.4, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.4);

      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(880.00, now + 0.2); // A5
      gain2.gain.setValueAtTime(0.4, now + 0.2);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.7);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.2);
      osc2.stop(now + 0.7);

      setSoundCheckStatus("Played test chime! If you heard 2 chimes, your sound output is active.");
      setTimeout(() => setSoundCheckStatus(null), 5000);
    } catch (err: any) {
      console.error("Speaker test error:", err);
      setSoundCheckStatus("Could not trigger audio context: " + (err.message || String(err)));
    }
  };

  // ---------------------------------------------------------
  // 2. Web Audio API Direct Buffer Playback (Ultra-Reliable MP3)
  // ---------------------------------------------------------
  const playViaWebAudio = async (url: string) => {
    try {
      setStatusMessage("Decoding and playing MP3 via Web Audio API...");
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = audioContextRef.current || new AudioContextClass();
      audioContextRef.current = ctx;

      if (ctx.state === 'suspended') {
        await ctx.resume();
      }

      const res = await fetch(url);
      const arrayBuf = await res.arrayBuffer();
      const audioBuf = await ctx.decodeAudioData(arrayBuf);

      const source = ctx.createBufferSource();
      source.buffer = audioBuf;
      const gain = ctx.createGain();
      gain.gain.value = isMuted ? 0 : volume;
      source.connect(gain);
      gain.connect(ctx.destination);

      source.onended = () => {
        setIsPlaying(false);
        setStatusMessage(null);
      };

      source.start(0);
      bufferSourceRef.current = source;
      setIsPlaying(true);
      setAudioMode('webAudio');
      setDuration(audioBuf.duration);
      setStatusMessage("Playing Edge-TTS briefing via Web Audio Engine");
    } catch (err) {
      console.warn("Web Audio buffer playback failed, falling back to speech synthesis:", err);
      playSpeechSynthesis();
    }
  };

  // ---------------------------------------------------------
  // 3. HTML5 Audio Element Playback
  // ---------------------------------------------------------
  const playMp3Audio = () => {
    if (!audioUrl) {
      playSpeechSynthesis();
      return;
    }

    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          setAudioMode('mp3');
          setStatusMessage("Playing Edge-TTS neural audio briefing");
        })
        .catch((err) => {
          console.warn("HTML5 audio playback blocked/error. Trying Web Audio API:", err);
          playViaWebAudio(audioUrl);
        });
    } else {
      playViaWebAudio(audioUrl);
    }
  };

  // ---------------------------------------------------------
  // 4. Browser SpeechSynthesis (Guaranteed Live Speech)
  // ---------------------------------------------------------
  const playSpeechSynthesis = () => {
    if (!('speechSynthesis' in window)) {
      setStatusMessage("Audio playback not supported in this browser.");
      return;
    }

    window.speechSynthesis.cancel();
    window.speechSynthesis.resume();

    const textToSpeak = summaryText || "Summary briefing is ready. The document has been fully analyzed and verified.";
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.volume = isMuted ? 0 : volume;
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    // Detect language from audio property or text
    let targetLang = 'en-US';
    const langLocaleMap: Record<string, string> = {
      en: 'en-US',
      hi: 'hi-IN',
      es: 'es-ES',
      fr: 'fr-FR',
      de: 'de-DE',
      kn: 'kn-IN',
      te: 'te-IN',
      ta: 'ta-IN'
    };
    if (audio?.language && langLocaleMap[audio.language]) {
      targetLang = langLocaleMap[audio.language];
    } else if (/[\u0C80-\u0CFF]/.test(textToSpeak)) targetLang = 'kn-IN';
    else if (/[\u0900-\u097F]/.test(textToSpeak)) targetLang = 'hi-IN';
    else if (/[\u0C00-\u0C7F]/.test(textToSpeak)) targetLang = 'te-IN';
    else if (/[\u0B80-\u0BFF]/.test(textToSpeak)) targetLang = 'ta-IN';

    utterance.lang = targetLang;

    // Pick best voice for target language
    const voices = window.speechSynthesis.getVoices();
    if (voices && voices.length > 0) {
      const langPrefix = targetLang.split('-')[0].toLowerCase();
      const matchedVoice = voices.find(v => v.lang.toLowerCase().startsWith(langPrefix))
        || voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Neural') || v.name.includes('Online')))
        || voices.find(v => v.lang.startsWith('en'))
        || voices[0];
      if (matchedVoice) utterance.voice = matchedVoice;
    }

    utterance.onstart = () => {
      setIsPlaying(true);
      setAudioMode('speechSynthesis');
      setStatusMessage("Reading summary aloud via system speech engine");
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      setStatusMessage(null);
    };

    utterance.onerror = (e) => {
      console.error("SpeechSynthesis error:", e);
      setIsPlaying(false);
      setStatusMessage("Speech engine could not produce audio.");
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      stopAllAudio();
      setStatusMessage(null);
    } else {
      if (audioUrl) {
        playMp3Audio();
      } else {
        playSpeechSynthesis();
      }
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current && audioMode === 'mp3') {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current && audioMode === 'mp3') {
      audioRef.current.currentTime = time;
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Hidden HTML5 Audio Element */}
      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          preload="auto"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleTimeUpdate}
          onEnded={() => { setIsPlaying(false); setCurrentTime(0); }}
          onError={() => {
            console.warn("HTML5 audio element error. Ready for WebAudio / Speech fallback.");
          }}
          style={{ display: 'none' }}
        />
      )}

      {/* Main Audio Player Card */}
      <div style={{
        background: '#F8FAFC',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.5rem',
        boxShadow: 'var(--shadow-sm)'
      }}>
        {/* Track & Controls Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          background: 'white',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          padding: '0.85rem 1.25rem',
          marginBottom: '1rem'
        }}>
          {/* Blue Play/Pause Circular Button */}
          <button
            onClick={handleTogglePlay}
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              background: '#2563EB',
              color: 'white',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0,
              boxShadow: '0 3px 8px rgba(37, 99, 235, 0.4)',
              transition: 'transform 0.15s ease'
            }}
            title={isPlaying ? "Pause briefing" : "Play audio briefing"}
          >
            {isPlaying ? <Pause size={22} /> : <Play size={22} style={{ marginLeft: '2px' }} />}
          </button>

          {/* Progress Bar Track */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input
                type="range"
                min="0"
                max={duration || 100}
                step="0.1"
                value={currentTime}
                onChange={handleSeek}
                style={{
                  width: '100%',
                  accentColor: '#2563EB',
                  cursor: 'pointer',
                  height: '6px'
                }}
              />
            </div>
          </div>

          {/* Timestamp */}
          <span style={{
            fontSize: '0.82rem',
            fontWeight: 600,
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-mono)',
            whiteSpace: 'nowrap'
          }}>
            {formatTime(currentTime)} / {formatTime(duration || 180)}
          </span>

          {/* Volume Control */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <button
              onClick={toggleMute}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: isMuted ? '#EF4444' : '#2563EB',
                display: 'flex',
                alignItems: 'center'
              }}
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={(e) => {
                setVolume(parseFloat(e.target.value));
                setIsMuted(false);
              }}
              style={{
                width: '65px',
                accentColor: '#2563EB',
                cursor: 'pointer',
                height: '4px'
              }}
              title="Volume"
            />
          </div>
        </div>

        {/* Live Soundwave Animation when Playing */}
        {isPlaying && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
            marginBottom: '1rem',
            padding: '0.5rem',
            background: '#EFF6FF',
            borderRadius: '6px'
          }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#2563EB', marginRight: '8px' }}>
              AUDIO TRANSMITTING:
            </span>
            {[18, 28, 14, 32, 22, 12, 30, 24, 16, 26, 12].map((h, i) => (
              <span
                key={i}
                style={{
                  display: 'inline-block',
                  width: '3px',
                  height: `${h}px`,
                  background: '#2563EB',
                  borderRadius: '2px',
                  animation: 'pulse 1s infinite alternate',
                  animationDelay: `${i * 0.1}s`
                }}
              />
            ))}
          </div>
        )}

        {/* Status Message */}
        {statusMessage && (
          <div style={{
            fontSize: '0.8rem',
            fontWeight: 600,
            color: '#2563EB',
            background: '#EFF6FF',
            padding: '0.4rem 0.75rem',
            borderRadius: '6px',
            marginBottom: '1rem',
            textAlign: 'center'
          }}>
            {statusMessage}
          </div>
        )}

        {/* Sound Check Banner */}
        {soundCheckStatus && (
          <div style={{
            fontSize: '0.8rem',
            fontWeight: 600,
            color: '#059669',
            background: '#ECFDF5',
            padding: '0.5rem 0.75rem',
            borderRadius: '6px',
            marginBottom: '1rem',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem'
          }}>
            <CheckCircle2 size={16} />
            <span>{soundCheckStatus}</span>
          </div>
        )}

        {/* Action Buttons Row */}
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {/* 1. Download MP3 Button */}
          {audioUrl ? (
            <a
              href={audioUrl}
              download="executive_briefing.mp3"
              className="btn-blue"
              style={{ padding: '0.55rem 1.25rem', fontSize: '0.85rem' }}
            >
              <Download size={16} />
              <span>Download MP3 Audio</span>
            </a>
          ) : (
            <button
              onClick={onGenerateAudio}
              disabled={isGenerating}
              className="btn-blue"
              style={{ padding: '0.55rem 1.25rem', fontSize: '0.85rem' }}
            >
              <Headphones size={16} />
              <span>{isGenerating ? 'Synthesizing Audio...' : 'Generate Neural Voice Briefing'}</span>
            </button>
          )}

          {/* 2. Speaker Test Chime Button */}
          <button
            onClick={playSpeakerTestChime}
            className="btn-outline"
            style={{ padding: '0.55rem 1.1rem', fontSize: '0.85rem', borderColor: '#10B981', color: '#059669' }}
            title="Plays an instant chime to test your browser and physical speakers"
          >
            <Bell size={15} color="#059669" />
            <span>Test Speakers / Sound Output 🔔</span>
          </button>

          {/* 3. Browser Speech Synthesis Fallback */}
          <button
            onClick={playSpeechSynthesis}
            className="btn-outline"
            style={{ padding: '0.55rem 1.1rem', fontSize: '0.85rem' }}
            title="Reads the summary text aloud using your browser's direct speech engine"
          >
            <Mic size={15} color="#2563EB" />
            <span>Read Aloud with Browser Voice</span>
          </button>
        </div>
      </div>

      {/* Direct Browser Audio Player Bar (Always accessible) */}
      {audioUrl && (
        <div style={{
          background: 'white',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)' }}>
              Direct Browser Audio Stream (Standard HTML5 Controls):
            </span>
            <span style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: 600 }}>
              ● MP3 Stream Ready
            </span>
          </div>
          <audio
            controls
            src={audioUrl}
            style={{ width: '100%', height: '40px' }}
          />
        </div>
      )}

      {/* Audio Troubleshooting & Diagnostics Guide */}
      <div style={{
        background: '#FFFBEB',
        border: '1px solid #FDE68A',
        borderRadius: 'var(--radius-md)',
        padding: '1rem',
        fontSize: '0.82rem',
        color: '#92400E'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, marginBottom: '0.4rem' }}>
          <AlertCircle size={16} color="#D97706" />
          <span>If You Still Do Not Hear Any Sound:</span>
        </div>
        <ol style={{ margin: 0, paddingLeft: '1.25rem', lineHeight: 1.6 }}>
          <li>
            <strong>Test Sound Output:</strong> Click the green <strong>"Test Speakers / Sound Output 🔔"</strong> button above. If you hear a chime, your browser audio is working.
          </li>
          <li>
            <strong>Check Browser Tab Mute:</strong> Right-click the browser tab header at the top of your screen and verify it does NOT say <em>"Unmute site"</em>.
          </li>
          <li>
            <strong>Remote Desktop / Cloud Audio:</strong> If you are connected via Windows Remote Desktop (RDP) or a cloud VM, ensure <em>Remote Audio Playback</em> is enabled on your host connection, and that Windows volume in the bottom-right taskbar is turned up.
          </li>
          <li>
            <strong>Direct Playback:</strong> Click <strong>"Download MP3 Audio"</strong> to save the `.mp3` file and play it directly in Windows Media Player or VLC on your computer.
          </li>
        </ol>
      </div>
    </div>
  );
};
