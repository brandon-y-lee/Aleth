import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Chip, Checkbox, Button, Card, CardContent, Box } from "@mui/material";
import { useGetOrderSellerDetailsQuery, useUpdateOrderMutation } from "state/api";
import { RequestType } from 'configs/RequestType';
import { Dialog, DialogTitle, DialogContent, DialogContentText, IconButton } from "@mui/material";
import NoteIcon from '@mui/icons-material/Note';


export default function OrderDetails2 ({ orderId }) {
  const [expanded, setExpanded] = React.useState(false);
  const [selected, setSelected] = React.useState({});
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

  let {data: sellerDetails, isLoading: isLoadingSellerDetails} = useGetOrderSellerDetailsQuery({orderId});
  console.log(`Seller Details: ${sellerDetails}`);
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

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleCheckboxChange = (event, index) => {
    setSelected(prevState => ({ ...prevState, [index]: event.target.checked }));
  }

  const handleButtonClick = async () => {
    const selectedIds = sellerDetails?.userData?.userDetails
      .filter((elem, index) => selected[index])
      .map(elem => elem._id);
    await updateOrder({ requestType: RequestType.BUYERACCEPT, sellerIds:selectedIds, orderId: [orderId], isSeller: false, notes: " "});
    console.log(selectedIds);
    window.location.reload();
    // Do something with selectedIds here...
  }

  const elems = sellerDetails?.userData?.userDetails.map((elem, index) => {

    const certIndex = Math.floor(Math.random()*(certificates.length-1));
    const disabled = (sellerDetails.userData.userStatus[elem._id] !== RequestType.SELLERACCEPT)?true:false;
    const checked = (sellerDetails.userData.userStatus[elem._id] === RequestType.BUYERACCEPT)?true:false;
    const sellerNotes = sellerDetails.userData.userNotes[elem._id];
    const status = (sellerDetails.userData.userStatus[elem._id] === RequestType.BUYERACCEPT)?1:0;
    const statusColor = status==1?"#2f7c327a":"";
    console.log(statusColor);
    
    return (
    <Accordion key={index} expanded={expanded === ('panel'+ index)} onChange={handleChange('panel'+index)} sx={{ backgroundColor: statusColor}}>
        <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
        >
      <Box display="flex" width="100%" justifyContent="space-around" alignItems="center">
        <Box display="flex"></Box>
            <Checkbox
              checked={selected[index] || checked}
              onChange={(event) => handleCheckboxChange(event, index)}
              disabled = {disabled}
            />
            <Typography sx={{ width: '50%', flexShrink: 0 }}>
                {elem.Company}
            </Typography>
            
            <IconButton sx={{ width: '10%', flexShrink: 0, margin: "2px" }} edge="end" aria-label="notes" onClick={() => handleOpenNotes(sellerNotes)}>
              <NoteIcon />
            </IconButton>

            <Typography sx={{ width: '30%', flexShrink: 0, color: 'black' }} >Aleth Score: {9 + Math.round(Math.random()*4)}</Typography>
        </Box>

        </AccordionSummary>

        <AccordionDetails>
                <Card sx={{ width: '100%', m: 1, backgroundColor: "#d6dedb" }}>
                    <CardContent>
                        <Typography variant="h6">On-time delivery rate: 86%</Typography>
                        <Typography variant="h6">Average Lead Time: 4d</Typography>
                        <Typography variant="h6">Certificates: <li> {certificates[certIndex]} </li> <li> {certificates[certIndex+1]} </li></Typography>
                    </CardContent>
                </Card>
        </AccordionDetails>

        <Dialog open={openNotes} onClose={handleCloseNotes}>
    <DialogTitle>Seller Notes</DialogTitle>
    <DialogContent>
      <DialogContentText>
      {currentNotes}
      </DialogContentText>
    </DialogContent>
  </Dialog>
  </Accordion>
  )});
  
  if(!orderId)
    return (<></>);

  return (
    <div>
      <Accordion >
        <AccordionSummary   
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: '50%', flexShrink: 0 }}>
           Order ID: {orderId}
          </Typography>
        </AccordionSummary>
      </Accordion>

      <Accordion >
        <AccordionSummary   
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            <Chip label={"Accepted: " + accepted} color="success"/>
          </Typography>
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            <Chip label={"Pending: " + pending} color="info"/> 
          </Typography>
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            <Chip label={"Rejected: " + rejected} color="error"/>
          </Typography>
        </AccordionSummary>
      </Accordion>

      {elems}

      <Button type="button"
        fullWidth
        variant="contained"
        color="secondary" onClick={handleButtonClick}
      >
        Send Confirmation
      </Button>

      {/* <Button onClick={handleButtonClick}>Get Selected IDs</Button> */}
    </div>
  );
}
