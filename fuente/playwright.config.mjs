import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testMatch: '*.spec.mjs',
  use: { baseURL: 'http://localhost:4321/AGA/' },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'celular', use: { ...devices['Pixel 7'] } },
  ],
  webServer: {
    command: 'npm run build && npx astro preview --ignore-lock',
    url: 'http://localhost:4321/AGA/',
    reuseExistingServer: true,
  },
});
