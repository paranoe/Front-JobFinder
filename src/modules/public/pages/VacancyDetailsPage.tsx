import { useQuery } from '@tanstack/react-query';
import { Button, Chip, Grid, Paper, Stack, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { getVacancy } from '../api/public.api';
import { LoadingState } from '../../../shared/components/LoadingState';
import { ErrorState } from '../../../shared/components/ErrorState';

export const VacancyDetailsPage = () => {
  const { id = '' } = useParams();
  const query = useQuery({ queryKey: ['vacancy', id], queryFn: () => getVacancy(id) });

  if (query.isLoading) return <LoadingState />;
  if (query.isError || !query.data) return <ErrorState onRetry={() => query.refetch()} />;
  const v = query.data;

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, lg: 8 }}>
        <Paper sx={{ p: 3 }}>
          <Stack spacing={2}>
            <Typography variant="h2">{v.title}</Typography>
            <Typography variant="h6">{v.salary_from} - {v.salary_to} {v.currency?.name}</Typography>
            <Typography color="text.secondary">{v.city?.name} · {v.experience?.name} · {v.employment_type?.name}</Typography>
            <Button variant="contained" disabled>Откликнуться (требуется авторизация)</Button>
            <Typography whiteSpace="pre-line">{v.description}</Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {v.skills?.map((skill) => <Chip key={skill.id} label={skill.name} />)}
            </Stack>
          </Stack>
        </Paper>
      </Grid>
      <Grid size={{ xs: 12, lg: 4 }}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">{v.company?.name}</Typography>
          <Typography color="text.secondary">{v.city?.name}</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};
