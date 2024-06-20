import React from 'react';

interface TimeInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  readOnly?: boolean;
}

const TimeInput: React.FC<TimeInputProps> = ({ label, value = '00:00', onChange, required, readOnly }) => {
  const handleTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const [currentHour, currentMinute] = value.split(':');
    const newTime = `${event.target.name === 'hour' ? event.target.value : currentHour}:${event.target.name === 'minute' ? event.target.value : currentMinute}`;
    onChange(newTime);
  };

  const [hour, minute] = value.split(':');

  return (
      <div className="flex-1">
        <label className="mb-2.5 block font-medium text-black dark:text-white">{label}</label>
        <div className="flex space-x-2">
          <select
              name="hour"
              value={hour}
              onChange={handleTimeChange}
              className="w-full rounded-sm border border-stroke bg-white px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-boxdark dark:text-white dark:focus:border-primary"
              required={required}
              disabled={readOnly}
          >
            {Array.from({ length: 24 }, (_, i) => (
                <option key={i} value={String(i).padStart(2, '0')}>
                  {String(i).padStart(2, '0')}
                </option>
            ))}
          </select>
          <select
              name="minute"
              value={minute}
              onChange={handleTimeChange}
              className="w-full rounded-sm border border-stroke bg-white px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-boxdark dark:text-white dark:focus:border-primary"
              required={required}
              disabled={readOnly}
          >
            <option value="00">00</option>
            <option value="30">30</option>
          </select>
        </div>
      </div>
  );
};

export default TimeInput;
