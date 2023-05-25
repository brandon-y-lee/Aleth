import React from 'react';
import {
  CardContainer,
  CardSection,
  Heading,
  ImageContainer,
  SolutionContainer,
  SolutionContent,
  SolutionDescription,
  SolutionDetails,
  SolutionHeader,
  SolutionTitle,
} from './Solution.styles';
import { SolutionCardType } from './Solution.types';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import Image from 'next/image';
import solutionImg1 from '../../../assets/solution-img-1.png';
import solutionImg2 from '../../../assets/solution-img-2.png';
import solutionImg3 from '../../../assets/solution-img-3.png';
import { SolutionTypeEnum } from '../../../types/state/solutionType';

export const SolutionIcon = ({ type }: { type: SolutionTypeEnum }) => {
  switch (type) {
    case SolutionTypeEnum.SOLUTION1:
      return <Image src={solutionImg1} alt="solution-img" placeholder="blur" />;
    case SolutionTypeEnum.SOLUTION2:
      return <Image src={solutionImg2} alt="solution-img" placeholder="blur" />;
    case SolutionTypeEnum.SOLUTION3:
      return <Image src={solutionImg3} alt="solution-img" placeholder="blur" />;
  }
};

function SolutionCard({ card, id }: SolutionCardType) {
  return (
    <>
      <CardContainer cardId={id}>
        <ImageContainer>
          <SolutionIcon type={card.type} />
        </ImageContainer>
        <SolutionDetails>
          <SolutionTitle>{card.solutionTitle}</SolutionTitle>
          <SolutionDescription>{card.solutionDescription}</SolutionDescription>
        </SolutionDetails>
      </CardContainer>
    </>
  );
}

export default function Solution() {
  const solutionInfo = useSelector((state: RootState) => state.solutionInfo);
  return (
    <>
      <SolutionContainer>
        <SolutionContent>
          <SolutionHeader>
            <Heading>Explore Our Solutions</Heading>
          </SolutionHeader>
          <CardSection>
            {solutionInfo.cards.map((card) => {
              return (
                <div key={card.id}>
                  <SolutionCard id={card.id} card={card} />
                </div>
              );
            })}
          </CardSection>
        </SolutionContent>
      </SolutionContainer>
    </>
  );
}
