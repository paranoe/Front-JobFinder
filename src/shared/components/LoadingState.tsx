import { Skeleton, Stack } from '@mui/material';

export const LoadingState = () => (
  <Stack spacing={2}>
    <Skeleton variant="rounded" height={60} />
    <Skeleton variant="rounded" height={120} />
    <Skeleton variant="rounded" height={120} />
  </Stack>
);
