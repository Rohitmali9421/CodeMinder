import { getDaysInMonth } from '../../utils/dateUtils';
import CalendarDay from './CalendarDay';

const CalendarGrid = ({ currentMonth, events }) => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const days = getDaysInMonth(currentMonth);
  const firstDay = days[0].getDay();

  const emptyCells = Array(firstDay).fill(null);

  const getEventsForDay = (day) =>
    events.filter((event) => {
      const eventDate = new Date(event.startTime);
      return (
        eventDate.getDate() === day.getDate() &&
        eventDate.getMonth() === day.getMonth() &&
        eventDate.getFullYear() === day.getFullYear()
      );
    });

  return (
    <div className="grid grid-cols-7 gap-0.5 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
      {daysOfWeek.map((day) => (
        <div
          key={day}
          className="py-3 font-medium text-sm text-gray-600 bg-gray-50 text-center border-b border-gray-200"
        >
          {day}
        </div>
      ))}

      {emptyCells.map((_, i) => (
        <div key={`empty-${i}`} className="date-cell bg-white min-h-[100px]" />
      ))}

      {days.map((day) => (
        <CalendarDay key={day.toString()} day={day} dayEvents={getEventsForDay(day)} />
      ))}
    </div>
  );
};

export default CalendarGrid;
