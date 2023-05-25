import React from 'react';
import {
  CardContainer,
  CardImageContainer,
  MainCardContainer,
  MainCardDetails,
  MainContainer,
  MainDescription,
  MainHeading,
} from './MainSection.styles';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { MainCardType } from './MainSection.types';
import { MainTypeEnum } from '../../../types/state/mainType';
import Image from 'next/image';
import mainImg1 from '../../../assets/main-img1.png';
import mainImg2 from '../../../assets/main-img2.png';

export const MainIcon = ({ type }: { type: MainTypeEnum }) => {
  switch (type) {
    case MainTypeEnum.MAINIMG1:
      return <Image src={mainImg1} alt="main-img" placeholder="blur" />;
    case MainTypeEnum.MAINIMG2:
      return <Image src={mainImg2} alt="main-img" placeholder="blur" />;
  }
};

function MainCard({ card, id }: MainCardType) {
  return (
    <>
      <CardContainer cardId={id}>
        <CardImageContainer>
          <MainIcon type={card.type} />
        </CardImageContainer>
        <MainCardDetails>
          <MainHeading> {card.mainHeading} </MainHeading>
          <MainDescription> {card.mainDescription} </MainDescription>
        </MainCardDetails>
      </CardContainer>
    </>
  );
}

export default function MainSection() {
  const mainInfo = useSelector((state: RootState) => state.mainInfo);

  return (
    <MainContainer>
      <MainCardContainer>
        {mainInfo.cards.map((card) => {
          return (
            <div key={card.id}>
              <MainCard id={card.id} card={card} />
            </div>
          );
        })}
      </MainCardContainer>
    </MainContainer>
  );
}
