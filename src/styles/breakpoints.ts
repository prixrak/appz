export const SCREEN_WIDTH = {
  MOBILE: 859,
  DESKTOP: 1024,
};

export const BREAKPOINTS = {
  DESKTOP: `@media (min-width: ${SCREEN_WIDTH.DESKTOP}px)`,
  TABLET: `@media (max-width: ${SCREEN_WIDTH.DESKTOP - 1}px)`,
  MOBILE: `@media (max-width: ${SCREEN_WIDTH.MOBILE}px)`,
};
