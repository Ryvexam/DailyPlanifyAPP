import React from 'react';
import { Event, eventToICal } from '../../utils.ts';
import API_URL from '../../customenv.tsx';

interface EventListProps {
  events: Event[];
  draggingEvent: Event | null;
  handleLongPress: (event: React.MouseEvent, eventDetails: Event) => void;
  onDelete: (eventUuid: string) => void;
}

const positionEvent = (event: Event) => {
  const eventStartDate = new Date(event.event_date_start);
  const eventStartHour = eventStartDate.getHours();
  const eventStartMinutes = eventStartDate.getMinutes();
  const pixels = 80;
  const pixelsPerMinute = pixels / 60;
  const topOffset = (eventStartHour * 60 + eventStartMinutes) * pixelsPerMinute;

  const eventEndDate = new Date(event.event_date_end);
  const duration = (eventEndDate.getTime() - eventStartDate.getTime()) / 60000;

  const height = duration * pixelsPerMinute;

  return { top: topOffset, height: height };
};

const deleteEvent = async (eventUuid: string, onDelete: (eventUuid: string) => void) => {
  try {
    const response = await fetch(`${API_URL}/api/events/${eventUuid}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      onDelete(eventUuid);
    } else {
      console.error('Failed to delete the event');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

const EventList: React.FC<EventListProps> = ({
                                               events,
                                               draggingEvent,
                                               handleLongPress,
                                               onDelete,
                                             }) => {
  return (
    <>
      {events.map((event, index) => {
        const isDragging = event === draggingEvent;
        const eventPosition = isDragging ? positionEvent(draggingEvent) : positionEvent(event);
        const { top, height } = eventPosition;
        const eventStyles = {
          backgroundColor: event.event_color,
          color: event.event_color === '#ffffff' ? 'black' : 'white',
          top: `${top}px`,
          left: '10%',
          right: '10px',
          height: `${height}px`,
          cursor: isDragging ? 'grabbing' : 'grab',
          zIndex: isDragging ? 1000 : 1,
          position: 'absolute' as 'absolute',
        };

        const eventStartDate = new Date(event.event_date_start);
        const eventEndDate = new Date(event.event_date_end);
        const startTime = `${eventStartDate.getHours().toString().padStart(2, '0')}:${eventStartDate.getMinutes().toString().padStart(2, '0')}`;
        const endTime = `${eventEndDate.getHours().toString().padStart(2, '0')}:${eventEndDate.getMinutes().toString().padStart(2, '0')}`;

        return (
          <div
            key={index}
            className="rounded p-2 relative"
            style={eventStyles}
            draggable
            onMouseDown={(e) => handleLongPress(e, event)}
          >
            <strong>{event.event_name}</strong>: {event.event_description}<br />

            <small>Horaire: {startTime} - {endTime}</small>
            <div
              className="lg:px-2 xl:px-2 md:py-1 md:px-2 md:text-base sm:py-1 sm:px-2 sm:text-sm inline-flex items-center justify-center gap-2.5 rounded-full border py-2 px-3 text-center font-medium"
              style={{ position: 'absolute', right: '5px', bottom: '5px' }}
            >
              <button onClick={(e) => {
                e.preventDefault();
                const icalData = eventToICal(event);
                const blob = new Blob([icalData], { type: 'text/calendar;charset=utf-8' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `${event.event_name}.ics`);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}>
                Download iCal
              </button>
            </div>
            <div
              style={{ position: 'absolute', right: '140px', bottom: '5px' }}

              className="lg:px-2 xl:px-2 md:py-1 md:px-2 md:text-base sm:py-1 sm:px-2 sm:text-sm inline-flex items-center justify-center gap-2.5 rounded-full border py-2 px-3 text-center font-medium"
            >
              <button

                onClick={(e) => {
                  e.preventDefault();
                  deleteEvent(event.event_uuid, onDelete);
                }}>
                Delete Event
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default EventList;
