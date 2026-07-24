import { api } from '../api/fetch-client';
import type { AvailableArea, MyEnrollments } from '@/core/interfaces';

export const getAvailableAreasAction = async (token: string): Promise<AvailableArea[]> => {
  return api.get<AvailableArea[]>('/enrollments/available', token);
};

export const getMyEnrollmentsAction = async (token: string): Promise<MyEnrollments> => {
  return api.get<MyEnrollments>('/enrollments/me', token);
};

export const enrollAreaAction = async (area: string, token: string): Promise<{ area: string; enrolled: boolean }> => {
  return api.post<{ area: string; enrolled: boolean }>('/enrollments', { area }, token);
};

export const unenrollAreaAction = async (area: string, token: string): Promise<{ area: string; enrolled: boolean }> => {
  return api.delete<{ area: string; enrolled: boolean }>(`/enrollments/${encodeURIComponent(area)}`, token);
};
