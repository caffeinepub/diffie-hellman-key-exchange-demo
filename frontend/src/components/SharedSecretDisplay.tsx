import React from 'react';
import { CheckCircle2, Lock, ArrowRight } from 'lucide-react';

interface SharedSecretDisplayProps {
    aliceSharedSecret: number;
    bobSharedSecret: number;
    alicePublicKey: number;
    bobPublicKey: number;
    alicePrivateKey: number;
    bobPrivateKey: number;
    p: number;
}

const SharedSecretDisplay: React.FC<SharedSecretDisplayProps> = ({
    aliceSharedSecret,
    bobSharedSecret,
    alicePublicKey,
    bobPublicKey,
    alicePrivateKey,
    bobPrivateKey,
    p,
}) => {
    const secretsMatch = aliceSharedSecret === bobSharedSecret;

    return (
        <div className="space-y-4">
            {/* Side by side calculations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Alice's computation */}
                <div className="rounded-xl bg-alice-bg border border-alice-dim/50 p-4">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-7 h-7 rounded-lg bg-alice flex items-center justify-center">
                            <span className="text-xs font-bold text-background">A</span>
                        </div>
                        <span className="text-sm font-semibold text-alice">Alice computes</span>
                    </div>
                    <div className="space-y-2">
                        <div className="font-mono text-xs text-muted-foreground">
                            s = B^a mod p
                        </div>
                        <div className="font-mono text-xs text-muted-foreground">
                            s = {bobPublicKey}^{alicePrivateKey} mod {p}
                        </div>
                        <div className="flex items-center gap-2 pt-1">
                            <ArrowRight className="w-3.5 h-3.5 text-alice" />
                            <span className="font-mono text-2xl font-extrabold text-alice">
                                {aliceSharedSecret}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Bob's computation */}
                <div className="rounded-xl bg-bob-bg border border-bob-dim/50 p-4">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-7 h-7 rounded-lg bg-bob flex items-center justify-center">
                            <span className="text-xs font-bold text-background">B</span>
                        </div>
                        <span className="text-sm font-semibold text-bob">Bob computes</span>
                    </div>
                    <div className="space-y-2">
                        <div className="font-mono text-xs text-muted-foreground">
                            s = A^b mod p
                        </div>
                        <div className="font-mono text-xs text-muted-foreground">
                            s = {alicePublicKey}^{bobPrivateKey} mod {p}
                        </div>
                        <div className="flex items-center gap-2 pt-1">
                            <ArrowRight className="w-3.5 h-3.5 text-bob" />
                            <span className="font-mono text-2xl font-extrabold text-bob">
                                {bobSharedSecret}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Shared secret result */}
            <div
                className={`rounded-xl border p-5 text-center transition-all duration-500 ${
                    secretsMatch
                        ? 'bg-success-bg border-success/60 glow-success'
                        : 'bg-secondary/30 border-border'
                }`}
            >
                {secretsMatch ? (
                    <>
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <CheckCircle2 className="w-5 h-5 text-success" />
                            <span className="text-sm font-bold text-success uppercase tracking-wider">
                                Shared Secret Established!
                            </span>
                        </div>
                        <div className="flex items-center justify-center gap-3 mb-2">
                            <Lock className="w-5 h-5 text-success" />
                            <span className="font-mono text-4xl font-extrabold text-success">
                                {aliceSharedSecret}
                            </span>
                            <Lock className="w-5 h-5 text-success" />
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Both Alice and Bob independently computed the same secret key{' '}
                            <code className="font-mono font-bold text-success">{aliceSharedSecret}</code> without
                            ever transmitting it over the network.
                        </p>
                    </>
                ) : (
                    <p className="text-sm text-muted-foreground">
                        Secrets don't match — check your inputs.
                    </p>
                )}
            </div>
        </div>
    );
};

export default SharedSecretDisplay;
