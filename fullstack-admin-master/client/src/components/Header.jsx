import { Typography, Box, useTheme } from "@mui/material";
import React from "react";

const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  return (
    <Box>
      <Typography
        variant="h1"
        color="black"
        fontWeight="600"
        sx={{ mt: "10px", mb: "10px" }}
      >
        {title}
      </Typography>
      <Typography variant="h4" color="#808080">
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
