/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "rgb(var(--border))",
        input: "rgb(var(--input))",
        ring: "rgb(var(--ring))",
        background: "rgb(var(--background))",
        foreground: "rgb(var(--foreground))",
        primary: {
          DEFAULT: "rgb(var(--primary))",
          foreground: "rgb(var(--primary-foreground))",
          transparent: {
            30: "rgba(var(--primary), 0.3)",
            50: "rgba(var(--primary), 0.5)",
            80: "rgba(var(--primary), 0.8)",
          },
        },
        secondary: {
          DEFAULT: "rgb(var(--secondary))",
          foreground: "rgb(var(--secondary-foreground))",
          transparent: {
            30: "rgba(var(--secondary), 0.3)",
            50: "rgba(var(--secondary), 0.5)",
            80: "rgba(var(--secondary), 0.8)",
          },
        },
        destructive: {
          DEFAULT: "rgb(var(--destructive))",
          foreground: "rgb(var(--destructive-foreground))",
          transparent: {
            30: "rgba(var(--destructive), 0.3)",
            50: "rgba(var(--destructive), 0.5)",
            80: "rgba(var(--destructive), 0.8)",
          },
        },
        muted: {
          DEFAULT: "rgb(var(--muted))",
          foreground: "rgb(var(--muted-foreground))",
          transparent: {
            30: "rgba(var(--muted), 0.3)",
            50: "rgba(var(--muted), 0.5)",
            80: "rgba(var(--muted), 0.8)",
          },
        },
        accent: {
          DEFAULT: "rgb(var(--accent))",
          foreground: "rgb(var(--accent-foreground))",
          transparent: {
            30: "rgba(var(--accent), 0.3)",
            50: "rgba(var(--accent), 0.5)",
            80: "rgba(var(--accent), 0.8)",
          },
        },
        popover: {
          DEFAULT: "rgb(var(--popover))",
          foreground: "rgb(var(--popover-foreground))",
          transparent: {
            30: "rgba(var(--popover), 0.3)",
            50: "rgba(var(--popover), 0.5)",
            80: "rgba(var(--popover), 0.8)",
          },
        },
        card: {
          DEFAULT: "rgb(var(--card))",
          foreground: "rgb(var(--card-foreground))",
          transparent: {
            30: "rgba(var(--card), 0.3)",
            50: "rgba(var(--card), 0.5)",
            80: "rgba(var(--card), 0.8)",
          },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
