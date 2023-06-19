import React, { useState, useEffect } from "react";
import { 
  Box, 
  Button, 
  Divider, 
  Grid,
  IconButton, 
  Menu,
  MenuItem,
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Collapse, 
  Typography, 
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
import AcceptedList from "components/AcceptedList";
import FlexTop from "components/FlexTop";
import Chat from "components/Chat";
import HalfWidth from "components/HalfWidth";
import HalfHeight from "components/HalfHeight";

const Transactions = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

  // values to be sent to the backend
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");
  const [coordinates, setCoordinates] = useState([]);
  const [selectedId, setSelectedId] = useState("TR2023019QXZZFR");

  const [searchInput, setSearchInput] = useState("");
  const { data, isLoading } = useGetTransactionsQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });

  // console.log(data);
  let {data: locations, isLoading: isLoadingNew} = useGetChainOfShipmentsQuery(selectedId);

  if(locations ===  undefined)
    locations = {"shipmentChain":[]}

  useEffect(() =>  { 
    console.log(locations);
  },[selectedId]);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "coordinates",
      headerName: "Coordinates",
      flex: 1,
      valueGetter: (params) => {
        const lat = Number(Number(params.value[0].$numberDecimal).toFixed(4));
        const lon = Number(Number(params.value[1].$numberDecimal).toFixed(4));
        return `[${lat}, ${lon}]`;
      },
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
      field: "actions",
      headerName: "Actions",
      sortable: false,
      flex: 0.5,
      renderCell: (params) => (
        <ActionMenu />
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
            // console.log(row.row.shipmentID);
            // console.log(row.row.shipmentID);
            setSelectedId(row.row.shipmentID);
            // console.log(selectedId);
            setCoordinates([{"$numberDecimal":Math.random()*100}, {"$numberDecimal":Math.random()*100}])}
          }
        />
      </Box>
    </Box>
  );
};

export default Transactions;
