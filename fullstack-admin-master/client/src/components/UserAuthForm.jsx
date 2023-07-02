import React, { useState } from 'react';
import { Button, TextField, Grid, CircularProgress } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

const UserAuthForm = () => {
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = (event) => {
      event.preventDefault();
      setIsLoading(true);
  
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    };
  
    return (
      <form onSubmit={onSubmit}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              fullWidth
              disabled={isLoading}
            />
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" type="submit" disabled={isLoading}>
              {isLoading ? <CircularProgress size={24} /> : 'Sign In with Email'}
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" startIcon={<GitHubIcon />} disabled={isLoading}>
              {isLoading ? <CircularProgress size={24} /> : 'Github'}
            </Button>
          </Grid>
        </Grid>
      </form>
    );
}

export default UserAuthForm;