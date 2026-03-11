import { apiClient } from '../../../shared/api/client';
import type { AdminUser, DictionaryItem } from '../../../shared/types/models';

export const getAdminUsers = async (params: Record<string, unknown>) => {
  const { data } = await apiClient.get<AdminUser[]>('/admin/users', { params });
  return data;
};

export const patchUserStatus = async (userId: number, is_active: boolean) => {
  const { data } = await apiClient.patch(`/admin/users/${userId}/status`, { is_active });
  return data;
};

export const getAdminVacancies = async (params: Record<string, unknown>) => {
  const { data } = await apiClient.get('/admin/vacancies', { params });
  return data;
};

export const getDictionaryAdmin = async (catalogName: string) => {
  const { data } = await apiClient.get<DictionaryItem[]>(`/admin/catalogs/${catalogName}`);
  return data;
};
