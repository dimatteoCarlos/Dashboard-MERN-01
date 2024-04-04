import { CssBaseline, ThemeProvider } from '@mui/material';

import { createTheme } from '@mui/material/styles';

import { themeSettings } from './theme.js';
// import state from './state';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Layout from './scenes/layout/Layout.jsx';
import Dashboard from './scenes/dashboard/Dashboard.jsx';
import Products from './scenes/products/Products.jsx';
import Transactions from './scenes/transactions/Transactions.jsx';
import Customers from './scenes/customers/Customers.jsx';
import UsersByGeography from './scenes/geography/UsersByGeography.jsx';
import Overview from './scenes/overview/Overview.jsx';
import Daily from './scenes/daily/Daily.jsx';
import Monthly from './scenes/monthly/Monthly.jsx';
import Breakdown from './scenes/breakdown/Breakdown.jsx';

function App() {
  //to grab the state from store
  const mode = useSelector((state) => state.global.mode);

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className='app'>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <Routes>
            <Route element={<Layout />}>
              <Route path='/' element={<Navigate to='/dashboard' replace />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/products' element={<Products />} />
              <Route path='/customers' element={<Customers />} />
              <Route path='/transactions' element={<Transactions />} />
              <Route path='/geography' element={<UsersByGeography />} />
              <Route path='/overview' element={<Overview />} />
              <Route path='/daily' element={<Daily></Daily>} />
              <Route path='/monthly' element={<Monthly />} />
              <Route path='/breakdown' element={<Breakdown />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
