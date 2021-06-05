import { styled } from '@/lib/stitches.config';

const Background = styled('div', {
  height: '332px',
  top: 0,
  left: 0,
  position: 'absolute',
  transition: 'background 1s ease',
  width: '100%',
  zIndex: -1,

  background: '$homepageIntroBackground',
});

const Overlay = styled(Background, {
  background: '$homepageIntroBackgroundOverlay',
});

export const IntroBackground = () => {
  return (
    <>
      <Background />
      <Overlay />
    </>
  );
};
