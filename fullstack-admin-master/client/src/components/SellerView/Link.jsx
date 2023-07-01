import { React, useEffect, useState } from 'react';
import { 
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Checkbox,
  ListItemText,
  List,
  ListItemButton
} from '@mui/material';
import { useGetRecipientTransactionsQuery, useUpdateRecipientsMutation } from "state/api";
import Session from 'react-session-api'


// Need to add shipments prop
const Link = ({ open, onClose, id }) => {
  const [checked, setChecked] = useState([]);
  const [checkedShipmentId, setCheckedShipmentId] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");
  const username = Session.get("username");

  const { data, isLoading } = useGetRecipientTransactionsQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
    userId: username
  });

  const [updateRecipients, { isLoading: isUpdatingRecipients }] = useUpdateRecipientsMutation();

  const handleSubmit = () => {
    // console.log(checkedShipmentId);
    updateRecipients({ senders: checked, receivingOrderId: id, shipmentID: checkedShipmentId[0] })
      .unwrap()
      .then(() => {
        console.log("Recipients updated successfully!");
        onClose();
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error updating recipients:", error);
      });
  };



  useEffect(() => {
    if (open) {
      setChecked([]);
      setCheckedShipmentId([]);
    }
  }, [open]);

  const handleToggle = (id, shipmentId) => () => {
    console.log(id, shipmentId);
    const currentIndex = checked.indexOf(id);
    const newChecked = [...checked];
    const newCheckedShipmentId = [...checkedShipmentId];

    if (currentIndex === -1) {
      newChecked.push(id);
      newCheckedShipmentId.push(shipmentId);
    } else {
      newChecked.splice(currentIndex, 1);
      newCheckedShipmentId.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    setCheckedShipmentId(newCheckedShipmentId);
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Link To Received Shipment</DialogTitle>
      <DialogContent>
        <List>
          {data && data.transactions.map((transaction) => (
            <ListItemButton key={transaction.id} onClick={handleToggle(transaction.id, transaction.shipmentID)}>
              <Checkbox
                edge="start"
                checked={checked.indexOf(transaction.id) !== -1}
                tabIndex={-1}
                disableRipple
              />
              <ListItemText primary={`ID: ${transaction.id}, Material: ${transaction.material}, Amount: ${transaction.amount}, Unit: ${transaction.unit}`} />
            </ListItemButton>
          ))}
          {data && !data.transactions.length && (<p>No previous shipments found!</p>)}
        </List>
      </DialogContent>
      <DialogActions>
        <Button style={{"backgroundColor":"#00994c"}} onClick={ onClose }>Cancel</Button>
        <Button
          style={{"backgroundColor":"#00994c"}}
          onClick={() => handleSubmit()}
          disabled={isUpdatingRecipients}
        >
          {isUpdatingRecipients ? "Updating..." : "Confirm & Link"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Link;