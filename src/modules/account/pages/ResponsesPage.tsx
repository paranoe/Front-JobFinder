import { Paper, Stack, Typography } from '@mui/material';

export const ResponsesPage = () => (
  <Paper sx={{ p: 3 }}>
    <Stack spacing={1}>
      <Typography variant="h5">Мои отклики</Typography>
      <Typography color="text.secondary">Вакансия · Компания · Статус · Дата (API слой готов к подключению)</Typography>
    </Stack>
  </Paper>
);
