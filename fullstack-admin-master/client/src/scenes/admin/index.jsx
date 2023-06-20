import React from "react";
import { Box, useTheme } from "@mui/material";
import { useGetAdminsQuery } from "state/api";
import Header from "components/Header";
import LoginPage from "components/LoginPage";

const Admin = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetAdminsQuery();


  return (
    <Box m="1.5rem 2.5rem">
      <LoginPage />
    </Box>
  );
};

export default Admin;
