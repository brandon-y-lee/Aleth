import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './styles.css';
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
import Header from "components/Header";
import FlexBetween from "components/FlexBetween";
import AddSupplier from "components/Network/AddSupplier";
import PendingInvitations from "components/Network/PendingInvitations";
import { useGetSuppliersForUserQuery, useGetPendingInvitationsForUserQuery } from "state/api";

const Network = () => {
  const theme = useTheme();
  const [openAddSupplier, setOpenAddSupplier] = useState(false);
  const [openPendingInvitations, setOpenPendingInvitations] = useState(false);

  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const loggedInUserId = loggedInUser ? loggedInUser._id : null;

  const { data: suppliers, isLoading: isLoadingSuppliers } = useGetSuppliersForUserQuery({ userId: loggedInUserId });
  console.log('Suppliers: ', suppliers);
  const { data: pendingInvitations, isLoading: isLoadingPendingInvitations } = useGetPendingInvitationsForUserQuery({ userId: loggedInUserId });
  console.log('Pending Invitations: ', pendingInvitations);

  // Convert the suppliers data to a format suitable for DataGridPro
  const formattedSuppliers = suppliers?.map(supplier => ({
    id: supplier._id, // This will be used as the unique identifier for the DataGridPro component
    name: supplier.Company,
    type: supplier.UserType,
    productionProcesses: supplier.Products.join(', '), // Assuming you want to display all products as a comma-separated string
    country: supplier.State, // This is a state, not a country. Adjust as needed.
    updatedAt: supplier.updatedAt
  })) || [];


  const supplierColumns = [
    { 
      field: "name",
      headerName: "Name",
      flex: 1,
      renderCell: (params) => (
        console.log(params.id),
        <Link to={`/profile/${params.id}`} className="customLink">
          {params.row.name}
        </Link>
      ),
    },
    { field: "type", headerName: "Type", flex: 0.5 },
    { field: "productionProcesses", headerName: "Production Processes", flex: 1 },
    { field: "country", headerName: "State", flex: 0.5 },
    { field: "updatedAt", headerName: "Updated at", flex: 0.75 },
  ];

  // ... rest of the component logic

  return (
    <Box>
      <Box 
        height="16vh"
        m="2.5rem 2.5rem 0rem 2.5rem"
      >
        <Header title="NETWORK" subtitle="Onboard and Connect with Your Suppliers" />
      </Box>

      <Box m="0rem 2.5rem 1.5rem 2.5rem">
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
          <FlexBetween gap="1.5rem">
            <Button variant="contained" color="primary" onClick={() => setOpenPendingInvitations(true)}>
              {`Pending Invitations (${pendingInvitations && pendingInvitations.totalPending})`}
            </Button>
            <Button variant="contained" color="primary" onClick={() => setOpenAddSupplier(true)}>
              Add Supplier
            </Button>
          </FlexBetween>
        </Toolbar>

        <Box mt={2} height="80vh">
          <DataGridPro
            loading={isLoadingSuppliers || !formattedSuppliers}
            rows={(formattedSuppliers) || []}
            columns={supplierColumns}
          />
        </Box>

        <PendingInvitations
          open={openPendingInvitations}
          onClose={() => setOpenPendingInvitations(false)}
        />
        <AddSupplier
          open={openAddSupplier}
          onClose={() => setOpenAddSupplier(false)}
        />
      </Box>
    </Box>
  );
};

export default Network;
