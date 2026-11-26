import type {ComponentType} from 'react';
import InstagramIcon from '@/components/Icons/Instagram';
import XIcon from '@/components/Icons/X';
import YoutubeIcon from '@/components/Icons/Youtube';
import TwitchIcon from '@/components/Icons/Twitch';
import type {IconProps} from '@/components/Icons/types';

interface SocialLinkType {
  label: string;
  href: string;
  Icon: ComponentType<IconProps>;
  className: string;
  name: string;
  detail: string;
  label_footer: string;
  iconWidth: number;
  iconHeight: number;
  accent: string;
  tint: string;
  nodeId: string;
  class_name: string;
}

const socialLinks: Array<SocialLinkType> = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/legacy.cat/',
    Icon: InstagramIcon,
    className: 'h-social-27-5 w-social-23',
    name: 'Instagram',
    detail: '@legacy.cat',
    label_footer: 'PHOTOS',
    iconWidth: 23,
    iconHeight: 28,
    accent: '#ffb690',
    tint: 'rgba(255, 182, 144, 0.2)',
    nodeId: '40:343',
    class_name: 'social-instagram'
  },
  {
    label: 'X',
    href: 'https://x.com/Lliga_Legacy',
    Icon: XIcon,
    className: 'h-social-26 w-social-21-5',
    name: 'X / Twitter',
    detail: '@Lliga_Legacy',
    label_footer: 'PAIRINGS',
    iconWidth: 23,
    iconHeight: 28,
    accent: '#06b6d4',
    tint: 'rgba(6, 182, 212, 0.2)',
    nodeId: '40:354',
    class_name: 'social-twitter'
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@catmagiclegacy',
    Icon: YoutubeIcon,
    className: 'h-social-26 w-social-23',
    name: 'YouTube',
    detail: 'Match Archives',
    label_footer: 'VODS',
    iconWidth: 23,
    iconHeight: 28,
    accent: '#ef4444',
    tint: 'rgba(239, 68, 68, 0.2)',
    nodeId: '40:332',
    class_name: 'social-youtube'
  },
  {
    label: 'Twitch',
    href: 'https://www.twitch.tv/catmagiclegacy',
    Icon: TwitchIcon,
    className: 'h-social-27-5 w-social-23',
    name: 'Twitch',
    detail: '@catmagiclegacy',
    label_footer: 'STREAM',
    iconWidth: 23,
    iconHeight: 28,
    accent: '#d0bcff',
    tint: 'rgba(208, 188, 255, 0.2)',
    nodeId: '40:321',
    class_name: 'social-twitch'
  }
];

export default socialLinks;
