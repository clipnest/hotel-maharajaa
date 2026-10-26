import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Yatra One', 'Georgia', 'serif'],
        body:    ['Poppins', 'system-ui', 'sans-serif'],
      },
      colors: {
        smoke:   '#14100D',
        surface: '#1F1914',
        raised:  '#2A221B',
        cream:   '#FFF4E0',
        ember:   '#FF6B1A',
        turmeric:'#F5B82E',
        veg:     '#4CC05A',
        nonveg:  '#FF5468',
        'nonveg-deep': '#C41E3A',
        muted:   '#C9B8A3',
        'day-bg':'#FFF8EC',
        'day-ink':'#2A1D14',
        'day-accent':'#B8420A',
      },
      screens: {
        'xs': '360px',
        'sm': '480px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl':'1536px',
      },
      maxWidth: {
        'container': '1200px',
        'hero':      '1360px',
      },
      borderRadius: {
        card: '12px',
        pill: '999px',
      },
      boxShadow: {
        'glow-ember':  '0 0 24px rgba(255,107,26,.35)',
        'glow-ember-lg':'0 0 40px rgba(255,107,26,.6)',
        'glow-veg':    '0 0 24px rgba(76,192,90,.4)',
        'glow-nonveg': '0 0 24px rgba(255,84,104,.4)',
        'glow-turmeric':'0 0 24px rgba(245,184,46,.4)',
      },
      animation: {
        'spin-slow':   'spin 20s linear infinite',
        'pulse-ring':  'pulse-ring 1.6s ease-out infinite',
        'glow-breathe':'glow-breathe 2.4s ease-in-out infinite',
        'float':       'float 6s ease-in-out infinite',
      },
      keyframes: {
        'pulse-ring': {
          '0%':   { transform: 'scale(1)',   opacity: '1' },
          '100%': { transform: 'scale(2.2)', opacity: '0' },
        },
        'glow-breathe': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255,107,26,.3)' },
          '50%':      { boxShadow: '0 0 45px rgba(255,107,26,.7)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#FFF4E0',
            h1: { color: '#FFF4E0', fontFamily: 'Yatra One, serif' },
            h2: { color: '#FFF4E0', fontFamily: 'Yatra One, serif' },
            a:  { color: '#FF6B1A' },
          },
        },
      },
    },
  },
  plugins: [],
}

export default config
