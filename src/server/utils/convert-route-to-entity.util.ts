const mapping: Record<string, string> = {
  administrators: 'administrator',
  holdings: 'holding',
  organizations: 'organization',
  stocks: 'stock',
  transactions: 'transaction',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
