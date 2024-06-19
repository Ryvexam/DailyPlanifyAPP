import React from 'react';

interface ColorPickerProps {
  colors: string[];
  selectedColor: string;
  onChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ colors, selectedColor, onChange }) => {
  return (
    <div className="mb-5">
      <label className="mb-2.5 block font-medium text-black dark:text-white">Color</label>
      <div className="flex gap-2">
        {colors.map((colorOption) => (
          <button
            key={colorOption}
            type="button"
            className={`w-10 h-10 rounded-full ${selectedColor === colorOption ? 'ring-2 ring-primary' : ''}`}
            style={{ backgroundColor: colorOption }}
            onClick={() => onChange(colorOption)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;
