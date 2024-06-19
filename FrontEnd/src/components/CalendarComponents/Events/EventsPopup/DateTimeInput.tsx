import React from 'react';
import DateInput from './DateInput.tsx';
import TimeInput from './TimeInput.tsx';

interface DateTimeInputProps {
  label: string;
  dateValue: string;
  timeValue: string;
  onDateChange: (value: string) => void;
  onTimeChange: (value: string) => void;
  required?: boolean;
  readOnly?: boolean;
}

const DateTimeInput: React.FC<DateTimeInputProps> = ({ label, dateValue, timeValue = '00:00', onDateChange, onTimeChange, required, readOnly }) => {
  return (
    <div>
      <label className="mb-2.5 block font-medium text-black dark:text-white">{label}</label>
      <div className="flex space-x-4">
        <DateInput
          label="Date"
          value={dateValue}
          onChange={onDateChange}
          required={required}
          readOnly={readOnly}
        />
        <TimeInput
          label="Time"
          value={timeValue}
          onChange={onTimeChange}
          required={required}
          readOnly={readOnly}
        />
      </div>
    </div>
  );
};

export default DateTimeInput;
