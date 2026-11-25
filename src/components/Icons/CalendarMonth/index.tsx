import type {IconProps} from '@/components/Icons/types';

const CalendarMonthIcon = ({className = 'size-[18px] shrink-0'}: IconProps) => (
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
    <rect height="18" rx="2" width="18" x="3" y="4" />
    <path d="M8 2v4" />
    <path d="M16 2v4" />
    <path d="M3 10h18" />
  </svg>
);

export default CalendarMonthIcon;
