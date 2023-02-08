import { NavLink } from 'react-router-dom';
import { Typography } from '@mui/material';

const Logo = () => (
  <Typography
    variant="h6"
    noWrap
    component="h1"
    sx={{
      display: 'flex',
      flexGrow: 1,
      mr: 2,
      fontFamily: 'monospace',
      fontWeight: 700,
      letterSpacing: '.3rem',
      color: 'inherit',
      textDecoration: 'none',

      a: {
        textDecoration: 'inherit',
        color: 'inherit',
      },
    }}
  >
    <NavLink to="/">PROGRAMMATICON</NavLink>
  </Typography>
);

export default Logo;
