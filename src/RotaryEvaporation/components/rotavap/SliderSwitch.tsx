"use client";

import { X, Check } from 'lucide-react';

export default function SliderSwitch({ isChecked, onToggle } : { isChecked: boolean, onToggle: () => void}) {
  return (
    <button
      onClick={onToggle}
      className={`relative w-20 h-10 rounded-full p-1 transition-colors duration-300 focus:outline-none ${
        isChecked ? 'bg-green-100' : 'bg-red-100'
      }`}
      aria-checked={isChecked}
      role="switch"
    >
      <span
        className={`flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
          isChecked ? 'translate-x-10' : ''
        }`}
      >
        <X
          className={`w-5 h-5 absolute transition-opacity duration-300 ${
            isChecked ? 'opacity-0' : 'opacity-100 text-red-500'
          }`}
        />
        <Check
          className={`w-5 h-5 absolute transition-opacity duration-300 ${
            isChecked ? 'opacity-100 text-green-500' : 'opacity-0'
          }`}
        />
      </span>
      <span className="sr-only">{isChecked ? 'Enabled' : 'Disabled'}</span>
    </button>
  );
}
