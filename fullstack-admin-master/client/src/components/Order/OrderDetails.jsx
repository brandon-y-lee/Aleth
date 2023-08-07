import * as React from 'react';
import { 
  Chip,
  Checkbox,
  Button,
  Card,
  CardContent,
  Box,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  Typography, 
  Divider
} from "@mui/material";
import { useGetOrderSellerDetailsQuery, useUpdateOrderMutation } from "state/api";
import { RequestType } from 'configs/RequestType';
import NoteIcon from '@mui/icons-material/Note';

const OrderDetails = ({ orderId }) => {
  const [selected, setSelected] = React.useState({});
  const [selectedStatus, setSelectedStatus] = React.useState(null);
  const [updateOrder, { isLoading: updatingOrder }] = useUpdateOrderMutation();
  const [openNotes, setOpenNotes] = React.useState(false);
  const [currentNotes, setCurrentNotes] = React.useState('');

  const handleOpenNotes = (notes) => {
    setCurrentNotes(notes);
    setOpenNotes(true);
  };
  
  const handleCloseNotes = () => {
    setOpenNotes(false);
  };

  const handleStatusClick = (status) => {
    setSelectedStatus(status);
  };
  
  console.log('Order Id: ', orderId);
  let {data: sellerDetails, isLoading: isLoadingSellerDetails} = useGetOrderSellerDetailsQuery({orderId});
  console.log('Seller Details: ', sellerDetails);
  const pending = sellerDetails?.userData?.stats.pending;
  const accepted = sellerDetails?.userData?.stats.accepted;
  const rejected = sellerDetails?.userData?.stats.rejected;
  const certificates = [
      "(ISO) 9001",
      "Global Organic Textile Standard (GOTS)",
      "Fair Trade",
      "SA8000",
      "ECO PASSPORT",
      "Worldwide Responsible Apparel Production (WRAP)",
      "Bluesign",
      "Zero Discharge of Hazardous Chemicals (ZDHC)",
      "Responsible Care"
  ];

  const handleCheckboxChange = (event, index) => {
    setSelected(prevState => ({ ...prevState, [index]: event.target.checked }));
  };

  const handleButtonClick = async () => {
    const selectedIds = sellerDetails?.userData?.userDetails
      .filter((elem, index) => selected[index])
      .map(elem => elem._id);
    await updateOrder({ requestType: RequestType.BUYERACCEPT, sellerIds:selectedIds, orderId: [orderId], isSeller: false, notes: " "});
    console.log(selectedIds);
    window.location.reload();
    // Do something with selectedIds here...
  };

  const elems = sellerDetails?.userData?.userDetails
    .filter((elem) => {
      if (!selectedStatus) return true;
      return sellerDetails.userData.userStatus[elem._id] === selectedStatus;
    })
    .map((elem, index) => {
      const certIndex = Math.floor(Math.random()*(certificates.length-1));
      const disabled = (sellerDetails.userData.userStatus[elem._id] !== RequestType.SELLERACCEPT)?true:false;
      const checked = (sellerDetails.userData.userStatus[elem._id] === RequestType.BUYERACCEPT)?true:false;
      const sellerNotes = sellerDetails.userData.userNotes[elem._id];
      const status = (sellerDetails.userData.userStatus[elem._id] === RequestType.BUYERACCEPT)?1:0;
      const statusColor = status==1?"#2f7c327a":"";
      console.log(statusColor);

      /*
      <TableCell>
        <Card sx={{ width: '100%', m: 1, backgroundColor: "#d6dedb" }}>
          <CardContent>
            <Typography variant="h6">On-time delivery rate: 86%</Typography>
            <Typography variant="h6">Expected Lead Time: 4d</Typography>
            <Typography variant="h6">Certificates: <li> {certificates[certIndex]} </li> <li> {certificates[certIndex+1]} </li></Typography>
          </CardContent>
        </Card>
      </TableCell>
      */
        
      return (
        <TableRow key={index}>
          <TableCell>
            <Checkbox
              checked={selected[index] || checked}
              onChange={(event) => handleCheckboxChange(event, index)}
            />
          </TableCell>
          <TableCell>
            {elem.Company}
          </TableCell>
          <TableCell>
            <IconButton sx={{ width: '10%', flexShrink: 0, margin: "2px" }} edge="end" aria-label="notes" onClick={() => handleOpenNotes(sellerNotes)}>
              <NoteIcon />
            </IconButton>
          </TableCell>
          <TableCell>{10}</TableCell>
        </TableRow>
      );
    });

  if(!orderId)
    return (<></>);

  return (
    <div>
      <Box sx={{
        border: '2px solid #f6f6f6',
        boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.15)',
        backgroundColor: 'background.paper',
        borderRadius: '5px',
        padding: '20px',
      }}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <Stack>
            <Typography variant="h5" fullWidth sx={{ color: 'grey', fontWeight: 400 }} align="left">SKU</Typography>
            <Typography variant="h4" fullWidth sx={{ fontWeight: 550 }} align="left">12345</Typography>
          </Stack>
          <Divider orientation="vertical" flexItem />
          <Stack>
            <Typography variant="h5" fullWidth sx={{ color: 'grey', fontWeight: 400 }} align="center">Material</Typography>
            <Typography variant="h4" fullWidth sx={{ fontWeight: 550 }} align="center">COTTON</Typography>
          </Stack>
          <Divider orientation="vertical" flexItem />
          <Stack>
            <Typography variant="h5" fullWidth sx={{ color: 'grey', fontWeight: 400 }} align="right">Total Suppliers</Typography>
            <Typography variant="h4" fullWidth sx={{ fontWeight: 550 }} align="right">12345</Typography>
          </Stack>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3, mb: 2 }}>
          <Chip label={"Accepted: " + accepted} color="success" onClick={() => handleStatusClick(RequestType.SELLERACCEPT)} clickable sx={{ minWidth: '30%', maxWidth: '100%' }} />
          <Chip label={"Pending: " + pending} color="info" onClick={() => handleStatusClick(RequestType.INITORDER)} clickable sx={{ minWidth: '30%', maxWidth: '100%' }} />
          <Chip label={"Rejected: " + rejected} color="error" onClick={() => handleStatusClick(RequestType.SELLERREJECT)} clickable sx={{ minWidth: '30%', maxWidth: '100%' }} />
        </Box>

        <TableContainer sx={{ maxHeight: '500px', overflow: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: '50px' }}></TableCell>
                <TableCell align="center">Company</TableCell>
                <TableCell align="center">Notes</TableCell>
                <TableCell align="center">Rating</TableCell>
                <TableCell align="center">Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{
              '& .MuiTableCell-root': {
                textAlign: 'center',
              },
            }}>
              {elems}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={5}>
                  <Button 
                    type="button"
                    variant="contained"
                    color="secondary" 
                    onClick={handleButtonClick}
                    sx={{ mt: 2, mb: 2 }}
                  >
                    Send Confirmation
                  </Button>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export default OrderDetails;