import { globalCss } from '@/lib/stitches.config';

export const globalStyles = globalCss({
  // https://web.dev/prefers-reduced-motion/
  // "@media (prefers-reduced-motion: reduce)": {
  //   "*, ::before, ::after": {
  //     animation-delay: -1ms !important;
  //     animation-duration: 1ms !important;
  //     animation-iteration-count: 1 !important;
  //     background-attachment: initial !important;
  //     scroll-behavior: auto !important;
  //     transition-duration: 0s !important;
  //     transition-delay: 0s !important;
  //   }
  // },
  'html, body': {
    height: '100%',
    width: '100%',
    '-webkit-font-smoothing': 'antialiased',
    '-moz-osx-font-smoothing': 'grayscale',
    '& > #__next': {
      height: '100%',
      width: '100%',
    },
  },
  body: {
    background: '$backgroundBase',
    color: '$textSubdued',
    fontFamily: '$fontDefault',
    minHeight: '600px',
    minWidth: '768px',
  },
  'ol, ul': {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  a: {
    color: '$textBase',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },

  '@font-face': [
    {
      fontFamily: 'Plus Jakarta Sans',
      src: "url('/fonts/PlusJakartaSans-Regular.woff2') format('woff2')",
      fontWeight: 400,
      fontStyle: 'normal',
    },
    {
      fontFamily: 'Plus Jakarta Sans',
      src: "url('/fonts/PlusJakartaSans-Bold.woff2') format('woff2')",
      fontWeight: 700,
      fontStyle: 'normal',
    },
    {
      fontFamily: 'Plus Jakarta Sans',
      src: "url('/fonts/PlusJakartaSans-ExtraBold.woff2') format('woff2')",
      fontWeight: 900,
      fontStyle: 'normal',
    },
    {
      fontFamily: 'Plus Jakarta Sans VF',
      src: "url('/fonts/PlusJakartaSans-VF.woff2') format('woff2')",
      fontWeight: '125 950',
      fontStyle: 'normal',
      fontStretch: '75% 125%',
    },
    {
      fontFamily: 'Plus Jakarta Sans VF',
      src: "url('/fonts/PlusJakartaSans-Italic-VF.woff2') format('woff2')",
      fontWeight: '125 950',
      fontStyle: 'italic',
      fontStretch: '75% 125%',
    },
  ],
});
