import { Button, Chip, Paper, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import type { Vacancy } from '../../../shared/types/models';

export const VacancyCard = ({ vacancy }: { vacancy: Vacancy }) => (
  <Paper sx={{ p: 2.5, transition: '0.2s', '&:hover': { boxShadow: 4 } }}>
    <Stack spacing={1.5}>
      <Typography component={Link} to={`/vacancies/${vacancy.id}`} variant="h6" sx={{ textDecoration: 'none' }}>
        {vacancy.title}
      </Typography>
      <Typography fontWeight={600}>
        {vacancy.salary_from ?? '—'} - {vacancy.salary_to ?? '—'} {vacancy.currency?.name}
      </Typography>
      <Typography color="text.secondary">{vacancy.company?.name} · {vacancy.city?.name}</Typography>
      <Stack direction="row" spacing={1} flexWrap="wrap">
        {vacancy.skills?.slice(0, 5).map((skill) => <Chip key={skill.id} label={skill.name} size="small" />)}
      </Stack>
      <Button variant="outlined" disabled>Откликнуться (требуется авторизация)</Button>
    </Stack>
  </Paper>
);
