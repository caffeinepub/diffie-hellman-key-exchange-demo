import React from 'react';

const particles = [
  { size: 6, top: '12%', left: '8%', color: 'alice', delay: '0s', duration: '18s' },
  { size: 4, top: '35%', left: '92%', color: 'bob', delay: '3s', duration: '22s' },
  { size: 8, top: '65%', left: '5%', color: 'purple', delay: '6s', duration: '16s' },
  { size: 5, top: '80%', left: '75%', color: 'alice', delay: '1.5s', duration: '20s' },
  { size: 7, top: '20%', left: '55%', color: 'bob', delay: '9s', duration: '25s' },
  { size: 3, top: '50%', left: '40%', color: 'cyan', delay: '4s', duration: '14s' },
  { size: 5, top: '90%', left: '30%', color: 'purple', delay: '7s', duration: '19s' },
  { size: 4, top: '5%', left: '70%', color: 'cyan', delay: '2s', duration: '23s' },
];

const colorMap: Record<string, string> = {
  alice: 'rgba(56, 210, 220, 0.7)',
  bob: 'rgba(240, 180, 60, 0.7)',
  purple: 'rgba(180, 100, 240, 0.7)',
  cyan: 'rgba(80, 230, 200, 0.7)',
};

const glowColorMap: Record<string, string> = {
  alice: 'rgba(56, 210, 220, 0.15)',
  bob: 'rgba(240, 180, 60, 0.15)',
  purple: 'rgba(180, 100, 240, 0.15)',
  cyan: 'rgba(80, 230, 200, 0.15)',
};

export default function BackgroundDecorations() {
  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {/* Deep base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(20, 40, 80, 0.9) 0%, transparent 70%), ' +
            'radial-gradient(ellipse 60% 50% at 0% 100%, rgba(10, 30, 60, 0.8) 0%, transparent 60%)',
        }}
      />

      {/* Teal/cyan blob — top-left */}
      <div
        className="absolute blob-drift-1"
        style={{
          top: '-10%',
          left: '-8%',
          width: '55vw',
          height: '55vw',
          maxWidth: 700,
          maxHeight: 700,
          borderRadius: '60% 40% 55% 45% / 50% 60% 40% 50%',
          background:
            'radial-gradient(ellipse at 40% 40%, rgba(56, 210, 220, 0.18) 0%, rgba(30, 160, 200, 0.08) 50%, transparent 75%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Amber/orange blob — bottom-right */}
      <div
        className="absolute blob-drift-2"
        style={{
          bottom: '-12%',
          right: '-10%',
          width: '60vw',
          height: '60vw',
          maxWidth: 750,
          maxHeight: 750,
          borderRadius: '45% 55% 40% 60% / 55% 45% 60% 40%',
          background:
            'radial-gradient(ellipse at 60% 60%, rgba(240, 180, 60, 0.16) 0%, rgba(220, 120, 40, 0.07) 50%, transparent 75%)',
          filter: 'blur(50px)',
        }}
      />

      {/* Purple blob — top-right */}
      <div
        className="absolute blob-drift-3"
        style={{
          top: '5%',
          right: '-5%',
          width: '40vw',
          height: '40vw',
          maxWidth: 500,
          maxHeight: 500,
          borderRadius: '55% 45% 60% 40% / 40% 60% 45% 55%',
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(160, 80, 240, 0.14) 0%, rgba(100, 50, 200, 0.06) 55%, transparent 75%)',
          filter: 'blur(45px)',
        }}
      />

      {/* Cyan blob — center-left */}
      <div
        className="absolute blob-drift-4"
        style={{
          top: '40%',
          left: '-5%',
          width: '35vw',
          height: '35vw',
          maxWidth: 450,
          maxHeight: 450,
          borderRadius: '50% 50% 45% 55% / 60% 40% 55% 45%',
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(60, 220, 200, 0.12) 0%, rgba(30, 180, 180, 0.05) 55%, transparent 75%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Geometric grid overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(100, 180, 220, 0.04) 1px, transparent 1px), ' +
            'linear-gradient(90deg, rgba(100, 180, 220, 0.04) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Diagonal mesh lines */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, rgba(100, 200, 220, 0.02) 0px, rgba(100, 200, 220, 0.02) 1px, transparent 1px, transparent 80px)',
        }}
      />

      {/* Floating particles / orbs */}
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full particle-float"
          style={{
            top: p.top,
            left: p.left,
            width: p.size * 4,
            height: p.size * 4,
            background: `radial-gradient(circle at 35% 35%, ${colorMap[p.color]}, transparent 70%)`,
            boxShadow: `0 0 ${p.size * 6}px ${p.size * 2}px ${glowColorMap[p.color]}`,
            animationDelay: p.delay,
            animationDuration: p.duration,
            opacity: 0.8,
          }}
        />
      ))}

      {/* Horizontal scan line shimmer */}
      <div
        className="absolute inset-x-0"
        style={{
          top: 0,
          height: '100%',
          background:
            'linear-gradient(180deg, transparent 0%, rgba(56, 210, 220, 0.03) 30%, transparent 60%, rgba(240, 180, 60, 0.02) 80%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Top edge glow line */}
      <div
        className="absolute inset-x-0 top-0"
        style={{
          height: 2,
          background:
            'linear-gradient(90deg, transparent 0%, rgba(56, 210, 220, 0.5) 30%, rgba(160, 80, 240, 0.5) 60%, rgba(240, 180, 60, 0.4) 85%, transparent 100%)',
        }}
      />
    </div>
  );
}
