import { AdministratorInterface } from 'interfaces/administrator';
import { HoldingInterface } from 'interfaces/holding';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface OrganizationInterface {
  id?: string;
  description?: string;
  address?: string;
  city?: string;
  country?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  administrator?: AdministratorInterface[];
  holding?: HoldingInterface[];
  user?: UserInterface;
  _count?: {
    administrator?: number;
    holding?: number;
  };
}

export interface OrganizationGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  address?: string;
  city?: string;
  country?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
