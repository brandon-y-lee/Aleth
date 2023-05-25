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
} from './ProductPassport.styles';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { PassportCardType } from './ProductPassport.types';
import { PassportTypeEnum } from '../../../types/state/passportType';
import Image from 'next/image';
import passportImg1 from '../../../assets/passport-img.png';

export const PassportIcon = ({ type }: { type: PassportTypeEnum }) => {
  switch (type) {
    case PassportTypeEnum.PASSPORT1:
      return <Image src={passportImg1} alt="passport-img" placeholder="blur" />;
  }
};

function PassportCard({ card }: PassportCardType) {
  return (
    <>
      <CardContainer>
        <CardDetails>
          <HeadingDetails>
            <PaasportHeading>{card.passportHeading}</PaasportHeading>
            <PassportDescription>
              {card.passportDescription}
            </PassportDescription>
          </HeadingDetails>
          <ButtonContainer>
            <PassportButton>{card.passportButtonDetail}</PassportButton>
          </ButtonContainer>
        </CardDetails>
        <ImageContainer>
          <PassportIcon type={card.type} />
        </ImageContainer>
      </CardContainer>
    </>
  );
}

export default function ProductPassport() {
  const passportInfo = useSelector((state: RootState) => state.passportInfo);
  return (
    <>
      <ProductPassportContainer>
        <ProductPassportCard>
          {passportInfo.cards.map((card) => {
            return (
              <div key={card.id}>
                <PassportCard card={card} />
              </div>
            );
          })}
        </ProductPassportCard>
      </ProductPassportContainer>
    </>
  );
}
