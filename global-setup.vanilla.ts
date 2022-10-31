import { FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  process.env.IMPLEMENTATION = 'vanilla';
  process.env.IMPLEMENTATION_PRETTY = 'Vanilla';
}

export default globalSetup;
