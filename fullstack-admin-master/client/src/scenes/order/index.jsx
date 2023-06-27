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
import Header from "components/Header";
import BreakdownChart from "components/BreakdownChart";
import OrderMap from "components/OrderMap";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import ActionMenu from "components/SellerView/ActionMenu";
import ActionMenuIncomingOrders from "components/SellerView/ActionMenuIncomingOrders";

import FlexBetween from "components/FlexBetween";
import PurchaseForm from "components/PurchaseForm";
import RequestsButton from "components/RequestsButton";
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from 'components/Common/TabPanel';
import { OrderStatus } from "configs/OrderStatus";


Session.set("username", "2");

const Order = () => {
  const userId = Session.get("username");
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  // values to be sent to the backend
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [value, setValue] = React.useState(0);

  const [search, setSearch] = useState("");
  const [coordinates, setCoordinates] = useState([]);
  const [selectedShipmentId, setSelectedShipmentId] = useState("TR2023019QXZZFR");
  const [selectedId, setSelectedId] = useState("TR2023019QXZZFR");
  const [selectedTab, setSelectedTab] = useState(0);

  const [searchInput, setSearchInput] = useState("");

  const { data, isLoading } = useGetTransactionsQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
    userId: userId
  });

  // console.log(data);

  let {data: locations, isLoading: isLoadingNew} = useGetChainOfShipmentsQuery(selectedShipmentId);
  let {data: incomingOrders, isLoading: isLoadingIncomingOrders} = useGetIncomingRequestsQuery({userId});

  console.log(locations);

  if(locations ===  undefined)
    locations = {"shipmentChain":[]}

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setSelectedTab(newValue);
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  useEffect(() =>  { 
    console.log(locations);
  },[selectedShipmentId]);

  const orderRequestColumns = [
    {
      field: "orderId",
      headerName: "Order ID",
      flex: 0.75,
    },
    {
      field: "style",
      headerName: "Style",
      flex: 0.75,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
    },
    {
      field: "material",
      headerName: "Material",
      flex: 0.75,
    },
    {
      field: "color",
      headerName: "Color",
      flex: 0.75,
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => params.value.length,
    },
    {
      field: "unit",
      headerName: "Unit",
      flex: 0.5,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 0.5,
    },
    {
      field: "orderStatus",
      headerName: "Order Status",
      flex: 0.5,
      renderCell: (params) => {
        console.log(params.value);
        if(params.value == 0)
          return (<Chip label="Draft" color="warning"/>)
        if(params.value == 1)
          return (<Chip label="Submitted" color="info"/>)
        if(params.value == 2)
          return (<Chip label="Validated" color="success"/>)
        if(params.value == 3)
          return (<Chip label="Error" color="error"/>)
    },
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      flex: 0.5,
      renderCell: (params) => (
        <ActionMenu receivingOrderId={selectedId}/>
      ),
    },
  ];

  const incomingRequestColumns = [
    {
      field: "_id",
      headerName: "OrderID",
      flex: 1,
    },
    {
      field: "buyerId",
      headerName: "Buyer ID",
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
      field: "sellerStatuses",
      headerName: "Order Status",
      flex: 0.5,
      renderCell: (params) => {
        const sellerStatus = params.value[userId];
        console.log(sellerStatus);
        console.log(OrderStatus.SELLERDENIED);
        console.log(sellerStatus == OrderStatus.SELLERDENIED);
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

  return (
    <Box>
      <Box 
        height="16vh"
        p="2.5rem 2.5rem"
        sx={{
          background: `linear-gradient(215deg, ${theme.palette.secondary[400]} 30%, ${theme.palette.primary[500]} 90%)`,
        }}
      >
        <Header title="ORDER" subtitle="Search and Manage your Suppliers" />
      </Box>
      
      <Box m="1.5rem 2.5rem">
        <Box mt="2rem">
          <OrderMap selectedTab={selectedTab} coordinates={coordinates} locations={locations}/>
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
                backgroundColor: value === 0 ? "#00cc69" : "white",
                borderColor: 'divider',
                borderBottom: 1,
                '&:hover': {
                  backgroundColor: '#00cc69', // Change this to the color you want when hovering
                },
              }}
            />
            <Tab
              label="Order Requests"
              {...a11yProps(1)}
              sx={{
                color: "#00994c",
                backgroundColor: value === 1 ? "#00cc69" : "white",
                borderColor: 'divider',
                borderBottom: 1,
                '&:hover': {
                  backgroundColor: '#e0e0e0', // Change this to the color you want when hovering
                },
              }}
            />
          </Tabs>
        </Box>

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
              loading={isLoading || !data}
              getRowId={(row) => Math.random()}
              rows={(data && data.transactions) || []}
              columns={orderRequestColumns}
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
        </TabPanel>

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
              loading={isLoadingIncomingOrders || !incomingOrders}
              getRowId={(row) => Math.random()}
              rows={(incomingOrders && incomingOrders.newOrders) || []}
              columns={incomingRequestColumns}
              rowCount={(1) || 0}
              rowsPerPageOptions={[20, 50, 100]}
              pagination
              page={1}
              pageSize={20}
              checkboxSelection
              paginationMode="server"
              sortingMode="server"
              onPageChange={(newPage) => setPage(newPage)}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              onSortModelChange={(newSortModel) => setSort(...newSortModel)}
              components={{ Toolbar: DataGridCustomToolbar }}
              componentsProps={{
                toolbar: { searchInput, setSearchInput, setSearch },
              }}
              /* onRowClick={(row)=>{
                  setSelectedOrder(row.row._id);
                } */
            />
          </Box>
        </TabPanel>
      </Box>
    </Box>
  );
};

export default Order;
