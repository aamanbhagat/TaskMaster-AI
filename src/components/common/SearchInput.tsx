import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@progress/kendo-react-inputs';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = 'Search...',
  className = '',
}) => {
  return (
    <div className={`relative ${className}`}>
      <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
      <Input
        className="pl-10"
        value={value}
        onChange={(e) => onChange(e.value)}
        placeholder={placeholder}
      />
    </div>
  );
};