import { apiClient } from '../../../shared/api/client';
import type { DictionaryItem, PaginatedResponse, Vacancy } from '../../../shared/types/models';

export const getAdminUsers = async (params: Record<string, unknown>) => {
  const { data } = await apiClient.get<PaginatedResponse<{ id: number; email: string; role: string; is_active: boolean }>>('/admin/users', { params });
  return data;
};

export const patchUserStatus = async (userId: number, is_active: boolean) => {
  const { data } = await apiClient.patch(`/admin/users/${userId}/status`, { is_active });
  return data;
};

export const getAdminVacancies = async (params: Record<string, unknown>) => {
  const { data } = await apiClient.get<PaginatedResponse<Vacancy>>('/admin/vacancies', { params });
  return data;
};

export const getDictionaryAdmin = async (entity: string) => {
  const { data } = await apiClient.get<DictionaryItem[]>(`/admin/${entity}`);
  return data;
};
