import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTeam } from '../lib/react-hooks/use-team';
import { CircularProgress, Button, Menu, MenuItem } from '@material-ui/core';
import GroupWorkIcon from '@material-ui/icons/GroupWork';

const Team = () => {
  const router = useRouter();
  const [team, { error, mutate }] = useTeam();
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
    if (team === null) {
      router.replace('/auth');
    }
  }, [team]);

  if (error) return <></>; // do nothing here, handle error in parent component
  if (team === undefined) return <CircularProgress color="inherit" />;
  if (team === null) return <></>;

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
        {team.name}
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

export default Team;
