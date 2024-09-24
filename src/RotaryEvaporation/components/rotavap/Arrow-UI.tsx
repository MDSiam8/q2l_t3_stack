import React from 'react'

type ArrowDirection = 'up' | 'down' | 'left' | 'right'

interface ArrowProps {
  direction?: ArrowDirection
  size?: 'small' | 'medium' | 'large'
  color?: string
  strokeWidth?: number
}

export default function Arrow({
  direction = 'right',
  size = 'medium',
  color = 'currentColor',
  strokeWidth = 2,
}: ArrowProps) {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-6 h-6',
    large: 'w-8 h-8',
  }

  const directionTransform = {
    up: 'rotate-90',
    down: '-rotate-90',
    left: 'rotate-180',
    right: '',
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke={color}
      className={`${sizeClasses[size]} ${directionTransform[direction]} transition-transform duration-200`}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
      />
    </svg>
  )
}