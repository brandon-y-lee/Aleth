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
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from 'components/Common/TabPanel';
import { OrderStatus } from "configs/OrderStatus";
import { RequestType } from "configs/RequestType";
import Order from "scenes/order";

Session.set("username","2");

const Products = () => {
  const userId = Session.get("username");
  const theme = useTheme();

  /* HOOKS */
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
    userId: userId
  });
  
  let {data: locations, isLoading: isLoadingNew} = useGetChainOfShipmentsQuery(selectedShipmentId);
  let {data: incomingOrders, isLoading: isLoadingIncomingOrders} = useGetIncomingRequestsQuery({userId});

  if(locations ===  undefined)
    locations = {"shipmentChain":[]}

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
  }, [selectedShipmentId]);

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

  return (
    <Box>
      <Box 
        height="16vh"
        p="2.5rem 2.5rem"
        sx={{
          background: `linear-gradient(215deg, ${theme.palette.secondary[400]} 30%, ${theme.palette.primary[500]} 90%)`,
        }}
      >
        <Header title="PRODUCTS" subtitle="View Transactions and Track Inventory" />
      </Box>

      <Box m="1.5rem 2.5rem">
        <Header title="PRODUCTS"/>

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
      </Box>
    </Box>
  );
};

export default Products;
