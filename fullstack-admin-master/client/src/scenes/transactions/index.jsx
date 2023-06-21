import React, { useState, useEffect } from "react";
import Session from 'react-session-api';
import { 
  Box, 
  useMediaQuery, 
  useTheme 
} from "@mui/material";
import { DataGrid, GridColumnHeaderFilterIconButton } from "@mui/x-data-grid";
import { useGetTransactionsQuery, useGetChainOfShipmentsQuery } from "state/api";
import Header from "components/Header";
import Map from "components/Map";
// import Temp from "components/Temp";
// import TempComp from "components/TempComp";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import ActionMenu from "components/ActionMenu";
import FlexBetween from "components/FlexBetween";
import PrimaryButtons from "components/PrimaryButtons";
import Chip from '@mui/material/Chip';
Session.set("username","2");

const Transactions = () => {
  const userName = Session.get("username");
  const theme = useTheme();
  // values to be sent to the backend
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");
  const [coordinates, setCoordinates] = useState([]);
  const [selectedShipmentId, setSelectedShipmentId] = useState("TR2023019QXZZFR");
  const [selectedId, setSelectedId] = useState("TR2023019QXZZFR");

  const [searchInput, setSearchInput] = useState("");

  const { data, isLoading } = useGetTransactionsQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
    userId: userName
  });

  console.log(data);
  let {data: locations, isLoading: isLoadingNew} = useGetChainOfShipmentsQuery(selectedShipmentId);

  if(locations ===  undefined)
    locations = {"shipmentChain":[]}

  useEffect(() =>  { 
    console.log(locations);
  },[selectedShipmentId]);

  const columns = [
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
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="SHIPMENTS"/>
        <PrimaryButtons/>
      </FlexBetween>
      
      <Box mt="2rem">
        <Map coordinates={coordinates} locations={locations}/>
      </Box>
      
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
          columns={columns}
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
  );
};

export default Transactions;
