import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// MUI
import { Card, CardContent, Typography } from '@mui/material';
// Store
import { UserInstance } from '../../adapters/presenter';

const ProfilePage = () => {
  const { isAuthenticated, firstName, lastName } = UserInstance;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    }
  }, []);

  return (
    <Card>
      <CardContent>
        <Typography variant="h2" component="h1" sx={{ fontWeight: 700 }}>
          {firstName} {lastName}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProfilePage;
