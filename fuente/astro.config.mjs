import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { unified } from '@astrojs/markdown-remark';

export default defineConfig({
  site: 'https://gabibertero.github.io',
  outDir: '../docs', // NUNCA '../' ni la raíz: Astro vacía outDir y borraría .git
  base: '/AGA/',
  output: 'static',
  build: { assets: 'assets-astro' }, // sin guion bajo: Jekyll ignora carpetas con _
  integrations: [mdx()],
  markdown: {
    processor: unified({ remarkPlugins: [remarkMath], rehypePlugins: [rehypeKatex] }),
  },
});
