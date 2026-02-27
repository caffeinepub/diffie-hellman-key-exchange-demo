import React from 'react';

interface StepCardProps {
    stepNumber: number;
    title: string;
    description: string;
    formula: string;
    result?: React.ReactNode;
    accentColor?: 'alice' | 'bob' | 'neutral' | 'success';
    children?: React.ReactNode;
}

const StepCard: React.FC<StepCardProps> = ({
    stepNumber,
    title,
    description,
    formula,
    result,
    accentColor = 'neutral',
    children,
}) => {
    const accentMap = {
        alice: {
            badge: 'bg-alice text-background',
            border: 'border-alice-dim/60',
            title: 'text-alice',
            formula: 'text-alice',
            formulaBg: 'bg-alice-bg border-alice-dim/40',
        },
        bob: {
            badge: 'bg-bob text-background',
            border: 'border-bob-dim/60',
            title: 'text-bob',
            formula: 'text-bob',
            formulaBg: 'bg-bob-bg border-bob-dim/40',
        },
        success: {
            badge: 'bg-success text-background',
            border: 'border-success/60',
            title: 'text-success',
            formula: 'text-success',
            formulaBg: 'bg-success-bg border-success/40',
        },
        neutral: {
            badge: 'bg-secondary text-foreground',
            border: 'border-border',
            title: 'text-foreground',
            formula: 'text-muted-foreground',
            formulaBg: 'bg-secondary/40 border-border',
        },
    };

    const colors = accentMap[accentColor];

    return (
        <div
            className={`card-glass rounded-2xl shadow-card border ${colors.border} overflow-hidden transition-all duration-300 hover:shadow-card-hover`}
        >
            {/* Step header */}
            <div className="flex items-start gap-4 p-6 pb-4">
                <div
                    className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-sm font-extrabold ${colors.badge}`}
                >
                    {stepNumber}
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className={`font-bold text-base mb-1 ${colors.title}`}>{title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                </div>
            </div>

            {/* Formula */}
            <div className="px-6 pb-4">
                <div className={`rounded-xl border px-4 py-3 ${colors.formulaBg}`}>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">Formula</p>
                    <code className={`font-mono text-sm font-semibold ${colors.formula}`}>{formula}</code>
                </div>
            </div>

            {/* Result or children */}
            {(result || children) && (
                <div className="px-6 pb-6">
                    {result && (
                        <div className="rounded-xl bg-secondary/30 border border-border px-4 py-3">
                            <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">Result</p>
                            <div className="text-sm text-foreground">{result}</div>
                        </div>
                    )}
                    {children}
                </div>
            )}
        </div>
    );
};

export default StepCard;
