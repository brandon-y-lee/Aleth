import React, { useState, useEffect } from "react";
import Session from 'react-session-api';
import { 
  Box, 
  useMediaQuery, 
  useTheme 
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetTransactionsQuery, useGetChainOfShipmentsQuery, useGetIncomingRequestsQuery } from "state/api";
import Header from "components/Header";
import Map from "components/SellerView/Map";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import ActionMenu from "components/SellerView/ActionMenu";
import ActionMenuIncomingOrders from "components/SellerView/ActionMenuIncomingOrders";
import FlexBetween from "components/FlexBetween";
import CertificateButton from "components/Certificate/CertificateButton";
// import NotificationButton from "components/NotificationButton";
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from 'components/Common/TabPanel';
// import { makeStyles } from '@mui/styles';
import { OrderStatus } from "configs/OrderStatus";
import { RequestType } from "configs/RequestType";
import Order from "scenes/order";
import { getLoggedInUser } from "utils/auth";


// Session.set("username","2");

const Shipments = () => {
  let userId = Session.get("username");
  const userInfo = getLoggedInUser();

  userId = userInfo._id;
  const intenralUserId = userInfo.id;
  const userid = userId;//userInfo.id;
  const theme = useTheme();
  console.log("Logged in user:", userid);

  // HOOKS 
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");
  const [coordinates, setCoordinates] = useState([]);
  const [selectedShipmentId, setSelectedShipmentId] = useState("TR2023019QXZZFR");
  const [selectedId, setSelectedId] = useState("TR2023019QXZZFR");
  const [value, setValue] = React.useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [selectedOrder, setSelectedOrder] = useState("");

  const { data, isLoading } = useGetTransactionsQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
    userId: intenralUserId
  });

  // console.log(userId);
  
  let {data: locations, isLoading: isLoadingNew} = useGetChainOfShipmentsQuery(selectedShipmentId);
  let {data: incomingOrders, isLoading: isLoadingIncomingOrders} = useGetIncomingRequestsQuery({userid});

  // console.log(incomingOrders);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  useEffect(() =>  { 
    // console.log(locations);
  }, [selectedShipmentId]);

  {/*
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
  }));
  */}
    

  if(locations ===  undefined)
    locations = {"shipmentChain":[]}


  const outgoingShipmentColumns = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "recipientId",
      headerName: "Recipient ID",
      flex: 1,
    },
    {
      field: "material",
      headerName: "Material",
      flex: 1,
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
      // renderCell: (params) => params.row.buyerType
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
      renderCell: (params) => 1000,
    },
    {
      field: "sellerStatuses",
      headerName: "Order Status",
      flex: 0.5,
      renderCell: (params) => {
        const sellerStatus = params.value[userid];
        if(params.value[userid] == OrderStatus.SELLERACCEPT)
          return (<Chip label="You Accepted" color="info"/>)
        if(params.value[userid] == OrderStatus.NEWORDER)
          return (<Chip label="New Order" color="success"/>)
        if(params.value[userid] == OrderStatus.BUYERACCEPT)
          return (<Chip label="Buyer Accepted" color="success"/>)
        if(params.value[userid] == OrderStatus.SELLERDENIED)
          return (<Chip label="You Rejected" color="warning"/>)
        if(params.value[userid] == OrderStatus.BUYERDENIED)
          return (<Chip label="Order Rejected" color="error"/>)
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      flex: 0.5,
      renderCell: (params) => {
        // console.log(params);
      return (<ActionMenuIncomingOrders orderData={params.row}/>)
    },
    },
  ];

  return (
    <Box>
      <Box 
        height="16vh"
        p="2.5rem 2.5rem"
      >
        <FlexBetween>
          <Header title="SHIPMENTS" subtitle="Manage and Track your Shipments" />
          <CertificateButton/>
        </FlexBetween>
      </Box>

      <Box m="1.5rem 2.5rem">
        <Box mt="2rem">
          <Map coordinates={coordinates} locations={locations}/>
        </Box>

        <Box>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab
              label="Outgoing Orders"
              {...a11yProps(0)}
              sx={{
                color:"#00994c",
                backgroundColor : value === 0 ? "#00cc69" : "white",
                borderColor: 'divider',
                borderBottom: 1,
                '&:hover': {
                  backgroundColor: '#e0e0e0', // Change this to the color you want when hovering
                },
              }}
            />
          <Tab
            label="Incoming Requests"
            {...a11yProps(1)}
            sx={{
              color:"#00994c",
              backgroundColor : value === 1 ? "#00cc69" : "white",
              borderColor: 'divider',
                borderBottom: 1,
                '&:hover': {
                  backgroundColor: '#e0e0e0', // Change this to the color you want when hovering
                },
              }}
            />
          </Tabs>
        </Box>


        <TabPanel value={value} index={0}>
          <Box
            height="80vh"
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
        </TabPanel>

        <TabPanel value={value} index={1}>
          <Box
            height="80vh"
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
              paginationMode="server"
              sortingMode="server"
              // onPageChange={(newPage) => setPage(newPage)}
              // onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              // onSortModelChange={(newSortModel) => setSort(...newSortModel)}
              components={{ Toolbar: DataGridCustomToolbar }}
              componentsProps={{
                toolbar: { searchInput, setSearchInput, setSearch },
              }}
              onRowClick={(row)=>{
                console.log("Here");
              }}
            />
          </Box>
        </TabPanel>
      </Box>
    </Box>
  );
};

export default Shipments;
