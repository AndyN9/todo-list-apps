import type { PlaywrightTestConfig } from '@playwright/test';
import defaultConfig from "./playwright.config";

const config: PlaywrightTestConfig = {
  ...defaultConfig,
  globalSetup: require.resolve('./global-setup.typescript-react'),
  webServer: {
    command: 'npm run --prefix ./typescript-react dev',
    port: 5173,
  },
}

export default config;
