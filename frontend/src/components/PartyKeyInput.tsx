import React from 'react';
import { Eye, EyeOff, Lock, Key } from 'lucide-react';

interface PartyKeyInputProps {
    party: 'alice' | 'bob';
    privateKey: number;
    publicKey: number;
    p: number;
    g: number;
    onPrivateKeyChange: (val: number) => void;
}

const PartyKeyInput: React.FC<PartyKeyInputProps> = ({
    party,
    privateKey,
    publicKey,
    p,
    g,
    onPrivateKeyChange,
}) => {
    const [showPrivate, setShowPrivate] = React.useState(false);
    const isAlice = party === 'alice';
    const name = isAlice ? 'Alice' : 'Bob';
    const varLower = isAlice ? 'a' : 'b';
    const varUpper = isAlice ? 'A' : 'B';

    const colorClasses = isAlice
        ? {
              border: 'border-alice-dim',
              borderHover: 'hover:border-alice',
              text: 'text-alice',
              textDim: 'text-alice-dim',
              bg: 'bg-alice-bg',
              badge: 'bg-alice text-background',
              ring: 'focus:ring-alice/40 focus:border-alice-dim',
              glow: 'glow-alice',
              inputBorder: 'border-alice-dim/50 focus:border-alice-dim',
          }
        : {
              border: 'border-bob-dim',
              borderHover: 'hover:border-bob',
              text: 'text-bob',
              textDim: 'text-bob-dim',
              bg: 'bg-bob-bg',
              badge: 'bg-bob text-background',
              ring: 'focus:ring-bob/40 focus:border-bob-dim',
              glow: 'glow-bob',
              inputBorder: 'border-bob-dim/50 focus:border-bob-dim',
          };

    return (
        <div
            className={`card-glass rounded-2xl p-6 shadow-card border ${colorClasses.border} transition-all duration-300 ${colorClasses.borderHover}`}
        >
            {/* Header */}
            <div className="flex items-center gap-3 mb-5">
                <div
                    className={`w-10 h-10 rounded-xl ${colorClasses.bg} border ${colorClasses.border} flex items-center justify-center`}
                >
                    <span className={`text-lg font-bold ${colorClasses.text}`}>
                        {name[0]}
                    </span>
                </div>
                <div>
                    <h3 className={`font-bold text-base ${colorClasses.text}`}>{name}</h3>
                    <p className="text-xs text-muted-foreground">Party {isAlice ? '1' : '2'}</p>
                </div>
                <div
                    className={`ml-auto flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${colorClasses.badge}`}
                >
                    <Lock className="w-3 h-3" />
                    Private
                </div>
            </div>

            {/* Private Key Input */}
            <div className="space-y-2 mb-5">
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Secret Private Key ({varLower})
                </label>
                <div className="relative">
                    <input
                        type={showPrivate ? 'number' : 'password'}
                        value={privateKey}
                        min={1}
                        max={p - 1}
                        onChange={(e) => onPrivateKeyChange(parseInt(e.target.value) || 1)}
                        className={`w-full bg-secondary/50 border rounded-xl px-4 py-3 pr-12 text-foreground font-mono text-xl font-bold focus:outline-none focus:ring-2 transition-all ${colorClasses.inputBorder} ${colorClasses.ring}`}
                    />
                    <button
                        onClick={() => setShowPrivate(!showPrivate)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        title={showPrivate ? 'Hide private key' : 'Show private key'}
                    >
                        {showPrivate ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                </div>
                <p className="text-xs text-muted-foreground">
                    Choose a secret integer: 1 ≤ {varLower} &lt; {p}
                </p>
            </div>

            {/* Public Key Result */}
            <div className={`rounded-xl ${colorClasses.bg} border ${colorClasses.border} p-4`}>
                <div className="flex items-center gap-2 mb-2">
                    <Key className={`w-4 h-4 ${colorClasses.text}`} />
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Computed Public Key ({varUpper})
                    </span>
                </div>
                <div className="flex items-baseline gap-3">
                    <span
                        className={`text-3xl font-extrabold font-mono ${colorClasses.text}`}
                    >
                        {publicKey}
                    </span>
                    <span className="text-xs text-muted-foreground font-mono">
                        = {g}^{privateKey} mod {p}
                    </span>
                </div>
                <div className="mt-2 pt-2 border-t border-border/50">
                    <p className="text-xs text-muted-foreground">
                        Formula:{' '}
                        <code className={`font-mono font-semibold ${colorClasses.text}`}>
                            {varUpper} = g^{varLower} mod p
                        </code>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PartyKeyInput;
