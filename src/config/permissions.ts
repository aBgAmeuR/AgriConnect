export const permissions = {
  '/': ['visitor', 'client'],
  '/explore': ['visitor', 'client'],
  '/producer': ['visitor', 'client'],
  '/messages': ['client', 'producer', 'admin'],
  '/commands': ['producer'],
  '/stock': ['producer'],
  '/accounts': ['admin'],
  '/cart': ['client'],
  '/account': ['client', 'producer', 'admin'],
  '/myshop': ['producer'],
};
