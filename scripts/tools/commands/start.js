const { execSync } = require('child_process');
const { existsSync, mkdirSync } = require('fs');
const { resolve } = require('path');
const { getConfiguration} = require('../lib/config');

exports.command = 'start';
exports.desc = 'Playground for components';
exports.builder = {
  type: {
    description: 'Type of components to use',
    default: 'stencil',
    choices: [
      'stencil'
    ]
  },
};

exports.handler = (argv) => {
  const packageDir = process.cwd();
  const configPath = resolve(packageDir, getConfiguration(argv.type));

  if (!existsSync(configPath)) {
    throw new Error(`No config file found at ${configPath}`);
  }

  const options = [ `--config ${configPath}`, '--dev', '--es5', '--watch'];
  const cmd = `echo "Starting component playground with options: ${options.join(' ')}"`;

  execSync(cmd, {
    cwd: packageDir,
    stdio: 'inherit',
    env: {
      ...process.env,
    },
  });
};
