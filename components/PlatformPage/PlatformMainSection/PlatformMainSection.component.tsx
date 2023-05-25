import React from 'react';
import {
  CardContainer,
  CardImageContainer,
  LearnMore,
  MainCardContainer,
  MainCardDetails,
  MainContainer,
  MainDescription,
  MainHeading,
} from './PlatformMainSection.styles';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { PlatformMainCardType } from './PlatformMainSection.types';
import Image from 'next/image';
import { PlatformMainTypeEnum } from '../../../types/state/platformMainType';
import platformMainImg1 from '../../../assets/platform-main-img1.png';
import platformMainImg2 from '../../../assets/platform-main-img2.png';
import platformMainImg3 from '../../../assets/platform-main-img1.png';

export const PlatformMainIcon = ({ type }: { type: PlatformMainTypeEnum }) => {
  switch (type) {
    case PlatformMainTypeEnum.PLATFORMMAINIMG1:
      return (
        <Image
          src={platformMainImg1}
          alt="platform-main-img"
          placeholder="blur"
        />
      );
    case PlatformMainTypeEnum.PLATFORMMAINIMG2:
      return (
        <Image
          src={platformMainImg2}
          alt="platform-main-img"
          placeholder="blur"
        />
      );
    case PlatformMainTypeEnum.PLATFORMMAINIMG3:
      return (
        <Image
          src={platformMainImg3}
          alt="platform-main-img"
          placeholder="blur"
        />
      );
  }
};

function PlatformMainCard({ card, id }: PlatformMainCardType) {
  return (
    <>
      <CardContainer cardId={id}>
        <CardImageContainer>
          <PlatformMainIcon type={card.type} />
        </CardImageContainer>
        <MainCardDetails>
          <MainHeading> {card.platformMainHeading} </MainHeading>
          <MainDescription> {card.platformMainDescription} </MainDescription>
          <LearnMore cardId={id}> {card.platformButton} </LearnMore>
        </MainCardDetails>
      </CardContainer>
    </>
  );
}

export default function PlatformMainSection() {
  const platformMainInfo = useSelector(
    (state: RootState) => state.platformMainInfo,
  );

  return (
    <MainContainer>
      <MainCardContainer>
        {platformMainInfo.cards.map((card) => {
          return (
            <div key={card.id}>
              <PlatformMainCard id={card.id} card={card} />
            </div>
          );
        })}
      </MainCardContainer>
    </MainContainer>
  );
}
