export interface DictionaryItem {
  id: number;
  name: string;
}

export interface VacancyListItem {
  id: number;
  title: string;
  description: string;
  salary_min: number;
  salary_max: number;
  created_at: string;
  company_name: string;
  city_name: string;
  profession_name: string;
}

export interface VacancyDetails extends VacancyListItem {
  updated_at: string;
  employment_type: string;
  work_schedule: string;
  currency: string;
  experience: string;
  skills: string[];
}

export interface AdminUser {
  id: number;
  email: string;
  role: string;
  is_active: boolean;
  created_at: string;
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
