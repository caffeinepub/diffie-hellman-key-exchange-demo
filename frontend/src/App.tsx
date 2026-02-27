import React, { useState, useCallback } from 'react';
import { RotateCcw, ChevronDown } from 'lucide-react';
import Header from './components/Header';
import PublicParameters from './components/PublicParameters';
import PartyKeyInput from './components/PartyKeyInput';
import StepCard from './components/StepCard';
import SharedSecretDisplay from './components/SharedSecretDisplay';
import ExchangeDiagram from './components/ExchangeDiagram';
import AnimatedKeyExchange from './components/AnimatedKeyExchange';
import BackgroundDecorations from './components/BackgroundDecorations';
import { computePublicKey, computeSharedSecret } from './utils/crypto';

const DEFAULTS = {
    p: 23,
    g: 5,
    alicePrivateKey: 6,
    bobPrivateKey: 15,
};

export default function App() {
    const [p, setP] = useState(DEFAULTS.p);
    const [g, setG] = useState(DEFAULTS.g);
    const [alicePrivateKey, setAlicePrivateKey] = useState(DEFAULTS.alicePrivateKey);
    const [bobPrivateKey, setBobPrivateKey] = useState(DEFAULTS.bobPrivateKey);

    const alicePublicKey = computePublicKey(g, alicePrivateKey, p);
    const bobPublicKey = computePublicKey(g, bobPrivateKey, p);
    const aliceSharedSecret = computeSharedSecret(bobPublicKey, alicePrivateKey, p);
    const bobSharedSecret = computeSharedSecret(alicePublicKey, bobPrivateKey, p);

    const handleReset = useCallback(() => {
        setP(DEFAULTS.p);
        setG(DEFAULTS.g);
        setAlicePrivateKey(DEFAULTS.alicePrivateKey);
        setBobPrivateKey(DEFAULTS.bobPrivateKey);
    }, []);

    const scrollToSteps = () => {
        document.getElementById('steps')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-background font-sans relative">
            {/* Background decorations — fixed, behind everything */}
            <BackgroundDecorations />

            {/* All page content sits above the background */}
            <div className="relative" style={{ zIndex: 1 }}>
                {/* Header */}
                <Header />

                {/* Scroll hint */}
                <div className="flex justify-center pb-6 -mt-2">
                    <button
                        onClick={scrollToSteps}
                        className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground transition-colors group"
                        aria-label="Scroll to demo"
                    >
                        <span className="text-xs font-medium">Explore the Demo</span>
                        <ChevronDown className="w-5 h-5 animate-bounce group-hover:text-alice transition-colors" />
                    </button>
                </div>

                {/* Main content */}
                <main id="steps" className="max-w-4xl mx-auto px-4 sm:px-6 pb-16 space-y-6">

                    {/* Controls bar */}
                    <div className="flex items-center justify-between py-2">
                        <div>
                            <h2 className="text-lg font-bold text-foreground">Algorithm Steps</h2>
                            <p className="text-xs text-muted-foreground">Modify any value to see live recalculation</p>
                        </div>
                        <button
                            onClick={handleReset}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary border border-border text-sm font-medium text-foreground hover:bg-secondary/80 hover:border-alice-dim transition-all duration-200 group"
                        >
                            <RotateCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
                            Reset to Defaults
                        </button>
                    </div>

                    {/* Step 1: Public Parameters */}
                    <StepCard
                        stepNumber={1}
                        title="Agree on Public Parameters"
                        description="Alice and Bob publicly agree on two numbers: a large prime p and a generator g (primitive root modulo p). These values are not secret — anyone can know them."
                        formula="p = prime number, g = primitive root mod p"
                        accentColor="neutral"
                        result={
                            <span className="font-mono text-sm">
                                p = <span className="font-bold text-foreground">{p}</span>
                                {' '}(prime),{'  '}
                                g = <span className="font-bold text-foreground">{g}</span>
                                {' '}(generator)
                            </span>
                        }
                    >
                        <div className="mt-3">
                            <PublicParameters
                                p={p}
                                g={g}
                                onPChange={setP}
                                onGChange={setG}
                            />
                        </div>
                    </StepCard>

                    {/* Step 2 & 3: Private keys and public keys */}
                    <StepCard
                        stepNumber={2}
                        title="Alice Chooses Her Private Key & Computes Public Key"
                        description="Alice secretly picks a private integer 'a'. She then computes her public key A using the formula below and sends A to Bob over the public channel."
                        formula="A = g^a mod p"
                        accentColor="alice"
                        result={
                            <span className="font-mono text-sm">
                                A = {g}^{alicePrivateKey} mod {p} ={' '}
                                <span className="font-bold text-alice text-base">{alicePublicKey}</span>
                            </span>
                        }
                    >
                        <div className="mt-3">
                            <PartyKeyInput
                                party="alice"
                                privateKey={alicePrivateKey}
                                publicKey={alicePublicKey}
                                p={p}
                                g={g}
                                onPrivateKeyChange={setAlicePrivateKey}
                            />
                        </div>
                    </StepCard>

                    <StepCard
                        stepNumber={3}
                        title="Bob Chooses His Private Key & Computes Public Key"
                        description="Bob independently picks his own secret private integer 'b'. He computes his public key B using the same formula and sends B to Alice over the public channel."
                        formula="B = g^b mod p"
                        accentColor="bob"
                        result={
                            <span className="font-mono text-sm">
                                B = {g}^{bobPrivateKey} mod {p} ={' '}
                                <span className="font-bold text-bob text-base">{bobPublicKey}</span>
                            </span>
                        }
                    >
                        <div className="mt-3">
                            <PartyKeyInput
                                party="bob"
                                privateKey={bobPrivateKey}
                                publicKey={bobPublicKey}
                                p={p}
                                g={g}
                                onPrivateKeyChange={setBobPrivateKey}
                            />
                        </div>
                    </StepCard>

                    {/* Step 4: Exchange */}
                    <StepCard
                        stepNumber={4}
                        title="Exchange Public Keys"
                        description="Alice sends her public key A to Bob, and Bob sends his public key B to Alice — both over the public channel. An eavesdropper can intercept these values, but cannot derive the shared secret without solving the discrete logarithm problem."
                        formula="Alice → Bob: A = g^a mod p  |  Bob → Alice: B = g^b mod p"
                        accentColor="neutral"
                        result={
                            <span className="font-mono text-sm">
                                Alice sends <span className="text-alice font-bold">A={alicePublicKey}</span>
                                {' '}→ Bob,{'  '}
                                Bob sends <span className="text-bob font-bold">B={bobPublicKey}</span>
                                {' '}→ Alice
                            </span>
                        }
                    >
                        <div className="mt-3">
                            <ExchangeDiagram
                                alicePublicKey={alicePublicKey}
                                bobPublicKey={bobPublicKey}
                                p={p}
                                g={g}
                            />
                        </div>
                    </StepCard>

                    {/* Animated Key Exchange Visualization */}
                    <AnimatedKeyExchange
                        p={p}
                        g={g}
                        alicePrivateKey={alicePrivateKey}
                        bobPrivateKey={bobPrivateKey}
                        alicePublicKey={alicePublicKey}
                        bobPublicKey={bobPublicKey}
                        sharedSecret={aliceSharedSecret}
                    />

                    {/* Step 5: Shared Secret */}
                    <StepCard
                        stepNumber={5}
                        title="Compute the Shared Secret"
                        description="Alice raises Bob's public key to her private key power (mod p), and Bob does the same with Alice's public key. Due to the mathematical properties of modular exponentiation, both computations yield the same result — the shared secret!"
                        formula="Alice: s = B^a mod p  |  Bob: s = A^b mod p  →  Both equal g^(ab) mod p"
                        accentColor="success"
                        result={
                            <span className="font-mono text-sm">
                                Shared secret ={' '}
                                <span className="font-bold text-success text-base">{aliceSharedSecret}</span>
                                {aliceSharedSecret === bobSharedSecret && (
                                    <span className="ml-2 text-success">✓ Both parties agree!</span>
                                )}
                            </span>
                        }
                    >
                        <div className="mt-3">
                            <SharedSecretDisplay
                                aliceSharedSecret={aliceSharedSecret}
                                bobSharedSecret={bobSharedSecret}
                                alicePublicKey={alicePublicKey}
                                bobPublicKey={bobPublicKey}
                                alicePrivateKey={alicePrivateKey}
                                bobPrivateKey={bobPrivateKey}
                                p={p}
                            />
                        </div>
                    </StepCard>

                    {/* Summary table */}
                    <div className="card-glass rounded-2xl shadow-card border border-border overflow-hidden">
                        <div className="px-6 py-4 border-b border-border bg-secondary/20">
                            <h3 className="font-bold text-base text-foreground">Summary of All Values</h3>
                            <p className="text-xs text-muted-foreground">Complete overview of the key exchange</p>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {[
                                    { label: 'Prime (p)', value: p, color: 'text-foreground', sub: 'Public' },
                                    { label: 'Generator (g)', value: g, color: 'text-foreground', sub: 'Public' },
                                    { label: "Alice's Public Key (A)", value: alicePublicKey, color: 'text-alice', sub: 'Public' },
                                    { label: "Bob's Public Key (B)", value: bobPublicKey, color: 'text-bob', sub: 'Public' },
                                    { label: "Alice's Private Key (a)", value: '●●●', color: 'text-alice', sub: 'Secret' },
                                    { label: "Bob's Private Key (b)", value: '●●●', color: 'text-bob', sub: 'Secret' },
                                    { label: 'Shared Secret (s)', value: aliceSharedSecret, color: 'text-success', sub: 'Derived' },
                                    { label: 'Keys Match?', value: aliceSharedSecret === bobSharedSecret ? '✓ Yes' : '✗ No', color: aliceSharedSecret === bobSharedSecret ? 'text-success' : 'text-destructive', sub: 'Verified' },
                                ].map(({ label, value, color, sub }) => (
                                    <div key={label} className="rounded-xl bg-secondary/30 border border-border p-3">
                                        <p className="text-xs text-muted-foreground mb-1 leading-tight">{label}</p>
                                        <p className={`font-mono text-xl font-extrabold ${color}`}>{value}</p>
                                        <p className="text-xs text-muted-foreground/60 mt-1">{sub}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="border-t border-border bg-secondary/20 mt-8">
                    <div className="max-w-4xl mx-auto px-6 py-8">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="text-center md:text-left">
                                <p className="text-sm font-semibold text-foreground">Diffie-Hellman Key Exchange Demo</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    An interactive educational tool for understanding public-key cryptography.
                                </p>
                            </div>
                            <div className="flex flex-col items-center md:items-end gap-1">
                                <p className="text-xs text-muted-foreground">
                                    © {new Date().getFullYear()} · Built with{' '}
                                    <span className="text-destructive">♥</span> using{' '}
                                    <a
                                        href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== 'undefined' ? window.location.hostname : 'dh-key-exchange-demo')}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-alice hover:text-alice-dim transition-colors font-medium"
                                    >
                                        caffeine.ai
                                    </a>
                                </p>
                                <p className="text-xs text-muted-foreground/60">
                                    For educational purposes only — not for production cryptography.
                                </p>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}
