import { gsap } from 'gsap';

import * as variables from '@/shared/scss/common/_variables.scss';

interface DotAnimationProps {
  ctxGsap: React.RefObject<gsap.Context | null>;
  dotRef: React.RefObject<HTMLButtonElement | null>;
  isNeedAnimate: boolean;
}

export const dotAnimation = (props: DotAnimationProps) => {
  const { ctxGsap, dotRef, isNeedAnimate } = props;
  ctxGsap.current?.add(() => {
    gsap.to(dotRef.current, {
      width: isNeedAnimate ? '56px' : '6px',
      height: isNeedAnimate ? '56px' : '6px',
      duration: 0,
      fontSize: isNeedAnimate ? '20px' : '0px',
      background: isNeedAnimate ? variables.background : variables.colorPrimary,
      border: `1px solid ${isNeedAnimate ? variables.dotActve : 'transparent'}`,
    });
  });
};
