import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { resolve, dirname } from 'path';

const ROOT_DIR = resolve(__dirname, '../../');
const ODYSSEY_DIR = dirname(require.resolve('@okta/odyssey/package.json'));

export const config: Config = {
  namespace: 'o-components',
  outputTargets: [
    {
      type: 'dist',
    },
  ],
  plugins: [
    sass({
      includePaths: ['node_modules', resolve(ROOT_DIR, 'node_modules')],
      injectGlobalPaths: [
        resolve(ODYSSEY_DIR, 'src/scss/abstracts/functions'),
        resolve(ODYSSEY_DIR, 'src/scss/abstracts/colors'),
        resolve(ODYSSEY_DIR, 'src/scss/abstracts/tokens'),
        resolve(ODYSSEY_DIR, 'src/scss/abstracts/mixins'),
      ],
    }),
  ],
  testing: {
    snapshotSerializers: ['jest-serializer-html'],
    reporters: ['default', 'jest-junit'],
    coverageDirectory: resolve(process.env.REPORTS_DIR, 'coverage'),
    browserArgs: ['--no-sandbox', '--disable-setuid-sandbox'],
  },
  globalStyle: 'src/globals/all.scss',
};
