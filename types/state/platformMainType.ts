export interface PlatformMainInitialStateType {
  cards: Card[];
}

export interface Card {
  id: number;
  type: PlatformMainTypeEnum;
  platformMainHeading: string;
  platformMainDescription: string;
  platformButton: string;
}

export enum PlatformMainTypeEnum {
  PLATFORMMAINIMG1 = 'PLATFORMMAINIMG1',
  PLATFORMMAINIMG2 = 'PLATFORMMAINIMG2',
  PLATFORMMAINIMG3 = 'PLATFORMMAINIMG3',
}
