import React from 'react';

interface DateInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  readOnly?: boolean;
}

const DateInput: React.FC<DateInputProps> = ({ label, value, onChange, required, readOnly }) => {
  return (
    <div className="flex-1">
      <label className="mb-2.5 block font-medium text-black dark:text-white">{label}</label>
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-sm border border-stroke bg-white px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-boxdark dark:text-white dark:focus:border-primary"
        required={required}
        readOnly={readOnly}
      />
    </div>
  );
};

export default DateInput;
