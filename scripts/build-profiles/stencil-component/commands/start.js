const { execSync } = require('child_process');
const { existsSync, mkdirSync } = require('fs');
const { resolve } = require('path');
const { info } = require('@okta/scripts.logger');

exports.command = 'start';
exports.desc = 'Playground for stencil components';
exports.handler = (argv) => {
  const packageDir = process.cwd();
  const configPath = resolve(packageDir, 'stencil.config.ts');
  const storybookConfig = require(resolve(packageDir, 'storybook.config.js'));
  const distPath = resolve(packageDir, 'dist');
  const targetPath = resolve(packageDir, 'target');
  const reportsDir = process.env.REPORTS_DIR || `${packageDir}/test-reports`;
  const port = process.env.PORT || 9001;

  if (!existsSync(configPath)) {
    throw new Error(`No config file found at ${configPath}`);
  }

  if (!existsSync(distPath)) {
    info(`Creating ${distPath} for initial storybook build`);
    mkdirSync(distPath);
  }

  if (argv.apiToken) {
    process.env.API_TOKEN = argv.apiToken;
  }

  const options = [`--config ${configPath}`, '--dev', '--es5', '--watch'];
  const cmd = `sd concurrent "stencil build ${options.join(' ')}" "start-storybook -p ${port} -s ${distPath},${targetPath}"`;
  info(`Running stencil build:\n  ${cmd}\n`);
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
