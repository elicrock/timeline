import { gsap } from 'gsap';

interface YearAnimationProps {
  ctxGsap: React.RefObject<gsap.Context | null>;
  yearRef: React.RefObject<HTMLSpanElement | null>;
  year: number;
}

export const yearAnimation = (props: YearAnimationProps) => {
  const { ctxGsap, yearRef, year } = props;
  ctxGsap.current?.add(() => {
    gsap.to(yearRef.current, {
      innerHTML: year,
      duration: 1,
      roundProps: 'innerHTML',
    });
  });
};
