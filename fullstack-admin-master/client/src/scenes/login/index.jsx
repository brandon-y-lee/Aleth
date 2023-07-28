import { Box, Typography, useTheme, useMediaQuery, Grid } from "@mui/material";
import Form from "./Form";
import logo from "assets/logo.png";
import FlexBetween from "components/FlexBetween";

const Login = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  return (
    <Grid container>
      <Grid item xs={12} sm={6}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100vh"
          bgcolor={theme.palette.background.alt}
        >
          <img src={logo} alt="Aleth Logo" height="130px" />
        </Box>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100vh"
          bgcolor="white"
        >
          <Box
            width="50%"
            borderRadius="1.5rem"
          >
            <Form />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;