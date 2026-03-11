import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Grid, MenuItem, Paper, Stack, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({ fullName: z.string().min(2, 'Введите имя'), email: z.string().email('Некорректный email') });

type ResumeForm = z.infer<typeof schema>;

export const ResumePage = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<ResumeForm>({
    resolver: zodResolver(schema),
    defaultValues: { fullName: '', email: '' },
  });

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" mb={2}>Моё резюме</Typography>
      <form onSubmit={handleSubmit(console.log)}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Controller control={control} name="fullName" render={({ field }) => (
              <TextField {...field} fullWidth label="ФИО" error={!!errors.fullName} helperText={errors.fullName?.message} />
            )} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Controller control={control} name="email" render={({ field }) => (
              <TextField {...field} fullWidth label="Email" error={!!errors.email} helperText={errors.email?.message} />
            )} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField select fullWidth label="Опыт">
              <MenuItem value="junior">Junior</MenuItem>
              <MenuItem value="middle">Middle</MenuItem>
            </TextField>
          </Grid>
        </Grid>
        <Stack direction="row" mt={3}>
          <Button type="submit" variant="contained">Сохранить</Button>
        </Stack>
      </form>
    </Paper>
  );
};
