import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

declare const process: {
  env: {
    CHROME_BIN: string,
  }
};

export const config: Config = {
  namespace: 'movie-database-components',
  globalScript: './src/globals/global.ts',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader'
    },
    {
      type: 'docs-readme'
    },
    {
      type: 'www',
      serviceWorker: null // disable service workers
    }
  ],
  plugins: [
    sass(),
  ],
  testing: {
    browserArgs: ['--no-sandbox', '--headless', '--disable-gpu', '--disable-dev-shm-usage'],
    browserExecutablePath: process.env.CHROME_BIN || null,
    browserHeadless: true,
  },
};
