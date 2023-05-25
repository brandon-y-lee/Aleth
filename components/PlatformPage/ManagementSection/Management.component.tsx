import React from 'react';
import {
  CardContainer,
  CardDescription,
  CardDetails,
  CardHeader,
  CardImgContainer,
  ManagementCardContainer,
  ManagementContainer,
} from './Management.styles';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { ManagementCardType } from './Management.types';
import { ManagementTypeEnum } from '../../../types/state/managementType';
import Image from 'next/image';
import managementImg1 from '../../../assets/management-img1.png';
import managementImg2 from '../../../assets/management-img2.png';

export const ManagementIcon = ({ type }: { type: ManagementTypeEnum }) => {
  switch (type) {
    case ManagementTypeEnum.MANAGEMENTIMG1:
      return (
        <Image src={managementImg1} alt="management-img" placeholder="blur" />
      );
    case ManagementTypeEnum.MANAGEMENTIMG2:
      return (
        <Image src={managementImg2} alt="management-img" placeholder="blur" />
      );
  }
};

function ManagementCard({ card }: ManagementCardType) {
  return (
    <>
      <CardContainer>
        <CardHeader> {card.managementHeading} </CardHeader>
        <CardDetails>
          <CardImgContainer>
            <ManagementIcon type={card.type} />
          </CardImgContainer>
          <CardDescription> {card.managementDescription} </CardDescription>
        </CardDetails>
      </CardContainer>
    </>
  );
}

export default function Management() {
  const managementInfo = useSelector(
    (state: RootState) => state.managementInfo,
  );

  return (
    <ManagementContainer>
      <ManagementCardContainer>
        {managementInfo.cards.map((card) => {
          return (
            <div key={card.id}>
              <ManagementCard id={card.id} card={card} />
            </div>
          );
        })}
      </ManagementCardContainer>
    </ManagementContainer>
  );
}
