import React, { useEffect, useState } from 'react';
import { 
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Checkbox,
  ListItemText,
  ListItem,
  List,
  ListItemButton
} from '@mui/material';
// import { useGetOutgoingRequestsQuery, useUpdateRequestsMutation } from "state/api";
// import Session from 'react-session-api'

const Outgoing = ({ open, onClose, id }) => {
  const [checked, setChecked] = useState([]);
  // const username = Session.get("username");

  // const { data, isLoading } = useGetOutgoingRequestsQuery({
  //   userId: username
  // });

  // const [updateRequests, { isLoading: isUpdatingRequests }] = useUpdateRequestsMutation();

  const handleSubmit = () => {
    // updateRequests logic here
  };

  useEffect(() => {
    if (open) {
      setChecked([]);
    }
  }, [open]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Outgoing Requests</DialogTitle>
      <DialogContent>
        <List>
          {/* data && data.requests.map((request) => (
            <ListItemButton key={request.id} onClick={handleToggle(request.id)}>
              <Checkbox
                edge="start"
                checked={checked.indexOf(request.id) !== -1}
                tabIndex={-1}
                disableRipple
              />
              <ListItemText primary={`Request ID: ${request.id}, Details: ${request.details}`} />
            </ListItemButton>
          )) */}
          {/* data && !data.requests.length && (<p>No outgoing requests found!</p>) */}
        </List>
      </DialogContent>
      <DialogActions>
        <Button style={{"backgroundColor":"#00994c"}} onClick={ onClose }>Cancel</Button>
        <Button
          style={{"backgroundColor":"#00994c"}}
          onClick={handleSubmit}
          // disabled={isUpdatingRequests}
        >
          {/* {isUpdatingRequests ? "Updating..." : "Confirm"} */}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Outgoing;
