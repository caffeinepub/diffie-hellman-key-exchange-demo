import React from 'react';
import { Settings, AlertCircle } from 'lucide-react';
import { isPrime } from '../utils/crypto';

interface PublicParametersProps {
    p: number;
    g: number;
    onPChange: (val: number) => void;
    onGChange: (val: number) => void;
}

const PublicParameters: React.FC<PublicParametersProps> = ({ p, g, onPChange, onGChange }) => {
    const pIsValid = isPrime(p) && p > 2;
    const gIsValid = g >= 2 && g < p;

    return (
        <div className="card-glass rounded-2xl p-6 shadow-card">
            <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center">
                    <Settings className="w-4.5 h-4.5 text-muted-foreground" />
                </div>
                <div>
                    <h3 className="font-semibold text-foreground text-sm">Public Parameters</h3>
                    <p className="text-xs text-muted-foreground">Shared openly between Alice and Bob</p>
                </div>
                <div className="ml-auto flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/60 border border-border text-xs text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-success inline-block" />
                    Public
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Prime p */}
                <div className="space-y-2">
                    <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Prime Number (p)
                    </label>
                    <div className="relative">
                        <input
                            type="number"
                            value={p}
                            min={3}
                            onChange={(e) => onPChange(parseInt(e.target.value) || 2)}
                            className={`w-full bg-secondary/50 border rounded-xl px-4 py-3 text-foreground font-mono text-lg font-semibold focus:outline-none focus:ring-2 transition-all ${
                                pIsValid
                                    ? 'border-border focus:ring-alice/40 focus:border-alice-dim'
                                    : 'border-destructive/60 focus:ring-destructive/30'
                            }`}
                        />
                        {!pIsValid && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                <AlertCircle className="w-4 h-4 text-destructive" />
                            </div>
                        )}
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">Must be a prime number</p>
                        {pIsValid ? (
                            <span className="text-xs text-success font-medium">✓ Valid prime</span>
                        ) : (
                            <span className="text-xs text-destructive font-medium">Not prime</span>
                        )}
                    </div>
                </div>

                {/* Generator g */}
                <div className="space-y-2">
                    <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Generator / Primitive Root (g)
                    </label>
                    <div className="relative">
                        <input
                            type="number"
                            value={g}
                            min={2}
                            max={p - 1}
                            onChange={(e) => onGChange(parseInt(e.target.value) || 2)}
                            className={`w-full bg-secondary/50 border rounded-xl px-4 py-3 text-foreground font-mono text-lg font-semibold focus:outline-none focus:ring-2 transition-all ${
                                gIsValid
                                    ? 'border-border focus:ring-bob/40 focus:border-bob-dim'
                                    : 'border-destructive/60 focus:ring-destructive/30'
                            }`}
                        />
                        {!gIsValid && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                <AlertCircle className="w-4 h-4 text-destructive" />
                            </div>
                        )}
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">Must satisfy: 2 ≤ g &lt; p</p>
                        {gIsValid ? (
                            <span className="text-xs text-success font-medium">✓ Valid</span>
                        ) : (
                            <span className="text-xs text-destructive font-medium">Invalid range</span>
                        )}
                    </div>
                </div>
            </div>

            {/* Info box */}
            <div className="mt-4 p-3 rounded-xl bg-secondary/30 border border-border">
                <p className="text-xs text-muted-foreground leading-relaxed">
                    <span className="font-semibold text-foreground">These values are public</span> — anyone can see them,
                    including an eavesdropper. The security of the protocol does not depend on keeping{' '}
                    <code className="font-mono text-alice">p</code> or <code className="font-mono text-bob">g</code> secret.
                </p>
            </div>
        </div>
    );
};

export default PublicParameters;
