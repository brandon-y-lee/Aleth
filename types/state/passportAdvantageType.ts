export interface PassportAdvantageInitialStateType {
  cards: Card[];
}

export interface Card {
  id: number;
  type: PassportAdvantageTypeEnum;
  passportAdvHeading: string;
  passportAdvDescription: string;
}

export enum PassportAdvantageTypeEnum {
  PASSPORTADV1 = 'PASSPORTADV1',
  PASSPORTADV2 = 'PASSPORTADV2',
  PASSPORTADV3 = 'PASSPORTADV3',
  PASSPORTADV4 = 'PASSPORTADV4',
}
