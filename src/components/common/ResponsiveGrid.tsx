import React from 'react';

interface ResponsiveGridProps {
  children: React.ReactNode;
  cols?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: number;
}

export const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
  children,
  cols = { sm: 1, md: 2, lg: 3, xl: 4 },
  gap = 6,
}) => {
  const gridCols = `grid-cols-${cols.sm} md:grid-cols-${cols.md} lg:grid-cols-${cols.lg} xl:grid-cols-${cols.xl}`;
  
  return (
    <div className={`grid ${gridCols} gap-${gap}`}>
      {children}
    </div>
  );
};