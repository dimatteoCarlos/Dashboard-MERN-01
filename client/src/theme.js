//theme.js
//color design tokens to export
/*
install extension Tailwind shades
select the color and press ctrl+k ctrl+g
create tokensLight palette from tokensDark,
*/
import { reverseToken } from './helpers/reverseToken.js';

export const tokensDark = {
  grey: {
    0: '#ffffff',
    10: '#f6f6f6',
    50: '#f0f0f0',
    100: '#e0e0e0',
    200: '#c2c2c2',
    300: '#a3a3a3',
    400: '#858585',
    500: '#666666',
    600: '#525252',
    700: '#3d3d3d',
    800: '#292929',
    900: '#141414',
    1000: '#000000',
  },

  primary: {
    //bluish
    100: '#d3d4de',
    200: '#a6a9be',
    300: '#7a7f9d',
    400: '#4d547d',
    500: '#21295c',
    600: '#191F45', // manually adjusted
    700: '#141937',
    800: '#0d1025',
    900: '#070812',
  },
  secondary: {
    //yellowish: {
    50: '#f0f0f0', //adjusted
    100: '#fff6e0',
    200: '#ffedc2',
    300: '#ffe3a3',
    400: '#ffda85',
    500: '#ffd166', //base central
    600: '#cca752',
    700: '#997d3d',
    800: '#665429',
    900: '#332a14',
  },

  //other colors added
  teal: {
    100: '#ccf2d7',
    200: '#99e5b0',
    300: '#66d888',
    400: '#33cb61',
    500: '#00be39',
    600: '#00982e',
    700: '#007222',
    800: '#004c17',
    900: '#00260b',
  },

  green: {
    100: '#dafdf5',
    200: '#b4fbec',
    300: '#8ffae2',
    400: '#69f8d9',
    500: '#44f6cf',
    600: '#36c5a6',
    700: '#29947c',
    800: '#1b6253',
    900: '#0e3129',
  },

  pink: {
    100: '#f0dafd',
    200: '#e0b4fb',
    300: '#d18ffa',
    400: '#c169f8',
    500: '#b244f6',
    600: '#8e36c5',
    700: '#6b2994',
    800: '#471b62',
    900: '#240e31',
  },
};

//create tokensLight palette from tokensDark, by finding the complement (reverse) color of tokensDark

export const tokensLight = reverseToken(tokensDark);

//mui theme settings
export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === 'dark'
        ? {
            //palette values for kark mode
            primary: {
              ...tokensDark.primary,
              main: tokensDark.primary[400],
              light: tokensLight.primary[400], //changed
            },
            secondary: {
              ...tokensDark.secondary,
              main: tokensDark.secondary[300],
              light: tokensLight.secondary[300], //changed
            },
            neutral: {
              ...tokensDark.grey,
              main: tokensDark.grey[500],
            },
            background: {
              default: tokensDark.primary[600],
              alt: tokensDark.primary[500],
            },
          }
        : {
            //palette values for light mode
            primary: {
              ...tokensLight.primary,
              main: tokensDark.grey[50],
              light: tokensDark.grey[100],
            },
            secondary: {
              ...tokensLight.secondary,
              main: tokensDark.secondary[600],
              light: tokensLight.secondary[700],
            },
            neutral: {
              ...tokensLight.grey,
              main: tokensDark.grey[500],
            },
            background: {
              default: tokensDark.grey[0],
              alt: tokensDark.grey[50],
            },
          }),
    },

    typography: {
      fontFamily: ['Inter', 'sans-serif'].join(','),
      fontSize: 12,
      h1: {
        fontFamily: ['Inter', 'sans-serif'].join(','),
        fontSize: 40,
      },
      h2: {
        fontFamily: ['Inter', 'sans-serif'].join(','),
        fontSize: 32,
      },
      h3: {
        fontFamily: ['Inter', 'sans-serif'].join(','),
        fontSize: 24,
      },
      h4: {
        fontFamily: ['Inter', 'sans-serif'].join(','),
        fontSize: 20,
      },
      h5: {
        fontFamily: ['Inter', 'sans-serif'].join(','),
        fontSize: 16,
      },
      h6: {
        fontFamily: ['Inter', 'sans-serif'].join(','),
        fontSize: 14,
      },
    },
  };
};
