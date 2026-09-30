/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace']
      },
      colors: {
        abyss: {
          950: '#040B14',
          900: '#071523',
          850: '#0A1B2C',
          800: '#0E2436',
          700: '#143349',
          600: '#1B4560',
          500: '#245A7C'
        },
        current: {
          400: '#5FC8E8',
          500: '#2FA8D6',
          600: '#1C86B4'
        },
        depth: {
          teal: '#0FDCB4',
          amber: '#F5A524',
          coral: '#F0475A'
        }
      },
      boxShadow: {
        panel: '0 1px 0 0 rgba(148,196,222,0.06) inset, 0 12px 32px -16px rgba(0,0,0,0.55)',
        glow: '0 0 0 1px rgba(47,168,214,0.25), 0 0 24px -4px rgba(47,168,214,0.35)'
      },
      backgroundImage: {
        'depth-gradient': 'radial-gradient(120% 120% at 10% 0%, #0A1F30 0%, #071523 45%, #040B14 100%)',
        'panel-sheen': 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0) 40%)'
      },
      keyframes: {
        pulseSoft: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.45 }
        },
        sweep: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        }
      },
      animation: {
        'pulse-soft': 'pulseSoft 2.4s ease-in-out infinite',
        sweep: 'sweep 2.8s linear infinite'
      }
    }
  },
  plugins: []
}
