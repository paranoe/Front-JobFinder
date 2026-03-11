import { Paper, Typography } from '@mui/material';

export const PlaceholderPage = ({ title }: { title: string }) => (
  <Paper sx={{ p: 3 }}>
    <Typography variant="h5">{title}</Typography>
  </Paper>
);
