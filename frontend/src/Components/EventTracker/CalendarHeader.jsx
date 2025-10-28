import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { formatMonthYear } from '../../utils/dateUtils';

const CalendarHeader = ({ currentMonth, prevMonth, nextMonth }) => (
  <div className="flex items-center justify-between mb-6 px-2">
    <h2 className="text-2xl font-bold text-gray-800">{formatMonthYear(currentMonth)}</h2>
    <div className="flex items-center space-x-2">
      <Button variant="outline" size="icon" onClick={prevMonth}>
        <ChevronLeft className="h-5 w-5 text-gray-700" />
      </Button>
      <Button variant="outline" size="icon" onClick={nextMonth}>
        <ChevronRight className="h-5 w-5 text-gray-700" />
      </Button>
    </div>
  </div>
);

export default CalendarHeader;
