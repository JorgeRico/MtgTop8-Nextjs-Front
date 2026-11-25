import type {IconProps} from '@/components/Icons/types';

const LayersIcon = ({className = 'size-4 shrink-0'}: IconProps) => (
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
    <path d="m12 2 9 5-9 5-9-5 9-5Z" />
    <path d="m3 12 9 5 9-5" />
    <path d="m3 17 9 5 9-5" />
  </svg>
);

export default LayersIcon;
