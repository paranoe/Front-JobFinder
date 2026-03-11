import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Paper, Stack, Typography } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { getAdminUsers, patchUserStatus } from '../api/admin.api';

export const AdminUsersPage = () => {
  const queryClient = useQueryClient();
  const query = useQuery({ queryKey: ['admin-users'], queryFn: () => getAdminUsers({ limit: 50, skip: 0 }) });
  const mutation = useMutation({
    mutationFn: ({ userId, is_active }: { userId: number; is_active: boolean }) => patchUserStatus(userId, is_active),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-users'] }),
  });

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'role', headerName: 'Роль', width: 130 },
    { field: 'is_active', headerName: 'Статус', width: 140, valueFormatter: (v) => (v ? 'active' : 'blocked') },
    {
      field: 'actions',
      headerName: 'Действия',
      width: 180,
      sortable: false,
      renderCell: ({ row }) => (
        <Button size="small" onClick={() => mutation.mutate({ userId: row.id, is_active: !row.is_active })}>
          {row.is_active ? 'Блокировать' : 'Разблокировать'}
        </Button>
      ),
    },
  ];

  return (
    <Paper sx={{ height: 560, p: 2 }}>
      <Stack spacing={1} mb={2}><Typography variant="h5">Пользователи</Typography></Stack>
      <DataGrid rows={query.data ?? []} columns={columns} loading={query.isLoading} disableRowSelectionOnClick />
    </Paper>
  );
};
