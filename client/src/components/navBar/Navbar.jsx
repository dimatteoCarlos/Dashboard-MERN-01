import React from 'react';
import { navBarIcons } from './navbarIcons.jsx';
import userImage from '../../assets/girl-profile.jpeg';
import {
  useTheme,
  AppBar,
  Toolbar,
  InputBase,
  IconButton,
  Box,
  Button,
} from '@mui/material';
import FlexBetween from '../FlexBetween.jsx';
import { useDispatch } from 'react-redux';
import { setMode } from '../../state/globalState.js';
import ShowUser from '../showUser/ShowUser.jsx';

//, , useState,

const Navbar = ({ isSidebarOpen, setIsSidebarOpen, user }) => {
  const {
    MenuOutlined: MenuIcon,
    SettingsOutlined,
    SearchOutlined,
    DarkModeOutlined,
    LightModeOutlined,
    ArrowDropDownOutlined,
  } = navBarIcons;

  const theme = useTheme();
  const dispatch = useDispatch();

  const toggleSidebarOpen = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleClickTheme = () => dispatch(setMode());
  const handleClickButton = () => {};

  return (
    <>
      <AppBar
        sx={{
          position: 'static',
          background: 'none',
          boxShadow: 'none',
          backgroundColor: theme.palette.alt,
        }}
      >
        <Toolbar
          sx={{
            justifyContent: 'space-between',
            marginTop: '0.25rem',
          }}
        >
          <FlexBetween width='100%' height='auto'>
            {/* LEFT SIDE */}
            <FlexBetween gap='0.5rem'>
              <IconButton
                aria-label='open/close_sidebar'
                onClick={toggleSidebarOpen}
              >
                <MenuIcon />
              </IconButton>

              <Box
                p='0.1rem 1rem'
                bgcolor={theme.palette.background.alt}
                borderRadius='0.5rem'
                gap='1rem'
                //equivalent to FlexBetween
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <InputBase placeholder={`Search...`}></InputBase>
                <IconButton
                  aria-label='search'
                  onClick={() => console.log('Do search...')}
                >
                  <SearchOutlined />
                </IconButton>
              </Box>
            </FlexBetween>

            {/* RIGHT SIDE */}

            <FlexBetween gap='1.25rem'>
              <IconButton>
                <SettingsOutlined
                  sx={{
                    color: theme.palette.secondary[200],
                  }}
                />
              </IconButton>
              <IconButton onClick={handleClickTheme}>
                {theme.palette.mode === 'dark' ? (
                  <DarkModeOutlined />
                ) : (
                  <LightModeOutlined />
                )}
              </IconButton>
              <FlexBetween>
                <Button
                  onClick={handleClickButton}
                  sx={{
                    backgroundColor: 'transparent',
                  }}
                >
                  <ShowUser
                    user={user}
                    userImage={userImage}
                    userName={user.name}
                    userOccupation={user.occupation}
                    textAlign='center'
                    textTransform='none'
                    gap='1rem'
                  ></ShowUser>
                </Button>
                <IconButton>
                  <ArrowDropDownOutlined
                    sx={{
                      color: theme.palette.secondary[300],
                    }}
                  />
                </IconButton>
              </FlexBetween>
            </FlexBetween>
          </FlexBetween>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;

/*
App Bar
The App Bar displays information and actions relating to the current screen.

how to set the size of IconButton



 */
