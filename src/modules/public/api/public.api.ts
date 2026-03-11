import { apiClient } from '../../../shared/api/client';
import type { DictionaryItem, PaginatedResponse, Vacancy, VacancyFilters } from '../../../shared/types/models';

export const getVacancies = async (params: VacancyFilters) => {
  const { data } = await apiClient.get<PaginatedResponse<Vacancy>>('/public/vacancies', { params });
  return data;
};

export const getVacancy = async (id: string) => {
  const { data } = await apiClient.get<Vacancy>(`/public/vacancies/${id}`);
  return data;
};

export const getDictionary = async (entity: string) => {
  const { data } = await apiClient.get<DictionaryItem[]>(`/admin/${entity}`);
  return data;
};
