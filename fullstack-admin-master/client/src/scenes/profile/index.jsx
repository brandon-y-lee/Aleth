import { React, useEffect, useState } from "react";

import { Box, Button, Card, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material';
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useGetSupplierDataQuery } from "state/api";

const Profile = () => {
    const [user, setUser] = useState(null);
    const { userId } = useParams();
    console.log(userId);

    let {data: supplierData, isLoading: isLoadingSupplierData} = useGetSupplierDataQuery({userId});

    console.log(supplierData);

    return (
        <Box sx={{ backgroundColor: '#9de2ff', py: 5, minHeight: '100vh' }}>
          <Container>
            <Grid container justifyContent="center" alignItems="center" style={{ height: '100%' }}>
              <Grid item lg={9} xl={7}>
                <Card>
                  <Box sx={{ display: 'flex', flexDirection: 'row', p: 2, backgroundColor: '#000' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 4, mt: 5 }}>
                      <CardMedia component="img" image="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp" sx={{ width: 150, mt: 4, mb: 2 }} />
                      <Button variant="outlined" color="inherit" sx={{ height: 36 }}>Edit profile</Button>
                    </Box>
                    <Box sx={{ ml: 3, mt: 13 }}>
                      <Typography variant="h5" color="white">Andy Horwitz</Typography>
                      <Typography variant="body1" color="white">New York</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ p: 4, backgroundColor: '#f8f9fa' }}>
                    <Grid container justifyContent="space-between" alignItems="center">
                      <Grid item>
                        <Typography variant="h5">253</Typography>
                        <Typography variant="body2" color="textSecondary">Photos</Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="h5">1026</Typography>
                        <Typography variant="body2" color="textSecondary">Followers</Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="h5">478</Typography>
                        <Typography variant="body2" color="textSecondary">Following</Typography>
                      </Grid>
                    </Grid>
                  </Box>
                  <CardContent>
                    <Box sx={{ mb: 5 }}>
                      <Typography variant="h6" gutterBottom>About</Typography>
                      <Box sx={{ p: 4, backgroundColor: '#f8f9fa' }}>
                        <Typography variant="body1" fontStyle="italic">Web Developer</Typography>
                        <Typography variant="body1" fontStyle="italic">Lives in New York</Typography>
                        <Typography variant="body1" fontStyle="italic">Photographer</Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                      <Typography variant="h6">Recent photos</Typography>
                      <Typography variant="body1"><a href="#!" style={{ color: 'inherit', textDecoration: 'none' }}>Show all</a></Typography>
                    </Box>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <CardMedia component="img" image="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp" sx={{ width: '100%' }} />
                      </Grid>
                      <Grid item xs={6}>
                        <CardMedia component="img" image="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp" sx={{ width: '100%' }} />
                      </Grid>
                      <Grid item xs={6}>
                        <CardMedia component="img" image="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(108).webp" sx={{ width: '100%' }} />
                      </Grid>
                      <Grid item xs={6}>
                        <CardMedia component="img" image="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp" sx={{ width: '100%' }} />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </Box>
    );
}

export default Profile;
