import { useQuery } from '@tanstack/react-query';
import { Paper, Typography } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { getAdminVacancies } from '../api/admin.api';

export const AdminVacanciesPage = () => {
  const query = useQuery({ queryKey: ['admin-vacancies'], queryFn: () => getAdminVacancies({ limit: 50, skip: 0 }) });
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'title', headerName: 'Название', flex: 1 },
    { field: 'status', headerName: 'Статус', width: 150, valueGetter: (_, row) => row.status?.name },
  ];

  return (
    <Paper sx={{ height: 560, p: 2 }}>
      <Typography variant="h5" mb={2}>Вакансии</Typography>
      <DataGrid rows={query.data ?? []} columns={columns} loading={query.isLoading} />
    </Paper>
  );
};
