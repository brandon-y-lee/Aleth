import React from 'react';
import { Avatar, Box, Typography, Card, CardContent, CardHeader } from '@mui/material';

import { useGetPurchaseOrdersQuery, useGetEligibleSellersQuery, useGetOrderSellerDetailsQuery } from "state/api";

const SupplierList = ({ orderId}) => {
  console.log(orderId);
    let {data: sellerDetails, isLoading: isLoadingSellerDetails} = useGetOrderSellerDetailsQuery({orderId});
    console.log(sellerDetails);
    const pending = sellerDetails?.userData?.stats.pending;
    const accepted = sellerDetails?.userData?.stats.accepted;
    const rejected = sellerDetails?.userData?.stats.rejected;
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