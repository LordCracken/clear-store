import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// MUI
import { Card, CardContent, Typography } from '@mui/material';
// Store
import { RootState } from '../../adapters/redux';

const ProfilePage = () => {
  const { email, firstName, lastName } = useSelector((state: RootState) => state.user.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!email) {
      navigate('/auth');
    }
  }, []);

  return (
    <Card>
      <CardContent>
        <Typography variant="h2" component="h1" sx={{ fontWeight: 700 }}>
          {firstName} {lastName}
        </Typography>
        <Typography variant="h3" component="h2" sx={{ fontStyle: 'italic' }}>
          {email}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProfilePage;
