import React from 'react';
import {
  AdvantageCardContainer,
  CardContainer,
  CardDetails,
  CardImgContainer,
  Header,
  PlatformAdvantageContainer,
  PlatformAdvantageDescription,
  PlatformAdvantageHeader,
} from './PlatformAdvantage.styles';
import { RootState } from '../../../redux/store';
import { useSelector } from 'react-redux';
import { PlatformAdvantageCardType } from './PlatformAdvantage.types';
import Image from 'next/image';
import { PlatformAdvantageTypeEnum } from '../../../types/state/platformAdvantageType';
import platformAdv1 from '../../../assets/platform-adv1.png';
import platformAdv2 from '../../../assets/platform-adv2.png';
import platformAdv3 from '../../../assets/platform-adv3.png';
import platformAdv4 from '../../../assets/platform-adv4.png';

export const PlatformAdvantageIcon = ({
  type,
}: {
  type: PlatformAdvantageTypeEnum;
}) => {
  switch (type) {
    case PlatformAdvantageTypeEnum.PLATFORMADV1:
      return (
        <Image src={platformAdv1} alt="platform-adv-img" placeholder="blur" />
      );
    case PlatformAdvantageTypeEnum.PLATFORMADV2:
      return (
        <Image src={platformAdv2} alt="platform-adv-img" placeholder="blur" />
      );
    case PlatformAdvantageTypeEnum.PLATFORMADV3:
      return (
        <Image src={platformAdv3} alt="platform-adv-img" placeholder="blur" />
      );
    case PlatformAdvantageTypeEnum.PLATFORMADV4:
      return (
        <Image src={platformAdv4} alt="platform-adv-img" placeholder="blur" />
      );
  }
};

function PlatformAdvantageCard({ card }: PlatformAdvantageCardType) {
  return (
    <>
      <CardContainer>
        <CardImgContainer>
          <PlatformAdvantageIcon type={card.type} />
        </CardImgContainer>
        <CardDetails>
          <PlatformAdvantageHeader>
            {card.platformAdvHeading}
          </PlatformAdvantageHeader>
          <PlatformAdvantageDescription>
            {card.platformAdvDescription}
          </PlatformAdvantageDescription>
        </CardDetails>
      </CardContainer>
    </>
  );
}

export default function PlatformAdvantage() {
  const platformAdvantageInfo = useSelector(
    (state: RootState) => state.platformAdvantageInfo,
  );

  return (
    <PlatformAdvantageContainer>
      <Header>The Aleth Advantage</Header>
      <AdvantageCardContainer>
        {platformAdvantageInfo.cards.map((card) => {
          return (
            <div key={card.id}>
              <PlatformAdvantageCard card={card} />
            </div>
          );
        })}
      </AdvantageCardContainer>
    </PlatformAdvantageContainer>
  );
}
