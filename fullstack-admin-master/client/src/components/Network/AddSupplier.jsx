import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Dialog, DialogTitle, DialogContent, TextField, List, ListItem, ListItemText, ListItemIcon, Button, Typography, Box } from '@mui/material';
import { Search as SearchIcon, BusinessOutlined, CalendarMonthOutlined, GroupOutlined, MonetizationOnOutlined } from '@mui/icons-material';
import { useGetCompanyQuery, useSendInviteMutation, useUpdateInviteStatusMutation, useGetInvitesForUserQuery } from 'state/api';
import { useParams } from "react-router-dom";
import './styles.css';

const AddSupplier = ({ open, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [queryParam, setQueryParam] = useState(null);
  const [generatedLink, setGeneratedLink] = useState('');
  const [invites, setInvites] = useState({});

  const { userId: userIdFromUrl } = useParams();
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const loggedInUserId = loggedInUser ? loggedInUser._id : null;
  const userId = userIdFromUrl || loggedInUserId;
  console.log(userIdFromUrl);
  console.log(loggedInUser);

  const { data: companyData, refetch } = useGetCompanyQuery({ query: queryParam });
  console.log("Company Data: ", companyData);
  const { data: invitesData } = useGetInvitesForUserQuery({ userId });
  const [sendInvite] = useSendInviteMutation();
  const [updateInviteStatus] = useUpdateInviteStatusMutation();

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      console.warn("Search term is empty. Please provide a valid input.");
      return;
    }
    console.log('Search Term:', searchTerm);
    setQueryParam(searchTerm);
    console.log('Company Data:', companyData);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleInvite = async (supplierId) => {
    try {
      await sendInvite({ userId, supplierId, status: 'pending', connectionDate: null });
      setInvites(prev => ({ ...prev, [supplierId]: 'pending' }));
    } catch (error) {
      console.error("Error sending invite", error);
    }
  };

  const generateLink = () => {
    const uniqueId = Math.random().toString(36).substr(2, 9);
    const link = `https://yourdomain.com/invite/${uniqueId}`;
    setGeneratedLink(link);
  };

  useEffect(() => {
    console.log('Updated Company Data:', companyData);
  }, [companyData]);  

  useEffect(() => {
    if (invitesData) {
      const updatedInvites = {};
      invitesData.forEach(invite => {
        updatedInvites[invite.supplierId] = invite.status;
      });
      setInvites(updatedInvites);
    }
  }, [invitesData]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Add Supplier</DialogTitle>
      <DialogContent sx={{ backgroundColor: "#f6f6f6" }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search for suppliers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          sx={{ flex: 1, backgroundColor: '#fff', mt: '1rem', borderRadius: '4px' }}
          InputProps={{
            sx: { backgroundColor: '#fff' },
            startAdornment: (
              <SearchIcon color="action" sx={{ mr: '8px' }} />
            ),
          }}
        />

        <List sx={{ backgroundColor: "#f6f6f6" }}>
          {companyData && companyData.length > 0 ? (
            companyData.map((company) => (
              <ListItem key={company._id} sx={{ backgroundColor: "#fff", mb: "1rem" }}>
                <Box sx={{ flex: 1, mr: "3rem" }}>
                <Typography variant="h6">
                  <Link to={`/profile/${company._id}`} className="customLink">
                    {company.Company}
                  </Link>
                </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                    <Box sx={{ display: 'flex', gap: '4px' }}>
                      <BusinessOutlined fontSize="small" />
                      <Typography variant="body2">{company.UserType}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: '4px' }}>
                      <CalendarMonthOutlined fontSize="small" />
                      <Typography variant="body2">{company.YearFounded.$numberDecimal}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: '4px' }}>
                      <MonetizationOnOutlined fontSize="small" />
                      <Typography variant="body2">{company.Sales}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: '4px' }}>
                      <GroupOutlined fontSize="small" />
                      <Typography variant="body2">{company.Employees}</Typography>
                    </Box>
                  </Box>
                  <Typography variant="body2" style={{ marginTop: '8px' }}>{company.Description}</Typography>
                </Box>
                <Button
                  onClick={() => handleInvite(company._id)} 
                  sx={{ 
                    alignSelf: 'auto', 
                    borderColor: invites[company._id] === 'pending' ? 'grey' : 'blue', 
                    color: invites[company._id] === 'pending' ? 'grey' : 'blue', 
                    borderWidth: '1px', 
                    borderStyle: 'solid',
                    ...(invites[company._id] !== 'pending' && {
                      '&:hover': {
                        backgroundColor: 'blue',
                        color: 'white'
                      }
                    })
                  }}
                >
                  {invites[company._id] === 'pending' ? 'Pending' : 'Invite'}
                </Button>
              </ListItem>
            ))
          ) : (
            <ListItem>
              <ListItemText primary="No suppliers found." />
            </ListItem>
          )}
        </List>

        {/* <div>
          <p>Invite a Supplier:</p>
          <TextField
            fullWidth
            value={generatedLink || "Click 'Generate' to create an invite link"}
            InputProps={{
                readOnly: true,
            }}
          />
          <Button onClick={generateLink}>Generate</Button>
        </div> */}
      </DialogContent>
    </Dialog>
  );
};

export default AddSupplier;
