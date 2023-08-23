import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Session from 'react-session-api';
import { Box, Button, useMediaQuery, useTheme, Typography, Grid, Chip, Tabs, Tab, IconButton, Stack, Paper } from "@mui/material";
import { Menu as MenuIcon, Search } from "@mui/icons-material";
import { DataGridPro, GridFooterContainer, GridFooter } from "@mui/x-data-grid-pro";
import { useUpdateOrderMutation, useCreateNewOrderMutation, useGetEligibleSellersAdvancedQuery, useGetTechPacksForUserQuery } from "state/api";
import Header from "components/Header";
import OrderMap from "components/Order/OrderMap";
import OrderDetails from "components/Order/OrderDetails";
import SupplierTree from "components/Order/SupplierTree";
import PurchaseForm from "components/Order/PurchaseForm";
import SearchTree from "components/Order/SearchTree";
import UploadTechPack from "components/Order/UploadTechPack/UploadTechPack";
import Options from "components/Order/Options";
import ActionMenuIncomingOrders from "components/SellerView/ActionMenuIncomingOrders";
import { OrderStatus } from "configs/OrderStatus";
import { RequestType } from "configs/RequestType";
import FlexBetween from "components/FlexBetween";
import TabPanel from 'components/Common/TabPanel';
import Confirmation from "components/Order/Confirmation";
import TechPackDetails from "components/Order/TechPackDetails";

Session.set("coordinates", [17.2064912,22.1782433]);

