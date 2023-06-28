import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Chip, Checkbox, Button, Card, CardContent, Box } from "@mui/material";
import { useGetOrderSellerDetailsQuery } from "state/api";


export default function OrderDetails({orderId}) {
  const [expanded, setExpanded] = React.useState(false);
  const [selected, setSelected] = React.useState({}); // add this line

  let {data: sellerDetails, isLoading: isLoadingSellerDetails} = useGetOrderSellerDetailsQuery({orderId});
  console.log(sellerDetails);
  const pending = sellerDetails?.userData?.stats.pending;
  const accepted = sellerDetails?.userData?.stats.accepted;
  const rejected = sellerDetails?.userData?.stats.rejected;

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleCheckboxChange = (event, index) => {
    setSelected(prevState => ({ ...prevState, [index]: event.target.checked }));
  }

  const handleButtonClick = () => {
    const selectedIds = sellerDetails?.userData?.userDetails
      .filter((elem, index) => selected[index])
      .map(elem => elem._id);

    console.log(selectedIds);
    // Do something with selectedIds here...
  }

  const elems = sellerDetails?.userData?.userDetails.map((elem, index) => (
    <Accordion expanded={expanded === ('panel'+ index)} onChange={handleChange('panel'+index)}>
        <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
        >
            <Checkbox
              checked={selected[index] || false}
              onChange={(event) => handleCheckboxChange(event, index)}
            />
            <Typography sx={{ width: '50%', flexShrink: 0 }}>
                {elem.name}
            </Typography>
            <Typography sx={{ color: 'black' }}>Aleth Score: {9 + Math.round(Math.random()*4)}</Typography>
        </AccordionSummary>
        <AccordionDetails>
                <Card sx={{ width: '75%', m: 4 }}>
                    <CardContent>
                        <Typography variant="h6">On-time delivery rate: 86%</Typography>
                        <Typography variant="h6">Average Lead Time: 4d</Typography>
                        <Typography variant="h6">Aleth Certified: Yes</Typography>
                    </CardContent>
                </Card>
        </AccordionDetails>
  </Accordion>
  ));

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
      <Button style={{"backgroundColor":"#00994c"}} onClick={handleButtonClick}>Send Confirmation</Button>
      {/* <Button onClick={handleButtonClick}>Get Selected IDs</Button> */}
    </div>
  );
}
