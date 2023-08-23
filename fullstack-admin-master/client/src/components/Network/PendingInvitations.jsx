import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Button, Dialog, DialogTitle, DialogContent, List, ListItem, ListItemText, Tabs, Tab } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useParams } from "react-router-dom";
import { useGetInvitesSentForUserQuery, useGetInvitesReceivedForUserQuery, useUpdateInviteStatusMutation } from 'state/api';
import TabPanel from 'components/Common/TabPanel';
import './styles.css';

const PendingInvitations = ({ open, onClose }) => {
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const loggedInUserId = loggedInUser ? loggedInUser._id : null;
  const { userId: userIdFromUrl } = useParams();
  const userId = userIdFromUrl || loggedInUserId;

  const [selectedTab, setSelectedTab] = useState(0);
  const [updateInviteStatus] = useUpdateInviteStatusMutation();
  const { data: invitesSent, isLoading: isLoadingInvitesSent } = useGetInvitesSentForUserQuery({ userId });
  const { data: invitesReceived, isLoading: isLoadingInvitesReceived } = useGetInvitesReceivedForUserQuery({ userId });
  const [actedInvites, setActedInvites] = useState({});

  console.log('Invites Sent: ', invitesSent);
  console.log('Invites Received: ', invitesReceived);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleInviteStatus = async (inviteId, status) => {
    try {
      await updateInviteStatus({ inviteId, status });
      setActedInvites(prev => ({ ...prev, [inviteId]: status }));
    } catch (error) {
      console.error("Error updating invite status: ", error);
    }
  };

  const handleRemoveInvite = (inviteId) => {
    // Logic to remove the invite from the list
    // This can be achieved by either refetching the invites or by updating the local state
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  };

  const renderComponents = () => {
    if (selectedTab === 0) {
      return (
        <List>
          {invitesReceived && invitesReceived.length > 0 ? (
            invitesReceived.map((invite) => {
              const actedStatus = actedInvites[invite._id];
              const displayStatus = actedStatus || invite.status;

              let displayText;
              if (displayStatus === 'accepted') {
                displayText = `${invite.userId.Company} is now part of your network.`;
              } else if (displayStatus === 'declined') {
                displayText = 'Invitation ignored';
              } else {
                displayText = (
                  <Link to={`/profile/${invite.userId._id}`} className="customLink">
                    {invite.userId.Company}
                  </Link>
                );
              }

              return (
                <ListItem key={invite._id}>
                  <ListItemText primary={displayText} />
                  {!actedStatus && (
                    <>
                      <Button onClick={() => handleInviteStatus(invite._id, 'accepted')}>
                          <CheckIcon color="primary" />
                      </Button>
                      <Button onClick={() => handleInviteStatus(invite._id, 'declined')}>
                          <CloseIcon color="error" />
                      </Button>
                    </>
                  )}
                </ListItem>
              );
            })
          ) : (
            <ListItem>
              <ListItemText primary="No pending invitations." />
            </ListItem>
          )}
        </List>
      );
    } else {
        return (
          <List>
            {invitesSent && invitesSent.length > 0 ? (
              invitesSent.map((invite) => (
                <ListItem key={invite._id}>
                  <ListItemText primary={
                    <Link to={`/profile/${invite.supplierId._id}`} className="customLink">
                      {invite.supplierId.Company}
                    </Link>
                  } />
                  <Button 
                    onClick={() => handleInviteStatus(invite._id, 'withdraw')}
                    sx={{
                      borderColor: 'red',
                      color: 'red',
                      border: '1px solid',
                      '&:hover': {
                        backgroundColor: 'red',
                        color: 'white'
                      }
                    }}
                  >
                    Withdraw
                  </Button>
                </ListItem>
              ))
            ) : (
              <ListItem>
                <ListItemText primary="No pending invitations." />
              </ListItem>
            )}
          </List>
        );
    }
  };

  return (
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
          <DialogTitle>Pending Invitations</DialogTitle>
          <DialogContent>
              <Tabs value={selectedTab} onChange={handleChange} aria-label="basic tabs example">
                  <Tab
                      label="Received"
                      {...a11yProps(0)}
                      sx={{
                      backgroundColor: "transparent",
                      '&:hover': {
                          backgroundColor: '#e0e0e0',
                          color: 'white',
                      },
                      '&.Mui-selected': {
                          color: 'black',
                      },
                      color: "#b3b3b3",
                      }}
                  />
                  <Tab 
                      label="Sent"
                      {...a11yProps(1)}
                      sx={{
                      backgroundColor: "transparent",
                      '&:hover': {
                          backgroundColor: '#e0e0e0',
                          color: 'white',
                      },
                      '&.Mui-selected': {
                          color: 'black',
                      },
                      color: "#b3b3b3",
                      }}
                  />
              </Tabs>
              {renderComponents()}
          </DialogContent>
      </Dialog>
  );
};

export default PendingInvitations;
