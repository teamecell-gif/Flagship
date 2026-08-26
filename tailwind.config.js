/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./*.html",
    "./assets/js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        'background':               '#050814',
        'surface':                  '#090e1a',
        'surface-dim':              '#050814',
        'surface-bright':           '#1e293b',
        'surface-container-lowest': '#030610',
        'surface-container-low':    '#080d18',
        'surface-container':        '#0d1424',
        'surface-container-high':   '#141d33',
        'surface-container-highest':'#1c2844',
        'on-surface':               '#f1f5f9',
        'on-background':            '#f1f5f9',
        'on-surface-variant':       '#94a3b8',
        'outline':                  '#475569',
        'outline-variant':          '#1e293b',
        'primary':                  '#38bdf8',
        'on-primary':               '#0c4a6e',
        'primary-container':        '#0284c7',
        'on-primary-container':     '#fff',
        'secondary':                '#818cf8',
        'on-secondary':             '#1e1b4b',
        'secondary-container':      '#4f46e5',
        'on-secondary-container':   '#fff',
        'error':                    '#ef4444',
        'on-error':                 '#fff',
        'error-container':          '#7f1d1d',
        'on-error-container':       '#fca5a5',
        'glass-stroke':             'rgba(255, 255, 255, 0.08)',
        'glass-fill':               'rgba(255, 255, 255, 0.03)'
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries')
  ],
}
