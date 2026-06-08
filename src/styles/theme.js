export const theme = {
  token: {
    colorPrimary: '#004c9d',
    fontFamily: "Montserrat, sans-serif",
  },
  components: {
    Button: {
      defaultBg: '#ffffff',
      defaultHoverBg: '#004c9d',
      defaultBorderColor: '#004c9d',
      defaultColor: '#004c9d',
      defaultHoverColor: '#ffffff',
      defaultShadow: 'none',
      borderRadius: 5,
      borderRadiusLG: 5,
      fontWeight: 500,
      fontSize: 16,
      controlHeight: 'auto',
      primaryShadow: 'none',
    },
    Input: {
      defaultShadow: 'none',
      activeShadow: 'none',
      inputFontSize: 16,
      borderRadius: 5,
      paddingInline: 5,
      controlHeight: 44,
    },
    Select: {
      activeOutlineColor: 'none',
      activeShadow: 'none',
      fontSize: 16,
      controlHeight: 44,
    },
    Checkbox: {
      lineHeight: '1.3',
    }
  }
}

export const customTheme = {
  color: {
    primary: '#004c9d',
    primaryDark: '#182232',
    secondary: '#f8f8f8',
    white: '#fff',
    black: '#20252C',
    greyLight: '#f9f9f9',
    grey: '#737373',
    red: '#ff4646',
    positive: '#10C44CFF',
    oldPrice: '#99A3AEFF',
    sale: '#f1117e',
    new: '#f1cc11',
    blue: '#004c9d',
    lightBlue: '#f4f7fb',
  },
  font: {
    primary: 'Martian Mono, monospace',
    secondary: 'Montserrat, sans-serif',
  },
  radius: {
    r7: '.7rem',
    r10: '1rem',
    r15: '1.5rem',
    r20: '2rem',
  },
  transition: {
    small: '.3s ease-in-out',
    medium: '.5s ease-in-out',
    large: '.7s ease-in-out',
  },
  breakpoint: {
    small: '480px',
    mobile: '550px',
    tablet: '768px',
    semiDesktop: '992px',
    desktop: '1024px',
    w1250: '1250px',
    laptop: '1440px',
    w1600: '1600px'
  }
}
