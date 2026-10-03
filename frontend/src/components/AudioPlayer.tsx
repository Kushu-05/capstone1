import React, { useState, useRef, useEffect } from 'react';
import { Volume2, Play, Pause, Download, RefreshCw, ShieldCheck, Sparkles, Mic, Headphones } from 'lucide-react';
import { AudioResponse } from '../types/api';
import { api } from '../services/api';

interface AudioPlayerProps {
  workflowRunId?: string;
  audio?: AudioResponse | null;
  onAudioGenerated?: (newAudio: AudioResponse) => void;
  onTriggerGenerate?: () => void;
  isGeneratingAudio?: boolean;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  workflowRunId,
  audio,
  onAudioGenerated,
  onTriggerGenerate,
  isGeneratingAudio = false
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [selectedVoice, setSelectedVoice] = useState(audio?.voice || 'en-US-JennyNeural');
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioUrl = audio ? api.getAudioUrl(audio.audio_id) : null;

  const voices = [
    { id: 'en-US-JennyNeural', label: 'Jenny (US Female • Conversational)' },
    { id: 'en-US-GuyNeural', label: 'Guy (US Male • Authoritative Executive)' },
    { id: 'en-US-AriaNeural', label: 'Aria (US Female • Expressive News)' },
    { id: 'en-GB-SoniaNeural', label: 'Sonia (UK Female • Academic Briefing)' },
    { id: 'en-GB-RyanNeural', label: 'Ryan (UK Male • Professional)' },
    { id: 'es-ES-AlvaroNeural', label: 'Alvaro (Spanish Male)' },
    { id: 'fr-FR-DeniseNeural', label: 'Denise (French Female)' },
  ];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
  }, [audio?.audio_id]);

  const togglePlay = () => {
    if (!audioRef.current || !audioUrl) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.error("Audio playback error:", err);
        setError("Audio playback failed. Please check your browser audio output.");
      });
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleGenerateSpeech = async () => {
    if (!workflowRunId) {
      if (onTriggerGenerate) {
        onTriggerGenerate();
      }
      return;
    }

    setIsSynthesizing(true);
    setError(null);
    try {
      const res = await api.generateSpeech(workflowRunId, selectedVoice);
      if (onAudioGenerated) {
        onAudioGenerated(res);
      }
    } catch (err: any) {
      setError(err?.response?.data?.detail || "Failed to generate neural speech.");
    } finally {
      setIsSynthesizing(false);
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const waveformBars = Array.from({ length: 30 });
  const isBusy = isSynthesizing || isGeneratingAudio;

  return (
    <div className="card" style={{
      background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.95) 0%, rgba(20, 27, 47, 0.98) 100%)',
      border: '1px solid var(--border-glow)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 25px rgba(99, 102, 241, 0.15)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative Glow */}
      <div style={{
        position: 'absolute',
        top: '-40px',
        right: '-40px',
        width: '180px',
        height: '180px',
        background: 'radial-gradient(circle, rgba(168, 85, 247, 0.22) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      {/* Header Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--primary-gradient)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            boxShadow: '0 4px 14px rgba(99, 102, 241, 0.4)'
          }}>
            <Volume2 size={22} />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, letterSpacing: '-0.01em' }}>
              Neural Voice Briefing
            </h3>
            <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Edge-TTS Neural Voice • Synthesized strictly from validated summary
            </p>
          </div>
        </div>

        <div className="badge badge-success" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.35rem 0.75rem' }}>
          <ShieldCheck size={14} />
          <span>{audio ? 'Audio Ready' : 'Speech Engine Ready'}</span>
        </div>
      </div>

      {/* If Audio is ready: show waveform and playback controls */}
      {audio && audioUrl ? (
        <>
          {/* Animated Waveform Visualizer */}
          <div style={{
            background: 'rgba(8, 11, 17, 0.75)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem 1.5rem',
            marginBottom: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            position: 'relative'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              height: '42px',
              padding: '0 1rem'
            }}>
              {waveformBars.map((_, i) => {
                const animDuration = (0.6 + (i % 5) * 0.15).toFixed(2);
                const animDelay = ((i * 0.05) % 0.4).toFixed(2);
                return (
                  <div
                    key={i}
                    style={{
                      width: '4px',
                      borderRadius: '3px',
                      background: isPlaying ? 'var(--primary-gradient)' : 'rgba(148, 163, 184, 0.25)',
                      height: isPlaying ? undefined : `${6 + (i % 4) * 5}px`,
                      animation: isPlaying ? `waveBar ${animDuration}s ease-in-out ${animDelay}s infinite` : 'none',
                      transition: 'background 0.3s, height 0.3s'
                    }}
                  />
                );
              })}
            </div>

            <audio
              ref={audioRef}
              src={audioUrl}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleTimeUpdate}
              onEnded={handleEnded}
              style={{ display: 'none' }}
            />

            {/* Scrubber Bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', minWidth: '38px' }}>
                {formatTime(currentTime)}
              </span>
              <input
                type="range"
                min="0"
                max={duration || 100}
                step="0.1"
                value={currentTime}
                onChange={handleSeek}
                style={{
                  flex: 1,
                  accentColor: '#818CF8',
                  cursor: 'pointer',
                  height: '4px',
                  borderRadius: '2px',
                  background: 'rgba(255, 255, 255, 0.1)'
                }}
              />
              <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', minWidth: '38px', textAlign: 'right' }}>
                {formatTime(duration)}
              </span>
            </div>
          </div>

          {/* Controls Bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {/* Play / Pause */}
              <button
                onClick={togglePlay}
                className="btn btn-primary"
                style={{
                  borderRadius: 'var(--radius-full)',
                  width: '46px',
                  height: '46px',
                  padding: 0,
                  boxShadow: isPlaying ? '0 0 20px rgba(99, 102, 241, 0.6)' : '0 4px 14px rgba(99, 102, 241, 0.35)'
                }}
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} style={{ marginLeft: '2px' }} />}
              </button>

              {/* Speed Pills */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.2rem',
                background: 'rgba(15, 23, 42, 0.8)',
                padding: '0.25rem 0.4rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)'
              }}>
                {[0.75, 1.0, 1.25, 1.5, 2.0].map((rate) => (
                  <button
                    key={rate}
                    onClick={() => setPlaybackRate(rate)}
                    style={{
                      background: playbackRate === rate ? 'var(--primary)' : 'transparent',
                      color: playbackRate === rate ? 'white' : 'var(--text-muted)',
                      border: 'none',
                      borderRadius: '4px',
                      padding: '0.2rem 0.45rem',
                      fontSize: '0.72rem',
                      fontWeight: playbackRate === rate ? 700 : 500,
                      cursor: 'pointer'
                    }}
                  >
                    {rate}x
                  </button>
                ))}
              </div>
            </div>

            {/* Voice & Download */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Mic size={14} color="var(--primary)" />
                <select
                  value={selectedVoice}
                  onChange={(e) => setSelectedVoice(e.target.value)}
                  style={{
                    padding: '0.4rem 0.7rem',
                    fontSize: '0.78rem',
                    background: 'rgba(15, 23, 42, 0.9)',
                    border: '1px solid var(--border-medium)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--text-secondary)'
                  }}
                >
                  {voices.map(v => (
                    <option key={v.id} value={v.id}>{v.label}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleGenerateSpeech}
                disabled={isBusy}
                className="btn btn-secondary"
                style={{ padding: '0.45rem 0.85rem', fontSize: '0.78rem' }}
              >
                <RefreshCw size={13} className={isBusy ? 'spin' : ''} />
                <span>{isBusy ? 'Synthesizing...' : 'Regen Voice'}</span>
              </button>

              <a
                href={audioUrl}
                download="executive_briefing.mp3"
                className="btn btn-secondary"
                style={{ padding: '0.45rem 0.85rem', fontSize: '0.78rem' }}
              >
                <Download size={13} />
                <span>MP3</span>
              </a>
            </div>
          </div>
        </>
      ) : (
        /* When Audio is NOT yet generated: Show sleek ready state */
        <div style={{
          padding: '1.25rem 1.5rem',
          background: 'rgba(8, 11, 17, 0.6)',
          borderRadius: 'var(--radius-md)',
          border: '1px dashed var(--border-medium)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Headphones size={24} color="#818CF8" />
            <div>
              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-main)' }}>
                Convert Summary into Neural Speech Briefing
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Natural Edge-TTS audio automatically filtered through the Validation Gatekeeper
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Mic size={14} color="var(--primary)" />
              <select
                value={selectedVoice}
                onChange={(e) => setSelectedVoice(e.target.value)}
                style={{
                  padding: '0.4rem 0.65rem',
                  fontSize: '0.78rem',
                  background: 'rgba(15, 23, 42, 0.9)',
                  border: '1px solid var(--border-medium)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--text-secondary)'
                }}
              >
                {voices.map(v => (
                  <option key={v.id} value={v.id}>{v.label}</option>
                ))}
              </select>
            </div>

            <button
              onClick={handleGenerateSpeech}
              disabled={isBusy}
              className="btn btn-primary"
              style={{ padding: '0.55rem 1.25rem', fontSize: '0.85rem' }}
            >
              <Sparkles size={15} />
              <span>{isBusy ? 'Synthesizing...' : 'Generate & Listen'}</span>
            </button>
          </div>
        </div>
      )}

      {error && (
        <div style={{
          marginTop: '1rem',
          padding: '0.6rem 0.85rem',
          borderRadius: 'var(--radius-md)',
          background: 'var(--danger-light)',
          border: '1px solid var(--danger-border)',
          color: 'var(--danger-text)',
          fontSize: '0.8rem'
        }}>
          {error}
        </div>
      )}
    </div>
  );
};
