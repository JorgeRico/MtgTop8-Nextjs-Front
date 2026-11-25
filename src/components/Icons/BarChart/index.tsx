import type {IconProps} from '@/components/Icons/types';

const BarChartIcon = ({className = 'size-4 shrink-0'}: IconProps) => (
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
    <path d="M3 3v16a2 2 0 0 0 2 2h16" />
    <rect height="5" rx="0.5" width="3" x="7" y="12" />
    <rect height="9" rx="0.5" width="3" x="12" y="8" />
    <rect height="13" rx="0.5" width="3" x="17" y="4" />
  </svg>
);

export default BarChartIcon;
