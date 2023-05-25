import React from 'react';
import {
  ButtonContainer,
  CardContainer,
  CardDetails,
  HeadingDetails,
  ImageContainer,
  PaasportHeading,
  PassportButton,
  PassportDescription,
  ProductPassportCard,
  ProductPassportContainer,
} from './Platform.styles';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { PlatformCardType } from './Platform.types';
import Image from 'next/image';
import platformImg1 from '../../../assets/passport-img.png';
import { PlatformTypeEnum } from '../../../types/state/platformType';

export const PlatformIcon = ({ type }: { type: PlatformTypeEnum }) => {
  switch (type) {
    case PlatformTypeEnum.PLATFORM1:
      return <Image src={platformImg1} alt="platform-img" placeholder="blur" />;
  }
};

function PlatformCard({ card }: PlatformCardType) {
  return (
    <>
      <CardContainer>
        <CardDetails>
          <HeadingDetails>
            <PaasportHeading>{card.platformHeading}</PaasportHeading>
            <PassportDescription>
              {card.platformDescription}
            </PassportDescription>
          </HeadingDetails>
          <ButtonContainer>
            <PassportButton>{card.platformButtonDetail}</PassportButton>
          </ButtonContainer>
        </CardDetails>
        <ImageContainer>
          <PlatformIcon type={card.type} />
        </ImageContainer>
      </CardContainer>
    </>
  );
}

export default function Platform() {
  const platformInfo = useSelector((state: RootState) => state.platformInfo);
  return (
    <>
      <ProductPassportContainer>
        <ProductPassportCard>
          {platformInfo.cards.map((card) => {
            return (
              <div key={card.id}>
                <PlatformCard card={card} />
              </div>
            );
          })}
        </ProductPassportCard>
      </ProductPassportContainer>
    </>
  );
}
