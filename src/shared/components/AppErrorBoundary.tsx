import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Button, Container, Paper, Stack, Typography } from '@mui/material';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class AppErrorBoundary extends Component<Props, State> {
  public state: State = { hasError: false };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('App crashed:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Container sx={{ py: 6 }}>
          <Paper sx={{ p: 4 }}>
            <Stack spacing={2}>
              <Typography variant="h5">Что-то пошло не так</Typography>
              <Typography color="text.secondary">Произошла критическая ошибка интерфейса.</Typography>
              <Button variant="contained" onClick={() => window.location.reload()}>Перезагрузить страницу</Button>
            </Stack>
          </Paper>
        </Container>
      );
    }

    return this.props.children;
  }
}
