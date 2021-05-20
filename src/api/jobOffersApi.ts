import http from './http';

export const fetchJobOffers = () => {
  return http.get('/offers');
};
