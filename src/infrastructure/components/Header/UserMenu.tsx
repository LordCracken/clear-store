import { MouseEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// MUI
import { Box, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
// Store
import { UserInstance } from '../../../adapters/presenter';

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
    {
      label: 'Выйти',
      action: () => {
        navigate('./');
        UserInstance.signOut();
      },
    },
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
          <AccountCircle sx={{ color: '#fff' }} />
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
