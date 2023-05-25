export interface ExploreInitialStateType {
  cards: Card[];
}

export interface Card {
  id: number;
  type: ExploreTypeEnum;
  exploreHeading: string;
  exploreSubHeading: string;
  exploreButtonDetail: string;
}

export enum ExploreTypeEnum {
  EXPLORE1 = 'EXPLORE1',
  EXPLORE2 = 'EXPLORE2',
  EXPLORE3 = 'EXPLORE3',
}
