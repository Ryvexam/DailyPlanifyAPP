import { jwtDecode } from 'jwt-decode';
import API_URL from '../../customenv.tsx';

interface JwtPayload {
  uuid: string;
}
export const getUuidFromToken = (): string | null => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const decodedToken = jwtDecode<JwtPayload>(token);
    return decodedToken.uuid;
  } catch (error) {
    console.error('Failed to decode JWT', error);
    return null;
  }
};

export interface Event {
  event_uuid: string;
  event_name: string;
  event_date_start: Date;
  event_date_end: Date;
  event_description: string;
  event_color: string;
}

export const fetchEvents = async (): Promise<Event[]> => {
  const userUuid = getUuidFromToken();
  if (!userUuid) {
    throw new Error('User UUID not found');
  }
  const response = await fetch(`${API_URL}/api/user/${userUuid}/events/`);
  if (!response.ok) {
    throw new Error('Failed to fetch events');
  }
  const events = await response.json();
  return events.map((event: any) => ({
    event_uuid: event.event_uuid,
    event_name: event.event_name,
    event_date_start: new Date(event.event_date_start.date), // Assuming the server returns UTC
    event_date_end: new Date(event.event_date_end.date), // Assuming the server returns UTC
    event_description: event.event_description,
    event_color: event.event_color || '#0000FF',
  }));
};

export const eventToICal = (event: Event) => {
  const startDate = new Date(event.event_date_start.toLocaleString('en-US', { timeZone: 'Europe/Paris' }));
  const endDate = new Date(event.event_date_end.toLocaleString('en-US', { timeZone: 'Europe/Paris' }));

  const startDateStr = `${startDate.getFullYear()}${(startDate.getMonth() + 1).toString().padStart(2, '0')}${startDate.getDate().toString().padStart(2, '0')}T${startDate.getUTCHours().toString().padStart(2, '0')}${startDate.getMinutes().toString().padStart(2, '0')}${startDate.getSeconds().toString().padStart(2, '0')}`;
  const endDateStr = `${endDate.getFullYear()}${(endDate.getMonth() + 1).toString().padStart(2, '0')}${endDate.getDate().toString().padStart(2, '0')}T${endDate.getUTCHours().toString().padStart(2, '0')}${endDate.getMinutes().toString().padStart(2, '0')}${endDate.getSeconds().toString().padStart(2, '0')}`;

  return `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART;TZID=Europe/Paris:${startDateStr}
DTEND;TZID=Europe/Paris:${endDateStr}
SUMMARY:${event.event_name}
DESCRIPTION:${event.event_description}
END:VEVENT
END:VCALENDAR`;
};
