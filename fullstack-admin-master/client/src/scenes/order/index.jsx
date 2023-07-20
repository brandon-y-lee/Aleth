import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Session from 'react-session-api';
import { 
  Box,
  Button,
  useMediaQuery,
  useTheme,
  Typography,
  Grid,
  Chip,
  Tabs,
  Tab,
  IconButton
} from "@mui/material";
import {
  Menu as MenuIcon,
  Search,
} from "@mui/icons-material";
import { DataGrid, GridFooterContainer, GridFooter } from "@mui/x-data-grid";
import { styled } from '@mui/material/styles';

import { useGetPurchaseOrdersQuery, useUpdateOrderMutation, useCreateNewOrderMutation, useGetEligibleSellersAdvancedQuery } from "state/api";
import Header from "components/Header";
import OrderMap from "components/Order/OrderMap";
import OrderDetails from "components/Order/OrderDetails";
import SupplierTree from "components/Order/SupplierTree";
import PurchaseForm from "components/Order/PurchaseForm";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import ActionMenuIncomingOrders from "components/SellerView/ActionMenuIncomingOrders";
import { OrderStatus } from "configs/OrderStatus";
import { RequestType } from "configs/RequestType";
import FlexBetween from "components/FlexBetween";
import TabPanel from 'components/Common/TabPanel';
import Confirmation from "components/Confirmation";
import SearchTree from "components/Order/SearchTree";

// Session.set("username", "2");
Session.set("coordinates", [17.2064912,22.1782433]);

const Order = () => {
  const userId = Session.get("username");
  const coords = Session.get("coordinates");
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

  const [formData, setFormData] = useState({});
  const [searchInput, setSearchInput] = useState("");
  const [confirmationOpen, setConfirmationOpen] = React.useState(false);


  let {data: purchaseOrders, isLoading: isLoadingPurchaseOrders} = useGetPurchaseOrdersQuery({userId});
  let {data: searchResultsAdvanced, isLoading: isLoadingSearchResultsAdvanced} = useGetEligibleSellersAdvancedQuery({
    products: formData.productCategory ? formData.productCategory : undefined, 
    material: formData.materialType ? formData.materialType : undefined,
    fabricConstruction: formData.fabricConstruction ?formData.fabricConstruction : undefined,
    certifications : ""
   });

  console.log(searchResultsAdvanced);
  const [updateOrder, { isLoading: updatingOrder }] = useUpdateOrderMutation();
  const [createOrder, { isLoading: creatingOrder }] = useCreateNewOrderMutation();

  
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

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
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

  const purchaseOrdersColumns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 0.25,
    },
    {
      field: "style",
      headerName: "SKU",
      flex: 0.25,
    },
    {
      field: "product",
      headerName: "PRODUCT",
      flex: 0.50,
    },
    {
      field: "amount",
      headerName: "AMOUNT",
      flex: 0.25,
      sortable: false,
      renderCell: (params) => "2000",
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
        return (<ActionMenuIncomingOrders orderData={params.row}/>)},
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

  const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
    '& .MuiDataGrid-root': {
      border: 'none',
    },
    '& .MuiDataGrid-row': {
      backgroundColor: 'white',
      borderBottom: '1px solid #e0e0e0',
      '&:hover': {
        backgroundColor: '#f5f5f5',
      },
    },
    '& .MuiDataGrid-columnHeader': {
      color: 'black',
      border: 'none',
    },
    '& .MuiDataGrid-columnHeaderTitle': {
      fontWeight: 'bold !important',
      fontSize: '0.9rem',
    },
    '& .MuiDataGrid-columnSeparator': {
      display: 'none',
    },
    '& .MuiDataGrid-virtualScroller': {
      backgroundColor: 'white',
    },
    '& .MuiDataGrid-footerContainer': {
      backgroundColor: theme.palette.background.alt,
      color: theme.palette.secondary[100],
      borderTop: "none",
    },
  }));

  const renderComponents = () => {
    if (selectedTab === 0) {
      return (
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <OrderDetails orderId={orderId} />
          </Grid>
          <Grid item xs={6}>
            {/* <SupplierTree techPackId={orderId} /> */}
            <SupplierTree techPackId={"1"} />
          </Grid>
        </Grid>
      );
    } else {
      return (
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <PurchaseForm onSearch={handleSearch} />
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
        height="15vh"
        p="2.5rem 2.5rem"
      >
        <Header title="ORDER" subtitle="Manage SKUs and Discover Suppliers" />
      </Box>
      
      <Box m="1.5rem 2.5rem">
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

        <Box mt="1.5rem">
          {renderComponents()}
          {/* <OrderMap selectedTab={selectedTab} coordinates={coords} locations={searchResultsAdvanced} handleSearch={handleSearch} purchaseOrders={purchaseOrders} orderId={orderId}/> */}
        </Box>

        <TabPanel value={value} index={0} padding={0}>
          <Box height="50vh" sx={{ mt: "1.5rem", pb: "1.5rem" }}>
            <StyledDataGrid
              loading={isLoadingPurchaseOrders || !purchaseOrders}
              getRowId={(row) => Math.random()}
              rows={(purchaseOrders && purchaseOrders.allOrders) || []}
              columns={purchaseOrdersColumns}
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
                console.log(row.row);
                setOrderId(row.row._id);
              }}
            />
          </Box>
        </TabPanel>

        <TabPanel value={value} index={1} padding={0}>
          <Box height="50vh" sx={{ mt: "1.5rem" }}>
            <StyledDataGrid
              loading={isLoadingSearchResultsAdvanced || !searchResultsAdvanced}
              getRowId={(row) => row["_id"]}
              rows={(searchResultsAdvanced && searchResultsAdvanced.eligibleSellers) || []}
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
                setSelectedRows(newSelection);
              }}
              /* onPageChange={(newPage) => setPage(newPage)}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              onSortModelChange={(newSortModel) => setSort(...newSortModel)} */
              components={{ 
                Footer: CustomFooter,
              }}
              componentsProps={{
                footer: { selectedRows },
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