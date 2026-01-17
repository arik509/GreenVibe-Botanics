/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './pages/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
      './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {},
    },
    plugins: [require('daisyui')],
    daisyui: {
      themes: [
        {
          greenvibe: {
            "primary": "#10b981",
            "secondary": "#059669",
            "accent": "#34d399",
            "neutral": "#1f2937",
            "base-100": "#ffffff",
            "info": "#3b82f6",
            "success": "#22c55e",
            "warning": "#f59e0b",
            "error": "#ef4444",
          },
        },
        "light",
        "dark",
      ],
    },
  }
  