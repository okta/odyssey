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
  const storybookConfig = require(resolve(packageDir, 'storybook.config.js'));
  const distPath = resolve(packageDir, 'dist');
  const targetPath = resolve(packageDir, 'target');
  const reportsDir = process.env.REPORTS_DIR || `${packageDir}/test-reports`;
  const port = process.env.PORT || 9001;

  if (!existsSync(configPath)) {
    throw new Error(`No config file found at ${configPath}`);
  }

  if (!existsSync(distPath)) {
    console.log(`Creating ${distPath} for initial storybook build`);
    mkdirSync(distPath);
  }

  const options = [ `--config ${configPath}`, '--dev', '--es5', '--watch'];
  const cmd = `sd concurrent "stencil build ${options.join(' ')}" "start-storybook -p ${port} -s ${distPath},${targetPath}"`;
  console.log(`Running stencil build:\n  ${cmd}\n`);
  execSync(cmd, {
    cwd: packageDir,
    stdio: 'inherit',
    env: {
      ...process.env,
      REPORTS_DIR: reportsDir,
      STORYBOOK_PREVIEW_HEAD: storybookConfig.previewHead,
      STORYBOOK_WELCOME_TITLE: storybookConfig.welcomeTitle,
    },
  });
};
