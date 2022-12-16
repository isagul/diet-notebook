import axios from '@/lib/axios';

export const registerUser = ({ data }) => {
  return axios({
    method: 'POST',
    url: '/api/register',
    data,
  }).then(response => {
    return response.data;
  });
};
