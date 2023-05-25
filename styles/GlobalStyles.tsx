import { DefaultTheme, createGlobalStyle } from 'styled-components';

export const getRootStyles = (theme: DefaultTheme) => {
  return {
    '--electric-green': '#3AA06F;',
    '--venetian-red': '#FF1000;',
    '--aqua': '#FF0000;',
    '--background': '#FFFFFF',
    '--text': '#000000',
    '--gradient-green':
      'linear-gradient(104.26deg, #00FF05 -17.92%, #3AA06F 20.7%, #3AA06F 66.98%, #00FF05 107.41%);',
    '--button-red':
      'linear-gradient(199.52deg, #FFFFFF -6.14%, #FF0F00 57.53%, #FFFFFF 130.61%, #FF8A83 221.12%, #FF0000 340.36%);',
    '--font-raleway': "'Raleway', sans-serif;",
    '--fs-12': '12px;',
    '--fs-16': '16px;',
    '--fs-18': '18px;',
    '--fs-20': '20px;',
    '--fs-24': '24px;',
    '--fs-30': '30px;',
    '--fs-32': '32px;',
    '--fs-36': '36px;',
    '--fs-44': '44px;',
    '--fs-48': '48px;',
    '--pd-4': '4px;',
    '--pd-7': '7px;',
    '--pd-9': '9px;',
    '--pd-16': '16px;',
    '--pd-20': '20px;',
    '--pd-26': '26px;',
    '--pd-29': '29px;',
    '--pd-33': '33px;',
    '--pd-34': '34px;',
    '--pd-38': '38px;',
    '--pd-40': '40px;',
    '--pd-41': '41px;',
    '--pd-47': '47px;',
    '--pd-53': '53px;',
    '--pd-56': '56px;',
    '--pd-62': '62px;',
    '--pd-66': '66px;',
    '--pd-70': '70px;',
    '--pd-101': '101px;',
    '--transition': '0.3s ease all;',
  };
};

export const getHTMLStyles = () => ({
  'box-sizing': 'border-box;',
  width: '100%;',
  'scroll-behavior': 'smooth;',
  'font-systhesis': 'none',
});

export const getBodyStyles = () => ({
  margin: '0px;',
  padding: '0px;',
  width: '100%;',
  'min-height': '100%;',
  'overflow-x': 'hidden;',
  'font-family': 'var(--font-raleway)',
  'font-size': 'var(--fs-16);',
  'line-height': '1.3;',
  background: 'var(--background);',
  color: 'var(--text)',
  transition: '0.3s ease all',
});

export const getBaseStyles = () => {
  return {
    'box-sizing': 'border-box;',
    margin: '0;',
    padding: '0;',
    'user-select': 'none;',
  };
};
// vertical-a
export const getAnchorStyles = (theme: DefaultTheme) => {
  return {
    display: 'inline-block;',
    'text-decoration': 'none;',
    'text-decoration-skip-ink': 'auto;',
    color: 'var(--text)',
    transition: 'var(--transition);',
    cursor: 'pointer',
    '&:hover': {
      color: 'var(--electric-green)',
    },
  };
};

export const getHeadingStyles = () => {
  return {
    'margin-top': '0;',
    'margin-bottom': '0;',
  };
};

export const getSectionStyles = () => {
  return {
    margin: '0px auto;',
    padding: '100px 0px;',
  };
};

/** Don't touch anything below, Please add any new global styles to above functions */

const GlobalStyles = createGlobalStyle`
    :root {
        ${({ theme }) => getRootStyles(theme)}
    }
    html {
        ${getHTMLStyles()}
    }
    body {
        ${getBodyStyles()}
    }
	*, ::before,::after {
        ${getBaseStyles()}
    }

    a {
        ${({ theme }) => getAnchorStyles(theme)}
    }

    h1,h2,h3,h4,h5,h6 {
        ${getHeadingStyles()}
    }

    section{
        ${getSectionStyles()}
    }
`;

export default GlobalStyles;
