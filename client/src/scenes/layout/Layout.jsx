import React, { useState } from 'react';
import { Box } from '@mui/material';

import useMediaQuery from '@mui/material/useMediaQuery';

import { Outlet } from 'react-router-dom';

import { useSelector } from 'react-redux';

import { useGetUserQuery } from '../../state/api.js';

import Navbar from '../../components/navBar/Navbar.jsx';

import Sidebar from '../../components/sidebar/Sidebar.jsx';
//---------------------
const Layout = () => {
  const isNonMobile = useMediaQuery('(min-width: 600px)'); //do not forget the ()

  // console.log("🚀 ~ Layout ~ isNonMobile:", isNonMobile)

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const userId = useSelector((state) => state.global.userId);

  const { data: user } = useGetUserQuery(userId);


  return (
    <Box display={isNonMobile ? 'flex' : 'block'} width='100%' height='100%'>
      <Sidebar
        user={user || {}}
        isNonMobile={isNonMobile}
        drawerWidth='15.625rem'
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      ></Sidebar>

      <Box flexGrow={1} sx={{ width: '100%' }}>
        <Navbar
          user={user || {}}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        <Outlet
        
        />
      </Box>
    </Box>
  );
};

export default Layout;
