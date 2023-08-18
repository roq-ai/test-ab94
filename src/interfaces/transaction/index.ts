import { HoldingInterface } from 'interfaces/holding';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface TransactionInterface {
  id?: string;
  holding_id?: string;
  user_id?: string;
  transaction_type?: string;
  transaction_date?: any;
  transaction_price?: number;
  quantity?: number;
  created_at?: any;
  updated_at?: any;

  holding?: HoldingInterface;
  user?: UserInterface;
  _count?: {};
}

export interface TransactionGetQueryInterface extends GetQueryInterface {
  id?: string;
  holding_id?: string;
  user_id?: string;
  transaction_type?: string;
}
