import axios from 'axios';
import queryString from 'query-string';
import { AdministratorInterface, AdministratorGetQueryInterface } from 'interfaces/administrator';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getAdministrators = async (
  query?: AdministratorGetQueryInterface,
): Promise<PaginatedInterface<AdministratorInterface>> => {
  const response = await axios.get('/api/administrators', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createAdministrator = async (administrator: AdministratorInterface) => {
  const response = await axios.post('/api/administrators', administrator);
  return response.data;
};

export const updateAdministratorById = async (id: string, administrator: AdministratorInterface) => {
  const response = await axios.put(`/api/administrators/${id}`, administrator);
  return response.data;
};

export const getAdministratorById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/administrators/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteAdministratorById = async (id: string) => {
  const response = await axios.delete(`/api/administrators/${id}`);
  return response.data;
};
