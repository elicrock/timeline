import { gsap } from 'gsap';

interface DotAnimationProps {
  ctxGsap: React.RefObject<gsap.Context | null>;
  circleRef: React.RefObject<HTMLDivElement | null>;
  totalDots: number;
  currentYearIndex: number;
  onComplete?: () => void;
}

export const circleAnimation = (props: DotAnimationProps) => {
  const { ctxGsap, circleRef, totalDots, currentYearIndex, onComplete } = props;

  ctxGsap.current?.add(() => {
    gsap.to(circleRef.current, {
      duration: 1,
      rotate: (-360 / totalDots) * currentYearIndex,
      onComplete,
    });
  });
};
