import React from 'react';
import { IconType, SocialIconType, SocialMediaType } from './SocialIcon.types';
import { IconWrapper } from './SocialIcon.styles';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import {
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
} from '../../../Icons';

const Icon = ({ type, enableTheme, ...args }: IconType) => {
  const appInfo = useSelector((state: RootState) => state.appInfo);

  switch (type) {
    case SocialMediaType.FACEBOOK:
      return <FacebookIcon {...args} height={32} widths={32} />;
    case SocialMediaType.TWITTER:
      return <TwitterIcon {...args} height={32} widths={32} />;
    case SocialMediaType.INSTAGRAM:
      return <InstagramIcon {...args} height={32} widths={32} />;
    case SocialMediaType.GITHUB:
      return <GithubIcon {...args} height={32} widths={32} />;
    case SocialMediaType.LINKEDIN:
      return <LinkedinIcon {...args} height={32} widths={32} />;
  }
};

export default function SocialIcon({
  type,
  link,
  enableTheme,
  target = '_blank',
  ...args
}: SocialIconType) {
  return (
    <a href={link} target={target}>
      <IconWrapper>
        <Icon {...args} type={type} enableTheme={enableTheme} />
      </IconWrapper>
    </a>
  );
}
