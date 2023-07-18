import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Box } from "@mui/material";

function TabPanel(props) {
  const { children, value, index, padding, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={padding}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
  padding: PropTypes.number,
};

export default TabPanel;