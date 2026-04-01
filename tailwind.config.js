export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],

  theme: {

    extend: {

      colors: {

        primary: "#111111",

        secondary: "#6b6b6b",

        border: "#e5e5e5",

        surface: "#f7f7f7",

      },

      borderRadius: {

        xl: "14px",

        "2xl": "20px",

      },

      maxWidth: {

        container: "1280px",

      },

      boxShadow: {

        card: "0 1px 2px rgba(0,0,0,0.04)",

      },

    },

  },

  plugins: [],

}