export interface SolutionInitialStateType {
  cards: Card[];
}

export interface Card {
  id: number;
  type: SolutionTypeEnum;
  solutionNumber: string;
  solutionTitle: string;
  solutionDescription: string;
}

export enum SolutionTypeEnum {
  SOLUTION1 = 'SOLUTION1',
  SOLUTION2 = 'SOLUTION2',
  SOLUTION3 = 'SOLUTION3',
}
