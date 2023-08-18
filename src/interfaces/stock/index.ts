import { HoldingInterface } from 'interfaces/holding';
import { GetQueryInterface } from 'interfaces';

export interface StockInterface {
  id?: string;
  name: string;
  ticker_symbol: string;
  market: string;
  price?: number;
  quantity?: number;
  created_at?: any;
  updated_at?: any;
  holding?: HoldingInterface[];

  _count?: {
    holding?: number;
  };
}

export interface StockGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  ticker_symbol?: string;
  market?: string;
}
