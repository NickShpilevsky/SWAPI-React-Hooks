const globalStyles = {
  '@global': {
    '*, *::before, *::after': {
      margin: 0,
      padding: 0,
      boxSizing: 'inherit',
    },
    html: {
      color: '#FFF',
      boxSizing: 'border-box',
      fontSize: '100%',
    },
    '.hidden': {
      visibility: 'hidden',
    },
  },
};

export default globalStyles;