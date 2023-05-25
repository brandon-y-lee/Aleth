export interface BlogInitialStateType {
  cards: Card[];
}

export interface Card {
  id: number;
  type: BlogTypeEnum;
  blogName: string;
  blogDate: string;
  blogDescription: string;
  blogTag: string;
}

export enum BlogTypeEnum {
  BLOG1 = 'BLOG1',
  BLOG2 = 'BLOG2',
  BLOG3 = 'BLOG3',
}
