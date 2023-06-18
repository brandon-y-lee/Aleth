import React, { useState, useEffect } from "react";
import { 
  Box, 
  Button, 
  Divider, 
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
import { DataGrid } from "@mui/x-data-grid";
import { useGetTransactionsQuery, useGetChainOfShipmentsQuery, useGetPredictiveTransactionsQuery } from "state/api";
import Header from "components/Header";
import Map from "components/Map";
import Map1 from "components/Map1";
// import Temp from "components/Temp";
// import TempComp from "components/TempComp";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import ActionMenu from "components/ActionMenu";
import FlexBetween from "components/FlexBetween";
import PrimaryButtons from "components/PrimaryButtons";

const PredictiveTransactions = () => {
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
  const { data, isLoading } = useGetPredictiveTransactionsQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });



  console.log(data);

  let {data: locations, isLoading: isLoadingNew} = useGetChainOfShipmentsQuery(selectedId);
  if(locations ===  undefined)
    locations = {"shipmentChain":[]}

  useEffect(() =>  { 
    console.log("Locations!");
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
      headerName: "User ID",
      flex: 1,
      valueGetter: (params) => {return params.value}
    },
    {
      field: "material",
      headerName: "CreatedAt",
      flex: 1,
    },
    {
      field: "amount",
      headerName: "# of Products",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => params.value.length,
    },
    {
      field: "unit",
      headerName: "Cost",
      flex: 0.75,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
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
        <Header title="PREDSHIPMENTS"/>
        <PrimaryButtons/>
      </FlexBetween>
      
      <Box mt="2rem">
        <Map coordinates={coordinates} locations={locations}>
        </Map>
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

export default PredictiveTransactions;
