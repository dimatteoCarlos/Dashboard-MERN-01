//statBoxConfig.jsx
//Parent: Dashboard.jsx

import { Email, PointOfSale, PersonAdd, Traffic } from '@mui/icons-material';

export const statBoxConfig1 = [
  {
    title: 'Total Customers',
    value: 'totalCustomers',
    increase: '+14%',
    description: 'Since last month',
    icon: <Email />,
  },

  {
    title: 'Sales Today',
    value: 'salesToday',
    increase: '+21%',
    description: 'Since last month',
    icon: <PointOfSale />,
  },
];
export const statBoxConfig2 = [
  {
    title: 'Monthly Sales',
    value: 'monthlySales',
    increase: '+5%',
    description: 'Since last month',
    icon: <PersonAdd />,
  },
  {
    title: 'Yearly Sales',
    value: 'yearlySalesTotal',
    increase: '+43%',
    description: 'Since last month',
    icon: <Traffic />,
  },
];
