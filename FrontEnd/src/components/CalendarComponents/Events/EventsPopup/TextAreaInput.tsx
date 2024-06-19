import React from 'react';

interface TextAreaInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}

const TextAreaInput: React.FC<TextAreaInputProps> = ({ label, value, onChange, placeholder, required }) => {
  return (
    <div className="mb-5">
      <label className="mb-2.5 block font-medium text-black dark:text-white">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-sm border border-stroke bg-white px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-boxdark dark:text-white dark:focus:border-primary"
        required={required}
        rows={5}
      ></textarea>
    </div>
  );
};

export default TextAreaInput;
