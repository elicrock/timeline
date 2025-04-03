import { gsap } from 'gsap';

interface CircleAnimationProps {
  ctxGsap: React.RefObject<gsap.Context | null>;
  circleRef: React.RefObject<HTMLDivElement | null>;
  totalDots: number;
  currentYearIndex: number;
  onStart?: () => void;
  onComplete?: () => void;
}

export const circleAnimation = (props: CircleAnimationProps) => {
  const { ctxGsap, circleRef, totalDots, currentYearIndex, onStart, onComplete } = props;

  ctxGsap.current?.add(() => {
    gsap.to(circleRef.current, {
      duration: 1,
      rotate: (-360 / totalDots) * currentYearIndex,
      onStart,
      onComplete,
    });
  });
};
