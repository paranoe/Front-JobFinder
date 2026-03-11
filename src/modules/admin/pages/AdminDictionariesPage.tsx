import { useQuery } from '@tanstack/react-query';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Stack, TextField, Typography } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDictionaryAdmin } from '../api/admin.api';

export const AdminDictionariesPage = () => {
  const { entity = 'cities' } = useParams();
  const query = useQuery({ queryKey: ['admin-dict', entity], queryFn: () => getDictionaryAdmin(entity) });
  const [open, setOpen] = useState(false);
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Название', flex: 1 },
  ];

  return (
    <Paper sx={{ height: 560, p: 2 }}>
      <Stack direction="row" justifyContent="space-between" mb={2}>
        <Typography variant="h5">Справочник: {entity}</Typography>
        <Button variant="contained" onClick={() => setOpen(true)}>Добавить</Button>
      </Stack>
      <DataGrid rows={query.data ?? []} columns={columns} loading={query.isLoading} />
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Новая запись</DialogTitle>
        <DialogContent><TextField autoFocus margin="dense" label="Название" fullWidth /></DialogContent>
        <DialogActions><Button onClick={() => setOpen(false)}>Отмена</Button><Button variant="contained">Сохранить</Button></DialogActions>
      </Dialog>
    </Paper>
  );
};
