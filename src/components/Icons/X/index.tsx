import type {IconProps} from '@/components/Icons/types';

const XIcon = ({className, height = 26, width = 21.5}: IconProps) => (
  <svg
    aria-hidden="true"
    className={className}
    fill="none"
    height={height}
    preserveAspectRatio="none"
    style={{display: 'block'}}
    viewBox="0 0 21.5 26"
    width={width}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.25 16L7 13H4L4.375 11.5H7.375L8.125 8.5H5.125L5.5 7H8.5L9.25 4H10.75L10 7H13L13.75 4H15.25L14.5 7H17.5L17.125 8.5H14.125L13.375 11.5H16.375L16 13H13L12.25 16H10.75L11.5 13H8.5L7.75 16H6.25V16M8.875 11.5H11.875L12.625 8.5H9.625L8.875 11.5V11.5"
      fill="#94A3B8"
    />
  </svg>
);

export default XIcon;
