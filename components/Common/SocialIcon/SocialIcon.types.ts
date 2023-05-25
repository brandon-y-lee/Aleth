export enum SocialMediaType {
  FACEBOOK = 'FACEBOOK',
  TWITTER = 'TWITTER',
  INSTAGRAM = 'INSTAGRAM',
  GITHUB = 'GITHUB',
  LINKEDIN = 'LINKEDIN',
}

export interface IconType {
  type: SocialMediaType;
  height?: number;
  width?: number;
  enableTheme?: boolean;
}

export interface SocialIconType {
  type: SocialMediaType;
  link: string;
  enableTheme?: boolean;
  target?: React.HTMLAttributeAnchorTarget;
  height?: number;
  width?: number;
}
