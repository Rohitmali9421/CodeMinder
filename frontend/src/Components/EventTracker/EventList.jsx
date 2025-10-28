import EventItem from './EventItem';

const EventList = ({ dayEvents }) => (
  <div className="mt-1 space-y-1 max-h-24 overflow-y-auto">
    {dayEvents.slice(0, 3).map((event) => (
      <EventItem key={event.id} event={event} />
    ))}
    {dayEvents.length > 3 && (
      <div className="text-xs text-gray-500 text-center mt-1 bg-gray-100 py-1 rounded">
        +{dayEvents.length - 3} more
      </div>
    )}
  </div>
);

export default EventList;
