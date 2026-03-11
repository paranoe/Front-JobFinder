import { Paper, Typography } from '@mui/material';

export const AdminPlaceholderPage = ({ title }: { title: string }) => (
  <Paper sx={{ p: 3 }}>
    <Typography variant="h5">{title}</Typography>
    <Typography color="text.secondary">Раздел подготовлен под интеграцию с API backend.</Typography>
  </Paper>
);
