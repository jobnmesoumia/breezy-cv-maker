
import React from 'react';
import { Button } from '@/components/ui/button';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

const colors = [
  '#2563eb', // Blue
  '#16a34a', // Green
  '#dc2626', // Red
  '#7c3aed', // Purple
  '#ea580c', // Orange
  '#9b87f5', // Primary Purple
  '#7E69AB', // Secondary Purple
  '#D946EF', // Magenta Pink
  '#0EA5E9', // Ocean Blue
  '#F97316', // Bright Orange
  '#8E9196', // Neutral Gray
  '#000000', // Black
];

const ColorPicker: React.FC<ColorPickerProps> = ({ color, onChange }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {colors.map((c) => (
        <Button
          key={c}
          className={`w-8 h-8 rounded-full p-0 ${
            color === c ? 'ring-2 ring-offset-2 ring-black' : ''
          }`}
          style={{ backgroundColor: c }}
          onClick={() => onChange(c)}
        />
      ))}
    </div>
  );
};

export default ColorPicker;
