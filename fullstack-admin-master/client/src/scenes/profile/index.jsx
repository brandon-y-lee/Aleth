import React, { useEffect, useState } from "react";

import { Avatar, Box, Breadcrumbs, Button, Typography, useTheme, Tabs, Tab, Link } from '@mui/material';
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useGetSupplierDataQuery } from "state/api";
import TabPanel from 'components/Common/TabPanel';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [value, setValue] = React.useState(0);
    const [selectedTab, setSelectedTab] = useState(0);

    const theme = useTheme();
    const { userId } = useParams();
    console.log(userId);

    let {data: supplierData, isLoading: isLoadingSupplierData} = useGetSupplierDataQuery({userId});

    console.log(supplierData);

    function a11yProps(index) {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
        setSelectedTab(newValue);
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', background: `linear-gradient(215deg, ${theme.palette.grey[400]} 30%, ${theme.palette.grey[700]} 90%)` }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', ml: 4, mt: 4 }}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover" color="#fff" href="/order">
                            Search Results
                        </Link>
                        <Typography color="#fff">Supplier Profile</Typography>
                    </Breadcrumbs>
                    <Avatar 
                        alt="Profile Picture" 
                        src={supplierData?.supplierData?.ProfilePicture}
                        sx={{ 
                        width: 150, 
                        height: 150, 
                        position: 'relative', 
                        top: 40, 
                        border: '4px solid white', 
                        bgcolor: 'white'
                        }} 
                    />
                </Box>
            
                <Box sx={{ display: 'flex', flexDirection: 'column', mt: 15, ml: -5, gap: "0.5rem" }}>
                    <Typography variant="h1" sx={{ color: "#fff", fontWeight: "bold" }}>{supplierData?.supplierData?.Company}</Typography>
                    <Typography variant="h4" sx={{ color: "#fff" }}>{supplierData?.supplierData?.UserType} | {supplierData?.supplierData?.City}, {supplierData?.supplierData?.State}</Typography>
                </Box>
            </Box>

            <Box 
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    m: 2,
                    pl: 3,
                    pr: 3,
                    pt: 2,
                    pb: 2,
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '1.5rem'
                }}
            >
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: "0.5rem" }}>
                    <Typography variant="h5">Supplier Rating</Typography>
                    <Typography variant="body1">{supplierData?.supplierData?.ID}</Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: "0.5rem" }}>
                    <Typography variant="h5">Average Lead Time</Typography>
                    <Typography variant="body1">{supplierData?.supplierData?.ID}</Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: "0.5rem" }}>
                    <Typography variant="h5">On-Time Delivery</Typography>
                    <Typography variant="body1">{supplierData?.supplierData?.ID}</Typography>
                </Box>                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: "0.5rem" }}>
                    <Typography variant="h5">Cost</Typography>
                    <Typography variant="body1">{supplierData?.supplierData?.ID}</Typography>
                </Box>
            </Box>

            <Box>
                <Tabs 
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    centered
                >
                    <Tab 
                    label="General Profile"
                    {...a11yProps(0)}
                    sx={(theme) => ({
                        color: "#00994c",
                        backgroundColor: value === 0 ? "#00cc69" : "white",
                        boxShadow: value === 0 ? theme.shadows[1] : theme.shadows[2],
                        '&:hover': {
                        backgroundColor: value === 0 ? '#00cc69' : '#e0e0e0',
                        },
                    })}
                    />
                    <Tab
                    label="Operations"
                    {...a11yProps(1)}
                    sx={(theme) => ({
                        color: "#00994c",
                        backgroundColor: value === 1 ? "#00cc69" : "white",
                        boxShadow: value === 1 ? theme.shadows[1] : theme.shadows[2],
                        '&:hover': {
                        backgroundColor: value === 1 ? '#00cc69' : '#e0e0e0',
                        }
                    })}
                    />
                    <Tab
                    label="Claims"
                    {...a11yProps(1)}
                    sx={(theme) => ({
                        color: "#00994c",
                        backgroundColor: value === 2 ? "#00cc69" : "white",
                        boxShadow: value === 2 ? theme.shadows[1] : theme.shadows[2],
                        '&:hover': {
                        backgroundColor: value === 2 ? '#00cc69' : '#e0e0e0',
                        }
                    })}
                    />
                </Tabs>
            </Box>

            <TabPanel value={value} index={0}>
                <Typography variant="h4" gutterBottom sx={{ ml: 3, mr: 3 }}>Description</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', backgroundColor: "#f6f6f6" }}>
                    <Box sx={{ p: 4, backgroundColor: '#f8f9fa' }}>
                        <Typography variant="body1">{supplierData?.supplierData?.Description}</Typography>
                    </Box>
                </Box>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Typography variant="h4" gutterBottom sx={{ ml: 3, mr: 3 }}>Description</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', backgroundColor: "#f6f6f6" }}>
                    <Box sx={{ p: 4, backgroundColor: '#f8f9fa' }}>
                        <Typography variant="body1">{supplierData?.supplierData?.Description}</Typography>
                    </Box>
                </Box>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Typography variant="h4" gutterBottom sx={{ ml: 3, mr: 3 }}>Description</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', backgroundColor: "#f6f6f6" }}>
                    <Box sx={{ p: 4, backgroundColor: '#f8f9fa' }}>
                        <Typography variant="body1">{supplierData?.supplierData?.Description}</Typography>
                    </Box>
                </Box>
            </TabPanel>
        </Box>
    );
}

export default Profile;
