import React, { useState } from 'react';
import { Button, TextField, Box, Paper, Typography, Link, useTheme } from '@mui/material';
import logo from "assets/logo.png";

const LoginPage = () => {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you would typically handle the login logic
    console.log(`Email: ${email}, Password: ${password}`);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Box
        component={Paper}
        elevation={3}
        p={3}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Box display="flex" alignItems="center" sx={{ m: "1rem" }}>
            <img src={logo} alt="Aleth Logo" height="50px" />
        </Box>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={handleEmailChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={handlePasswordChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: "1.5rem", '&:hover': { backgroundColor: theme.palette.secondary[400] } }}
          >
            Sign In
          </Button>
          <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
            <Link href="#" variant="body2" sx={{ color: theme.palette.primary[500], '&:hover': { color: theme.palette.primary[200] }}}>
              Forgot password?
            </Link>
            <Link href="#" variant="body2" style={{ marginLeft: '10px' }} sx={{ color: theme.palette.primary[500], '&:hover': { color: theme.palette.primary[200] }}}>
              {"Don't have an account? Sign Up"}
            </Link>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default LoginPage;
