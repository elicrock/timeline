import { gsap } from 'gsap';

import * as variables from '@/shared/scss/common/_variables.scss';

interface DotAnimationProps {
  ctxGsap: React.RefObject<gsap.Context | null>;
  dotRef: React.RefObject<HTMLButtonElement | null>;
  isHover: boolean;
}

export const dotAnimation = (props: DotAnimationProps) => {
  const { ctxGsap, dotRef, isHover } = props;
  ctxGsap.current?.add(() => {
    gsap.to(dotRef.current, {
      width: isHover ? '56px' : '6px',
      height: isHover ? '56px' : '6px',
      duration: 0.1,
      fontSize: isHover ? '20px' : '0px',
      background: isHover ? variables.background : variables.colorPrimary,
      border: `1px solid ${isHover ? 'rgba(48, 62, 88, 0.5)' : 'transparent'}`,
    });
  });
};
