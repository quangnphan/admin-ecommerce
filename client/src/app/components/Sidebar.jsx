"use client";

import React from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {
  ChevronRightOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  Groups2Outlined,
  ReceiptLongOutlined,
  AdminPanelSettingsOutlined,
  ReceiptOutlined,
} from "@mui/icons-material";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { close } from "../../redux/slices/layoutSlice";
import Link from "next/link";

const navItems = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
    path: "/",
  },
  {
    text: "Products",
    icon: <ShoppingCartOutlined />,
    path: "/products",
  },
  {
    text: "Customers",
    icon: <Groups2Outlined />,
    path: "/customers",
  },
  {
    text: "Transactions",
    icon: <ReceiptLongOutlined />,
    path: "/transactions",
  },
  {
    text: "Orders",
    icon: <ReceiptOutlined />,
    path: "/orders",
  },
  {
    text: "Admin",
    icon: <AdminPanelSettingsOutlined />,
    path: "/admin",
  },
];

const Sidebar = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [active, setActive] = useState("");
  let isSidebarOpen = useSelector((state) => state.layout.visible);
  const dispatch = useDispatch();

  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => dispatch(close())}
          variant="persistent"
          anchor="left"
          sx={{
            width: 250,
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <div className="flex-between">
                <Box display="flex" alignItems="center">
                  <Typography variant="h4" fontWeight="bold">
                    ECOM
                  </Typography>
                </Box>
              </div>
            </Box>
            <List>
              {navItems.map(({ text, icon, path }) => {
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
                    <Link href={path} passHref>
                      <ListItemButton
                        onClick={() => {
                          setActive(lcText);
                        }}
                        sx={{
                          backgroundColor:
                            active === lcText ? "#000000" : "transparent",
                          color: active === lcText ? "#ffffff" : "#000000",
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            ml: "1rem",
                            color: active === lcText ? "#ffffff" : "#000000",
                          }}
                        >
                          {icon}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                        {active === lcText && (
                          <ChevronRightOutlined sx={{ ml: "auto" }} />
                        )}
                      </ListItemButton>
                    </Link>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
