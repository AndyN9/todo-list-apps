import { FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  process.env.IMPLEMENTATION = 'typescript-react';
  process.env.IMPLEMENTATION_PRETTY = 'Typescript & React';
}

export default globalSetup;
