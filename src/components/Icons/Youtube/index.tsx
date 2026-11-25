import type {IconProps} from '@/components/Icons/types';

const YoutubeIcon = ({className, height = 26, width = 23}: IconProps) => (
  <svg
    aria-hidden="true"
    className={className}
    fill="none"
    height={height}
    preserveAspectRatio="none"
    style={{display: 'block'}}
    viewBox="0 0 23 26"
    width={width}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.625 13.375L14.875 10L9.625 6.625V13.375V13.375M5.5 16C5.0875 16 4.73438 15.8531 4.44063 15.5594C4.14688 15.2656 4 14.9125 4 14.5V5.5C4 5.0875 4.14688 4.73438 4.44063 4.44063C4.73438 4.14688 5.0875 4 5.5 4H17.5C17.9125 4 18.2656 4.14688 18.5594 4.44063C18.8531 4.73438 19 5.0875 19 5.5V14.5C19 14.9125 18.8531 15.2656 18.5594 15.5594C18.2656 15.8531 17.9125 16 17.5 16H5.5V16M5.5 14.5H17.5V14.5V14.5V5.5V5.5V5.5H5.5V5.5V5.5V14.5V14.5V14.5V14.5M5.5 14.5V14.5V14.5V5.5V5.5V5.5V5.5V5.5V5.5V14.5V14.5V14.5V14.5V14.5"
      fill="#94A3B8"
    />
  </svg>
);

export default YoutubeIcon;
