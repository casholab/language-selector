import React from 'react';

interface IconProps {
  width?: string;
  height?: string;
  color?: string;
}

export const SearchIcon: React.FC<IconProps> = ({
  width = '24',
  height = '24',
  color = 'currentColor',
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 360 360"
    fill="none"
  >
    <path
      d="M288 162C288 92.4121 231.588 35.9998 162 35.9997C92.4121 35.9997 35.9997 92.4121 35.9997 162C35.9998 231.588 92.4121 288 162 288C231.588 288 288 231.588 288 162ZM324 162C324 200.128 310.827 235.18 288.786 262.852L354.774 329.318C361.778 336.372 361.737 347.77 354.682 354.774C347.627 361.778 336.23 361.737 329.226 354.682L263.382 288.362C235.628 310.658 200.372 324 162 324C72.5299 324 9.79709e-05 251.471 0 162C0 72.5298 72.5298 0 162 0C251.471 9.79946e-05 324 72.5299 324 162Z"
      fill={color}
    />
  </svg>
);

