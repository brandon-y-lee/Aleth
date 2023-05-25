export interface AppType {
  theme: ThemeEnum;
  showDefaultHeader: boolean;
  stateChanged: boolean;
}

export enum ThemeEnum {
  LIGHT = 'LIGHT',
  DARK = 'DARK',
}
