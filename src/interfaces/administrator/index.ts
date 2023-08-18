import { UserInterface } from 'interfaces/user';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface AdministratorInterface {
  id?: string;
  user_id?: string;
  organization_id?: string;
  role?: string;
  status?: string;
  start_date?: any;
  end_date?: any;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  organization?: OrganizationInterface;
  _count?: {};
}

export interface AdministratorGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  organization_id?: string;
  role?: string;
  status?: string;
}
