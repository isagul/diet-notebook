import axios from "axios";

export const registerUser = ({ data }) => {
  return axios({
    method: 'POST',
    url: `${window.location.origin}/api/register`,
    data,
  }).then(response => {
    return response.data;
  });
};
