import aspectRatio from '@tailwindcss/aspect-ratio';
import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {
      screens: {
        xs: '480px', // Add your desired min-width here
      },
      fontFamily: {
        separat: ['Separat', ...defaultTheme.fontFamily.sans],
      },
      maxWidth: {
        '72': '18rem',
        '96': '24rem',
        '128': '32rem',
        '160': '40rem',
        '192': '48rem',
        '224': '56rem',
        '256': '64rem',
      },
    },
  },

  plugins: [typography, forms, containerQueries, aspectRatio]
} satisfies Config;
