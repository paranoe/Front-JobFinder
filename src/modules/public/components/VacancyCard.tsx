import { Button, Chip, Paper, Stack, Typography } from '@mui/material';
import WorkOutlineRoundedIcon from '@mui/icons-material/WorkOutlineRounded';
import PlaceRoundedIcon from '@mui/icons-material/PlaceRounded';
import { Link } from 'react-router-dom';
import type { VacancyListItem } from '../../../shared/types/models';

export const VacancyCard = ({ vacancy }: { vacancy: VacancyListItem }) => (
  <Paper
    sx={{
      p: 2.5,
      border: '1px solid #e6ecf3',
      transition: 'all .2s ease',
      '&:hover': { boxShadow: 4, transform: 'translateY(-2px)' },
    }}
  >
    <Stack spacing={1.5}>
      <Typography component={Link} to={`/vacancies/${vacancy.id}`} variant="h6" sx={{ textDecoration: 'none', color: 'primary.main' }}>
        {vacancy.title}
      </Typography>
      <Typography fontWeight={700}>{vacancy.salary_min} - {vacancy.salary_max}</Typography>
      <Stack direction="row" spacing={2} color="text.secondary">
        <Stack direction="row" spacing={0.5} alignItems="center"><WorkOutlineRoundedIcon fontSize="small" /> <span>{vacancy.company_name}</span></Stack>
        <Stack direction="row" spacing={0.5} alignItems="center"><PlaceRoundedIcon fontSize="small" /> <span>{vacancy.city_name}</span></Stack>
      </Stack>
      <Chip size="small" label={vacancy.profession_name} sx={{ width: 'fit-content' }} />
      <Button variant="outlined" disabled>Откликнуться (требуется авторизация)</Button>
    </Stack>
  </Paper>
);
