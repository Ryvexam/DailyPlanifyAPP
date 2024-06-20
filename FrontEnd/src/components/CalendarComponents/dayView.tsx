import React, { useEffect, useState, useCallback, useRef } from 'react';
import { addDays, subDays } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import EventPopup from './Events/EventPopup.tsx';
import AddEventButton from './Events/AddEventButton.tsx';
import EventList from './Events/EventList.tsx';
import { fetchEvents, Event } from './Events/utils.ts';
import axios from 'axios';
import API_URL from '../customenv.tsx';
import Notes from './Notes/Notes.tsx';

const DayView = ({ selectedDay }: { selectedDay: Date }) => {
  const [popupOpen, setPopupOpen] = useState(false);
  const [draggingEvent, setDraggingEvent] = useState<Event | null>(null);
  const [dragStartY, setDragStartY] = useState(0);
  const [currentDay, setCurrentDay] = useState<Date>(selectedDay);
  const [events, setEvents] = useState<Event[]>([]);
  const [isEdit, setIsEdit] = useState(false);
  const throttledMove = useRef<(event: MouseEvent | TouchEvent) => void>();

  useEffect(() => {
    fetchEvents()
      .then((fetchedEvents) => {
        const filteredEvents = fetchedEvents.filter(
          (event) => new Date(event.event_date_start).toDateString() === currentDay.toDateString()
        );
        setEvents(filteredEvents);
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
      });
  }, [currentDay]);

  const handleLongPress = (event: React.MouseEvent | React.TouchEvent, eventDetails: Event) => {
    event.preventDefault();
    const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;
    setDraggingEvent(eventDetails);
    setDragStartY(clientY);
  };

  const handleMove = useCallback((event: MouseEvent | TouchEvent) => {
    if (!draggingEvent) return;

    const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;
    const moveYDiff = clientY - dragStartY;
    const pixelsPerMinute = 80 / 60;
    const diffMinutes = Math.round(moveYDiff / pixelsPerMinute / 30) * 30;

    if (diffMinutes !== 0) {
      const newStart = new Date(draggingEvent.event_date_start);
      const newEnd = new Date(draggingEvent.event_date_end);

      newStart.setMinutes(newStart.getMinutes() + diffMinutes);
      newEnd.setMinutes(newEnd.getMinutes() + diffMinutes);

      if (
        newStart.getHours() >= 0 && newStart.getHours() < 24 &&
        newEnd.getHours() >= 0 && newEnd.getHours() < 24
      ) {
        setDraggingEvent({ ...draggingEvent, event_date_start: newStart, event_date_end: newEnd });
        setDragStartY(clientY);
      }
    }
  }, [draggingEvent, dragStartY]);

  useEffect(() => {
    const handleEnd = async () => {
      if (draggingEvent) {
        setEvents((events) =>
          events.map((ev) =>
            ev.event_uuid === draggingEvent.event_uuid
              ? { ...ev, event_date_start: draggingEvent.event_date_start, event_date_end: draggingEvent.event_date_end }
              : ev
          )
        );

        try {
          await axios.patch(
            `${API_URL}/api/events/${draggingEvent.event_uuid}`,
            {
              DateStart: new Date((draggingEvent.event_date_start.getTime() + 2 * 60 * 60 * 1000)).toISOString(),
              DateEnd: new Date((draggingEvent.event_date_end.getTime() + 2 * 60 * 60 * 1000)).toISOString(),
            },
            {
              headers: {
                'Content-Type': 'application/merge-patch+json',
              },
            }
          );
        } catch (error) {
          console.error('Error updating event:', error);
        }

        setDraggingEvent(null);
        setDragStartY(0);
      }
    };

    throttledMove.current = throttle(handleMove, 100);

    window.addEventListener('mousemove', throttledMove.current);
    window.addEventListener('touchmove', throttledMove.current);
    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('touchend', handleEnd);

    return () => {
      window.removeEventListener('mousemove', throttledMove.current);
      window.removeEventListener('touchmove', throttledMove.current);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [draggingEvent, handleMove]);

  const hours = [...Array(24)].map((_, i) => i.toString().padStart(2, '0') + ':00');

  const handleDelete = (eventUuid: string) => {
    setEvents(events.filter((event) => event.event_uuid !== eventUuid));
  };

  const openPopupWithDefaultEvent = () => {
    setIsEdit(false);
    setPopupOpen(true);
  };

  const handleEventSave = (savedEvent: Event) => {
    setEvents((prevEvents) => {
      if (isEdit) {
        return prevEvents.map((event) => (event.event_uuid === savedEvent.event_uuid ? savedEvent : event));
      } else {
        return [...prevEvents, savedEvent];
      }
    });
    setPopupOpen(false);
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const getCurrentTimePosition = () => {
    const now = new Date();
    const minutesSinceMidnight = now.getHours() * 60 + now.getMinutes();
    const pixelsPerMinute = 80 / 60;
    return minutesSinceMidnight * pixelsPerMinute;
  };

  return (
    <div className="flex">
      <div className="w-2/3">
        <AddEventButton onClick={openPopupWithDefaultEvent} />

        <EventPopup
          popupOpen={popupOpen}
          setPopupOpen={setPopupOpen}
          isEdit={isEdit}
          onSave={handleEventSave}
        />

        <div className="flex items-center justify-between p-4 dark:text-white bg-white shadow dark:border-strokedark dark:bg-boxdark">
          <button
            onClick={() => setCurrentDay(subDays(currentDay, 1))}
            className="px-4 py-2 text-white bg-primary rounded hover:bg-secondary transition duration-300 ease-in-out"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <span className="text-primary dark:text-white font-semibold">
            {currentDay.toLocaleDateString('fr-FR', {
              weekday: 'short',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
          <button
            onClick={() => setCurrentDay(addDays(currentDay, 1))}
            className="px-4 py-2 text-white bg-primary rounded hover:bg-secondary transition duration-300 ease-in-out"
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>

        <div className="relative flex flex-col bg-white shadow dark:border-strokedark dark:bg-boxdark">
          {isToday(currentDay) && (
            <div
              style={{
                position: 'absolute',
                top: `${getCurrentTimePosition()}px`,
                left: 0,
                right: 0,
                height: '2px',
                backgroundColor: 'red',
                zIndex: 10,
              }}
            />
          )}
          {hours.map((hour, index) => (
            <div key={index} className="flex items-center border-t border-gray-200" style={{ height: '80px' }}>
              <span className="text-sm font-medium text-gray-900 px-4">{hour}</span>
              <div className="flex-grow"></div>
            </div>
          ))}
          <EventList
            onDelete={handleDelete}
            events={events}
            draggingEvent={draggingEvent}
            handleLongPress={handleLongPress}
          />
        </div>
      </div>
      <div className="w-1/3 mt-9 p-4">
        <Notes />
      </div>
    </div>
  );
};

export default DayView;

// Helper function for throttling
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}
