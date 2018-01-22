const ANIMATION_KEYFRAME_ID = `wave-audio-${Math.floor(Math.random() * 100)}`;
const ANIMATION_DELAY = 1.5; // second
const ITEM_BASE_DURATION = 0.2;
const ITEM_BASE_WIDTH = 5;
const ITEM_BASE_HEIGHT = 5;
const ITEM_BASE_MARGIN = 1;

export default ({ palette }) => ({
  container: {
    position: 'relative',
    '& span': {
      display: 'block',
      position: 'absolute',
      bottom: 0,
      width: ITEM_BASE_WIDTH,
      height: ITEM_BASE_HEIGHT,
      background: palette.white,
      animation: `${ANIMATION_KEYFRAME_ID} ${ANIMATION_DELAY}s infinite ease-in-out`,
    },
    '& span:nth-child(2)': {
      left: ITEM_BASE_WIDTH + ITEM_BASE_MARGIN,
      animationDelay: `${ITEM_BASE_DURATION}s`,
    },

    '& span:nth-child(3)': {
      left: (ITEM_BASE_WIDTH + ITEM_BASE_MARGIN) * 2,
      animationDelay: `${ITEM_BASE_DURATION * 2}s`,
    },

    '& span:nth-child(4)': {
      left: (ITEM_BASE_WIDTH + ITEM_BASE_MARGIN) * 3,
      animationDelay: `${ITEM_BASE_DURATION * 3}s`,
    },

    '& span:nth-child(5)': {
      left: (ITEM_BASE_WIDTH + ITEM_BASE_MARGIN) * 4,
      animationDelay: `${ITEM_BASE_DURATION * 4}s`,
    },
  },
  [`@keyframes ${ANIMATION_KEYFRAME_ID}`]: {
    '0%': {
      height: ITEM_BASE_HEIGHT,
      transform: `translateY(${0}px)`,
      background: palette.white,
    },
    '25%': {
      height: (ITEM_BASE_HEIGHT + ITEM_BASE_MARGIN) * 4,
      transform: `translateY(${ITEM_BASE_HEIGHT * 2}px)`,
      background: palette.white, // main playing animation
    },
    /* effect is to animate the height of each span from 5px to 30px */
    /* translateY makes Y axis move down to give the effect that it is growing from the center */
    '50%': {
      height: ITEM_BASE_HEIGHT,
      transform: `translateY(${0}px)`,
      background: palette.white,
    },
    '100%': {
      height: ITEM_BASE_HEIGHT,
      transform: `translateY(${0}px)`,
      background: palette.white,
    },
  },
});
