import React from 'react';
import { Shield, Lock, Key } from 'lucide-react';

const Header: React.FC = () => {
    return (
        <header className="relative overflow-hidden">
            {/* Background with gradient overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/assets/generated/dh-hero-banner.dim_1200x300.png"
                    alt="Diffie-Hellman Key Exchange"
                    className="w-full h-full object-cover opacity-20"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
                <div className="absolute inset-0 bg-gradient-to-r from-alice-bg/40 via-transparent to-bob-bg/40" />
            </div>

            {/* Decorative orbs */}
            <div
                className="absolute top-8 left-16 w-48 h-48 rounded-full opacity-10 blur-3xl"
                style={{ background: 'oklch(0.72 0.18 195)' }}
            />
            <div
                className="absolute top-4 right-16 w-56 h-56 rounded-full opacity-10 blur-3xl"
                style={{ background: 'oklch(0.78 0.18 65)' }}
            />

            <div className="relative z-10 max-w-5xl mx-auto px-6 py-14 text-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-secondary/50 text-muted-foreground text-xs font-medium tracking-widest uppercase mb-6">
                    <Shield className="w-3.5 h-3.5 text-alice" />
                    Cryptography · Key Agreement Protocol
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 leading-tight">
                    <span className="gradient-text">Diffie-Hellman</span>
                    <br />
                    <span className="text-foreground">Key Exchange</span>
                </h1>

                {/* Subtitle */}
                <p className="text-lg md:text-xl text-muted-foreground font-medium mb-6">
                    Interactive Step-by-Step Demonstration
                </p>

                {/* Description */}
                <p className="max-w-2xl mx-auto text-sm md:text-base text-muted-foreground leading-relaxed">
                    The Diffie-Hellman protocol allows two parties — <span className="text-alice font-semibold">Alice</span> and{' '}
                    <span className="text-bob font-semibold">Bob</span> — to establish a shared secret key over an insecure
                    channel without ever transmitting the secret itself. It relies on the mathematical difficulty of the
                    discrete logarithm problem, making it computationally infeasible for an eavesdropper to derive the
                    shared secret from the publicly exchanged values.
                </p>

                {/* Feature pills */}
                <div className="flex flex-wrap justify-center gap-3 mt-8">
                    {[
                        { icon: Key, label: 'Public Key Cryptography', color: 'text-alice' },
                        { icon: Lock, label: 'Discrete Logarithm Problem', color: 'text-bob' },
                        { icon: Shield, label: 'Secure Key Agreement', color: 'text-success' },
                    ].map(({ icon: Icon, label, color }) => (
                        <div
                            key={label}
                            className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/60 border border-border text-sm font-medium"
                        >
                            <Icon className={`w-4 h-4 ${color}`} />
                            <span className="text-foreground/80">{label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </header>
    );
};

export default Header;
