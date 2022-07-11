import { PeopleOutline } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/layouts';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import useSWR from 'swr';
import { Grid, MenuItem, Select, Typography } from '@mui/material';
import { IUser } from '../../interfaces';
import tesloApi from '../../api/tesloApi';

const UsersPage = () => {
  const { data, error } = useSWR<IUser[]>('/api/admin/users/');
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data]);

  if (!error && !data) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <Typography>Ocurrio un error al consultar la información</Typography>
    );
  }

  const onRoleUpdated = async (userId: string, role: string) => {
    const prevUsers = [...users];
    const updatedUsers = users.map((user) => ({
      ...user,
      role: user._id === userId ? role : user.role,
    }));
    setUsers(updatedUsers as IUser[]);
    try {
      const newRole = role;
      await tesloApi.put(`/admin/users/`, { userId, role: newRole });
    } catch (error) {
      setUsers(prevUsers);
    }
  };

  const columns: GridColDef[] = [
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'name', headerName: 'Nombre Completo', width: 300 },
    {
      field: 'role',
      headerName: 'Rol',
      width: 300,
      renderCell: ({ row }: GridValueGetterParams) => {
        return (
          <Select
            value={row.role}
            label='Rol'
            onChange={({ target }) => onRoleUpdated(row.id, target.value)}
            sx={{ width: '300px' }}>
            <MenuItem value='admin'>Administrador</MenuItem>
            <MenuItem value='client'>Cliente</MenuItem>
          </Select>
        );
      },
    },
  ];

  const rows = users.map((user) => ({
    id: user._id,
    email: user.email,
    name: user.name,
    role: user.role,
  }));

  return (
    <AdminLayout
      title={'Usuarios'}
      subtitle={'Mantenimiento de usuarios'}
      icon={<PeopleOutline />}>
      <Grid container>
        <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
          <DataGrid
            columns={columns}
            rows={rows}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default UsersPage;
