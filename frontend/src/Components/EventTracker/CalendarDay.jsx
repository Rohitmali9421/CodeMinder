import { isCurrentDay } from '../../utils/dateUtils';
import EventList from './EventList';

const CalendarDay = ({ day, dayEvents }) => {
  const isToday = isCurrentDay(day);

  return (
    <div
      className={`date-cell min-h-[100px] p-2 bg-white border border-gray-100 hover:bg-gray-50 transition-colors ${
        isToday ? 'border-2 border-blue-500' : ''
      }`}
    >
      <div
        className={`date-number text-right mb-1 ${
          isToday
            ? 'font-bold text-white bg-blue-500 rounded-full w-6 h-6 flex items-center justify-center ml-auto'
            : 'text-gray-700'
        }`}
      >
        {day.getDate()}
      </div>
      <EventList dayEvents={dayEvents} />
    </div>
  );
};

export default CalendarDay;
