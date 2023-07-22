import React from "react";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import {
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  DescriptionOutlined,
  HomeOutlined,
  Inventory2Outlined,
  PeopleAltOutlined,
  PublicOutlined,
  PointOfSaleOutlined,
  TodayOutlined,
  CalendarMonthOutlined,
  AdminPanelSettingsOutlined,
  TrendingUpOutlined,
  PieChartOutlined,
  InventoryOutlined,
  SearchOutlined,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import profileImage from "assets/profile.jpeg";
import logo from "assets/logo.png";


const navItems = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
  },
  {
    text: "Network",
    icon: null,
  },
  {
    text: "Order",
    icon: <PublicOutlined />,
  },
  {
    text: "Shipments",
    icon: <Inventory2Outlined />,
  },
  {
    text: "Products",
    icon: <InventoryOutlined />,
  },
  {
    text: "Templates",
    icon: <DescriptionOutlined />,
  },
  {
    text: "Passports",
    icon: null,
  },
  {
    text: "Entity",
    icon: <PointOfSaleOutlined />,
  },
  {
    text: "Insights",
    icon: <TodayOutlined />,
  },
  {
    text: "Monthly",
    icon: <CalendarMonthOutlined />,
  },
  {
    text: "Breakdown",
    icon: <PieChartOutlined />,
  },
  {
    text: "Management",
    icon: null,
  },
  {
    text: "Performance",
    icon: <TrendingUpOutlined />,
  },
  {
    text: "Profile",
    icon: <AdminPanelSettingsOutlined />,
  },
];

const Sidebar = ({
  user,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box component="nav">
      <Drawer
        open={true}
        /* onClose={() => setIsSidebarOpen(false)} */
        variant="persistent"
        anchor="left"
        sx={{
          width: isSidebarOpen ? drawerWidth : '80px',
          transition: 'width 0.3s',
          "& .MuiDrawer-paper": {
            color: theme.palette.secondary[200],
            backgroundColor: theme.palette.background.alt,
            boxSixing: "border-box",
            borderWidth: isNonMobile ? 0 : "2px",
            width: isSidebarOpen ? drawerWidth : '80px',
            overflowX: 'hidden',
            transition: 'width 0.3s',
          },
        }}
      >
        <Box width="100%">
          <Box m="2rem 2rem 2rem 3rem">
            <Box display="flex" alignItems="center" gap="0.5rem">
              <img src={logo} alt="Aleth Logo" height="45px" />
            </Box>
          </Box>
          <List>
            {navItems.map(({ text, icon }) => {
              if (!icon) {
                return (
                  <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                    {text}
                  </Typography>
                );
              }
              const lcText = text.toLowerCase();

              return (
                <ListItem key={text} disablePadding>
                  <ListItemButton
                    onClick={() => {
                      navigate(`/${lcText}`);
                      setActive(lcText);
                    }}
                    sx={{
                      backgroundColor:
                        active === lcText
                          ? theme.palette.secondary[400]
                          : "transparent",
                      color:
                        active === lcText
                          ? theme.palette.primary[600]
                          : theme.palette.secondary[100],
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        ml: "2rem",
                        color:
                          active === lcText
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[200],
                      }}
                    >
                      {icon}
                    </ListItemIcon>
                    {isSidebarOpen && <ListItemText primary={text} />}
                    </ListItemButton>
                    {active === lcText && (
                      <IconButton
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        sx={{ ml: "auto" }}
                      >
                        <ChevronLeft sx={{ ml: "auto" }} />
                      </IconButton>
                    )}
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
