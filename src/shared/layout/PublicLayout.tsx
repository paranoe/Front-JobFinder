import { AppBar, Box, Button, Container, Stack, Toolbar, Typography } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';

export const PublicLayout = () => (
  <Box minHeight="100vh" display="flex" flexDirection="column">
    <AppBar position="sticky" color="inherit" elevation={0} sx={{ borderBottom: '1px solid #e8edf4', backdropFilter: 'blur(8px)' }}>
      <Toolbar component={Container} sx={{ gap: 2 }}>
        <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: 'none', color: 'primary.main', fontWeight: 800 }}>
          JobFinder
        </Typography>
        <Stack direction="row" spacing={1} sx={{ flexGrow: 1 }}>
          <Button size="small" variant="contained">Вакансии</Button>
          <Button size="small" disabled>Резюме</Button>
          <Button size="small" disabled>Компании</Button>
        </Stack>
        <Button component={Link} to="/auth/login">Войти</Button>
        <Button component={Link} to="/auth/register" variant="outlined">Регистрация</Button>
      </Toolbar>
    </AppBar>
    <Container sx={{ py: 4, flex: 1 }}>
      <Outlet />
    </Container>
    <Box component="footer" sx={{ borderTop: '1px solid #e8edf4', py: 2.5, mt: 'auto' }}>
      <Container>
        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" gap={1}>
          <Typography color="text.secondary">© JobFinder, 2026</Typography>
          <Stack direction="row" spacing={2}>
            <Typography component={Link} to="/about" sx={{ textDecoration: 'none', color: 'text.secondary' }}>О сервисе</Typography>
            <Typography component={Link} to="/help" sx={{ textDecoration: 'none', color: 'text.secondary' }}>Помощь</Typography>
            <Typography component={Link} to="/terms" sx={{ textDecoration: 'none', color: 'text.secondary' }}>Условия</Typography>
          </Stack>
        </Stack>
      </Container>
    </Box>
  </Box>
);
