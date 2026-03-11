import { Button, Paper, Stack, TextField, Typography } from '@mui/material';

export const LoginPage = () => (
  <Paper sx={{ maxWidth: 420, mx: 'auto', p: 4 }}>
    <Stack spacing={2}>
      <Typography variant="h5">Вход</Typography>
      <TextField label="Email" fullWidth />
      <TextField label="Пароль" type="password" fullWidth />
      <Button variant="contained">Войти</Button>
    </Stack>
  </Paper>
);
