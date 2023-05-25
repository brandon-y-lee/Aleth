export interface MainInitialStateType {
  cards: Card[];
}

export interface Card {
  id: number;
  type: MainTypeEnum;
  mainHeading: string;
  mainDescription: string;
}

export enum MainTypeEnum {
  MAINIMG1 = 'MAINIMG1',
  MAINIMG2 = 'MAINIMG2',
}
