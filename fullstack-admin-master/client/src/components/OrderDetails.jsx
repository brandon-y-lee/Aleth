import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Chip } from '@mui/material';
import { Button, Card, CardContent, Box } from "@mui/material";

export default function OrderDetails(props) {
  const [expanded, setExpanded] = React.useState(false);
  console.log(props);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

//   const elems = props.orders.map((elem,index) => (
//     <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
//         <AccordionSummary
//         expandIcon={<ExpandMoreIcon />}
//         aria-controls="panel1bh-content"
//         id="panel1bh-header"
//         >
//             <Typography sx={{ width: '33%', flexShrink: 0 }}>
//                 {elem.name}
//             </Typography>
//             <Typography sx={{ color: 'text.secondary' }}>Aleth Score: {9 + Math.random()*4}</Typography>
//         </AccordionSummary>
//         <AccordionDetails>
//                 <Card sx={{ width: '75%', m: 4 }}>
//                     <CardContent>
//                         <Typography variant="h6">On-time delivery rate: 86%</Typography>
//                         <Typography variant="h6">Average Lead Time: 4d</Typography>
//                         <Typography variant="h6">Aleth Certified: Yes</Typography>
//                     </CardContent>
//                 </Card>
//         </AccordionDetails>
//   </Accordion>
//   ));


  return (
    <div>

     <Accordion >
        <AccordionSummary
          
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            <Chip label="Accepted: 10" color="success"/>
          </Typography>
          
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            <Chip label="Pending: 4" color="info"/> 
          </Typography>
          
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            <Chip label="Rejected: 7" color="error"/>
          </Typography>
         
        </AccordionSummary>
      </Accordion>

      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            General settings
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>I am an accordion</Typography>
        </AccordionSummary>
        <AccordionDetails>
                <Card sx={{ width: '75%', m: 4 }}>
                    <CardContent>
                        <Typography variant="h6">Recipient</Typography>
                        <Typography variant="h6">Material:</Typography>
                        <Typography variant="h6">Files:</Typography>
                    </CardContent>
                </Card>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}