import typography from '@tailwindcss/typography';
import containerQueries from '@tailwindcss/container-queries';
import animate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: ['index.html', 'src/**/*.{js,ts,jsx,tsx,html,css}'],
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px'
            }
        },
        extend: {
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
            },
            colors: {
                border: 'oklch(var(--border))',
                input: 'oklch(var(--input))',
                ring: 'oklch(var(--ring) / <alpha-value>)',
                background: 'oklch(var(--background))',
                foreground: 'oklch(var(--foreground))',
                primary: {
                    DEFAULT: 'oklch(var(--primary) / <alpha-value>)',
                    foreground: 'oklch(var(--primary-foreground))'
                },
                secondary: {
                    DEFAULT: 'oklch(var(--secondary) / <alpha-value>)',
                    foreground: 'oklch(var(--secondary-foreground))'
                },
                destructive: {
                    DEFAULT: 'oklch(var(--destructive) / <alpha-value>)',
                    foreground: 'oklch(var(--destructive-foreground))'
                },
                muted: {
                    DEFAULT: 'oklch(var(--muted) / <alpha-value>)',
                    foreground: 'oklch(var(--muted-foreground) / <alpha-value>)'
                },
                accent: {
                    DEFAULT: 'oklch(var(--accent) / <alpha-value>)',
                    foreground: 'oklch(var(--accent-foreground))'
                },
                popover: {
                    DEFAULT: 'oklch(var(--popover))',
                    foreground: 'oklch(var(--popover-foreground))'
                },
                card: {
                    DEFAULT: 'oklch(var(--card))',
                    foreground: 'oklch(var(--card-foreground))'
                },
                chart: {
                    1: 'oklch(var(--chart-1))',
                    2: 'oklch(var(--chart-2))',
                    3: 'oklch(var(--chart-3))',
                    4: 'oklch(var(--chart-4))',
                    5: 'oklch(var(--chart-5))'
                },
                sidebar: {
                    DEFAULT: 'oklch(var(--sidebar))',
                    foreground: 'oklch(var(--sidebar-foreground))',
                    primary: 'oklch(var(--sidebar-primary))',
                    'primary-foreground': 'oklch(var(--sidebar-primary-foreground))',
                    accent: 'oklch(var(--sidebar-accent))',
                    'accent-foreground': 'oklch(var(--sidebar-accent-foreground))',
                    border: 'oklch(var(--sidebar-border))',
                    ring: 'oklch(var(--sidebar-ring))'
                }
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            boxShadow: {
                xs: '0 1px 2px 0 rgba(0,0,0,0.05)',
                'card': '0 4px 24px rgba(0,0,0,0.4)',
                'card-hover': '0 8px 40px rgba(0,0,0,0.5)',
            },
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' }
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' }
                },
                'pulse-glow': {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.7' }
                },
                'fade-in-up': {
                    from: { opacity: '0', transform: 'translateY(16px)' },
                    to: { opacity: '1', transform: 'translateY(0)' }
                },
                'travel-right': {
                    '0%': { opacity: '0', transform: 'translateX(-40px)' },
                    '15%': { opacity: '1', transform: 'translateX(-20px)' },
                    '85%': { opacity: '1', transform: 'translateX(20px)' },
                    '100%': { opacity: '0', transform: 'translateX(40px)' }
                },
                'travel-left': {
                    '0%': { opacity: '0', transform: 'translateX(40px)' },
                    '15%': { opacity: '1', transform: 'translateX(20px)' },
                    '85%': { opacity: '1', transform: 'translateX(-20px)' },
                    '100%': { opacity: '0', transform: 'translateX(-40px)' }
                },
                'pop-in': {
                    '0%': { opacity: '0', transform: 'scale(0.7)' },
                    '60%': { opacity: '1', transform: 'scale(1.1)' },
                    '100%': { opacity: '1', transform: 'scale(1)' }
                },
                'shimmer': {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' }
                },
                'particle-float': {
                    '0%': { transform: 'translate(0px, 0px) scale(1)', opacity: '0.6' },
                    '20%': { transform: 'translate(18px, -22px) scale(1.08)', opacity: '0.9' },
                    '40%': { transform: 'translate(-12px, -40px) scale(0.95)', opacity: '0.7' },
                    '60%': { transform: 'translate(25px, -18px) scale(1.05)', opacity: '0.85' },
                    '80%': { transform: 'translate(-8px, 10px) scale(0.98)', opacity: '0.65' },
                    '100%': { transform: 'translate(0px, 0px) scale(1)', opacity: '0.6' },
                },
                'blob-drift-1': {
                    '0%, 100%': { transform: 'translate(0, 0) scale(1) rotate(0deg)' },
                    '33%': { transform: 'translate(40px, 30px) scale(1.05) rotate(5deg)' },
                    '66%': { transform: 'translate(-20px, 50px) scale(0.97) rotate(-3deg)' },
                },
                'blob-drift-2': {
                    '0%, 100%': { transform: 'translate(0, 0) scale(1) rotate(0deg)' },
                    '33%': { transform: 'translate(-50px, -30px) scale(1.04) rotate(-4deg)' },
                    '66%': { transform: 'translate(30px, -50px) scale(0.96) rotate(6deg)' },
                },
                'blob-drift-3': {
                    '0%, 100%': { transform: 'translate(0, 0) scale(1) rotate(0deg)' },
                    '50%': { transform: 'translate(-35px, 40px) scale(1.06) rotate(-5deg)' },
                },
                'blob-drift-4': {
                    '0%, 100%': { transform: 'translate(0, 0) scale(1) rotate(0deg)' },
                    '50%': { transform: 'translate(30px, -35px) scale(1.04) rotate(4deg)' },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
                'fade-in-up': 'fade-in-up 0.4s ease-out forwards',
                'travel-right': 'travel-right 1.1s ease-in-out forwards',
                'travel-left': 'travel-left 1.1s ease-in-out forwards',
                'pop-in': 'pop-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
                'shimmer': 'shimmer 2s linear infinite',
                'particle-float': 'particle-float linear infinite',
                'blob-drift-1': 'blob-drift-1 28s ease-in-out infinite',
                'blob-drift-2': 'blob-drift-2 32s ease-in-out infinite',
                'blob-drift-3': 'blob-drift-3 24s ease-in-out infinite',
                'blob-drift-4': 'blob-drift-4 20s ease-in-out infinite',
            }
        }
    },
    plugins: [typography, containerQueries, animate]
};
