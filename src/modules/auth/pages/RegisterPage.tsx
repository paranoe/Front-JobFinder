import { Button, Paper, Stack, TextField, Typography } from '@mui/material';

export const RegisterPage = () => (
  <Paper sx={{ maxWidth: 420, mx: 'auto', p: 4 }}>
    <Stack spacing={2}>
      <Typography variant="h5">Регистрация</Typography>
      <TextField label="Email" fullWidth />
      <TextField label="Пароль" type="password" fullWidth />
      <TextField label="Подтверждение пароля" type="password" fullWidth />
      <Button variant="contained">Создать аккаунт</Button>
    </Stack>
  </Paper>
);
