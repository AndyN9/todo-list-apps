import { FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  process.env.IMPLEMENTATION = 'typescript';
  process.env.IMPLEMENTATION_PRETTY = 'Typescript';
}

export default globalSetup;
