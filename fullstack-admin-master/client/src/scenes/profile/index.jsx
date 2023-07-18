import React, { useEffect, useState } from "react";
import {
    Avatar,
    Box,
    Breadcrumbs, 
    Button,
    Typography,
    useTheme,
    Tabs, 
    Tab,
    Link,
    useMediaQuery,
} from '@mui/material';
import {
    TimerOutlined,
    GradeOutlined,
    LocalShippingOutlined,
    AttachMoneyOutlined,
    CommuteTwoTone,
  } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useGetSupplierDataQuery } from "state/api";
import TabPanel from 'components/Common/TabPanel';
import OverviewChart from "components/OverviewChart";
import StatBox from "components/StatBox";
import Claims from "components/Claims";
import BreakdownChart from "components/BreakdownChart";
import FlexBetween from "components/FlexBetween";
import BarChart from "components/BarChart";
import logo from "assets/logo.png";
import cotton from "assets/cotton.jpg";


const Profile = () => {
    const theme = useTheme();
    const [user, setUser] = useState(null);
    const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
    const [value, setValue] = React.useState(0);
    const [selectedTab, setSelectedTab] = useState(0);

    const { userId: userIdFromUrl } = useParams();
    console.log(userIdFromUrl);

    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    console.log(loggedInUser);
    const loggedInUserId = loggedInUser ? loggedInUser._id : null;

    const userId = userIdFromUrl || loggedInUserId;

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
                        width: 200, 
                        height: 200, 
                        position: 'relative', 
                        top: 40,
                        left: 20,
                        border: '4px solid white', 
                        bgcolor: 'white',
                        boxShadow: theme.shadows[10]
                        }} 
                    />
                </Box>
            
                <Box sx={{ display: 'flex', flexDirection: 'column', mt: 17.5, ml: 5, mb: 1, gap: "0.5rem" }}>
                    <Typography variant="h1" sx={{ color: "#fff", fontWeight: "bold" }}>{supplierData?.supplierData?.Company}</Typography>
                    <Typography variant="h4" sx={{ color: "#fff" }}>{supplierData?.supplierData?.UserType} | {supplierData?.supplierData?.City}, {supplierData?.supplierData?.State}</Typography>
                </Box>
            </Box>
                
            <Box sx={{ pr: 10, pl: 10, mt: 10 }}>
                <Tabs 
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    TabIndicatorProps={{style: {background: theme.palette.grey[400]}}}
                >
                    <Tab 
                        label="General"
                        {...a11yProps(0)}
                        sx={(theme) => ({
                            color: value === 0 ? 'black' : theme.palette.grey[700],
                            backgroundColor: "white",
                            '&:hover': {
                                backgroundColor: '#e0e0e0',
                            },
                        })}
                    />
                    <Tab
                        label="Operations"
                        {...a11yProps(1)}
                        sx={(theme) => ({
                            color: value === 1 ? 'black' : theme.palette.grey[700],
                            backgroundColor: "white",
                            '&:hover': {
                            backgroundColor: '#e0e0e0',
                            }
                        })}
                    />
                    <Tab
                        label="Claims"
                        {...a11yProps(1)}
                        sx={(theme) => ({
                            color: value === 2 ? 'black' : theme.palette.grey[700],
                            backgroundColor: "white",
                            '&:hover': {
                            backgroundColor: '#e0e0e0',
                            }
                        })}
                    />
                </Tabs>
            </Box>

            <TabPanel value={value} index={0} style={{ width: '100%' }}>
                <Box m="1.5rem 2.5rem">
                    <Box
                        mt="20px"
                        display="grid"
                        gridTemplateColumns="repeat(12, 1fr)"
                        gridAutoRows="160px"
                        gap="20px"
                        sx={{
                            "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
                        }}
                        >
                        {/* ROW 1 */}
                        <StatBox
                            title="RATING"
                            value={supplierData?.supplierData?.id}
                            unit="/100"
                            increase="+14%"
                            description="Since last month"
                            icon={
                            <GradeOutlined
                                sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
                            />
                            }
                        />
                        <StatBox
                            title="AVG LEAD TIME"
                            value={supplierData?.supplierData?.id}
                            unit="DAYS"
                            increase="+21%"
                            description="Since last month"
                            icon={
                            <TimerOutlined
                                sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
                            />
                            }
                        />
                        <Box
                            gridColumn="span 8"
                            gridRow="span 2"
                            backgroundColor={theme.palette.background.alt}
                            p="1rem"
                            borderRadius="0.55rem"
                        >
                            <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mt: 1, ml: 2 }}>COMPANY INFO</Typography>
                            <Box display="flex" flexDirection="row">
                                <Box width="50%">
                                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 500, mt: 3, ml: 2 }}>ADDRESS</Typography>
                                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mt: 1, ml: 2 }}>{supplierData?.supplierData?.Address}, {supplierData?.supplierData?.City}, {supplierData?.supplierData?.State}</Typography>

                                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 500, mt: 3, ml: 2 }}>FOUNDED</Typography>
                                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mt: 1, ml: 2 }}>{supplierData?.supplierData?.YearFounded?.$numberDecimal}</Typography>

                                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 500, mt: 3, ml: 2 }}>PHONE NUMBER</Typography>
                                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mt: 1, ml: 2 }}>{supplierData?.supplierData?.Details}</Typography>
                                </Box>
                                <Box width="50%">
                                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 500, mt: 3, ml: 2 }}>COMPANY SIZE</Typography>
                                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mt: 1, ml: 2 }}>{supplierData?.supplierData?.Employees}</Typography>

                                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 500, mt: 3, ml: 2 }}>PRODUCTS</Typography>
                                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mt: 1, ml: 2 }}>{Array.isArray(supplierData?.supplierData?.Products) ? supplierData.supplierData.Products.length : "N/A"}</Typography>

                                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 500, mt: 3, ml: 2 }}>PRIMARY MARKET</Typography>
                                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mt: 1, ml: 2 }}>{supplierData?.supplierData?.ExportMarkets}</Typography>
                                </Box>
                            </Box>        
                        </Box>
                        <StatBox
                            title="ON-TIME DELIVERY"
                            value={supplierData?.supplierData?.id}
                            unit="%"
                            increase="+5%"
                            description="Since last month"
                            icon={
                            <LocalShippingOutlined
                                sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
                            />
                            }
                        />
                        <StatBox
                            title="AVG COST"
                            value={supplierData?.supplierData?.id}
                            unit="$"
                            increase="+43%"
                            description="Since last month"
                            icon={
                            <AttachMoneyOutlined
                                sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
                            />
                            }
                        />

                        <Box
                            gridColumn="span 4"
                            gridRow="span 2"
                            backgroundColor={theme.palette.background.alt}
                            p="1.5rem"
                            borderRadius="0.55rem"
                            sx={{ display: 'flex', flexDirection: 'column', gap: "2rem" }}
                        >
                            <FlexBetween>
                                <Typography variant="h4" sx={{ fontWeight: 600 }}>
                                    GALLERY
                                </Typography>
                                <Button variant="outlined" sx={{ color: "black" }}>
                                    View All
                                </Button>
                            </FlexBetween>
                            <img 
                                src={cotton}
                                alt="Gallery"
                                sx={{ width: '100%', height: 'auto' }}
                            />
                        </Box>

                        <Box
                            gridColumn="span 8"
                            gridRow="span 2"
                            backgroundColor={theme.palette.background.alt}
                            p="1rem"
                            borderRadius="0.55rem"
                        >
                            <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mt: 1, ml: 2 }}>OUTPUT</Typography>
                            <BarChart/>
                        </Box>
                    </Box>
                </Box>
            </TabPanel>

            

            <TabPanel value={value} index={1}>
                <Typography variant="h4" gutterBottom sx={{ ml: 3, mr: 3 }}>Description</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', backgroundColor: "#f6f6f6" }}>
                    {/* <Box sx={{ p: 4, backgroundColor: '#f8f9fa' }}>
                        <Typography variant="body1">{supplierData?.supplierData?.Description}</Typography>
                    </Box> */}
                </Box>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Claims/>
            </TabPanel>
        </Box>
    );
}

export default Profile;
