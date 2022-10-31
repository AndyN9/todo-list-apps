import { FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  process.env.IMPLEMENTATION = 'react';
  process.env.IMPLEMENTATION_PRETTY = 'React';
}

export default globalSetup;
