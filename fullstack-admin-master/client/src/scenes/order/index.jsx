import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Session from 'react-session-api';
import { 
  Box,
  Button,
  useMediaQuery,
  useTheme,
  Typography,
  Grid,
} from "@mui/material";
import { DataGrid, GridFooterContainer, GridFooter } from "@mui/x-data-grid";
import { useGetTransactionsQuery, useGetChainOfShipmentsQuery, useGetIncomingRequestsQuery } from "state/api";
import { useGetPurchaseOrdersQuery, useGetEligibleSellersQuery, useUpdateOrderMutation, useCreateNewOrderMutation, useGetEligibleSellersAdvancedQuery } from "state/api";
import Header from "components/Header";
import OrderMap from "components/OrderMap";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import ActionMenu from "components/SellerView/ActionMenu";
import ActionMenuIncomingOrders from "components/SellerView/ActionMenuIncomingOrders";
import { OrderStatus } from "configs/OrderStatus";
import { RequestType } from "configs/RequestType";
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from 'components/Common/TabPanel';

// Session.set("username", "2");
Session.set("coordinates", [17.2064912,22.1782433]);

const Order = () => {
  const userId = Session.get("username");
  const coords = Session.get("coordinates");
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  // values to be sent to the backend
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [value, setValue] = React.useState(0);
  const [orderId, setOrderId] = useState();
  const [search, setSearch] = useState("");
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedRows, setSelectedRows] = useState([]);

  const [formData, setFormData] = useState({});
  const [searchInput, setSearchInput] = useState("");

  let {data: purchaseOrders, isLoading: isLoadingPurchaseOrders} = useGetPurchaseOrdersQuery({userId});
  let {data: searchResults, isLoading: isLoadingSearchResults} = useGetEligibleSellersQuery({material: formData.material ? formData.material : undefined})
  let {data: searchResultsAdvanced, isLoading: isLoadingSearchResultsAdvanced} = useGetEligibleSellersAdvancedQuery({
    products: formData.productCategory ? formData.productCategory : undefined, 
    material: formData.materialType ? formData.materialType : undefined,
    fabricConstruction: formData.fabricConstruction ?formData.fabricConstruction : undefined,
    certifications : ""
   });

  console.log(searchResultsAdvanced);
  const [updateOrder, { isLoading: updatingOrder }] = useUpdateOrderMutation();
  const [createOrder, { isLoading: creatingOrder }] = useCreateNewOrderMutation();

  
  const getSearchCoordinates = (data) => {
    if(data === undefined)
      return {};
  };
  
  const handleSearch = (values) => {
    console.log(values);
    setFormData(values);
  };

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

  const CustomFooter = (props) => {
    const { selectedRows } = props;

    /* If not rows are selected */
    if (!selectedRows || selectedRows.length === 0) {
      console.log("Getting here");
      return (
        <GridFooterContainer>
          <GridFooter />
        </GridFooterContainer>
      );
    }
  
    /* If rows are selected */
    return (
      <GridFooterContainer>
        <GridFooter sx={{ border: 'none' }} />
        <Button
          onClick= { async () => { 
            await createOrder({userId, material: formData.material, quantity:10, sellers: selectedRows});
            // console.log(orderData);
            // await updateOrder({ requestType: RequestType.INITORDER, sellerIds:selectedRows, orderId:[props.orderData._id], isSeller: false })
            console.log(selectedRows); console.log("Submitted Request"); 
            window.location.reload();
          }}
          sx={{
            backgroundColor: theme.palette.secondary[300],
            color: 'white',
            '&:hover': {
              backgroundColor: theme.palette.secondary[200],
            },
            mr: 2,
          }}
        >
          Confirm Selection
        </Button>
      </GridFooterContainer>
    );
  };

  const purchaseOrdersColumns = [
    {
      field: "_id",
      headerName: "Order ID",
      flex: 0.5,
    },
    {
      field: "style",
      headerName: "Style",
      flex: 0.5,
    },
    {
      field: "material",
      headerName: "Material",
      flex: 0.75,
    },
    {
      field: "color",
      headerName: "Color",
      flex: 0.5,
      renderCell: (params) => "Red"
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 0.25,
      sortable: false,
      renderCell: (params) => "2000",
    },
    {
      field: "unit",
      headerName: "Unit",
      flex: 0.25,
      renderCell: (params) => "lb"
    },
    {
      field: "price",
      headerName: "Avg Price",
      flex: 0.5,
      renderCell: (params) => "N/A"
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

 const eligibleSellersColumns = [
  {
    field: "Company",
    headerName: "Name",
    flex: 0.5,
    renderCell: (params) => (
      console.log(params.id),
      <Link to={`/profile/${params.id}`}>
        {params.row.Company}
      </Link>
    ),
  },
  {
    field: "UserType",
    headerName: "Type",
    flex: 0.5,
  },
  {
    field: "City",
    headerName: "City",
    flex: 0.5,
    sortable: false,
    // renderCell: (params) => {params.value.length},
  },
  {
    field: "Certifications",
    headerName: "Certifications",
    flex: 0.5,
  },
  {
    field: "materialTypes",
    headerName: "Material Types",
    flex: 0.5,
    // renderCell: (params) => {return (<p>"Hello"</p>)}
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
          <OrderMap selectedTab={selectedTab} coordinates={coords} locations={searchResultsAdvanced} handleSearch={handleSearch} purchaseOrders={purchaseOrders} orderId={orderId}/>
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
              sx={(theme) => ({
                color: "#00994c",
                backgroundColor: value === 0 ? "#00cc69" : "white",
                boxShadow: value === 0 ? theme.shadows[1] : theme.shadows[2],
                '&:hover': {
                  backgroundColor: value === 0 ? '#00cc69' : '#e0e0e0',
                },
              })}
            />
            <Tab
              label="Purchase Orders"
              {...a11yProps(1)}
              sx={(theme) => ({
                color: "#00994c",
                backgroundColor: value === 1 ? "#00cc69" : "white",
                boxShadow: value === 1 ? theme.shadows[1] : theme.shadows[2],
                '&:hover': {
                  backgroundColor: value === 1 ? '#00cc69' : '#e0e0e0',
                }
              })}
            />
          </Tabs>
        </Box>

        <TabPanel value={value} index={0}>
          <Box
            height="60vh"
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
              loading={isLoadingSearchResultsAdvanced || !searchResultsAdvanced}
              getRowId={(row) => row["_id"]}
              rows={(searchResultsAdvanced && searchResultsAdvanced.eligibleSellers) || []}
              columns={eligibleSellersColumns}
              rowCount={(1) || 0}
              rowsPerPageOptions={[20, 50, 100]}
              pagination
              page={1}
              pageSize={20}
              checkboxSelection
              paginationMode="server"
              sortingMode="server"
              onSelectionModelChange={(newSelection) => {
                setSelectedRows(newSelection);
              }}
              /* onPageChange={(newPage) => setPage(newPage)}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              onSortModelChange={(newSortModel) => setSort(...newSortModel)} */
              components={{ 
                Toolbar: DataGridCustomToolbar,
                Footer: CustomFooter,
              }}
              componentsProps={{
                toolbar: { searchInput, setSearchInput, setSearch },
                footer: { selectedRows },
              }}
              onRowClick={(row)=>{
                console.log(row.row["id"])}}
            />
          </Box>
        </TabPanel>

        <TabPanel value={value} index={1}>
          <Box
            height="60vh"
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
              loading={isLoadingPurchaseOrders || !purchaseOrders}
              getRowId={(row) => Math.random()}
              rows={(purchaseOrders && purchaseOrders.allOrders) || []}
              columns={purchaseOrdersColumns}
              rowCount={(1) || 0}
              rowsPerPageOptions={[20, 50, 100]}
              pagination
              page={1}
              pageSize={20}
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
                console.log(row.row);
                  setOrderId(row.row._id);
                }}
            />
          </Box>
        </TabPanel>
      </Box>
    </Box>
  );
};

export default Order;