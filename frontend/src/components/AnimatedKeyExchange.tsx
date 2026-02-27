import React, { useState, useEffect, useCallback } from 'react';
import { RefreshCw, Lock, Key, CheckCircle2, Eye } from 'lucide-react';

interface AnimatedKeyExchangeProps {
    p: number;
    g: number;
    alicePrivateKey: number;
    bobPrivateKey: number;
    alicePublicKey: number;
    bobPublicKey: number;
    sharedSecret: number;
}

type Phase =
    | 'idle'
    | 'alice-compute'
    | 'bob-compute'
    | 'alice-send'
    | 'bob-send'
    | 'alice-derive'
    | 'bob-derive'
    | 'complete';

const PHASE_DURATION: Record<Phase, number> = {
    idle: 600,
    'alice-compute': 900,
    'bob-compute': 900,
    'alice-send': 1100,
    'bob-send': 1100,
    'alice-derive': 1000,
    'bob-derive': 1000,
    complete: 3200,
};

const PHASES: Phase[] = [
    'idle',
    'alice-compute',
    'bob-compute',
    'alice-send',
    'bob-send',
    'alice-derive',
    'bob-derive',
    'complete',
];

const AnimatedKeyExchange: React.FC<AnimatedKeyExchangeProps> = ({
    p,
    g,
    alicePrivateKey,
    bobPrivateKey,
    alicePublicKey,
    bobPublicKey,
    sharedSecret,
}) => {
    const [phase, setPhase] = useState<Phase>('idle');
    const [running, setRunning] = useState(false);
    const [key, setKey] = useState(0); // used to re-trigger animation

    const startAnimation = useCallback(() => {
        setPhase('idle');
        setRunning(true);
        setKey(k => k + 1);
    }, []);

    useEffect(() => {
        if (!running) return;
        let idx = PHASES.indexOf(phase);
        if (idx === -1) idx = 0;

        const duration = PHASE_DURATION[phase];
        const timer = setTimeout(() => {
            const next = PHASES[idx + 1];
            if (next) {
                setPhase(next);
            } else {
                setRunning(false);
            }
        }, duration);

        return () => clearTimeout(timer);
    }, [phase, running]);

    // Auto-start on mount and when values change
    useEffect(() => {
        startAnimation();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [p, g, alicePrivateKey, bobPrivateKey]);

    const phaseIndex = PHASES.indexOf(phase);

    const aliceSending = phase === 'alice-send';
    const bobSending = phase === 'bob-send';
    const aliceDeriving = phase === 'alice-derive';
    const bobDeriving = phase === 'bob-derive';
    const isComplete = phase === 'complete';

    const aliceHasPublicKey = phaseIndex >= PHASES.indexOf('alice-compute');
    const bobHasPublicKey = phaseIndex >= PHASES.indexOf('bob-compute');
    const aliceReceivedBob = phaseIndex >= PHASES.indexOf('bob-send');
    const bobReceivedAlice = phaseIndex >= PHASES.indexOf('alice-send');
    const aliceHasSecret = phaseIndex >= PHASES.indexOf('alice-derive');
    const bobHasSecret = phaseIndex >= PHASES.indexOf('bob-derive');

    return (
        <div className="rounded-2xl card-glass border border-border shadow-card overflow-hidden">
            {/* Header */}
            <div className="px-5 py-4 border-b border-border bg-secondary/20 flex items-center justify-between">
                <div>
                    <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center">
                            <span className="text-[10px] font-bold text-primary">▶</span>
                        </span>
                        Animated Key Exchange Flow
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">Watch Alice and Bob establish a shared secret</p>
                </div>
                <button
                    onClick={startAnimation}
                    disabled={running}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary border border-border text-xs font-medium text-foreground hover:bg-secondary/80 hover:border-alice-dim transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                    <RefreshCw className={`w-3.5 h-3.5 ${running ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-300'}`} />
                    {running ? 'Playing…' : 'Replay'}
                </button>
            </div>

            {/* Animation stage */}
            <div className="p-5 sm:p-6" key={key}>
                {/* Phase label */}
                <div className="text-center mb-5 h-6">
                    <PhaseLabel phase={phase} />
                </div>

                {/* Main visualization */}
                <div className="relative flex items-stretch gap-0 min-h-[200px]">
                    {/* Alice column */}
                    <div className="flex-1 flex flex-col items-center gap-3">
                        {/* Avatar */}
                        <div
                            className={`w-14 h-14 rounded-2xl bg-alice-bg border-2 flex items-center justify-center transition-all duration-500 ${
                                aliceDeriving || isComplete
                                    ? 'border-alice shadow-alice scale-110'
                                    : aliceHasPublicKey
                                    ? 'border-alice-dim'
                                    : 'border-border'
                            }`}
                        >
                            <span className="text-2xl font-extrabold text-alice">A</span>
                        </div>
                        <span className="text-xs font-semibold text-alice">Alice</span>

                        {/* Alice's keys */}
                        <div className="w-full space-y-2">
                            {/* Private key badge */}
                            <div className="rounded-lg bg-alice-bg/60 border border-alice-dim/30 px-3 py-2 text-center">
                                <p className="text-[10px] text-muted-foreground mb-0.5">Private key (secret)</p>
                                <p className="font-mono text-sm font-bold text-alice">a = {alicePrivateKey}</p>
                            </div>

                            {/* Public key badge */}
                            <div
                                className={`rounded-lg border px-3 py-2 text-center transition-all duration-500 ${
                                    aliceHasPublicKey
                                        ? 'bg-alice-bg border-alice-dim/50 animate-fade-in-up'
                                        : 'bg-secondary/20 border-border opacity-30'
                                }`}
                            >
                                <p className="text-[10px] text-muted-foreground mb-0.5">Public key</p>
                                <p className="font-mono text-sm font-bold text-alice">
                                    A = {aliceHasPublicKey ? alicePublicKey : '?'}
                                </p>
                                {aliceHasPublicKey && (
                                    <p className="text-[9px] text-muted-foreground/70 font-mono mt-0.5">
                                        {g}^{alicePrivateKey} mod {p}
                                    </p>
                                )}
                            </div>

                            {/* Received Bob's key */}
                            <div
                                className={`rounded-lg border px-3 py-2 text-center transition-all duration-500 ${
                                    aliceReceivedBob
                                        ? 'bg-bob-bg/40 border-bob-dim/40 animate-fade-in-up'
                                        : 'bg-secondary/20 border-border opacity-30'
                                }`}
                            >
                                <p className="text-[10px] text-muted-foreground mb-0.5">Received from Bob</p>
                                <p className="font-mono text-sm font-bold text-bob">
                                    B = {aliceReceivedBob ? bobPublicKey : '?'}
                                </p>
                            </div>

                            {/* Shared secret */}
                            <div
                                className={`rounded-lg border px-3 py-2 text-center transition-all duration-500 ${
                                    aliceHasSecret
                                        ? 'bg-success-bg border-success/50 animate-fade-in-up'
                                        : 'bg-secondary/20 border-border opacity-30'
                                }`}
                            >
                                <p className="text-[10px] text-muted-foreground mb-0.5">Shared secret</p>
                                <div className="flex items-center justify-center gap-1">
                                    {aliceHasSecret && <Lock className="w-3 h-3 text-success" />}
                                    <p className="font-mono text-sm font-bold text-success">
                                        s = {aliceHasSecret ? sharedSecret : '?'}
                                    </p>
                                </div>
                                {aliceHasSecret && (
                                    <p className="text-[9px] text-muted-foreground/70 font-mono mt-0.5">
                                        {bobPublicKey}^{alicePrivateKey} mod {p}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Center channel */}
                    <div className="w-24 sm:w-32 flex flex-col items-center justify-start pt-2 px-1 relative">
                        {/* Public channel label */}
                        <div className="flex flex-col items-center gap-1 mb-3">
                            <Eye className="w-3.5 h-3.5 text-muted-foreground" />
                            <span className="text-[9px] text-muted-foreground text-center leading-tight">Public Channel</span>
                        </div>

                        {/* Vertical channel line */}
                        <div className="absolute top-16 bottom-0 left-1/2 -translate-x-1/2 w-px bg-border/60" />

                        {/* Alice → Bob packet */}
                        <div className="relative w-full flex justify-center mb-2">
                            <div
                                className={`relative z-10 transition-all duration-700 ${
                                    aliceSending
                                        ? 'animate-travel-right opacity-100'
                                        : bobReceivedAlice
                                        ? 'opacity-0 translate-x-8'
                                        : 'opacity-0 -translate-x-8'
                                }`}
                            >
                                <div className="rounded-lg bg-alice-bg border border-alice-dim/60 px-2 py-1 text-center shadow-alice">
                                    <p className="text-[9px] text-alice font-mono font-bold">A={alicePublicKey}</p>
                                    <p className="text-[8px] text-muted-foreground">→ Bob</p>
                                </div>
                            </div>
                        </div>

                        {/* Bob → Alice packet */}
                        <div className="relative w-full flex justify-center mt-2">
                            <div
                                className={`relative z-10 transition-all duration-700 ${
                                    bobSending
                                        ? 'animate-travel-left opacity-100'
                                        : aliceReceivedBob
                                        ? 'opacity-0 -translate-x-8'
                                        : 'opacity-0 translate-x-8'
                                }`}
                            >
                                <div className="rounded-lg bg-bob-bg border border-bob-dim/60 px-2 py-1 text-center shadow-bob">
                                    <p className="text-[9px] text-bob font-mono font-bold">B={bobPublicKey}</p>
                                    <p className="text-[8px] text-muted-foreground">→ Alice</p>
                                </div>
                            </div>
                        </div>

                        {/* Eve warning */}
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20">
                            <div className="rounded-lg bg-destructive/10 border border-destructive/30 px-1.5 py-1 text-center">
                                <p className="text-[8px] text-destructive/80 font-semibold">Eve sees</p>
                                <p className="text-[7px] text-muted-foreground font-mono">A,B,p,g</p>
                            </div>
                        </div>
                    </div>

                    {/* Bob column */}
                    <div className="flex-1 flex flex-col items-center gap-3">
                        {/* Avatar */}
                        <div
                            className={`w-14 h-14 rounded-2xl bg-bob-bg border-2 flex items-center justify-center transition-all duration-500 ${
                                bobDeriving || isComplete
                                    ? 'border-bob shadow-bob scale-110'
                                    : bobHasPublicKey
                                    ? 'border-bob-dim'
                                    : 'border-border'
                            }`}
                        >
                            <span className="text-2xl font-extrabold text-bob">B</span>
                        </div>
                        <span className="text-xs font-semibold text-bob">Bob</span>

                        {/* Bob's keys */}
                        <div className="w-full space-y-2">
                            {/* Private key badge */}
                            <div className="rounded-lg bg-bob-bg/60 border border-bob-dim/30 px-3 py-2 text-center">
                                <p className="text-[10px] text-muted-foreground mb-0.5">Private key (secret)</p>
                                <p className="font-mono text-sm font-bold text-bob">b = {bobPrivateKey}</p>
                            </div>

                            {/* Public key badge */}
                            <div
                                className={`rounded-lg border px-3 py-2 text-center transition-all duration-500 ${
                                    bobHasPublicKey
                                        ? 'bg-bob-bg border-bob-dim/50 animate-fade-in-up'
                                        : 'bg-secondary/20 border-border opacity-30'
                                }`}
                            >
                                <p className="text-[10px] text-muted-foreground mb-0.5">Public key</p>
                                <p className="font-mono text-sm font-bold text-bob">
                                    B = {bobHasPublicKey ? bobPublicKey : '?'}
                                </p>
                                {bobHasPublicKey && (
                                    <p className="text-[9px] text-muted-foreground/70 font-mono mt-0.5">
                                        {g}^{bobPrivateKey} mod {p}
                                    </p>
                                )}
                            </div>

                            {/* Received Alice's key */}
                            <div
                                className={`rounded-lg border px-3 py-2 text-center transition-all duration-500 ${
                                    bobReceivedAlice
                                        ? 'bg-alice-bg/40 border-alice-dim/40 animate-fade-in-up'
                                        : 'bg-secondary/20 border-border opacity-30'
                                }`}
                            >
                                <p className="text-[10px] text-muted-foreground mb-0.5">Received from Alice</p>
                                <p className="font-mono text-sm font-bold text-alice">
                                    A = {bobReceivedAlice ? alicePublicKey : '?'}
                                </p>
                            </div>

                            {/* Shared secret */}
                            <div
                                className={`rounded-lg border px-3 py-2 text-center transition-all duration-500 ${
                                    bobHasSecret
                                        ? 'bg-success-bg border-success/50 animate-fade-in-up'
                                        : 'bg-secondary/20 border-border opacity-30'
                                }`}
                            >
                                <p className="text-[10px] text-muted-foreground mb-0.5">Shared secret</p>
                                <div className="flex items-center justify-center gap-1">
                                    {bobHasSecret && <Lock className="w-3 h-3 text-success" />}
                                    <p className="font-mono text-sm font-bold text-success">
                                        s = {bobHasSecret ? sharedSecret : '?'}
                                    </p>
                                </div>
                                {bobHasSecret && (
                                    <p className="text-[9px] text-muted-foreground/70 font-mono mt-0.5">
                                        {alicePublicKey}^{bobPrivateKey} mod {p}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Completion banner */}
                <div
                    className={`mt-5 rounded-xl border px-4 py-3 text-center transition-all duration-700 ${
                        isComplete
                            ? 'bg-success-bg border-success/50 glow-success opacity-100 scale-100'
                            : 'opacity-0 scale-95 border-border bg-secondary/10'
                    }`}
                >
                    <div className="flex items-center justify-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-success" />
                        <span className="text-sm font-bold text-success">Shared Secret Established!</span>
                        <Key className="w-4 h-4 text-success" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                        Both parties independently computed{' '}
                        <span className="font-mono font-bold text-success">s = {sharedSecret}</span>
                        {' '}— never transmitted over the network.
                    </p>
                </div>

                {/* Progress steps */}
                <div className="mt-4 flex items-center justify-center gap-1.5 flex-wrap">
                    {PHASES.filter(p => p !== 'idle').map((p, i) => (
                        <div
                            key={p}
                            className={`h-1.5 rounded-full transition-all duration-500 ${
                                phaseIndex > i
                                    ? p === 'complete'
                                        ? 'bg-success w-6'
                                        : 'bg-primary w-4'
                                    : phaseIndex === i + 1
                                    ? 'bg-primary/60 w-4 animate-pulse'
                                    : 'bg-border w-3'
                            }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

const PHASE_LABELS: Partial<Record<Phase, { text: string; color: string }>> = {
    idle: { text: 'Initializing…', color: 'text-muted-foreground' },
    'alice-compute': { text: 'Alice computes her public key A = g^a mod p', color: 'text-alice' },
    'bob-compute': { text: 'Bob computes his public key B = g^b mod p', color: 'text-bob' },
    'alice-send': { text: 'Alice sends public key A to Bob over the public channel', color: 'text-alice' },
    'bob-send': { text: 'Bob sends public key B to Alice over the public channel', color: 'text-bob' },
    'alice-derive': { text: 'Alice derives shared secret: s = B^a mod p', color: 'text-alice' },
    'bob-derive': { text: 'Bob derives shared secret: s = A^b mod p', color: 'text-bob' },
    complete: { text: '🔐 Shared secret established — both parties agree!', color: 'text-success' },
};

const PhaseLabel: React.FC<{ phase: Phase }> = ({ phase }) => {
    const label = PHASE_LABELS[phase];
    if (!label) return null;
    return (
        <span className={`text-xs font-medium transition-all duration-300 ${label.color}`}>
            {label.text}
        </span>
    );
};

export default AnimatedKeyExchange;
