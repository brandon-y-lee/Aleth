export interface PlatformAdvantageInitialStateType {
  cards: Card[];
}

export interface Card {
  id: number;
  type: PlatformAdvantageTypeEnum;
  platformAdvHeading: string;
  platformAdvDescription: string;
}

export enum PlatformAdvantageTypeEnum {
  PLATFORMADV1 = 'PLATFORMADV1',
  PLATFORMADV2 = 'PLATFORMADV2',
  PLATFORMADV3 = 'PLATFORMADV3',
  PLATFORMADV4 = 'PLATFORMADV4',
}
