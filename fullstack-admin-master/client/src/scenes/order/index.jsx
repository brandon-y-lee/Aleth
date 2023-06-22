import React, { useState, useEffect } from "react";
import { 
  Box, 
  useMediaQuery, 
  useTheme,
  Typography,
  Grid
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetTransactionsQuery, useGetChainOfShipmentsQuery } from "state/api";
import Header from "components/Header";
import OverviewChart from "components/OverviewChart";
import BreakdownChart from "components/BreakdownChart";
import OrderMap from "components/OrderMap";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import ActionMenu from "components/ActionMenu";
import FlexBetween from "components/FlexBetween";
import CertificateButton from "components/CertificateButton";
import PurchaseForm from "components/PurchaseForm";
import AcceptedList from "components/AcceptedList";

const Order = () => {
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
        <Header title="ORDER"/>
        <CertificateButton/>
      </FlexBetween>

      <Box mt="2rem">
        <Grid container spacing={3}> {/* Use Grid container */}
          {/* ROW 1 */}
          <Grid item xs={12} md={4}> {/* Use Grid item */}
            <Box sx={{ gridRow: 'span 1' }}> {/* Set gridRow */}
              <PurchaseForm />
            </Box>
          </Grid>

          <Grid item xs={12} md={8}> {/* Use Grid item */}
            <Box sx={{ gridRow: 'span 3' }}> {/* Set gridRow */}
              <OrderMap coordinates={coordinates} locations={locations}/>
            </Box>
          </Grid>
          
          {/* ROW 2 */}  
          <Grid item xs={12} md={4}> {/* Use Grid item */}
            <Box
              backgroundColor={theme.palette.background.alt}
              p="1.5rem"
              borderRadius="0.55rem"
              sx={{ gridRow: 'span 3'}}
            />
          </Grid>

          <Grid item xs={12} md={8}> {/* Use Grid item */}
            <Box
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
                rowsPerPageOptions={[20,50, 100]}
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
                  setSelectedId(row.row.shipmentID);
                  setCoordinates([{"$numberDecimal":Math.random()*100}, {"$numberDecimal":Math.random()*100}])}
                }
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Order;
