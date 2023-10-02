import React, { useState, useEffect, useRef } from 'react';
import { useMediaQuery, List, ListItem, ListItemButton, ListItemText, ListItemIcon, Typography, Breadcrumbs, Link, Card, CardContent, CardActions, Divider, Box, Button } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Schedule';
import CircularProgress from '@mui/material/CircularProgress';
import ErrorIcon from '@mui/icons-material/Error';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Rating from '@mui/material/Rating';
import { BusinessOutlined, CalendarMonthOutlined, MonetizationOnOutlined, GroupOutlined } from '@mui/icons-material';
import { useTechPack } from './TechPackContext';
import { useGetQueriesForTechPackQuery, useGetBulkSuppliersQuery } from "state/api";

const SupplierDetails = ({ selectedQuery }) => {
  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [subPage, setSubPage] = useState(null);
  const [supplierIds, setSupplierIds] = useState([]);
  const [loadingSuppliers, setLoadingSuppliers] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogNotes, setDialogNotes] = useState('');

  const { techPackData } = useTechPack();
  console.log('techPackData: ', techPackData);

  const techPackId = techPackData ? techPackData._id : null;
  const { data: queries, isLoading: isLoadingQueries } = useGetQueriesForTechPackQuery({ techPackId });
  const { data: suppliers, isLoading: isLoadingSuppliers } = useGetBulkSuppliersQuery({ supplierIds: supplierIds });

  const handleListItemClick = (query) => {
    setSubPage(query);
  };

  useEffect(() => {
    console.log("techPackData has changed:", techPackData);
  }, [techPackData]);

  useEffect(() => {
    console.log('Updated subPage:', subPage);
    if (subPage && subPage.suppliers) {
      setLoadingSuppliers(true);
      setSupplierIds(subPage.suppliers);
      setLoadingSuppliers(false);
      console.log('Suppliers: ', suppliers)
    }
  }, [subPage]);

  useEffect(() => {
    if (selectedQuery) {
      setLoadingSuppliers(true);
      const selectedQueryData = queries?.techPackQueries.find(q => q._id === selectedQuery);
      handleListItemClick(selectedQueryData);
      setLoadingSuppliers(false);
    }
  }, [selectedQuery, queries]);

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, []);

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

  const supplierCard = (supplier) => (
    <Card elevation={6} sx={{ width:"100%", marginBottom: "20px" }}>
      <CardContent>
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <Typography gutterBottom variant="h5">{supplier.Company}</Typography>
          <Rating name="read-only" value={0} readOnly />
        </Box>
       {/* Sub-Header Values */}
       <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px', marginTop: '2px' }}>
          <Box sx={{ display: 'flex', gap: '4px' }}>
            <BusinessOutlined fontSize="small" />
            <Typography variant="body2">{supplier.UserType}</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: '4px' }}>
            <CalendarMonthOutlined fontSize="small" />
            <Typography variant="body2">{supplier.YearFounded.$numberDecimal}</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: '4px' }}>
            <MonetizationOnOutlined fontSize="small" />
            <Typography variant="body2">{supplier.Sales}</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: '4px' }}>
            <GroupOutlined fontSize="small" />
            <Typography variant="body2">{supplier.Employees}</Typography>
          </Box>
        </Box>
        <Typography variant="body2" sx={{ marginTop: '8px' }}>{supplier.Description}</Typography>
        {/* End of Sub-Header Values */}
        <Typography gutterBottom variant="body2" color="textSecondary" sx={{
          display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '10px'
        }}>
          <LocationOnIcon />{supplier.City}
        </Typography>
        <Typography variant="body2" color="textSecondary" style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem'
        }}>
          <PhoneIcon /> {"Supplier Contact Here"}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" style={{"backgroundColor":"#00994c"}} onClick={() => { /* Go to Supplier Analytics */ }}>
          Analytics
        </Button>
        <Button size="small" color="primary" style={{"backgroundColor":"#00994c"}} onClick={() => { /* Check Status */ }} >
          Check Status
        </Button>
      </CardActions>
    </Card>
  );

  return (
    <div style={{
      maxHeight: 'inherit',
      overflow: 'hidden',
      overflowY: 'auto'
    }}>
      {techPackData && (
        <Box ref={headerRef} sx={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          padding: '10px 20px',
          backgroundColor: '#fff',
          borderBottom: '1px inset #f9f9f9'
        }}>
          <Typography variant="h4" gutterBottom>
            {techPackData.product} | SKU {techPackData.sku}
          </Typography>
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
            <Link underline="hover" color="inherit" onClick={handleBreadcrumbClick}>
              Main
            </Link>
            {subPage && (
              <Typography color="textPrimary">{subPage.item}</Typography>
            )}
          </Breadcrumbs>
        </Box>
      )}

      <Card sx={{ overflowY: 'auto', maxHeight: `calc(100% - ${headerHeight}px)` }}>
        <CardContent>
          {isLoadingSuppliers ? (
            <CircularProgress />
          ) : (
            !subPage ? (
              <List>
                {queries?.techPackQueries.map((query, index) => (
                  <ListItemButton key={index} onClick={() => handleListItemClick(query)}>
                    <ListItemIcon>
                      <ArrowForwardIosIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={query.item} secondary={query.material} />
                  </ListItemButton>
                ))}
              </List>
            ) : (
              <List>
                {suppliers?.map((supplier, index) => supplierCard(supplier))}
              </List>
            )
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SupplierDetails;
