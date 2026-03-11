import { apiClient } from '../../../shared/api/client';
import type { VacancyDetails, VacancyFilters, VacancyListItem } from '../../../shared/types/models';

export const getVacancies = async (params: VacancyFilters) => {
  const { data } = await apiClient.get<VacancyListItem[]>('/public/vacancies', { params });
  return data;
};

export const getVacancy = async (id: string) => {
  const { data } = await apiClient.get<VacancyDetails>(`/public/vacancies/${id}`);
  return data;
};
