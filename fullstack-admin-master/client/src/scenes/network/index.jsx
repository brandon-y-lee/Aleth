import React, { useState, useEffect } from "react";
import Session from 'react-session-api';
import { 
  Box, 
  useMediaQuery, 
  useTheme,
  IconButton,
  InputBase,
  Button,
  Dialog,
  Toolbar
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { useGetTransactionsQuery, useGetChainOfShipmentsQuery, useGetIncomingRequestsQuery, useGetEligibleSellersAdvancedQuery } from "state/api";
import Header from "components/Header";
import FlexBetween from "components/FlexBetween";
import AddSupplier from "components/Network/AddSupplier";

const Network = () => {
  const theme = useTheme();

  // Original state and hooks
  const userId = Session.get("username");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");
  const [coordinates, setCoordinates] = useState([]);
  const [selectedShipmentId, setSelectedShipmentId] = useState("TR2023019QXZZFR");
  const [selectedId, setSelectedId] = useState("TR2023019QXZZFR");
  const [value, setValue] = useState(0);
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

  // New state for the AddSupplier dialog
  const [openAddSupplierDialog, setOpenAddSupplierDialog] = useState(false);

  const supplierColumns = [
    { field: "image", headerName: "Image", flex: 0.25 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "type", headerName: "Type", flex: 0.5 },
    { field: "productionProcesses", headerName: "Production Processes", flex: 1 },
    { field: "country", headerName: "Country", flex: 0.5 },
    { field: "updatedAt", headerName: "Updated at", flex: 0.75 },
  ];

  // ... rest of the component logic

  return (
    <Box>
      <Box 
        height="16vh"
        p="2.5rem 2.5rem"
      >
        <Header title="NETWORK" subtitle="Onboard and Connect with Your Suppliers" />
      </Box>

      <Box m="1.5rem 2.5rem">
        <Toolbar 
          sx={{
            justifyContent: "space-between",
            pl: 0,
            pr: 0,
            "@media (min-width: 600px)": {
              pl: 0,
              pr: 0
            } 
          }}
        >
          {/* LEFT SIDE */}
          <FlexBetween
            backgroundColor={theme.palette.background.alt}
            borderRadius="8px"
            gap="3rem"
            p="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>

          {/* RIGHT SIDE */}
          <Button variant="contained" color="primary" onClick={() => setOpenAddSupplierDialog(true)}>
            Add Supplier
          </Button>
        </Toolbar>

        <Box mt={2} height="80vh">
          <DataGridPro
            rows={(locations) || []}
            columns={supplierColumns}
          />
        </Box> 

        <AddSupplier
          open={openAddSupplierDialog}
          onClose={() => setOpenAddSupplierDialog(false)}
        />
      </Box>
    </Box>
  );
};

export default Network;
