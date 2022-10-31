import type { PlaywrightTestConfig } from '@playwright/test';
import defaultConfig from "./playwright.config";

const config: PlaywrightTestConfig = {
  ...defaultConfig,
  globalSetup: require.resolve('./global-setup.vanilla'),
  webServer: {
    command: 'npm run --prefix ./vanilla dev',
    port: 5173,
  },
}

export default config;
