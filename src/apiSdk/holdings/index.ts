import axios from 'axios';
import queryString from 'query-string';
import { HoldingInterface, HoldingGetQueryInterface } from 'interfaces/holding';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getHoldings = async (query?: HoldingGetQueryInterface): Promise<PaginatedInterface<HoldingInterface>> => {
  const response = await axios.get('/api/holdings', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createHolding = async (holding: HoldingInterface) => {
  const response = await axios.post('/api/holdings', holding);
  return response.data;
};

export const updateHoldingById = async (id: string, holding: HoldingInterface) => {
  const response = await axios.put(`/api/holdings/${id}`, holding);
  return response.data;
};

export const getHoldingById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/holdings/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteHoldingById = async (id: string) => {
  const response = await axios.delete(`/api/holdings/${id}`);
  return response.data;
};
