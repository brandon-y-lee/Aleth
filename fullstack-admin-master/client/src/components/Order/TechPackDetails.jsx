import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemButton, ListItemText, ListItemIcon, Typography, Breadcrumbs, Link, Card, CardContent, Divider, Checkbox, Button, Box, Chip, CircularProgress } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Schedule';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import NotesIcon from '@mui/icons-material/Notes';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useGetTechPackQuery, useGetQueriesForTechPackQuery, useGetBulkSuppliersQuery, useGetOrderRequestDetailsQuery } from "state/api";
import { OrderStatus } from 'configs/OrderStatus';
import { TechPackStatus } from 'configs/TechPackStatus'
import ConfirmTechPack from './ConfirmTechPack';

const TechPackDetails = ({ techPackId }) => {
  const [subPage, setSubPage] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [supplierIds, setSupplierIds] = useState([]);
  const [loadingSuppliers, setLoadingSuppliers] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogNotes, setDialogNotes] = useState('');

  const { data: techPack, isLoading: isLoadingTechPack } = useGetTechPackQuery({ techPackId: techPackId });
  const { data: queries, isLoading: isLoadingQueries } = useGetQueriesForTechPackQuery({ techPackId: techPackId });
  const { data: suppliers, isLoading: isLoadingSuppliers } = useGetBulkSuppliersQuery({ supplierIds: supplierIds });
  const { data: orderRequestDetails, isLoading: isLoadingOrderRequestDetails } = useGetOrderRequestDetailsQuery({ orderRequestId: subPage?._id });

  console.log('techPack: ', techPack);
  console.log('orderRequestDetails: ', orderRequestDetails);

  const pending = orderRequestDetails?.sellerData?.stats?.pending;
  const accepted = orderRequestDetails?.sellerData?.stats?.accepted;
  const rejected = orderRequestDetails?.sellerData?.stats?.rejected;

  const [loadingAccepted, setLoadingAccepted] = useState(true);
  const [loadingPending, setLoadingPending] = useState(true);
  const [loadingRejected, setLoadingRejected] = useState(true);
  
  const handleListItemClick = (query) => {
    setLoadingAccepted(true);
    setLoadingPending(true);
    setLoadingRejected(true);

    setSubPage(query);
    console.log('query: ', query);
    console.log('subPage: ', subPage);
  };

  useEffect(() => {
    console.log('Updated subPage:', subPage);
    if (subPage && subPage.suppliers) {
      setLoadingSuppliers(false);
      setSupplierIds(subPage.suppliers);
      console.log('supplierIds: ', supplierIds);
    }
  }, [subPage]);

  useEffect(() => {
    if (orderRequestDetails) {
      setLoadingAccepted(false);
      setLoadingPending(false);
      setLoadingRejected(false);
    }
  }, [orderRequestDetails]);

  const handleBreadcrumbClick = () => {
    setSubPage(null);
  };

  const renderQueryStatusIcon = (query) => {
    const status = query?.orderStatus ?? 'undefined';
    if (status === 0) {
      return <PendingIcon color="action" />;
    }
    if (status === 1) {
      return <WarningIcon color="warning" />;
    }
  };

  const renderTechPackStatusIcon = (techPack) => {
    const status = techPack?.status ?? 'undefined';
    if (status === 0) {
      return <PendingIcon color="action" />;
    } else if (status === 1) {
      return <WarningIcon color="warning" />;
    } else if (status === 2) {
      return <ConfirmTechPack color="success" />;
    }
  };

  const handleStatusClick = (status) => {
    setSelectedStatus(status);
  };

  const handleDialogOpen = (notes) => {
    setDialogNotes(notes);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const renderStatusIcon = (status) => {
    if (status === 'accepted') return <CheckCircleIcon color="success" />;
    if (status === 'pending') return <PendingIcon color="action" />;
    if (status === 'rejected') return <ErrorIcon color="error" />;
  };

  return (
    <div style={{ padding: '20px' }}>
      {techPackId && (
        <>
          <Typography variant="h4" gutterBottom>
            {techPack?.techPack?.product} | SKU {techPack?.techPack?.sku}
          </Typography>
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
            <Link underline="hover" color="inherit" onClick={handleBreadcrumbClick}>
              Main
            </Link>
            {subPage && (
              <Typography color="textPrimary">{subPage.material}</Typography>
            )}
            {/* {selectedStatus && (
              <Typography color="textPrimary">{selectedStatus}</Typography>
            )} */}
          </Breadcrumbs>
          <Divider style={{ margin: '20px 0' }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Chip 
              label={
                loadingAccepted 
                ? <CircularProgress size={14} />
                : "Accepted: " + accepted
              } 
              color="success"
              onClick={() => handleStatusClick(OrderStatus.SELLERACCEPT)}
              clickable
              sx={{ minWidth: '30%', maxWidth: '100%' }}
            />
            <Chip 
              label={
                loadingPending 
                ? <CircularProgress size={14} />
                : "Pending: " + pending
              }
              color="info"
              onClick={() => handleStatusClick(OrderStatus.INITORDER)}
              clickable
              sx={{ minWidth: '30%', maxWidth: '100%' }}
            />
            <Chip 
              label={
                loadingRejected 
                ? <CircularProgress size={14} />
                : "Rejected: " + rejected
              }
              color="error"
              onClick={() => handleStatusClick(OrderStatus.SELLERREJECT)}
              clickable
              sx={{ minWidth: '30%', maxWidth: '100%' }}
            />
          </Box>

          <Card elevation={2} style={{ padding: '20px' }}>
            <CardContent sx={{ overflowY: 'auto' }}>
              {!subPage ? (
                <List>
                  <Typography variant="h6" gutterBottom>T0 - Final Product</Typography>
                  <ListItem>
                    <ListItemIcon>
                      {renderTechPackStatusIcon(techPack?.techPack)}
                    </ListItemIcon>
                    <ListItemText primary={techPack?.techPack?.product} />
                  </ListItem>
                  <Divider style={{ margin: '10px 0' }} />
                  <Typography variant="h6" gutterBottom>T1 - Materials</Typography>
                  {queries?.techPackQueries.map((query, index) => (
                    <ListItemButton key={index} onClick={() => handleListItemClick(query)} sx={{ justifyContent: 'space-between' }}>
                      <ListItemIcon>
                        {renderQueryStatusIcon(query)}
                      </ListItemIcon>
                      <ListItemText primary={query.material} />
                      <ListItemIcon>
                        <ArrowForwardIosIcon />
                      </ListItemIcon>
                    </ListItemButton>
                  ))}
                </List>
              ) : (
                <List>
                  {suppliers?.map((supplier, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <Checkbox />
                      </ListItemIcon>
                      <ListItemText primary={supplier.Company} />
                      {/* <ListItemIcon>
                        {renderStatusIcon(subPage.supplierStatuses[supplierId])}
                      </ListItemIcon> */}
                      {/* <Button onClick={() => handleUpdateRequest(supplierId, 'newStatus')}>
                        Update
                      </Button> */}
                    </ListItem>
                  ))}
                  <Button variant="contained" color="primary">
                    Confirm Suppliers
                  </Button>
                </List>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default TechPackDetails;
