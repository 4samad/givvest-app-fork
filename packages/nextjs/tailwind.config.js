/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./utils/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("daisyui")],
  darkTheme: "dark",
  darkMode: ["selector", "[data-theme='dark']"],
  // DaisyUI theme colors
  daisyui: {
    themes: [
      {
        givvest: {
          primary: "#1E40AF", // Strong blue for primary buttons and elements
          "primary-content": "#F9FBFF", // White content on primary elements

          secondary: "#FBBF24", // Bright yellow for secondary elements
          "secondary-content": "#212638", // Dark content on secondary elements

          accent: "#10B981", // Green accent for highlighted elements
          "accent-content": "#ffffff", // White content on accent elements

          neutral: "#1F2937", // Dark gray for neutral elements
          "neutral-content": "#ffffff", // White content on neutral elements

          "base-100": "#171717", // Very dark background for better readability
          "base-200": "#1F1F1F", // Slightly lighter dark background
          "base-300": "#2A2A2A", // Even lighter dark background
          "base-content": "#F9FBFF", // Light content for base elements

          info: "#66c7ff", // Light blue for informational elements
          success: "#87cf3a", // Green for success elements
          warning: "#e1d460", // Yellow for warning elements
          error: "#ff6b6b", // Red for error elements

          "--rounded-box": "0rem", // Border radius for cards and other large boxes
          "--rounded-btn": "0rem", // Border radius for buttons
          "--rounded-badge": "1.9rem", // Border radius for badges
          "--animation-btn": "0.25s", // Duration of animation when you click on button
          "--animation-input": "0.2s", // Duration of animation for inputs like checkbox, toggle, radio, etc
          "--btn-text-case": "uppercase", // Text case for buttons
          "--navbar-padding": "0.5rem", // Padding for navbar
          "--border-btn": "1px", // Border width of buttons

          ".tooltip": {
            "--tooltip-tail": "6px",
            "--tooltip-color": "oklch(var(--p))",
          },
          ".link": {
            textUnderlineOffset: "2px",
          },
          ".link:hover": {
            opacity: "80%",
          },
        },
      },
    ],
  },
  theme: {
    extend: {
      boxShadow: {
        center: "0 0 12px -2px rgb(0 0 0 / 0.05)",
      },
      animation: {
        "pulse-fast": "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
};
