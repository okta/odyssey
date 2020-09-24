import { resolve, dirname } from 'path';

const ROOT_DIR = resolve(__dirname, '../../');
const ODYSSEY_DIR = dirname(require.resolve('@okta/odyssey/package.json'));

export const config = {
  namespace: 'o-components',
  outputTargets: [
    {
      type: 'dist',
    },
  ],
};
