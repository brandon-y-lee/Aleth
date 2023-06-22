import { React, useEffect, useState } from 'react';
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
import { useGetRecipientTransactionsQuery, useUpdateRecipientsMutation } from "state/api";
import Session from 'react-session-api'


// Need to add shipments prop
const Link = ({ open, onClose, id }) => {
  const [checked, setChecked] = useState([]);
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
    updateRecipients({ senders: checked, receivingOrderId: id })
      .unwrap()
      .then(() => {
        console.log("Recipients updated successfully!");
        onClose();
      })
      .catch((error) => {
        console.error("Error updating recipients:", error);
      });
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

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Link To Received Shipment</DialogTitle>
      <DialogContent>
        <List>
          {data && data.transactions.map((transaction) => (
            <ListItemButton key={transaction.id} onClick={handleToggle(transaction.id)}>
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
          onClick={handleSubmit}
          disabled={isUpdatingRecipients}
        >
          {isUpdatingRecipients ? "Updating..." : "Confirm & Link"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Link;