import React from 'react';
import { Avatar, Box, Typography, Card, CardContent, CardHeader } from '@mui/material';

const SupplierList = ({ orderId, pending, accepted, rejected, locations }) => {
  return (
    <Card sx={{ boxShadow: 1, minHeight: '490px', maxHeight: '100%', overflow: 'auto' }}>
      <CardHeader
        title={`Order Request ID: ${orderId}`}
        subheader={`Pending: ${pending} | Accepted: ${accepted} | Rejected: ${rejected}`}
      />
      <CardContent>
        {/* <Box>
          {locations.map((location, index) => (
            <Box key={index} display="flex" alignItems="center" mb={2}>
              <Avatar src={location.avatar} /> 
                <Typography variant="body1">{location.name}</Typography>
                <Typography variant="body2" color="textSecondary">{location.material}</Typography>
              </Box>
              <Box ml="auto">
                <Typography variant="body1">{location.amount}</Typography>
              </Box>
            </Box>
          ))}
        </Box> */}
      </CardContent>
    </Card>
  );
};

export default SupplierList;