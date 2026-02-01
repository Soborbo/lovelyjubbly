import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://lovelyjubblyremovals.co.uk',
  integrations: [tailwind()],
  trailingSlash: 'always',
});
