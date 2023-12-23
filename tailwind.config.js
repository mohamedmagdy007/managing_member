/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "main-color": "#213F7D",
        "secondary-color": "#27AAE1",
        "gray-text": "#848181",
        "delete-color": "#FF0000",
        "warn-color": "#FF6969",
      },
      boxShadow: {
        "main-shadow": "0px 20px 50px 0px #DCE0F980",
      },
      backgroundImage: {
        "background-liner":
          "linear-gradient(0deg, #213F7D 0%, rgba(251, 250, 252, 0) 100%)",
        "active-item-liner":
          "linear-gradient(180deg, rgba(33, 63, 125, 0.76) 0%, #213F7D 100%)",
        "none-image": "none",
      },
    },
  },
  plugins: [],
};
