import React, { useState } from "react";
import { 
  Box, 
  Button, 
  Divider, 
  IconButton, 
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
import FlexBetween from "components/FlexBetween";
import {
  DownloadOutlined,
  UploadFileOutlined,
  ExpandMore, 
  ExpandLess
} from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetTransactionsQuery } from "state/api";
import Header from "components/Header";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import StatBox from "components/StatBox";

const Transactions = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

  // values to be sent to the backend
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");
  const [coordinates, setCoordinates] = useState({"lat":1, "long":1});

  const [searchInput, setSearchInput] = useState("");
  const { data, isLoading } = useGetTransactionsQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });

  // const columns = [
  //   {
  //     field: "_id",
  //     headerName: "ID",
  //     flex: 1,
  //   },
  //   {
  //     field: "userId",
  //     headerName: "User ID",
  //     flex: 1,
  //   },
  //   {
  //     field: "createdAt",
  //     headerName: "CreatedAt",
  //     flex: 1,
  //   },
  //   {
  //     field: "products",
  //     headerName: "# of Products",
  //     flex: 0.5,
  //     sortable: false,
  //     renderCell: (params) => params.value.length,
  //   },
  //   {
  //     field: "cost",
  //     headerName: "Cost",
  //     flex: 1,
  //     renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
  //   },
  // ];

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
      valueGetter: (params) => {return params.value[0]}
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
      flex: 1,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="SHIPMENTS"/>

        <Box>
          <FlexBetween gap="1rem">          
            <Button
              sx={{
                backgroundColor: theme.palette.secondary.light,
                color: theme.palette.background.alt,
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
            >
              <DownloadOutlined sx={{ mr: "10px" }} />
              Download Reports
            </Button>

            <Button
              sx={{
                backgroundColor: theme.palette.secondary.light,
                color: theme.palette.background.alt,
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
            >
              <UploadFileOutlined sx={{ mr: "10px" }} />
              Create Certificate
            </Button>
          </FlexBetween>
        </Box>
      </FlexBetween>
      
      <FlexBetween>
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="auto"
          gap="20px"
          sx={{
            "& > div": { gridColumn: isNonMediumScreens ? "span 12" : "span 8"},
          }}
        >
          <Box
            bgcolor={theme.palette.background.alt}
            borderRadius="5px"
            p="1rem 4rem 1rem 4rem"
            sx={{ gridColumn: isNonMediumScreens ? "span 12" : "span 8"}}
          >
            <Typography variant="h5" align="center" gutterBottom fontWeight="bold" m="10px">
              Certificates Overview
            </Typography>
            
            <Box
              display="flex"
              flexDirection={"column"}
              justifyContent="center"
              alignItems="center"
            >
              <Box textAlign="center">
                <StatBox
                  title="Your Certificates"
                  value={data && data.transactions.length}
                />
              </Box>
              <Divider 
                orientation="horizontal"
                variant="middle"
                sx={{ width: '100%'}} 
              />
              <Box textAlign="center">
                <StatBox
                  title="New Certificates"
                  value={data && data.transactions.length}
                />
              </Box>
              <Divider 
                orientation="horizontal"
                variant="middle"
                sx={{ width: '100%'}} 
              />
              <Box textAlign="center">
                <StatBox
                  title="Pending Certificates"
                  value={data && data.transactions.length}
                />
              </Box>
            </Box>
          </Box>
          { /* INSERT CODE HERE */ }
        </Box>
      </FlexBetween>

      
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
          getRowId={(row) => row.id}
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
          onRowClick={(row) => setCoordinates({"lat":row.lat, "long":row.long})}
        />
      </Box>
    </Box>
  );
};

export default Transactions;
