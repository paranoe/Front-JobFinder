import { Box, Container, List, ListItemButton, ListItemText, Paper, Stack } from '@mui/material';
import { Link, Outlet, useLocation } from 'react-router-dom';

const menu: Array<{ path: string; label: string }> = [
  { path: '/account/responses', label: 'Мои отклики' },
  { path: '/account/favorites', label: 'Избранные вакансии' },
  { path: '/account/resume', label: 'Моё резюме' },
  { path: '/account/profile', label: 'Настройки профиля' },
  { path: '/account/notifications', label: 'Настройки уведомлений' },
];

export const AccountLayout = () => {
  const { pathname } = useLocation();
  return (
    <Container sx={{ py: 4 }}>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
        <Paper sx={{ width: { xs: '100%', md: 260 }, p: 1 }}>
          <List>
            {menu.map(({ path, label }) => (
              <ListItemButton key={path} component={Link} to={path} selected={pathname === path}>
                <ListItemText primary={label} />
              </ListItemButton>
            ))}
          </List>
        </Paper>
        <Box flex={1}>
          <Outlet />
        </Box>
      </Stack>
    </Container>
  );
};
