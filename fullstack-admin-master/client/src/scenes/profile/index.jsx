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
    DownloadOutlined,
    Email,
    PointOfSale,
    PersonAdd,
    Traffic,
    UploadFileOutlined,
  } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useGetSupplierDataQuery } from "state/api";
import TabPanel from 'components/Common/TabPanel';
import OverviewChart from "components/OverviewChart";
import StatBox from "components/StatBox";
import Claims from "components/Claims";


const Profile = () => {
    const [user, setUser] = useState(null);
    const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

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
                        bgcolor: 'white',
                        boxShadow: theme.shadows[10]
                        }} 
                    />
                </Box>
            
                <Box sx={{ display: 'flex', flexDirection: 'column', mt: 15, ml: -5, mb: 1.5, gap: "0.5rem" }}>
                    <Typography variant="h1" sx={{ color: "#fff", fontWeight: "bold" }}>{supplierData?.supplierData?.Company}</Typography>
                    <Typography variant="h4" sx={{ color: "#fff" }}>{supplierData?.supplierData?.UserType} | {supplierData?.supplierData?.City}, {supplierData?.supplierData?.State}</Typography>
                </Box>
            </Box>

            <Box 
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '5rem',
                    pt: 3,
                    pb: 3,
                    pl: 5,
                    ml: 20,
                    mb: 5
                }}
            >
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: "0.5rem" }}>
                    <Typography variant="h5" sx={{ color: theme.palette.grey[500] }}>Rating</Typography>
                    <Typography variant="h2" sx={{ color: "#000", fontWeight: "550" }}>{supplierData?.supplierData?.id}</Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: "0.5rem" }}>
                    <Typography variant="h5" sx={{ color: theme.palette.grey[500] }}>Average Lead Time</Typography>
                    <Typography variant="h2" sx={{ color: "#000", fontWeight: "550" }}>{supplierData?.supplierData?.id} days</Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: "0.5rem" }}>
                    <Typography variant="h5" sx={{ color: theme.palette.grey[500] }}>On-Time Delivery</Typography>
                    <Typography variant="h2" sx={{ color: "#000", fontWeight: "550" }}>{supplierData?.supplierData?.id}%</Typography>
                </Box>
                <Button>

                </Button>
            </Box>
                
            <Box sx={{ pr: 10, pl: 10 }}>
                <Tabs 
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    TabIndicatorProps={{style: {background: theme.palette.grey[400]}}}
                >
                    <Tab 
                        label="General Profile"
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
                            title="Total Customers"
                            // value={data && data.totalCustomers}
                            increase="+14%"
                            description="Since last month"
                            icon={
                            <PersonAdd
                                sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
                            />
                            }
                        />
                        <StatBox
                            title="Sales Today"
                            // value={data && data.todayStats.totalSales}
                            increase="+21%"
                            description="Since last month"
                            icon={
                            <PointOfSale
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
                            title="Monthly Sales"
                            // value={data && data.thisMonthStats.totalSales}
                            increase="+5%"
                            description="Since last month"
                            icon={
                            <Email
                                sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
                            />
                            }
                        />
                        <StatBox
                            title="Yearly Sales"
                            // value={data && data.yearlySalesTotal}
                            increase="+43%"
                            description="Since last month"
                            icon={
                            <Traffic
                                sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
                            />
                            }
                        />
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
