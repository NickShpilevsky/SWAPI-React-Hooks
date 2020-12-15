import { createMuiTheme } from '@material-ui/core/styles';

import { COLOR_PRIMARY, COLOR_SECONDARY, COLOR_WHITE, PINK } from '../styles/variables';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: COLOR_PRIMARY,
    },
    secondary: {
      main: COLOR_SECONDARY,
    },
    inherit: PINK,
    white: COLOR_WHITE,
  },
  typography: {
    htmlFontSize: 10,
    fontSize: 10, //In menu
    h1: {
      fontSize: '5rem',
    },
  },
});

export default theme;