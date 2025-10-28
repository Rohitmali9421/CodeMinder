import { useState, useMemo } from 'react';
import { useContests } from '../../hooks/useContests';
import CalendarHeader from './CalendarHeader';
import Filters from './Filters';
import CalendarGrid from './CalendarGrid';
import { Loader2 } from 'lucide-react';
import Loading from '../Loading';

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [platformFilter, setPlatformFilter] = useState('all');

  const { events, loading, error } = useContests(currentMonth);

  const prevMonth = () =>
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  const nextMonth = () =>
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));

  // ✅ Filter events by selected platform
  const filteredEvents = useMemo(() => {
    if (!events) return [];
    if (platformFilter === 'all') return events;

    return events.filter(
      (event) =>
        event.platform &&
        event.platform.toLowerCase() === platformFilter.toLowerCase()
    );
  }, [events, platformFilter]);

  return (
    <div className="calendar-container bg-white rounded-xl shadow-md p-6 max-w-6xl mx-auto">
      {/* 🗓 Header */}
      <CalendarHeader
        currentMonth={currentMonth}
        prevMonth={prevMonth}
        nextMonth={nextMonth}
      />

      {/* 🔍 Platform Filter */}
      <Filters
        platformFilter={platformFilter}
        setPlatformFilter={setPlatformFilter}
      />

      {/* 🔄 Loading / Error / Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center h-64">
          <Loading/>
          <p className="text-lg text-gray-600">Loading contests...</p>
        </div>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : (
        <CalendarGrid currentMonth={currentMonth} events={filteredEvents} />
      )}
    </div>
  );
}
