import React, { useEffect, useState } from "react";

import { Box, Button, Card, CardContent, CardMedia, Container, Grid, Typography, useTheme, Tabs, Tab } from '@mui/material';
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
        <Card>
            <Box sx={{ display: 'flex', flexDirection: 'row', p: 2 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3, mt: 4, mb: 2, gap: '1rem' }}>
                    <Typography variant="h1" sx={{ color: theme.palette.secondary[200] }}>{supplierData?.supplierData?.Company}</Typography>
                    <Typography variant="h4" sx={{ color: theme.palette.secondary[200] }}>{supplierData?.supplierData?.UserType} based in {supplierData?.supplierData?.City}, {supplierData?.supplierData?.State}</Typography>
                </Box>
            </Box>

            <Box>
                <Tabs 
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
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
        </Card>
    );
}

export default Profile;
