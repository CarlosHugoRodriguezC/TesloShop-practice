import React, { useEffect, useState } from 'react';
import {
  DashboardOutlined,
  CreditCardOutlined,
  AttachMoneyOutlined,
  CreditCardOffOutlined,
  GroupOutlined,
  CategoryOutlined,
  CancelPresentationOutlined,
  ProductionQuantityLimitsOutlined,
  AccessTimeOutlined,
} from '@mui/icons-material';
import { Grid, Typography } from '@mui/material';
import { SummaryTile } from '../../components/admin/SummaryTile';
import { AdminLayout } from '../../components/layouts';
import useSWR from 'swr';
import { IDashboardSummaryResponse } from '../../interfaces';

const DashboardPage = () => {
  const { data, error } = useSWR<IDashboardSummaryResponse>(
    '/api/admin/dashboard',
    { refreshInterval: 30 * 1000 }
  );

  const [refreshIn, setRefreshIn] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshIn((refreshIn) => refreshIn > 0 ? refreshIn - 1: 30);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!error && !data) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.log(error);
    return <Typography>Error al cargar la información</Typography>;
  }

  const {
    numberOfOrders,
    paidOrders,
    unpaidOrders,
    numberOfClients,
    numberOfProducts,
    productsWithNoInventory,
    productsWithLowInventory,
  } = data!;

  return (
    <AdminLayout
      title='Dashboard'
      subtitle='Estadisticas Generales'
      icon={<DashboardOutlined />}>
      <Grid container spacing={2}>
        <SummaryTile
          title={numberOfOrders}
          subTitle='Ordenes totales'
          icon={<CreditCardOutlined color='secondary' sx={{ fontSize: 40 }} />}
        />
        <SummaryTile
          title={paidOrders}
          subTitle='Ordenes pagadas'
          icon={<AttachMoneyOutlined color='success' sx={{ fontSize: 40 }} />}
        />
        <SummaryTile
          title={unpaidOrders}
          subTitle='Ordenes pendientes'
          icon={<CreditCardOffOutlined color='error' sx={{ fontSize: 40 }} />}
        />
        <SummaryTile
          title={numberOfClients}
          subTitle='Clientes'
          icon={<GroupOutlined color='primary' sx={{ fontSize: 40 }} />}
        />
        <SummaryTile
          title={numberOfProducts}
          subTitle='Productos'
          icon={<CategoryOutlined color='warning' sx={{ fontSize: 40 }} />}
        />
        <SummaryTile
          title={productsWithNoInventory}
          subTitle='Sin Existencias'
          icon={
            <CancelPresentationOutlined color='error' sx={{ fontSize: 40 }} />
          }
        />
        <SummaryTile
          title={productsWithLowInventory}
          subTitle='Bajo Inventario'
          icon={
            <ProductionQuantityLimitsOutlined
              color='warning'
              sx={{ fontSize: 40 }}
            />
          }
        />
        <SummaryTile
          title={refreshIn}
          subTitle='Actualizacion en'
          icon={<AccessTimeOutlined color='secondary' sx={{ fontSize: 40 }} />}
        />
      </Grid>
    </AdminLayout>
  );
};

export default DashboardPage;
