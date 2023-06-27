import React, { useState, useEffect } from "react";
import Session from 'react-session-api';
import { 
  Box, 
  useMediaQuery, 
  useTheme,
  Typography,
  Grid,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetTransactionsQuery, useGetChainOfShipmentsQuery, useGetIncomingRequestsQuery } from "state/api";
import { useGetPurchaseOrdersQuery, useGetEligibleSellersQuery } from "state/api";
import Header from "components/Header";
import OrderMap from "components/OrderMap";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import ActionMenu from "components/SellerView/ActionMenu";
import ActionMenuIncomingOrders from "components/SellerView/ActionMenuIncomingOrders";

import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from 'components/Common/TabPanel';
import { OrderStatus } from "configs/OrderStatus";


Session.set("username", "2");
Session.set("coordinates", [17.2064912,22.1782433])

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

  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({});
  const [searchInput, setSearchInput] = useState("");

  let {data: purchaseOrders, isLoading: isLoadingPurchaseOrders} = useGetPurchaseOrdersQuery({userId});
  let {data: searchResults, isLoading: isLoadingSearchResults} = useGetEligibleSellersQuery({material: formData.material ? formData.material : undefined})

  
  const getSearchCoordinates = (data) => {
    if(data === undefined)
      return {};
  }
  

  const handleSearch = (values) => {
    console.log(values);
    setFormData(values);
  }
  const handleChange = (event, newValue) => {
    console.log("Here");
    setValue(newValue);
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  // useEffect(() =>  { 
  //   console.log(locations);
  // },[]);

  const purchaseOrdersColumns = [
    {
      field: "_id",
      headerName: "OrderID",
      flex: 1,
    },
    {
      field: "material",
      headerName: "Material",
      flex: 1,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => params.value.length,
    },
    {
      field: "orderStatus",
      headerName: "Order Status",
      flex: 0.5,
      renderCell: (params) => {
        const sellerStatus = params.value;
        console.log(sellerStatus);
        if(params.value[userId] == OrderStatus.SELLERACCEPT)
          return (<Chip label="You Accepted" color="info"/>)
        if(params.value[userId] == OrderStatus.NEWORDER)
          return (<Chip label="New Order" color="success"/>)
        if(params.value[userId] == OrderStatus.BUYERACCEPT)
          return (<Chip label="Buyer Accepted" color="success"/>)
        if(params.value[userId] == OrderStatus.SELLERDENIED)
          return (<Chip label="You Rejected" color="warning"/>)
        if(params.value[userId] == OrderStatus.BUYERDENIED)
          return (<Chip label="Order Rejected" color="error"/>)
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      flex: 0.5,
      renderCell: (params) => {
        console.log(params);
        return (<ActionMenuIncomingOrders orderData={params.row}/>)},
    },
  ];

  const eligibleSellersColumns = [
    {
      field: "userId",
      headerName: "Seller ID",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "type",
      headerName: "Seller Type",
      flex: 1,
    },
    {
      field: "city",
      headerName: "Location",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => params.value.length,
    }
  ];

  return (
    <Box>
      <Box 
        height="17vh"
        p="2.5rem 2.5rem"
        sx={{
          background: `linear-gradient(215deg, ${theme.palette.secondary[400]} 30%, ${theme.palette.primary[500]} 90%)`,
        }}
      >
        <Header title="ORDER" subtitle="Search and Manage your Suppliers" />
      </Box>
      
      <Box m="1.5rem 2.5rem">
        <Box mt="2rem">
          <OrderMap coordinates={coords} locations={searchResults} handleSearch={handleSearch}/>
        </Box>

        <Box>
          <Tabs 
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab 
              label="Search Results"
              {...a11yProps(0)}
              sx={{
                color: "#00994c",
                backgroundColor: value === 0 ? "#cccccc" : "white",
                borderColor: 'divider',
                borderBottom: 1,
                '&:hover': {
                  backgroundColor: '#e0e0e0', // Change this to the color you want when hovering
                },
              }}
            />
            <Tab
              label="Purchase Orders"
              {...a11yProps(1)}
              sx={{
                color: "#00994c",
                backgroundColor: value === 1 ? "#cccccc" : "white",
                borderColor: 'divider',
                borderBottom: 1,
                '&:hover': {
                  backgroundColor: '#e0e0e0', // Change this to the color you want when hovering
                },
              }}
            />

            {/* <Tab
              label="Search Results"
              {...a11yProps(2)}
              sx={{
                color: "#00994c",
                backgroundColor: value === 1 ? "#cccccc" : "white",
                borderColor: 'divider',
                borderBottom: 1,
                '&:hover': {
                  backgroundColor: '#e0e0e0', // Change this to the color you want when hovering
                },
              }}
            /> */}
          </Tabs>
        </Box>

        {/* <TabPanel value={value} index={0}>
          <Box
            height="70vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: theme.palette.background.alt,
                color: theme.palette.secondary[100],
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme.palette.primary.light,
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: theme.palette.background.alt,
                color: theme.palette.secondary[100],
                borderTop: "none",
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `${theme.palette.secondary[200]} !important`,
              },
            }}
          >
            <DataGrid
              loading={isLoading || !data}
              getRowId={(row) => Math.random()}
              rows={(data && data.transactions) || []}
              columns={outgoingShipmentColumns}
              rowCount={(data && data.total) || 0}
              rowsPerPageOptions={[20, 50, 100]}
              pagination
              page={page}
              pageSize={pageSize}
              paginationMode="server"
              sortingMode="server"
              onPageChange={(newPage) => setPage(newPage)}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              onSortModelChange={(newSortModel) => setSort(...newSortModel)}
              components={{ Toolbar: DataGridCustomToolbar }}
              componentsProps={{
                toolbar: { searchInput, setSearchInput, setSearch },
              }}
              onRowClick={(row)=>{
                setSelectedShipmentId(row.row.shipmentID);
                setSelectedId(row.row.id);
                setCoordinates([{"$numberDecimal":Math.random()*100}, {"$numberDecimal":Math.random()*100}])}
              }
            />
          </Box>
        </TabPanel> */}

        <TabPanel value={value} index={0}>
          <Box
            height="70vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: theme.palette.background.alt,
                color: theme.palette.secondary[100],
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme.palette.primary.light,
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: theme.palette.background.alt,
                color: theme.palette.secondary[100],
                borderTop: "none",
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `${theme.palette.secondary[200]} !important`,
              },
            }}
          >
            <DataGrid
              loading={isLoadingSearchResults || !searchResults}
              getRowId={(row) => Math.random()}
              rows={(searchResults && searchResults.eligibleSellers) || []}
              columns={eligibleSellersColumns}
              rowCount={(1) || 0}
              rowsPerPageOptions={[20, 50, 100]}
              pagination
              page={1}
              pageSize={20}
              paginationMode="server"
              sortingMode="server"
              // onPageChange={(newPage) => setPage(newPage)}
              // onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              // onSortModelChange={(newSortModel) => setSort(...newSortModel)}
              components={{ Toolbar: DataGridCustomToolbar }}
              componentsProps={{
                toolbar: { searchInput, setSearchInput, setSearch },
              }}
              // onRowClick={(row)=>{
              //   setSelectedOrder(row.row._id);
            />
          </Box>
        </TabPanel>

        <TabPanel value={value} index={1}>
          <Box
            height="70vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: theme.palette.background.alt,
                color: theme.palette.secondary[100],
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme.palette.primary.light,
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: theme.palette.background.alt,
                color: theme.palette.secondary[100],
                borderTop: "none",
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `${theme.palette.secondary[200]} !important`,
              },
            }}
          >
            <DataGrid
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
              // onPageChange={(newPage) => setPage(newPage)}
              // onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              // onSortModelChange={(newSortModel) => setSort(...newSortModel)}
              components={{ Toolbar: DataGridCustomToolbar }}
              componentsProps={{
                toolbar: { searchInput, setSearchInput, setSearch },
              }}
              // onRowClick={(row)=>{
              //   setSelectedOrder(row.row._id);
            />
          </Box>
        </TabPanel>
      </Box>
    </Box>
  );
};

export default Order;
