const { execSync } = require('child_process');
const { existsSync } = require('fs');
const { resolve } = require('path');
const { getConfiguration } = require('../lib/config');

exports.command = 'build';
exports.desc = 'Build components';
exports.builder = {
  type: {
    description: 'Type of components to build',
    default: 'stencil',
    choices: [
      'stencil'
    ]
  },
};

exports.handler = (argv) => {
  const packageDir = process.cwd();
  const configPath = resolve(packageDir, getConfiguration(argv.type));
  const options = [ `--config ${configPath}` ];

  if (!existsSync(configPath)) {
    throw new Error(`No config file found at ${configPath}`);
  }

  const cmd = `echo "Building components with options: ${options.join(' ')}"`;
  execSync(cmd, {
    cwd: packageDir,
    stdio: 'inherit',
    env: {
      ...process.env,
    },
  });
};
