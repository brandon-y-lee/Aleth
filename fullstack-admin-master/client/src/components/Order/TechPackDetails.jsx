import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemButton, ListItemText, ListItemIcon, Typography, Breadcrumbs, Link, Card, CardContent, Divider, Checkbox, Button } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Schedule';
import ErrorIcon from '@mui/icons-material/Error';
import NotesIcon from '@mui/icons-material/Notes';
import { useNavigate, useLocation } from 'react-router-dom';
import { useGetTechPackQuery, useGetQueriesForTechPackQuery } from "state/api";

const TechPackDetails = ({ techPackId }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [subPage, setSubPage] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogNotes, setDialogNotes] = useState('');

  const { data: techPack, isLoading: isLoadingTechPack } = useGetTechPackQuery({ techPackId: techPackId });
  const { data: queries, isLoading: isLoadingQueries } = useGetQueriesForTechPackQuery({ techPackId: techPackId });

  const handleListItemClick = (query) => {
    console.log('query: ', query);
    setSubPage(query);
    console.log('subPage: ', subPage);
  };

  useEffect(() => {
    console.log('Updated subPage:', subPage);
  }, [subPage]);

  const handleBreadcrumbClick = () => {
    setSubPage(null);
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
      <Typography variant="h4" gutterBottom>
        {techPack?.techPack?.product} - SKU {techPack?.techPack?.sku}
      </Typography>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" onClick={handleBreadcrumbClick}>
          Main
        </Link>
        {subPage && (
          <Typography color="textPrimary">{subPage.material}</Typography>
        )}
      </Breadcrumbs>
      <Divider style={{ margin: '20px 0' }} />

      <Card elevation={3} style={{ padding: '20px' }}>
        <CardContent>
          {!subPage ? (
            <List>
              <Typography variant="h6" gutterBottom>T0 - Final Product</Typography>
              {/* <ListItemButton onClick={() => handleListItemClick(techPack?.techPack)}>
                <ListItemIcon>
                  <ArrowForwardIosIcon />
                </ListItemIcon>
                <ListItemText primary={techPack?.techPack?.product} />
              </ListItemButton> */}
              <Divider style={{ margin: '10px 0' }} />
              <Typography variant="h6" gutterBottom>T1 - Materials</Typography>
              {queries?.techPackQueries.map((query, index) => (
                <ListItemButton key={index} onClick={() => handleListItemClick(query)}>
                  <ListItemIcon>
                    <ArrowForwardIosIcon />
                  </ListItemIcon>
                  <ListItemText primary={query.material} />
                </ListItemButton>
              ))}
            </List>
          ) : (
            <List>
              {subPage?.suppliers.map((supplierId, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <Checkbox />
                  </ListItemIcon>
                  <ListItemText primary={supplierId} />
                  <NotesIcon onClick={() => handleDialogOpen(subPage.supplierNotes[supplierId])} />
                  <ListItemIcon>
                    {renderStatusIcon(subPage.supplierStatuses[supplierId])}
                  </ListItemIcon>
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
    </div>
  );
};

export default TechPackDetails;
