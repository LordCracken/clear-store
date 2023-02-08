import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { Card, CardContent, Typography } from '@mui/material';
import { RootState } from '../store';

const ProfilePage = () => {
  const { email, firstName, lastName } = useSelector((state: RootState) => state.user.user);

  if (!email) {
    return <Navigate to="/auth" />;
  }

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
