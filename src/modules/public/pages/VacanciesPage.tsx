import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button, Grid, MenuItem, Paper, Stack, TextField, Typography } from '@mui/material';
import { getDictionary, getVacancies } from '../api/public.api';
import { VacancyCard } from '../components/VacancyCard';
import { LoadingState } from '../../../shared/components/LoadingState';
import { ErrorState } from '../../../shared/components/ErrorState';
import { PaginationBar } from '../../../shared/components/PaginationBar';

export const VacanciesPage = () => {
  const [search, setSearch] = useState('');
  const [cityId, setCityId] = useState<number | ''>('');
  const [page, setPage] = useState(1);
  const limit = 10;

  const queryParams = useMemo(() => ({ search, city_id: cityId || undefined, skip: (page - 1) * limit, limit }), [search, cityId, page]);
  const vacanciesQuery = useQuery({ queryKey: ['vacancies', queryParams], queryFn: () => getVacancies(queryParams) });
  const citiesQuery = useQuery({ queryKey: ['cities'], queryFn: () => getDictionary('cities') });

  return (
    <Stack spacing={3}>
      <Paper sx={{ p: { xs: 2, md: 3 }, background: 'linear-gradient(100deg,#0D3B86,#1D9BF0)', color: '#fff' }}>
        <Typography variant="h1">Найдите работу мечты</Typography>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} mt={2}>
          <TextField fullWidth placeholder="Должность, ключевые слова, компания" value={search} onChange={(e) => setSearch(e.target.value)} sx={{ bgcolor: '#fff', borderRadius: 2 }} />
          <TextField select value={cityId} onChange={(e) => setCityId(e.target.value ? Number(e.target.value) : '')} sx={{ minWidth: 240, bgcolor: '#fff', borderRadius: 2 }}>
            <MenuItem value="">Все города</MenuItem>
            {citiesQuery.data?.map((item) => <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)}
          </TextField>
          <Button variant="contained" color="secondary">Найти работу</Button>
        </Stack>
      </Paper>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Stack spacing={2}>
            {vacanciesQuery.isLoading ? <LoadingState /> : null}
            {vacanciesQuery.isError ? <ErrorState onRetry={() => vacanciesQuery.refetch()} /> : null}
            {vacanciesQuery.data?.items.map((vacancy) => <VacancyCard key={vacancy.id} vacancy={vacancy} />)}
            {vacanciesQuery.data ? (
              <PaginationBar
                page={page}
                count={Math.ceil(vacanciesQuery.data.total / limit)}
                onChange={setPage}
              />
            ) : null}
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Популярные профессии</Typography>
            <Typography color="text.secondary">Frontend-разработчик, Product Manager, Аналитик данных</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Stack>
  );
};
