import React from 'react';
import { Box, Container, Grid, Typography, Link } from '@mui/material';
import UserAuthForm from "components/UserAuthForm";
import LoginPage from 'components/Login';

const Authentication = () => {
  return (
    <LoginPage/>
    // <Grid container>
    //   <Grid item xs={12} sm={6}>
    //     <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'primary.main', color: 'black' }}>
    //       <Typography variant="h4" component="h1">
    //         Aleth Inc
    //       </Typography>
    //       <Typography variant="body1">
    //         "This library has saved me countless hours of work and helped me deliver stunning designs to my clients faster than ever before."
    //       </Typography>
    //       <Typography variant="body2">
    //         - Sofia Davis
    //       </Typography>
    //     </Box>
    //   </Grid>
    //   <Grid item xs={12} sm={6}>
    //     <Container maxWidth="sm">
    //       <Grid container direction="column" alignItems="center" spacing={2}>
    //         <Grid item>
    //           <Typography variant="h4" component="h1">
    //             Create an account
    //           </Typography>
    //           <Typography variant="body1">
    //             Enter your email below to create your account
    //           </Typography>
    //         </Grid>
    //         <Grid item>
    //           <UserAuthForm />
    //         </Grid>
    //         <Grid item>
    //           <Typography variant="body2">
    //             By clicking continue, you agree to our{' '}
    //             <Link href="/terms">Terms of Service</Link> and{' '}
    //             <Link href="/privacy">Privacy Policy</Link>.
    //           </Typography>
    //         </Grid>
    //       </Grid>
    //     </Container>
    //   </Grid>
    // </Grid>
  );
}

export default Authentication;