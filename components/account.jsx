import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAccount } from '../lib/react-hooks/use-account';
import { CircularProgress, Button, Menu, MenuItem } from '@material-ui/core';
import GroupWorkIcon from '@material-ui/icons/GroupWork';

const Account = () => {
  const router = useRouter();
  const [account, { error, mutate }] = useAccount();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  const handleLogout = async (event) => {
    event.preventDefault();

    await fetch('/api/auth', {
      method: 'DELETE',
    });

    mutate(null);
    // router.replace('/auth');
  }

  useEffect(() => {
    if (account === null) {
      router.replace('/auth');
    }
  }, [account]);

  if (error) return <></>; // do nothing here, handle error in parent component
  if (account === undefined) return <CircularProgress color="inherit" />;
  if (account === null) return <></>;

  return (
    <>
      <Button
        color="inherit"
        aria-label="profile"
        aria-controls="profile-menu"
        aria-haspopup="true"
        onClick={handleClick}
        endIcon={<GroupWorkIcon />}
      >
        {account.name}
      </Button>
      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
      >
        <MenuItem key="logout" onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  )
}

export default Account;
