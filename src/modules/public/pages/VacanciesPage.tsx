import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button, Grid, MenuItem, Paper, Stack, TextField, Typography } from '@mui/material';
import { getVacancies } from '../api/public.api';
import { VacancyCard } from '../components/VacancyCard';
import { LoadingState } from '../../../shared/components/LoadingState';
import { ErrorState } from '../../../shared/components/ErrorState';
import { PaginationBar } from '../../../shared/components/PaginationBar';

export const VacanciesPage = () => {
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [city, setCity] = useState('');
  const [page, setPage] = useState(1);
  const limit = 10;

  const queryParams = useMemo(
    () => ({ search: search || undefined, skip: (page - 1) * limit, limit }),
    [search, page],
  );

  const vacanciesQuery = useQuery({
    queryKey: ['vacancies', queryParams],
    queryFn: () => getVacancies(queryParams),
  });

  const citiesQuery = useQuery({
    queryKey: ['vacancy-cities'],
    queryFn: () => getVacancies({ limit: 200, skip: 0 }),
    select: (data) => Array.from(new Set(data.map((v) => `${v.city_name}`))).filter(Boolean),
  });

  return (
    <Stack spacing={3}>
      <Paper
        sx={{
          p: { xs: 2.5, md: 4 },
          background: 'radial-gradient(circle at 20% 20%, #2f63b8, #0c2e6d 70%)',
          color: '#fff',
          borderRadius: 4,
        }}
      >
        <Typography variant="h1">Найдите работу мечты</Typography>
        <Typography mt={1.5} sx={{ opacity: 0.9 }}>Поиск по активным вакансиям JobFinder</Typography>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={1.5} mt={3}>
          <TextField
            fullWidth
            placeholder="Должность, ключевые слова, компания"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            sx={{ bgcolor: '#fff', borderRadius: 2 }}
          />
          <TextField
            select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            sx={{ minWidth: 220, bgcolor: '#fff', borderRadius: 2 }}
          >
            <MenuItem value="">Все города</MenuItem>
            {citiesQuery.data?.map((name) => (
              <MenuItem key={name} value={name}>{name}</MenuItem>
            ))}
          </TextField>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              setPage(1);
              setSearch(searchInput.trim());
            }}
          >
            Найти работу
          </Button>
        </Stack>
      </Paper>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, lg: 8.5 }}>
          <Stack spacing={2}>
            {vacanciesQuery.isLoading ? <LoadingState /> : null}
            {vacanciesQuery.isError ? <ErrorState onRetry={() => vacanciesQuery.refetch()} /> : null}
            {vacanciesQuery.data?.filter((v) => (city ? v.city_name === city : true)).map((vacancy) => <VacancyCard key={vacancy.id} vacancy={vacancy} />)}
            {vacanciesQuery.data?.filter((v) => (city ? v.city_name === city : true)).length === 0 && !vacanciesQuery.isLoading ? (
              <Paper sx={{ p: 3 }}><Typography>Ничего не найдено по текущим фильтрам.</Typography></Paper>
            ) : null}
            {vacanciesQuery.data ? (
              <PaginationBar page={page} count={page + (vacanciesQuery.data.length === limit ? 1 : 0)} onChange={setPage} />
            ) : null}
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, lg: 3.5 }}>
          <Stack spacing={2}>
            <Paper sx={{ p: 2.5 }}>
              <Typography variant="h6">Популярные профессии</Typography>
              <Typography color="text.secondary">Frontend · QA · Product · Marketing</Typography>
            </Paper>
            <Paper sx={{ p: 2.5 }}>
              <Typography variant="h6">Подписки</Typography>
              <Typography color="text.secondary">Сохраните поиск и получайте новые вакансии.</Typography>
            </Paper>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
};
