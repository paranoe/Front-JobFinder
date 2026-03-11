export interface DictionaryItem {
  id: number;
  name: string;
}

export interface Vacancy {
  id: number;
  title: string;
  description?: string;
  salary_from?: number;
  salary_to?: number;
  city?: DictionaryItem;
  profession?: DictionaryItem;
  company?: { id: number; name: string };
  experience?: DictionaryItem;
  employment_type?: DictionaryItem;
  work_schedule?: DictionaryItem;
  currency?: DictionaryItem;
  skills?: DictionaryItem[];
  created_at?: string;
  updated_at?: string;
  status?: DictionaryItem;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  skip: number;
  limit: number;
}

export interface AuthUser {
  id: number;
  email: string;
  role: 'admin' | 'applicant' | 'company';
  is_active: boolean;
}

export interface VacancyFilters {
  search?: string;
  city_id?: number;
  profession_id?: number;
  company_id?: number;
  skip?: number;
  limit?: number;
}
