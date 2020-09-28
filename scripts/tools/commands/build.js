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
  const buildConfig = getConfiguration(argv.type);
  const configPath = resolve(packageDir, buildConfig.configFile);
  const reportsDir = process.env.REPORTS_DIR || `${packageDir}/test-reports`;
  const options = [ `--config ${configPath}` ];

  if (!existsSync(configPath)) {
    throw new Error(`No config file found at ${configPath}`);
  }

  const cmd = `${buildConfig.cmd} ${options.join(' ')}`;
  console.log(`Running stencil build:\n  ${cmd}\n`);
  execSync(cmd, {
    cwd: packageDir,
    stdio: 'inherit',
    env: {
      ...process.env,
      REPORTS_DIR: reportsDir,
    },
  });
};
