import axios from 'axios';
import camelcaseKeys from 'camelcase-keys';

const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

http.interceptors.response.use(
  function (response) {
    return {
      ...response,
      data: camelcaseKeys(response.data, { deep: true }),
    };
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default http;
