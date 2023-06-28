import React, { useState, useEffect } from "react";
import Session from 'react-session-api';
import { DataGrid } from "@mui/x-data-grid";
import { useGetTransactionsQuery, useGetChainOfShipmentsQuery } from "state/api";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import ActionMenu from "components/SellerView/ActionMenu";
import Chip from '@mui/material/Chip';
// Session.set("username","2");

const OutgoingOrders = () => {
  const userName = Session.get("username");
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
  );
};

export default OutgoingOrders;
