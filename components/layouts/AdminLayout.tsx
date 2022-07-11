import { Box, Typography } from '@mui/material';
import Head from 'next/head';
import { FC, PropsWithChildren } from 'react';
import { AdminNavbar } from '../admin/AdminNavbar';
import { Navbar, SideMenu } from '../ui';

interface Props {
  title: string;
  subtitle: string;
  icon?: JSX.Element;
}

export const AdminLayout: FC<PropsWithChildren<Props>> = ({
  children,
  title,
  subtitle,
  icon,
}) => {
  return (
    <>
      <nav>
        <AdminNavbar />
      </nav>
      <SideMenu />

      <main
        style={{
          margin: '5rem auto',
          maxWidth: '1440px',
          padding: '0px 2rem',
        }}>
        <Box display='flex' flexDirection='column'>
          <Typography variant='h1' component='h1'>
            {icon}
            {title}
          </Typography>
          <Typography mb={1} variant='h2' component='h2'>
            {subtitle}
          </Typography>
        </Box>
        <Box className='fadeIn'>{children}</Box>
      </main>
    </>
  );
};
