module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    screens: {
      xs1: '320px', 
      sm: '600px',
      md: '900px',
      lg: '1200px',
      xl: '1536px',
    },
    extend: {
     
      colors: {
        primaryBlack: '#161E2E',
        pseudoWhite: '#FAFAFA',
        grey: '#6B7280',
        secondaryGrey: '#161e2e4f',
        blackM:'rgba(255, 255, 255, 0.5)',
        primaryGreen: '#22E06D',
        darkGreen: '#1bbf5d',
        primaryBlue: '#007AFF',
        primaryPurple: '#BA0097',
        greyBackground: '#E5E5E5',
        primaryYellow:'#F4BE37'
      },
      boxShadow: {
        primaryShadow: '0px 0px 10px rgba(0, 0, 0, 0.05)',
        topNavBoxShadow: ' 0px 6px 8px rgba(0, 0, 0, 0.08)',
      },
    },
    keyframes: {
      marquee: {
        '0%': { transform: 'translateX(0%)' },
        '100%': {  transform: 'translateX(-100%)' },
      },
    },
    fontSize: {
      sm: '17px',
      md: '21px',   
      md1: '18px',
      lg: '28px',
      xl: '40px',
      xl2: '80px',
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
  important: 'body',
};
