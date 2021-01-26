import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { resolve, dirname } from 'path';

const ROOT_DIR = resolve(__dirname, '../../../');
const ODYSSEY_DIR = dirname(require.resolve('@okta/odyssey-css-core/package.json'));

export const config: Config = {
  namespace: 'ods-components',
  outputTargets: [
    {
      type: 'dist',
    },
  ],
  plugins: [
    sass({
      includePaths: ['node_modules', resolve(ROOT_DIR, 'node_modules')],
      injectGlobalPaths: [
        resolve(ODYSSEY_DIR, 'src/abstracts/functions'),
        resolve(ODYSSEY_DIR, 'src/abstracts/colors'),
        resolve(ODYSSEY_DIR, 'src/abstracts/tokens'),
        resolve(ODYSSEY_DIR, 'src/abstracts/mixins'),
      ],
    }),
  ],
  testing: {
    snapshotSerializers: ['jest-serializer-html'],
    reporters: ['default', 'jest-junit'],
    coverageDirectory: resolve(process.env.REPORTS_DIR, 'coverage'),
    browserArgs: ['--no-sandbox', '--disable-setuid-sandbox'],
  }
};
