import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Box, Button, useMediaQuery, useTheme, Typography, Grid, Chip, Tabs, Tab, IconButton, Stack, Paper, Toolbar, InputBase } from "@mui/material";
import { Menu as MenuIcon, Search } from "@mui/icons-material";
import { DataGridPro, GridFooterContainer, GridFooter } from "@mui/x-data-grid-pro";
import './index.css';
import { useGetTechPacksForUserQuery, useGetQueriesForTechPackQuery } from "state/api";
import Header from "components/Header";
import ActionMenuIncomingOrders from "components/SellerView/ActionMenuIncomingOrders";
import FlexBetween from "components/FlexBetween";
import TabPanel from 'components/Common/TabPanel';
import Confirmation from "components/Order/Confirmation";
import SupplierTree from "components/Order/SupplierTree";
import TechPackDetails from "components/Order/TechPackDetails";
import { TechPackProvider } from "components/Order/TechPackContext";
import UploadTechPack from "components/Order/UploadTechPack/UploadTechPack";
import SupplierDetails from "components/Order/SupplierDetails";
import TechPackActionMenu from "components/Order/TechPackActionMenu";
import PurchaseForm from "components/Order/PurchaseForm";
import Navbar from "components/Navbar";
import { current } from "@reduxjs/toolkit";


