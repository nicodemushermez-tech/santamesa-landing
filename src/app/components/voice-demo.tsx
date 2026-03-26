import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, MicOff, PhoneOff, Loader2, Volume2 } from 'lucide-react';
import { Conversation } from '@11labs/client';
import type { Mode, Status } from '@11labs/client';

// Agent IDs from ElevenLabs
const AGENT_IDS = {
  dental: 'agent_9601km2s780ye1hbw7frz2r2gem5',
  boutique: 'agent_4701km2s7kjde0da3ejqywy17pze',
} as const;

type DemoKey = keyof typeof AGENT_IDS;

interface TranscriptEntry {
  role: 'user' | 'ai';
  text: string;
}

const DEMOS: { key: DemoKey; title: string; subtitle: string; description: string; emoji: string }[] = [
  {
    key: 'dental',
    title: 'Dental Receptionist',
    subtitle: 'Sophie — Bright Smile Dental',
    description:
      'Book appointments, ask about services (whitening, Invisalign, emergency), pricing, or just see how Sophie handles nervous patients with care.',
    emoji: '🦷',
  },
  {
    key: 'boutique',
    title: 'Boutique Assistant',
    subtitle: 'Cleo — Maison Éclat',
    description:
      'Explore new arrivals, get outfit advice for an occasion, ask about sizing, or handle a return — Cleo is your personal AI stylist.',
    emoji: '👗',
  },
];

const DEMO_TIME_LIMIT = 90; // seconds per demo
const DEMO_SESSION_LIMIT = 3; // max demos per page session

