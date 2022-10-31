import type { PlaywrightTestConfig } from '@playwright/test';
import defaultConfig from "./playwright.config";

const config: PlaywrightTestConfig = {
  ...defaultConfig,
  globalSetup: require.resolve('./global-setup.typescript'),
  webServer: {
    command: 'npm run --prefix ./typescript dev',
    port: 5173,
  },
}

export default config;
