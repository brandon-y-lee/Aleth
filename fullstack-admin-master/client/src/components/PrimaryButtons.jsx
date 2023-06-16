import { Box, Button, useTheme } from "@mui/material";
import React from "react";
import FlexBetween from "components/FlexBetween";
import {
    DownloadOutlined,
    UploadFileOutlined
  } from "@mui/icons-material";

const PrimaryButtons = () => {
    const theme = useTheme();

    return (
        <Box>
          <FlexBetween gap="1rem">          
            <Button
              sx={{
                backgroundColor: theme.palette.secondary.light,
                color: theme.palette.background.alt,
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
            >
              <DownloadOutlined sx={{ mr: "10px" }} />
              Download Reports
            </Button>

            <Button
              sx={{
                backgroundColor: theme.palette.secondary.light,
                color: theme.palette.background.alt,
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
            >
              <UploadFileOutlined sx={{ mr: "10px" }} />
              Create Certificate
            </Button>
          </FlexBetween>
        </Box>
    );
};

export default PrimaryButtons;