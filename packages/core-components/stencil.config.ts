import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { resolve, dirname } from 'path';

const ROOT_DIR = resolve(__dirname, '../../../');
const ODYSSEY_DIR = dirname(require.resolve('@okta/odyssey/package.json'));
const ASSET_DIR = resolve(__dirname, 'dist/assets');
const FONT_DIR = dirname(require.resolve('@okta/font/package.json'));

export const config: Config = {
  namespace: 'o-components',
  buildEs5: true,
  // TODO - Audit browser support to verify we need each of these
  // This restores us to the configuration used in Stencil 1.0
  extras: {
    cssVarsShim: true,
    dynamicImportShim: true,
    safari10: true,
    shadowDomShim: true,
  },
  outputTargets: [
    {
      type: 'dist',
      copy: [
        { src: `${FONT_DIR}/assets`, dest: resolve(__dirname, 'dist/font') },
        { src: 'components/icon/assets', dest: `${ASSET_DIR}/components/icon` },
        { src: 'components/icon/assets', dest: `${resolve(__dirname, 'assets')}/components/icon` },
      ],
    }
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
