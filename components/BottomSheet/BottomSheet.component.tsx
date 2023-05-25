import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
  Backdrop,
  BottomSheetContent,
  BottomSheetWrapper,
  Heading,
  HeadingWrapper,
  InternalBSWrapper,
} from './BottomSheet.styles';
import { BottomSheetTypes } from './BottomSheet.types';
import { Cross } from '../../Icons';
import { animated, useTransition } from 'react-spring';
import { TypographyEnum } from '../../styles/GlobalTheme';

const AnimatedBottomSheetContent = animated(BottomSheetContent);
const AnimatedBackdrop = animated(Backdrop);

export default function BottomSheet({
  heading,
  show,
  onClose,
  // font = TypographyEnum.SORA,
  onBackdropClick,
  fullScreen,
  background,
  children,
}: BottomSheetTypes) {
  const transitions = useTransition(show, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  useEffect(() => {
    if (show) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
  }, [show]);

  if (typeof window !== 'undefined')
    return ReactDOM.createPortal(
      <>
        {transitions(
          (style, isShown) =>
            isShown && (
              <BottomSheetWrapper>
                <InternalBSWrapper>
                  <AnimatedBackdrop
                    style={{ opacity: style.opacity }}
                    onClick={onBackdropClick}
                  />
                  <AnimatedBottomSheetContent
                    style={style}
                    fullScreen={fullScreen}
                    background={background}
                  >
                    <HeadingWrapper>
                      {/* <Heading>{heading}</Heading> */}
                      <Cross width={32} height={32} onClick={onClose} />
                    </HeadingWrapper>
                    {children}
                  </AnimatedBottomSheetContent>
                </InternalBSWrapper>
              </BottomSheetWrapper>
            ),
        )}
      </>,
      document.body,
    );
  return null;
}
