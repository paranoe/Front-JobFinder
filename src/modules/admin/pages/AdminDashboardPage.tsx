import { Grid, Paper, Typography } from '@mui/material';

export const AdminDashboardPage = () => (
  <Grid container spacing={2}>
    {['Вакансии', 'Пользователи', 'Отклики'].map((item) => (
      <Grid size={{ xs: 12, md: 4 }} key={item}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6">{item}</Typography>
          <Typography variant="h4">—</Typography>
        </Paper>
      </Grid>
    ))}
  </Grid>
);
