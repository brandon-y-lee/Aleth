export interface PassportInitialStateType {
  cards: Card[];
}

export interface Card {
  id: number;
  type: PassportTypeEnum;
  passportHeading: string;
  passportDescription: string;
  passportButtonDetail: string;
}

export enum PassportTypeEnum {
  PASSPORT1 = 'PASSPORT1',
}
