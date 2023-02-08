import { MouseEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Box, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';

const UserMenu = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const settings = [
    {
      label: 'Профиль',
      action: () => {
        navigate('/profile');
      },
    },
    { label: 'Выйти', action: () => null },
  ];

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map(setting => (
          <MenuItem key={setting.label} onClick={setting.action}>
            <Typography textAlign="center">{setting.label}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default UserMenu;
