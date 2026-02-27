import React from 'react';
import { ArrowRight, ArrowLeft, Eye, EyeOff } from 'lucide-react';

interface ExchangeDiagramProps {
    alicePublicKey: number;
    bobPublicKey: number;
    p: number;
    g: number;
}

const ExchangeDiagram: React.FC<ExchangeDiagramProps> = ({
    alicePublicKey,
    bobPublicKey,
    p,
    g,
}) => {
    return (
        <div className="space-y-4">
            {/* Public channel label */}
            <div className="flex items-center gap-2 justify-center">
                <div className="h-px flex-1 bg-border" />
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/60 border border-border text-xs text-muted-foreground">
                    <Eye className="w-3 h-3" />
                    Public Channel (visible to everyone)
                </div>
                <div className="h-px flex-1 bg-border" />
            </div>

            {/* Exchange visualization */}
            <div className="grid grid-cols-3 gap-4 items-center">
                {/* Alice side */}
                <div className="rounded-xl bg-alice-bg border border-alice-dim/50 p-4 text-center">
                    <div className="w-10 h-10 rounded-xl bg-alice mx-auto mb-2 flex items-center justify-center">
                        <span className="text-lg font-bold text-background">A</span>
                    </div>
                    <p className="text-xs font-semibold text-alice mb-1">Alice sends</p>
                    <p className="font-mono text-2xl font-extrabold text-alice">{alicePublicKey}</p>
                    <p className="text-xs text-muted-foreground mt-1">Public Key A</p>
                </div>

                {/* Arrow area */}
                <div className="flex flex-col items-center gap-3">
                    <div className="flex items-center gap-1 text-alice">
                        <span className="font-mono text-xs font-bold">{alicePublicKey}</span>
                        <ArrowRight className="w-5 h-5" />
                    </div>
                    <div className="px-3 py-1.5 rounded-lg bg-secondary/60 border border-border text-center">
                        <p className="text-xs text-muted-foreground font-mono">p={p}, g={g}</p>
                        <p className="text-xs text-muted-foreground">also public</p>
                    </div>
                    <div className="flex items-center gap-1 text-bob">
                        <ArrowLeft className="w-5 h-5" />
                        <span className="font-mono text-xs font-bold">{bobPublicKey}</span>
                    </div>
                </div>

                {/* Bob side */}
                <div className="rounded-xl bg-bob-bg border border-bob-dim/50 p-4 text-center">
                    <div className="w-10 h-10 rounded-xl bg-bob mx-auto mb-2 flex items-center justify-center">
                        <span className="text-lg font-bold text-background">B</span>
                    </div>
                    <p className="text-xs font-semibold text-bob mb-1">Bob sends</p>
                    <p className="font-mono text-2xl font-extrabold text-bob">{bobPublicKey}</p>
                    <p className="text-xs text-muted-foreground mt-1">Public Key B</p>
                </div>
            </div>

            {/* Eavesdropper note */}
            <div className="rounded-xl bg-secondary/30 border border-border p-3 flex items-start gap-2">
                <EyeOff className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <p className="text-xs text-muted-foreground leading-relaxed">
                    <span className="font-semibold text-foreground">Eve (eavesdropper)</span> can see{' '}
                    <code className="font-mono text-alice">A={alicePublicKey}</code>,{' '}
                    <code className="font-mono text-bob">B={bobPublicKey}</code>, <code className="font-mono">p={p}</code>, and{' '}
                    <code className="font-mono">g={g}</code> — but computing the shared secret requires solving the
                    discrete logarithm problem, which is computationally hard.
                </p>
            </div>
        </div>
    );
};

export default ExchangeDiagram;
