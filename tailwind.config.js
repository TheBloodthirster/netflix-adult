module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  theme: {
    extend: {
      colors: {
        netflix: {
          red: '#E50914',
          black: '#141414',
          gray: '#333333',
          lightgray: '#757575'
        }
      },
      fontFamily: {
        netflix: ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif']
      }
    }
  },
  plugins: []
};
