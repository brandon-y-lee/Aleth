import React from 'react';
import {
  AdvantageCardContainer,
  CardContainer,
  CardDetails,
  CardImgContainer,
  Heading,
  PassportAdvDescription,
  PassportAdvHeading,
  PassportAdvantageContainer,
} from './PassportAdvantage.styles';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { PassportAdvantageTypeEnum } from '../../../types/state/passportAdvantageType';
import Image from 'next/image';
import { PassportAdvantageCardType } from './PassportAdvantage.types';
import passportAdv1 from '../../../assets/passport-adv1.png';
import passportAdv2 from '../../../assets/passport-adv2.png';
import passportAdv3 from '../../../assets/passport-adv3.png';
import passportAdv4 from '../../../assets/passport-adv4.png';

export const PassportAdvantageIcon = ({
  type,
}: {
  type: PassportAdvantageTypeEnum;
}) => {
  switch (type) {
    case PassportAdvantageTypeEnum.PASSPORTADV1:
      return (
        <Image src={passportAdv1} alt="passport-adv-img" placeholder="blur" />
      );
    case PassportAdvantageTypeEnum.PASSPORTADV2:
      return (
        <Image src={passportAdv2} alt="passport-adv-img" placeholder="blur" />
      );
    case PassportAdvantageTypeEnum.PASSPORTADV3:
      return (
        <Image src={passportAdv3} alt="passport-adv-img" placeholder="blur" />
      );
    case PassportAdvantageTypeEnum.PASSPORTADV4:
      return (
        <Image src={passportAdv4} alt="passport-adv-img" placeholder="blur" />
      );
  }
};

function PassportAdvantageCard({ card }: PassportAdvantageCardType) {
  return (
    <>
      <CardContainer>
        <CardImgContainer>
          <PassportAdvantageIcon type={card.type} />
        </CardImgContainer>
        <CardDetails>
          <PassportAdvHeading> {card.passportAdvHeading} </PassportAdvHeading>
          <PassportAdvDescription>
            {card.passportAdvDescription}
          </PassportAdvDescription>
        </CardDetails>
      </CardContainer>
    </>
  );
}

export default function PassportAdvantage() {
  const passportAdvantageInfo = useSelector(
    (state: RootState) => state.passportAdvantageInfo,
  );

  return (
    <>
      <PassportAdvantageContainer>
        <Heading>The Aleth Advantage</Heading>
        <AdvantageCardContainer>
          {passportAdvantageInfo.cards.map((card) => {
            return (
              <div key={card.id}>
                <PassportAdvantageCard card={card} />
              </div>
            );
          })}
        </AdvantageCardContainer>
      </PassportAdvantageContainer>
      ;
    </>
  );
}
