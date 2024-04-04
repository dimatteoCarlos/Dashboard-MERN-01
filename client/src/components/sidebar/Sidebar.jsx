import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { sidebarDataNav } from './sidebarDataNav.js';

import userImage from '../../assets/girl-profile.jpeg';

import ShowUser from '../showUser/ShowUser.jsx';

import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
  Button,
  Divider,
} from '@mui/material';
import FlexBetween from '../FlexBetween.jsx';
import {
  ChevronLeft,
  ChevronRight,
  SettingsOutlined,
} from '@mui/icons-material';

const Sidebar = ({
  user,
  isNonMobile,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
}) => {
  const theme = useTheme();

  const [activeMenuOption, setActiveMenuOption] = useState('');

  const path = useLocation().pathname.substring(1).toLowerCase();

  const navigateTo = useNavigate();

  useEffect(() => {
    setActiveMenuOption(path);
  }, [path]);

  return (
    <>
      <Box component='nav'>
        {isSidebarOpen && (
          <Drawer
            open={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            variant='persistent'
            anchor='left'
            sx={{
              width: drawerWidth,

              '& .css-15b8vjn-MuiPaper-root-MuiDrawer-paper': {
                color: theme.palette.secondary[200],
                backgroundColor: theme.palette.background.alt,
                boxSizing: 'border-box',
                width: drawerWidth,
                borderWith: isNonMobile ? '0' : '2px',
              },
            }}
          >
            <Box width='100%'>
              <Box m='1.5rem 2rem 1rem 3rem'>
                <FlexBetween color={theme.palette.secondary.main}>
                  <Box display='flex' alignItems='center' gap='0.5rem'>
                    <Typography component='h3' fontWeight='bold'>
                      DASHBOARD
                    </Typography>

                    {!isNonMobile && (
                      <IconButton
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                      >
                        <ChevronLeft />
                      </IconButton>
                    )}
                  </Box>
                </FlexBetween>
              </Box>

              <List>
                {sidebarDataNav.map(({ icon, text }) => {
                  if (!icon) {
                    return (
                      <Typography
                        key={text}
                        m='2.5rem 0 1rem 2.5rem'
                        sx={{ fontSize: '1rem' }}
                      >
                        {text}
                      </Typography>
                    );
                  }

                  const textMenuOption = text.toLowerCase();

                  return (
                    <ListItem
                      key={text}
                      disablePadding
                      sx={
                        {
                          // border: '10px solid green',
                        }
                      }
                    >
                      <ListItemButton
                        onClick={() => {
                          console.log(textMenuOption);
                          navigateTo(textMenuOption);
                        }}
                        sx={{
                          paddingLeft: '0',
                          backgroundColor:
                            textMenuOption === activeMenuOption
                              ? theme.palette.secondary[300]
                              : 'transparent',
                          color:
                            textMenuOption === activeMenuOption
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[100],
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            ml: '2.5rem',
                            color:
                              textMenuOption === activeMenuOption
                                ? theme.palette.primary[600]
                                : theme.palette.secondary[200],
                          }}
                        >
                          {icon}
                        </ListItemIcon>

                        <ListItemText
                          primary={text}
                          sx={{
                            font:
                              textMenuOption === activeMenuOption
                                ? 'bold italic 1.5rem'
                                : 'normal',
                          }} //not working
                        ></ListItemText>
                        {textMenuOption === activeMenuOption && (
                          <ChevronRight />
                        )}
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            </Box>
            <Divider />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mt: '1rem',
                ml: '-1.7rem',
              }}
            >
              <Button>
                <ShowUser
                  userImage={userImage}
                  userName={user.name}
                  userOccupation={user.occupation}
                  textAlign='left'
                  textTransform='none'
                  gap='1rem'
                ></ShowUser>
              </Button>

              <IconButton border='1px solid yellowgreen'>
                <SettingsOutlined
                  sx={{
                    color: theme.palette.secondary[300],
                    fontSize: '1.5rem',
                  }}
                ></SettingsOutlined>
              </IconButton>
            </Box>
          </Drawer>
        )}
      </Box>
    </>
  );
};

export default Sidebar;

/* List ListItem ListItemButton active: bgc sec300 : transp clr prim600: sec100, ListItemIcon active: prim600:sec200, ListItemText */

/*footer: colr: sec100, co: sec200 setting: sec300 */
