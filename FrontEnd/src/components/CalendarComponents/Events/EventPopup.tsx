import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TextInput from './EventsPopup/TextInput.tsx';
import DateTimeInput from './EventsPopup/DateTimeInput.tsx';
import TextAreaInput from './EventsPopup/TextAreaInput.tsx';
import ColorPicker from './EventsPopup/ColorPicker.tsx';
import API_URL from '../../customenv.tsx';

interface EventPopupProps {
  popupOpen: boolean;
  setPopupOpen: (open: boolean) => void;
  isEdit: boolean;
  onSave: (event: Event) => void;
}

interface Event {
  event_uuid: string;
  event_name: string;
  event_date_start: Date;
  event_date_end: Date;
  event_description: string;
  event_color: string;
}

const EventPopup: React.FC<EventPopupProps> = ({ popupOpen, setPopupOpen, isEdit, onSave }) => {
  const getDefaultDate = () => {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
    const day = currentDate.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  const getDefaultTime = () => {
    const currentDate = new Date();
    currentDate.setMinutes(0);
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const getDefaultEndTime = (startTime) => {
    const [hours, minutes] = startTime.split(':').map(Number);
    const endHours = (hours + 1) % 24;
    return `${endHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  const colors = ['#17BEBB', '#E4572E', '#FFC914', '#2E282A', '#76B041', '#F283B6'];

  const [name, setName] = useState<string>('');
  const [dateStart, setDateStart] = useState<string>(getDefaultDate());
  const [timeStart, setTimeStart] = useState<string>(getDefaultTime());
  const [dateEnd, setDateEnd] = useState<string>(getDefaultDate());
  const [timeEnd, setTimeEnd] = useState<string>(getDefaultEndTime(getDefaultTime()));
  const [description, setDescription] = useState<string>('');
  const [color, setColor] = useState<string>(colors[0]);
  const [uuid, setUuid] = useState<string>('');

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };

      try {
        const response = await axios.get(`${API_URL}/api/me`, config);
        setUuid(response.data.uuid);
      } catch (error) {
        console.error(error);
        return null; // Fetch failed
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    setTimeEnd(getDefaultEndTime(timeStart));
  }, [dateStart, timeStart]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!name) {
      alert("Event name is required");
      return;
    }

    const startDateTime = `${dateStart}T${timeStart}`;
    const endDateTime = `${dateEnd}T${timeEnd}`;

    const eventData = {
      Name: name,
      userUuid: uuid,
      DateStart: startDateTime,
      DateEnd: endDateTime,
      Description: description,
      color: color,
    };

    try {
      let response;
      response = await axios.post(`${API_URL}/api/events`, eventData, {
        headers: {
          'Content-Type': 'application/ld+json',
        },
      });

      if (response.status === 200 || response.status === 201) {
        console.log('Event saved successfully');
        onSave({
          event_uuid: response.data.event_uuid,
          event_name: eventData.Name,
          event_date_start: new Date(eventData.DateStart),
          event_date_end: new Date(eventData.DateEnd),
          event_description: eventData.Description,
          event_color: eventData.color,
        });
        setPopupOpen(false);

      } else {
        console.error('Failed to save event');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div
      className={`fixed left-0 top-0 z-99999 flex h-screen w-full justify-center overflow-y-scroll bg-black/80 px-4 py-5 ${
        popupOpen ? 'block' : 'hidden'
      }`}
    >
      <div className="relative m-auto w-full max-w-180 rounded-sm border border-stroke bg-gray p-4 shadow-default dark:border-strokedark dark:bg-meta-4 sm:p-8 xl:p-10">
        <button
          onClick={() => setPopupOpen(false)}
          className="absolute right-1 top-1 sm:right-5 sm:top-5"
        >
          <svg
            className="fill-current"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.8913 9.99599L19.5043 2.38635C20.032 1.85888 20.032 1.02306 19.5043 0.495589C18.9768 -0.0317329 18.141 -0.0317329 17.6135 0.495589L10.0001 8.10559L2.38673 0.495589C1.85917 -0.0317329 1.02343 -0.0317329 0.495873 0.495589C-0.0318274 1.02306 -0.0318274 1.85888 0.495873 2.38635L8.10887 9.99599L0.495873 17.6056C-0.0318274 18.1331 -0.0318274 18.9689 0.495873 19.4964C0.717307 19.7177 1.05898 19.9001 1.4413 19.9001C1.75372 19.9001 2.13282 19.7971 2.40606 19.4771L10.0001 11.8864L17.6135 19.4964C17.8349 19.7177 18.1766 19.9001 18.5589 19.9001C18.8724 19.9001 19.2531 19.7964 19.5265 19.4737C20.0319 18.9452 20.0245 18.1256 19.5043 17.6056L11.8913 9.99599Z"
              fill=""
            />
          </svg>
        </button>

        <form onSubmit={handleSubmit}>
          <TextInput
            label="Event Name"
            value={name}
            onChange={setName}
            placeholder="Enter event name"
            required
          />
          <DateTimeInput
            label="Start Date and Time"
            dateValue={dateStart}
            timeValue={timeStart}
            onDateChange={setDateStart}
            onTimeChange={setTimeStart}
            required
          />
          <DateTimeInput
            label="End Date and Time"
            dateValue={dateEnd}
            timeValue={timeEnd}
            onDateChange={setDateEnd}
            onTimeChange={setTimeEnd}
            required
          />
          <TextAreaInput
            label="Description"
            value={description}
            onChange={setDescription}
            placeholder="Enter event description"
            required
          />
          <ColorPicker
            colors={colors}
            selectedColor={color}
            onChange={setColor}
          />
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded bg-primary px-4.5 py-2.5 font-medium text-white hover:bg-opacity-90"
          >
            {isEdit ? 'Save Event' : 'Create Event'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventPopup;
