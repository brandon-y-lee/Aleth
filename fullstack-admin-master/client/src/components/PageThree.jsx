import React, { useState } from "react";
import { Button, Card, CardContent, Typography, Box } from "@mui/material";

const PageThree = ({ onButtonClick }) => {
  const [singleUser, setSingleUser] = useState(false);
  const [multiUser, setMultiUser] = useState(false);

  const onClickSingleUser = () => {
    setSingleUser((prevSingleUser) => !prevSingleUser);
    setMultiUser(false);
  };

  const onClickMultiUser = () => {
    setMultiUser((prevMultiUser) => !prevMultiUser);
    setSingleUser(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!singleUser && !multiUser) {
      alert("Please select at least one option.");
      return;
    }
    onButtonClick("pagefour");
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '40vh',
        bgcolor: 'background.default',
        m: 1,
        color: 'text.primary',
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        How are you planning to use Eden?
      </Typography>
      <Typography variant="body1" gutterBottom>
        We'll streamline your setup experience accordingly.
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '80%',
          mt: 3,
          mb: 3,
        }}
      >
        <Card
          variant="outlined"
          sx={{
            width: '45%',
            borderColor: singleUser ? 'primary.main' : 'divider',
          }}
          onClick={onClickSingleUser}
        >
          <CardContent>
            <Typography variant="h6" component="h2">
              For myself
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Write better. Think more clearly. Stay organized.
            </Typography>
          </CardContent>
        </Card>
        <Card
          variant="outlined"
          sx={{
            width: '45%',
            borderColor: multiUser ? 'primary.main' : 'divider',
          }}
          onClick={onClickMultiUser}
        >
          <CardContent>
            <Typography variant="h6" component="h2">
              With my team
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Wikis, docs, tasks and projects, all in one place.
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{
          mt: 3,
        }}
      >
        Next Step
      </Button>
    </Box>
  );
};

export default PageThree;
