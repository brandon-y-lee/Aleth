import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";
import { LocalGasStationOutlined } from "@mui/icons-material";
import logo from "assets/logo.png";

const Login = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Box display="flex" alignItems="center" sx={{ m: "1rem" }}>
            <img src={logo} alt="Aleth Logo" height="50px" />
        </Box>
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to Aleth, the future of traceability.
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default Login;