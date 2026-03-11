import { useQuery } from '@tanstack/react-query';
import { Button, Chip, Grid, Paper, Stack, Typography } from '@mui/material';
import PlaceRoundedIcon from '@mui/icons-material/PlaceRounded';
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded';
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
            <Typography variant="h6">{v.salary_min} - {v.salary_max} {v.currency}</Typography>
            <Stack direction="row" spacing={2} color="text.secondary">
              <Stack direction="row" spacing={0.5} alignItems="center"><PlaceRoundedIcon fontSize="small" /> <span>{v.city_name}</span></Stack>
              <span>{v.experience}</span>
              <span>{v.employment_type}</span>
              <span>{v.work_schedule}</span>
            </Stack>
            <Button variant="contained" disabled>Откликнуться (требуется авторизация)</Button>
            <Typography whiteSpace="pre-line">{v.description}</Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {v.skills?.map((skill) => <Chip key={skill} label={skill} />)}
            </Stack>
          </Stack>
        </Paper>
      </Grid>
      <Grid size={{ xs: 12, lg: 4 }}>
        <Paper sx={{ p: 2 }}>
          <Stack direction="row" spacing={1} alignItems="center"><BusinessRoundedIcon /><Typography variant="h6">{v.company_name}</Typography></Stack>
          <Typography color="text.secondary">{v.city_name}</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};
