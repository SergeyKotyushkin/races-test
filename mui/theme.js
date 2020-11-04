import { createMuiTheme } from '@material-ui/core/styles';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#339434',
    },
    secondary: {
      main: '#ffd700',
    }
  },
});

export default theme;
