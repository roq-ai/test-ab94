import { TransactionInterface } from 'interfaces/transaction';
import { OrganizationInterface } from 'interfaces/organization';
import { StockInterface } from 'interfaces/stock';
import { GetQueryInterface } from 'interfaces';

export interface HoldingInterface {
  id?: string;
  organization_id?: string;
  stock_id?: string;
  purchase_price?: number;
  purchase_date?: any;
  quantity?: number;
  created_at?: any;
  updated_at?: any;
  transaction?: TransactionInterface[];
  organization?: OrganizationInterface;
  stock?: StockInterface;
  _count?: {
    transaction?: number;
  };
}

export interface HoldingGetQueryInterface extends GetQueryInterface {
  id?: string;
  organization_id?: string;
  stock_id?: string;
}
