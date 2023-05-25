export interface PlatformInitialStateType {
  cards: Card[];
}

export interface Card {
  id: number;
  type: PlatformTypeEnum;
  platformHeading: string;
  platformDescription: string;
  platformButtonDetail: string;
}

export enum PlatformTypeEnum {
  PLATFORM1 = 'PLATFORM1',
}
