import React from 'react';

interface IconProps {
  width?: string;
  height?: string;
  color?: string;
}

export const ChevronDownIcon: React.FC<IconProps> = ({
  width = '24',
  height = '24',
  color = 'currentColor',
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