export function VoiceDemo() {
  const [selected, setSelected] = useState<DemoKey>('dental');
  const [status, setStatus] = useState<Status | 'idle'>('idle');
  const [mode, setMode] = useState<Mode>('listening');
  const [isMuted, setIsMuted] = useState(false);
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(DEMO_TIME_LIMIT);
  const [demosUsed, setDemosUsed] = useState(0);
  const conversationRef = useRef<Conversation | null>(null);
  const transcriptEndRef = useRef<HTMLDivElement>(null);
  const transcriptContainerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (transcript.length === 0) return;
    const container = transcriptContainerRef.current;
    if (container) container.scrollTop = container.scrollHeight;
  }, [transcript]);

  // Countdown timer while connected
  useEffect(() => {
    if (status === 'connected') {
      setTimeLeft(DEMO_TIME_LIMIT);
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            endSession();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [status]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      conversationRef.current?.endSession().catch(() => {});
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const isConnected = status === 'connected';
  const isConnecting = status === 'connecting';
  const isActive = isConnected || isConnecting;
  const isSpeaking = isConnected && mode === 'speaking';
  const isListening = isConnected && mode === 'listening';

  async function startSession() {
    if (demosUsed >= DEMO_SESSION_LIMIT) {
      setError(`You've used all ${DEMO_SESSION_LIMIT} demo sessions. Book a call to see more.`);
      return;
    }

    setError(null);
    setTranscript([]);
    setTimeLeft(DEMO_TIME_LIMIT);

    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch {
      setError('Microphone access denied. Please allow microphone access and try again.');
      return;
    }

    setDemosUsed(prev => prev + 1);
    setStatus('connecting');

    try {
      const conv = await Conversation.startSession({
        agentId: AGENT_IDS[selected],
        connectionType: 'webrtc',
        onStatusChange: ({ status: s }) => setStatus(s),
        onModeChange: ({ mode: m }) => setMode(m),
        onMessage: ({ message, source }) => {
          const role = source === 'ai' ? 'ai' : 'user';
          const text = message.trim();
          if (!text) return;
          setTranscript((prev) => {
            // Deduplicate: skip if last entry from same role is same or prefix of this message
            const last = prev[prev.length - 1];
            if (last && last.role === role && (last.text === text || text.startsWith(last.text))) {
              return [...prev.slice(0, -1), { role, text }];
            }
            return [...prev, { role, text }];
          });
        },
        onError: (msg) => {
          setError(msg);
          setStatus('idle');
        },
        onDisconnect: () => {
          setStatus('idle');
          conversationRef.current = null;
        },
      });
      conversationRef.current = conv;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to start session. Please try again.';
      setError(msg);
      setStatus('idle');
    }
  }

  async function endSession() {
    if (conversationRef.current) {
      await conversationRef.current.endSession().catch(() => {});
      conversationRef.current = null;
    }
    setStatus('idle');
  }

  function toggleMute() {
    if (conversationRef.current) {
      const next = !isMuted;
      conversationRef.current.setMicMuted(next);
      setIsMuted(next);
    }
  }

  const selectedDemo = DEMOS.find((d) => d.key === selected)!;

  return (
    <div className="max-w-5xl mx-auto">
      {/* Section label */}
      <div className="text-center mb-16">
        <span
          className="inline-block mb-4 text-xs font-semibold tracking-widest uppercase"
          style={{ color: '#C4956A' }}
        >
          Live Demo
        </span>
        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
          Experience AI{' '}
          <span style={{ color: '#C4956A' }}>in Action</span>
        </h2>
        <p className="text-lg max-w-2xl mx-auto" style={{ color: '#64748B' }}>
          Talk to a real AI agent right now — no download, no signup. Pick a persona and hit Talk.
        </p>
      </div>

      {/* Persona selector */}
      <div className="grid sm:grid-cols-2 gap-4 mb-10">
        {DEMOS.map((demo) => {
          const isSelected = selected === demo.key;
          return (
            <motion.button
              key={demo.key}
              onClick={() => {
                if (!isActive) setSelected(demo.key);
              }}
              disabled={isActive}
              whileHover={!isActive ? { scale: 1.02 } : {}}
              whileTap={!isActive ? { scale: 0.98 } : {}}
              className="text-left rounded-2xl p-6 transition-all"
              style={{
                background: '#0F1623',
                border: isSelected ? '1.5px solid #C4956A' : '1px solid #1E2D45',
                boxShadow: isSelected ? '0 0 24px rgba(196,149,106,0.12)' : 'none',
                opacity: isActive && !isSelected ? 0.5 : 1,
                cursor: isActive ? 'not-allowed' : 'pointer',
              }}
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl">{demo.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-white">{demo.title}</span>
                    {isSelected && (
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{ background: 'rgba(196,149,106,0.15)', color: '#C4956A' }}
                      >
                        Selected
                      </span>
                    )}
                  </div>
                  <div className="text-xs mb-2" style={{ color: '#C4956A' }}>
                    {demo.subtitle}
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: '#64748B' }}>
                    {demo.description}
                  </p>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Main interaction area */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{ background: '#0F1623', border: '1px solid #1E2D45' }}
      >
        {/* Status bar */}
        <div
          className="px-6 py-4 flex items-center justify-between"
          style={{ borderBottom: '1px solid #1E2D45' }}
        >
          <div className="flex items-center gap-3">
            <span className="text-lg">{selectedDemo.emoji}</span>
            <div>
              <div className="text-sm font-semibold text-white">{selectedDemo.title}</div>
              <div className="text-xs" style={{ color: '#64748B' }}>
                {selectedDemo.subtitle}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {isConnecting && (
              <span className="flex items-center gap-1.5 text-xs" style={{ color: '#C4956A' }}>
                <Loader2 className="w-3 h-3 animate-spin" />
                Connecting…
              </span>
            )}
            {isConnected && (
              <>
                <span className="flex items-center gap-1.5 text-xs" style={{ color: '#4ade80' }}>
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  Live
                </span>
                <span
                  className="text-xs font-mono px-2 py-0.5 rounded-full"
                  style={{
                    background: timeLeft <= 20 ? 'rgba(239,68,68,0.15)' : 'rgba(196,149,106,0.12)',
                    color: timeLeft <= 20 ? '#f87171' : '#C4956A',
                    border: `1px solid ${timeLeft <= 20 ? 'rgba(239,68,68,0.3)' : 'rgba(196,149,106,0.2)'}`,
                  }}
                >
                  {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
                </span>
              </>
            )}
            {status === 'idle' && (
              <span className="text-xs" style={{ color: '#64748B' }}>
                {demosUsed >= DEMO_SESSION_LIMIT ? 'Limit reached' : `${DEMO_SESSION_LIMIT - demosUsed} demo${DEMO_SESSION_LIMIT - demosUsed !== 1 ? 's' : ''} left`}
              </span>
            )}
          </div>
        </div>

        {/* Transcript */}
        <div
          ref={transcriptContainerRef}
          className="h-56 overflow-y-auto px-6 py-4 space-y-3"
          style={{ scrollbarWidth: 'thin', scrollbarColor: '#1E2D45 transparent' }}
        >
          {transcript.length === 0 && (
            <div className="h-full flex items-center justify-center">
              <p className="text-sm text-center" style={{ color: '#64748B' }}>
                {isActive ? 'Conversation will appear here…' : 'Hit "Talk Now" to start a live conversation.'}
              </p>
            </div>
          )}
          {transcript.map((entry, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${entry.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  entry.role === 'user' ? 'rounded-tr-sm' : 'rounded-tl-sm'
                }`}
                style={
                  entry.role === 'ai'
                    ? { background: '#080C14', color: '#F8FAFC', border: '1px solid #1E2D45' }
                    : { background: 'rgba(196,149,106,0.15)', color: '#F8FAFC', border: '1px solid rgba(196,149,106,0.2)' }
                }
              >
                {entry.text}
              </div>
            </motion.div>
          ))}
          <div ref={transcriptEndRef} />
        </div>

        {/* AI speaking animation */}
        <AnimatePresence>
          {isSpeaking && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="px-6 py-3 flex items-center gap-3"
              style={{ borderTop: '1px solid #1E2D45', background: 'rgba(196,149,106,0.04)' }}
            >
              <Volume2 className="w-4 h-4" style={{ color: '#C4956A' }} />
              <div className="flex items-end gap-1 h-5">
                {[0, 0.1, 0.2, 0.15, 0.05].map((delay, i) => (
                  <motion.div
                    key={i}
                    animate={{ scaleY: [1, 2.5, 1, 1.8, 1] }}
                    transition={{ duration: 0.8, delay, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-1 rounded-full origin-bottom"
                    style={{ height: '8px', background: '#C4956A' }}
                  />
                ))}
              </div>
              <span className="text-xs" style={{ color: '#C4956A' }}>
                AI is speaking…
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Controls */}
        <div
          className="px-6 py-6 flex flex-col items-center gap-5"
          style={{ borderTop: '1px solid #1E2D45' }}
        >
          {/* Central talk button */}
          <div className="relative flex items-center justify-center">
            {/* Pulse rings when listening */}
            {isListening && (
              <>
                <motion.div
                  animate={{ scale: [1, 1.8], opacity: [0.4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
                  className="absolute rounded-full"
                  style={{ width: 80, height: 80, background: 'rgba(196,149,106,0.25)' }}
                />
                <motion.div
                  animate={{ scale: [1, 1.5], opacity: [0.3, 0] }}
                  transition={{ duration: 1.5, delay: 0.4, repeat: Infinity, ease: 'easeOut' }}
                  className="absolute rounded-full"
                  style={{ width: 80, height: 80, background: 'rgba(196,149,106,0.15)' }}
                />
              </>
            )}

            {!isActive ? (
              <motion.button
                whileHover={demosUsed < DEMO_SESSION_LIMIT ? { scale: 1.06 } : {}}
                whileTap={demosUsed < DEMO_SESSION_LIMIT ? { scale: 0.95 } : {}}
                onClick={startSession}
                disabled={demosUsed >= DEMO_SESSION_LIMIT}
                className="relative w-20 h-20 rounded-full flex items-center justify-center text-sm font-bold"
                style={{
                  background: demosUsed >= DEMO_SESSION_LIMIT
                    ? 'rgba(100,116,139,0.2)'
                    : 'linear-gradient(135deg, #C4956A, #A67850)',
                  color: demosUsed >= DEMO_SESSION_LIMIT ? '#64748B' : '#080C14',
                  boxShadow: demosUsed >= DEMO_SESSION_LIMIT ? 'none' : '0 0 32px rgba(196,149,106,0.35)',
                  cursor: demosUsed >= DEMO_SESSION_LIMIT ? 'not-allowed' : 'pointer',
                }}
              >
                <div className="flex flex-col items-center">
                  <Mic className="w-6 h-6 mb-0.5" />
                  <span className="text-xs">{demosUsed >= DEMO_SESSION_LIMIT ? 'Done' : 'Talk'}</span>
                </div>
              </motion.button>
            ) : isConnecting ? (
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(196,149,106,0.15)', border: '2px solid rgba(196,149,106,0.4)' }}
              >
                <Loader2 className="w-7 h-7 animate-spin" style={{ color: '#C4956A' }} />
              </div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleMute}
                className="relative w-20 h-20 rounded-full flex flex-col items-center justify-center gap-0.5"
                style={{
                  background: isMuted ? 'rgba(100,116,139,0.15)' : 'rgba(196,149,106,0.15)',
                  border: `2px solid ${isMuted ? '#64748B' : '#C4956A'}`,
                }}
              >
                {isMuted ? (
                  <MicOff className="w-6 h-6" style={{ color: '#64748B' }} />
                ) : (
                  <Mic className="w-6 h-6" style={{ color: '#C4956A' }} />
                )}
                <span className="text-xs font-medium" style={{ color: isMuted ? '#64748B' : '#C4956A' }}>
                  {isMuted ? 'Muted' : isListening ? 'Listening' : 'Speaking'}
                </span>
              </motion.button>
            )}
          </div>

          {/* End session button */}
          {isConnected && (
            <motion.button
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={endSession}
              className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all hover:opacity-80"
              style={{
                background: 'rgba(239,68,68,0.1)',
                color: '#f87171',
                border: '1px solid rgba(239,68,68,0.2)',
              }}
            >
              <PhoneOff className="w-4 h-4" />
              End Conversation
            </motion.button>
          )}

          {/* Error */}
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs text-center max-w-sm"
              style={{ color: '#f87171' }}
            >
              {error}
            </motion.p>
          )}

          {/* Limit reached CTA */}
          {demosUsed >= DEMO_SESSION_LIMIT && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <p className="text-sm mb-3" style={{ color: '#94A3B8' }}>
                Want this for your business?
              </p>
              <a
                href="#booking"
                onClick={(e) => { e.preventDefault(); document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all"
                style={{
                  background: 'linear-gradient(135deg, #C4956A, #A67850)',
                  color: '#080C14',
                  boxShadow: '0 0 20px rgba(196,149,106,0.3)',
                }}
              >
                Book a Free Strategy Call
              </a>
            </motion.div>
          )}

          {/* Disclaimer */}
          {demosUsed < DEMO_SESSION_LIMIT && (
            <p className="text-xs text-center" style={{ color: '#64748B' }}>
              Live AI demo · {DEMO_TIME_LIMIT}s limit · Powered by Santa Mesa
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