const Order = () => {
  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  const loggedInUserId = loggedInUser ? loggedInUser.id : null;

  const { userId: userIdFromUrl } = useParams();
  const userId = userIdFromUrl || loggedInUserId;

  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  // values to be sent to the backend
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [value, setValue] = React.useState(0);
  const [orderId, setOrderId] = useState();
  const [search, setSearch] = useState("");
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedTechPack, setSelectedTechPack] = useState(null);

  const [formData, setFormData] = useState({});
  const [searchInput, setSearchInput] = useState("");
  const [confirmationOpen, setConfirmationOpen] = React.useState(false);
  console.log('User ID: ', userId);

  let {data: purchaseOrders, isLoading: isLoadingPurchaseOrders} = useGetTechPacksForUserQuery({ userId });
  console.log('Purchase Orders:', purchaseOrders);

  const [updateOrder, { isLoading: updatingOrder }] = useUpdateOrderMutation();
  const [createOrder, { isLoading: creatingOrder }] = useCreateNewOrderMutation();
  
  const [searchResults, setSearchResults] = useState([]);
  const updateSearchResults = (results) => {
    setSearchResults(results);
    console.log('Search Results:', results);
  };

  const getSearchCoordinates = (data) => {
    if(data === undefined)
      return {};
  };
  
  const handleSearch = (values) => {
    console.log(values);
    setFormData(values);
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

  const techPackColumns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 0.50,
    },
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
        console.log(params);
        return (<ActionMenuIncomingOrders techPackData={params.row}/>)},
    },
  ];

  const eligibleSellersColumns = [
    {
      field: "Company",
      headerName: "NAME",
      flex: 0.25,
      renderCell: (params) => (
        console.log(params.id),
        <Link to={`/profile/${params.id}`}>
          {params.row.Company}
        </Link>
      ),
    },
    {
      field: "UserType",
      headerName: "TYPE",
      flex: 0.25,
    },
    {
      field: "City",
      headerName: "CITY",
      flex: 0.25,
    },
    {
      field: "Certifications",
      headerName: "CERTIFICATES",
      flex: 0.25,
    },
  ];

  const renderComponents = () => {
    if (selectedTab === 0) {
      return (
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <SupplierTree techPackId={selectedTechPack} onTreeClick={handleTreeClick} />
            </Grid>
            <Grid item xs={6}>
              {/* <SupplierTree techPackId={orderId} /> */}
              <TechPackDetails techPackId={selectedTechPack} />
            </Grid>
          </Grid>
        </Box>
      );
    } else {
      return (
        <Grid container spacing={2}>
          <Grid item xs={6}>
            {/* <PurchaseForm onSearch={handleSearch} /> */}
            <UploadTechPack updateSearchResults={updateSearchResults} />
          </Grid>
          <Grid item xs={6}>
            {/* <OrderMap selectedTab={selectedTab} coordinates={coords} locations={searchResultsAdvanced} orderId={orderId} /> */}
            <SearchTree techPackId={"1"} />
          </Grid>
        </Grid>
      );
    }
  };

  return (
    <Box>
      <Box 
        height="12vh"
        m="1.5rem 2.5rem"
      >
        <Header title="ORDER" subtitle="Manage SKUs and Discover Suppliers" />
      </Box>
      
      <Box m="1rem 2.5rem">
        <FlexBetween>
          <Box>
            <Tabs 
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab
                label="Requests"
                {...a11yProps(0)}
                sx={{
                  backgroundColor: "transparent",
                  '&:hover': {
                    backgroundColor: '#e0e0e0',
                    color: 'white',
                  },
                  '&.Mui-selected': {
                    color: 'black',
                  },
                  color: "#b3b3b3",
                }}
              />
              <Tab 
                label="Search"
                {...a11yProps(1)}
                sx={{
                  backgroundColor: "transparent",
                  '&:hover': {
                    backgroundColor: '#e0e0e0',
                    color: 'white',
                  },
                  '&.Mui-selected': {
                    color: 'black',
                  },
                  color: "#b3b3b3",
                }}
              />
            </Tabs>
          </Box>
          <Box>
            <IconButton>
              <Search sx={{ fontSize: "25px" }} />
            </IconButton>

            <Button variant="outlined" sx={{ borderColor: theme.palette.primary[500], color: theme.palette.primary[600] }}>
              Export CSV
            </Button>
          </Box>
        </FlexBetween>

        <Box p="1.5rem 0rem">
          {renderComponents()}
          {/* <OrderMap selectedTab={selectedTab} coordinates={coords} locations={searchResultsAdvanced} handleSearch={handleSearch} purchaseOrders={purchaseOrders} orderId={orderId}/> */}
        </Box>

        <TabPanel value={value} index={0} padding={0}>
          <Box height="50vh" sx={{ mt: "1.5rem", pb: "1.5rem" }}>
            <DataGridPro
              loading={isLoadingPurchaseOrders || !purchaseOrders}
              getRowId={(row) => row["_id"]}
              getDetailPanelContent={({ row }) => <DetailPanelContent row={row} />}
              getDetailPanelHeight={({ row }) => 'auto'}
              rows={(purchaseOrders && purchaseOrders.techPacks) || []}
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
                setOrderId(row.row._id);
              }}
            />
          </Box>
        </TabPanel>

        <TabPanel value={value} index={1} padding={0}>
          <Box height="50vh" sx={{ mt: "1.5rem", pb: "1.5rem" }}>
            <DataGridPro
              className="myDataGridPro"
              loading={!searchResults}
              getRowId={(row) => row["_id"]}
              rows={(searchResults && searchResults.eligibleSellers) || []}
              columns={eligibleSellersColumns}
              rowCount={(1) || 0}
              rowsPerPageOptions={[20, 50, 100]}
              pagination
              page={1}
              pageSize={20}
              checkboxSelection
              paginationMode="server"
              sortingMode="server"
              onSelectionModelChange={(newSelection) => {
                console.log('New Selection: ', newSelection);
                setSelectedRows(newSelection);
              }}
              onPageChange={(newPage) => setPage(newPage)}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              onSortModelChange={(newSortModel) => setSort(...newSortModel)}
              slots={{ 
                Footer: CustomFooter,
              }}
              slotProps={{
                footer: { selectedRows: selectedRows },
              }}
              onRowClick={(row)=>{
                console.log(row.row["id"])}}
            />
          </Box>
        </TabPanel>
      </Box>

      <Confirmation
        open={confirmationOpen}
        onClose={handleConfirmationClose}
        data={{userId, material: formData.material, quantity:10, sellers: selectedRows}}
      />
    </Box>
  );
};

export default Order;