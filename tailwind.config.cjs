/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: "var(--card)",
        'card-foreground': "var(--card-foreground)",
        popover: "var(--popover)",
        'popover-foreground': "var(--popover-foreground)",
        primary: "var(--primary)",
        'primary-foreground': "var(--primary-foreground)",
        secondary: "var(--secondary)",
        'secondary-foreground': "var(--secondary-foreground)",
        muted: "var(--muted)",
        'muted-foreground': "var(--muted-foreground)",
        accent: "var(--accent)",
        'accent-foreground': "var(--accent-foreground)",
        destructive: "var(--destructive)",
        'destructive-foreground': "var(--destructive-foreground)",
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        gold: "var(--gold)",
        'gold-foreground': "var(--gold-foreground)",
        'input-background': "var(--input-background)",
      },
      fontFamily: {
        display: ['Metropolis','system-ui','-apple-system','sans-serif'],
        heading: ['Metropolis','system-ui','-apple-system','sans-serif'],
        subheading: ['Inter','system-ui','-apple-system','sans-serif'],
        body: ['Inter','system-ui','-apple-system','sans-serif'],
        ui: ['Inter','system-ui','-apple-system','sans-serif'],
        metropolis: ['Metropolis','system-ui','-apple-system','sans-serif'],
      },
      borderRadius: {
        sm: 'calc(var(--radius) - 2px)',
        md: 'var(--radius)',
        lg: 'calc(var(--radius) + 2px)',
        xl: 'calc(var(--radius) + 6px)',
      },
    },
  },
  plugins: [],
}


