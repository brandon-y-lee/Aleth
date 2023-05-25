import React from 'react';
import {
  BlogCardSection,
  BlogContainer,
  BlogContent,
  BlogHeader,
  BlogWrapper,
  ButtonSection,
  CardContainer,
  CardDetails,
  DateDetails,
  DescriptionContainer,
  Heading,
  ImgContainer,
  MoreButton,
  NameDetails,
  NameandDateContainer,
  Tagcontainer,
} from './Blog.styles';
import { BlogCardType } from './Blog.types';
import { RootState } from '../../../redux/store';
import { useSelector } from 'react-redux';
import { BlogTypeEnum } from '../../../types/state/blogType';
import Image from 'next/image';
import blogImg1 from '../../../assets/blog-img-1.png';
import blogImg2 from '../../../assets/blog-img-2.png';
import blogImg3 from '../../../assets/blog-img-3.png';

export const BlogIcon = ({ type }: { type: BlogTypeEnum }) => {
  switch (type) {
    case BlogTypeEnum.BLOG1:
      return <Image src={blogImg1} alt="blog-image" />;
    case BlogTypeEnum.BLOG2:
      return <Image src={blogImg2} alt="blog-image" />;
    case BlogTypeEnum.BLOG3:
      return <Image src={blogImg3} alt="blog-image" />;
  }
};

function BlogCard({ card }: BlogCardType) {
  return (
    <>
      <CardContainer>
        <ImgContainer>
          <BlogIcon type={card.type} />
        </ImgContainer>
        <CardDetails>
          <NameandDateContainer>
            <NameDetails>{card.blogName}-</NameDetails>
            <DateDetails>{card.blogDate}</DateDetails>
          </NameandDateContainer>
          <DescriptionContainer>{card.blogDescription}</DescriptionContainer>
          <Tagcontainer>{card.blogTag}</Tagcontainer>
        </CardDetails>
      </CardContainer>
    </>
  );
}

export default function Blog() {
  const blogInfo = useSelector((state: RootState) => state.blogInfo);

  return (
    <>
      <BlogContainer id="blog">
        <BlogWrapper>
          <BlogHeader>
            <Heading>Latest News</Heading>
          </BlogHeader>
          <BlogContent>
            <BlogCardSection>
              {blogInfo.cards.map((card) => (
                <BlogCard key={card.id} card={card} />
              ))}
            </BlogCardSection>
          </BlogContent>
        </BlogWrapper>
        <ButtonSection>
          <MoreButton>READ MORE</MoreButton>
        </ButtonSection>
      </BlogContainer>
    </>
  );
}