const Inbox = () => {
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const loggedInUserId = loggedInUser ? loggedInUser.id : null;
  const loggedInUserType = loggedInUser ? loggedInUser.UserType : null;
  const userId = loggedInUserId;
  const userType = loggedInUserType;

  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  // values to be sent to the backend
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [value, setValue] = React.useState(0);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  // For Requests
  let {data: techPacks, isLoading: isLoadingTechPacks} = useGetTechPacksForUserQuery({ userId });
  const [selectedTechPack, setSelectedTechPack] = useState(null);

  // For Search
  const [currentTechPackData, setCurrentTechPackData] = useState(null);
  const [techPackId, setTechPackId] = useState(null);
  const { data: queriesForTechPack } = useGetQueriesForTechPackQuery({ techPackId: techPackId });
  const [flattenedQueriesForTechPack, setFlattenedQueriesForTechPack] = useState(null);
  const [isNewTechPackSubmitted, setIsNewTechPackSubmitted] = useState(false);
  const [totalSuppliers, setTotalSuppliers] = useState(0);
  const [selectedQuery, setSelectedQuery] = useState(null);

  const [formData, setFormData] = useState({});
  const [confirmationOpen, setConfirmationOpen] = React.useState(false);
  
  const [searchResults, setSearchResults] = useState([]);
  const updateSearchResults = (results) => {
    setSearchResults(results);
    console.log('Search Results:', results);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setSelectedTab(newValue);
  };

  const handleConfirmationOpen = () => {
    setConfirmationOpen(true);
  };
  
  const handleConfirmationClose = () => {
    setConfirmationOpen(false);
  };

  const handleTreeClick = (orderId) => {
    setSelectedOrderId(orderId);
  };

  const handleRowClick = (row) => {
    setSelectedQuery(row.row.id);
  };

  const flattenQueriesForTechPack = (queriesObject) => {
    if (!queriesObject || !queriesObject.techPackQueries) {
      return [];
    }
    return queriesObject.techPackQueries.map((query) => ({
      id: query._id,
      Item: query.item,
      Description: query.description,
      Material: query.material,
    }));
  };

  useEffect(() => {
    if (currentTechPackData && currentTechPackData._id) {
      setTechPackId(currentTechPackData._id);
      setIsNewTechPackSubmitted(true);
    }
  }, [currentTechPackData]);

  useEffect(() => {
    console.log('Queries For Tech Pack: ', queriesForTechPack);
    setFlattenedQueriesForTechPack(flattenQueriesForTechPack(queriesForTechPack));
  }, [queriesForTechPack]);

  useEffect(() => {
    // Make sure queriesForTechPack and queriesForTechPack.techPackQueries exist and are arrays
    const total = queriesForTechPack && Array.isArray(queriesForTechPack.techPackQueries)
      ? queriesForTechPack.techPackQueries.reduce((acc, query) => acc + query.suppliers.length, 0)
      : 0;
  
    setTotalSuppliers(total);
  }, [queriesForTechPack]);
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  };
  
  function DetailPanelContent({ row: rowProp }) {
    return (
      <Stack
        sx={{ py: 2, height: '100%', boxSizing: 'border-box' }}
        direction="column"
      >
        <Paper sx={{ flex: 1, mx: 'auto', width: '90%', p: 1 }}>
          <Stack direction="column" spacing={1} sx={{ height: 1 }}>
            <Typography variant="h6">{`TECH PACK: ${rowProp._id}`}</Typography>
            <Grid container>
              <Grid item md={6}>
                <Typography variant="body2" color="textSecondary">ID</Typography>
                <Typography variant="body1">{rowProp._id}</Typography>
              </Grid>
              <Grid item md={6}>
                <Typography variant="body2" align="right" color="textSecondary">Date Created</Typography>
                <Typography variant="body1" align="right">{rowProp.createdAt}</Typography>
              </Grid>
            </Grid>
            <DataGridPro
              density="compact"
              columns={[
                /*
                { field: 'name', headerName: 'Material', flex: 1 },
                {
                  field: 'query',
                  headerName: 'Query ID',
                  align: 'center',
                  type: 'number',
                },
                */
                { field: 'quantity', headerName: 'Quantity', type: 'number' },
              ]}
              /* Rows need to map over array that points to different queries */
              rows={rowProp.quantity}
              sx={{ flex: 1}}
              hideFooter
            />
          </Stack>
        </Paper>
      </Stack>
    )
  }

  const CustomFooter = (props) => {
    const { selectedRows } = props;

    /* If not rows are selected */
    if (!selectedRows || selectedRows.length === 0) {
      console.log("Getting here");
      return (
        <GridFooterContainer>
          <GridFooter />
        </GridFooterContainer>
      );
    }
  
    /* If rows are selected */
    return (
      <GridFooterContainer>
        <GridFooter sx={{ border: 'none' }} />
        <Button
          size="medium" 
          color="primary" 
          onClick={handleConfirmationOpen}
          sx={{
            backgroundColor: theme.palette.secondary[300],
            color: 'white',
            '&:hover': {
              backgroundColor: theme.palette.secondary[200],
            },
            mr: 2,
          }}
        >
          Confirm Selection
        </Button>
      </GridFooterContainer>
    );
  };

  const Footer = () => {
    return (
      <Box
        display='flex'
        justifyContent='flex-end'
        alignItems='center'
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: '#fff',
          boxShadow: '0 -1px 6px rgba(0, 0, 0, 0.1)',
          padding: '1rem',
          gap: '1rem',
        }}
      >
        <Typography variant="h6" sx={{ color: '#000', fontWeight: 'bold' }}>
          TOTAL SUPPLIERS: {totalSuppliers}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            // Add your "Place Order" logic here
          }}
          sx={{ backgroundColor: '#1EBD53', color: '#fff', borderRadius: '15px' }}
        >
          Place Order
        </Button>
      </Box>
    );
  };

  const techPackColumns = [
    {
      field: "sku",
      headerName: "SKU",
      flex: 0.25,
    },
    {
      field: "product",
      headerName: "PRODUCT",
      flex: 0.50,
    },
    {
      field: "quantity",
      headerName: "QUANTITY",
      flex: 0.25,
      sortable: false,
    },
    {
      field: "cost",
      headerName: "COST",
      flex: 0.25,
      renderCell: (params) => "$10"
    },
    {
      field: "actions",
      headerName: "ACTIONS",
      sortable: false,
      flex: 0.25,
      renderCell: (params) => {
        console.log('Actions Params: ', params);
        return (<TechPackActionMenu techPackData={params.row} />)},
    },
  ];

  const newTechPackColumns = [
    {
      field: "Item",
      headerName: "ITEM",
      flex: 0.15,
    },
    {
      field: "Description",
      headerName: "DESCRIPTION",
      flex: 0.30,
    },
    {
      field: "Material",
      headerName: "MATERIAL",
      flex: 0.15,
    },
    {
      field: "Quantity",
      headerName: "QUANTITY",
      flex: 0.10,
    },
  ];

  return (
    <Box>
      <Box m="1rem 0rem">
        <Navbar />
      </Box>
      <Box m="0rem 2.5rem 1.5rem 2.5rem">
        <DataGridPro
          loading={isLoadingTechPacks || !techPacks}
          getRowId={(row) => row["_id"]}
          getDetailPanelContent={({ row }) => <DetailPanelContent row={row} />}
          getDetailPanelHeight={({ row }) => 'auto'}
          rows={(techPacks && techPacks.techPacks) || []}
          columns={techPackColumns}
          rowCount={(1) || 0}
          rowsPerPageOptions={[20, 50, 100]}
          pagination
          page={1}
          pageSize={20}
          paginationMode="server"
          sortingMode="server"
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          onSortModelChange={(newSortModel) => setSort(...newSortModel)}
          onRowClick={(row)=>{
            console.log('Row Click: ', row.row._id);
            setSelectedTechPack(row.row._id);
          }}
        />
      </Box>

      <Confirmation
        open={confirmationOpen}
        onClose={handleConfirmationClose}
        data={{userId, material: formData.material, quantity:10, sellers: selectedRows}}
      />
    </Box>
  );
};

export default Inbox;