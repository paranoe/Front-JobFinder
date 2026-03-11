import { Box, Container, IconButton, List, ListItemButton, ListItemText, Paper, Stack, Switch, TextField, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, Outlet, useLocation } from 'react-router-dom';

const nav: Array<{ path: string; label: string }> = [
  { path: '/admin', label: 'Дашборд' },
  { path: '/admin/users', label: 'Пользователи' },
  { path: '/admin/companies', label: 'Компании' },
  { path: '/admin/applicants', label: 'Соискатели' },
  { path: '/admin/vacancies', label: 'Вакансии' },
  { path: '/admin/responses', label: 'Отклики' },
  { path: '/admin/dictionaries/cities', label: 'Справочники' },
];

export const AdminLayout = () => {
  const { pathname } = useLocation();
  return (
    <Container maxWidth={false} sx={{ py: 3 }}>
      <Stack direction={{ xs: 'column', lg: 'row' }} spacing={2}>
        <Paper sx={{ width: { xs: '100%', lg: 270 }, p: 1 }}>
          <Typography px={2} py={1} variant="h6">Admin</Typography>
          <List>
            {nav.map(({ path, label }) => (
              <ListItemButton key={path} component={Link} to={path} selected={pathname === path}>
                <ListItemText primary={label} />
              </ListItemButton>
            ))}
          </List>
        </Paper>
        <Box flex={1}>
          <Paper sx={{ p: 2, mb: 2 }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <IconButton><MenuIcon /></IconButton>
              <TextField size="small" placeholder="Глобальный поиск" sx={{ flex: 1 }} />
              <Switch />
            </Stack>
          </Paper>
          <Outlet />
        </Box>
      </Stack>
    </Container>
  );
};
