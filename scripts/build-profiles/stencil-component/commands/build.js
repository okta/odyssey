const { execSync } = require('child_process');
const { existsSync } = require('fs');
const { resolve } = require('path');
const { info } = require('@okta/scripts.logger');

exports.command = 'build';
exports.desc = 'Builds Stencil components';
exports.builder = {
  production: {
    description: 'Generates a production build',
    type: 'boolean',
    default: true,
  },
  watch: {
    description: 'Builds with watch mode on',
    type: 'boolean',
    default: false,
  },
  verbose: {
    description: 'Verbose logging',
    default: false,
  }
};

exports.handler = (argv) => {
  const packageDir = process.cwd();
  const configPath = resolve(packageDir, 'stencil.config.ts');
  const reportsDir = process.env.REPORTS_DIR || `${packageDir}/test-reports`;

  if (!existsSync(configPath)) {
    throw new Error(`No config file found at ${configPath}`);
  }

  const options = [`--config ${configPath}`];
  if (!argv.production) {
    options.push('--dev');
  }
  if (argv.verbose) {
    options.push('--debug');
  }
  if (argv.watch) {
    options.push('--watch');
  }

  const cmd = `stencil build ${options.join(' ')}`;
  info(`Running stencil build:\n  ${cmd}\n`);
  execSync(cmd, {
    cwd: packageDir,
    stdio: 'inherit',
    env: {
      ...process.env,
      REPORTS_DIR: reportsDir,
    },
  });
};
