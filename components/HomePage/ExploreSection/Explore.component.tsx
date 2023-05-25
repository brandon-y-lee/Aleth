import React from 'react';
import {
  Button,
  ButtonContainer,
  CardContainer,
  CardContent,
  CardHeading,
  CardSubHeading,
  ExploreCardSection,
  ExploreContainer,
  ImgContainer,
} from './Explore.styles';
import { RootState } from '../../../redux/store';
import { useSelector } from 'react-redux';
import { ExploreTypeEnum } from '../../../types/state/exploreType';
import { ExploreCardType } from './Explore.types';
import Image from 'next/image';
import exploreImg1 from '../../../assets/explore-img-1.png';
import exploreImg2 from '../../../assets/explore-img-2.png';
import exploreImg3 from '../../../assets/explore-img-3.png';

export const ExploreIcon = ({ type }: { type: ExploreTypeEnum }) => {
  switch (type) {
    case ExploreTypeEnum.EXPLORE1:
      return <Image src={exploreImg1} alt="explore-img" placeholder="blur" />;
    case ExploreTypeEnum.EXPLORE2:
      return <Image src={exploreImg2} alt="explore-img" placeholder="blur" />;
    case ExploreTypeEnum.EXPLORE3:
      return <Image src={exploreImg3} alt="explore-img" placeholder="blur" />;
  }
};

function ExploreCard({ card, id }: ExploreCardType) {
  return (
    <>
      <CardContainer cardId={id}>
        <ImgContainer>
          <ExploreIcon type={card.type} />
        </ImgContainer>
        <CardContent>
          <CardHeading>{card.exploreHeading}</CardHeading>
          <CardSubHeading>{card.exploreSubHeading}</CardSubHeading>
          <ButtonContainer>
            <Button>{card.exploreButtonDetail}</Button>
          </ButtonContainer>
        </CardContent>
      </CardContainer>
    </>
  );
}

export default function Explore() {
  const exploreInfo = useSelector((state: RootState) => state.exploreInfo);
  return (
    <>
      <ExploreContainer>
        <ExploreCardSection>
          {exploreInfo.cards.map((card) => {
            return (
              <div key={card.id}>
                <ExploreCard id={card.id} card={card} />
              </div>
            );
          })}
        </ExploreCardSection>
      </ExploreContainer>
    </>
  );
}
