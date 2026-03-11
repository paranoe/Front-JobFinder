import { Button, Paper, Stack, Typography } from '@mui/material';

interface Props {
  message?: string;
  onRetry?: () => void;
}

export const ErrorState = ({ message = 'Не удалось загрузить данные', onRetry }: Props) => (
  <Paper sx={{ p: 3 }}>
    <Stack spacing={2}>
      <Typography color="error">{message}</Typography>
      {onRetry ? <Button onClick={onRetry}>Повторить попытку</Button> : null}
    </Stack>
  </Paper>
);
