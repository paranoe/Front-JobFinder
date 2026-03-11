import { Paper, Typography } from '@mui/material';

export const StaticPage = ({ title, text }: { title: string; text: string }) => (
  <Paper sx={{ p: 4 }}>
    <Typography variant="h2" gutterBottom>{title}</Typography>
    <Typography color="text.secondary">{text}</Typography>
  </Paper>
);
