import { Pagination, Stack } from '@mui/material';

interface Props {
  page: number;
  count: number;
  onChange: (page: number) => void;
}

export const PaginationBar = ({ page, count, onChange }: Props) => (
  <Stack alignItems="center" py={3}>
    <Pagination page={page} count={count} color="primary" onChange={(_, value) => onChange(value)} />
  </Stack>
);
