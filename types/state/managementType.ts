export interface ManagementInitialStateType {
  cards: Card[];
}

export interface Card {
  id: number;
  type: ManagementTypeEnum;
  managementHeading: string;
  managementDescription: string;
}

export enum ManagementTypeEnum {
  MANAGEMENTIMG1 = 'MANAGEMENTIMG1',
  MANAGEMENTIMG2 = 'MANAGEMENTIMG2',
}
