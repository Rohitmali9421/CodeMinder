import axios from 'axios';

const BASE_URL = 'https://node.codolio.com/api/contest-calendar/v1/all';

export const getContests = async (startDate, endDate) => {
  const response = await axios.get(`${BASE_URL}/get-contests`, {
    params: { startDate, endDate },
  });
  return response.data;
};
