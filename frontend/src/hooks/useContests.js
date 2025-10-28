import { useEffect, useState } from 'react';
import { getContests } from '../utils/api';

export const useContests = (currentMonth) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatDate = (date) => date.toISOString().split('T')[0];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const startDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
        const endDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
        const data = await getContests(formatDate(startDate), formatDate(endDate));

        if (data.status.success) {
          const transformed = data.data.map((contest) => ({
            id: contest._id,
            title: contest.contestName,
            platform: contest.platform,
            startTime: new Date(contest.contestStartDate),
            endTime: new Date(contest.contestEndDate),
            url: contest.contestUrl,
            description: contest.contestType,
            duration: contest.contestDuration,
          }));
          setEvents(transformed);
        } else {
          throw new Error(data.status.message);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentMonth]);

  return { events, loading, error };
};
