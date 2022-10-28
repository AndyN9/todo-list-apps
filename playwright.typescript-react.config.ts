import type { PlaywrightTestConfig } from '@playwright/test';
import defaultConfig from "./playwright.config";

const config: PlaywrightTestConfig = {
  ...defaultConfig,
  webServer: {
    command: 'npm run --prefix ./typescript-react dev',
    port: 5173,
  },
}

export default config;
