'use client';

import React, { useState } from 'react';
import { Plus, X, GripVertical } from 'lucide-react';

interface DynamicListInputProps {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
  badgeColor?: string;
}

export function DynamicListInput({
  label,
  items,
  onChange,
  placeholder = 'Add an item and press Enter...',
  badgeColor = '#bbff1bff',
}: DynamicListInputProps) {
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    if (!inputValue.trim()) return;
    onChange([...items, inputValue.trim()]);
    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  const handleRemove = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
          {label} ({items.length})
        </label>
        <span className="text-[11px] text-neutral-500">Press Enter to add</span>
      </div>

      {/* Input row */}
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#bbff1bff] transition-all"
        />
        <button
          type="button"
          onClick={handleAdd}
          className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add</span>
        </button>
      </div>

      {/* Items list */}
      {items.length > 0 && (
        <ul className="space-y-1.5 pt-1">
          {items.map((item, index) => (
            <li
              key={index}
              className="flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-neutral-200 group"
            >
              <div className="flex items-center gap-2 flex-1">
                <span style={{ color: badgeColor }} className="font-bold">•</span>
                <span className="leading-relaxed">{item}</span>
              </div>
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="p-1 rounded-md text-neutral-500 hover:text-red-400 hover:bg-red-500/10 transition-colors opacity-70 group-hover:opacity-100 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
