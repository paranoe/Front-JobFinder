import { AppBar, Box, Button, Container, Stack, Toolbar, Typography } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';

export const PublicLayout = () => (
  <Box>
    <AppBar position="sticky" color="inherit" elevation={0} sx={{ borderBottom: '1px solid #e8edf4' }}>
      <Toolbar component={Container} sx={{ gap: 2 }}>
        <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: 'none', color: 'primary.main' }}>
          JobFinder
        </Typography>
        <Stack direction="row" spacing={2} sx={{ flexGrow: 1 }}>
          <Button size="small" variant="contained">Вакансии</Button>
          <Button size="small">Резюме</Button>
          <Button size="small">Компании</Button>
        </Stack>
        <Button component={Link} to="/auth/login">Войти</Button>
        <Button component={Link} to="/auth/register" variant="outlined">Регистрация</Button>
      </Toolbar>
    </AppBar>
    <Container sx={{ py: 4 }}>
      <Outlet />
    </Container>
  </Box>
);
