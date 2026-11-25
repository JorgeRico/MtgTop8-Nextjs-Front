import type {IconProps} from '@/components/Icons/types';

const MapIcon = ({className = 'size-4 shrink-0'}: IconProps) => (
  <svg
    aria-hidden="true"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={1.8}
    viewBox="0 0 24 24"
  >
    <path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z" />
    <path d="M9 3v15" />
    <path d="M15 6v15" />
  </svg>
);

export default MapIcon;
