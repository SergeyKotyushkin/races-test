import Account from "./account";
import { makeStyles } from '@material-ui/core/styles';
import { Toolbar, Typography, AppBar } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar position="static" color="inherit">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>Races</Typography>
        <Account />
      </Toolbar>
    </AppBar>
  )
}

export default Header;
