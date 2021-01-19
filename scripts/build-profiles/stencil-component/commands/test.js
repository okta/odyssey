const { execSync } = require('child_process');
const { info } = require('@okta/scripts.logger');

exports.command = 'test';
exports.desc = 'Test Stencil components with Puppeteer and Jest';
exports.builder = (yargs) => {
  const epilogue = `
The Stencil test runner uses Jest under the hood, so you can use any Jest CLI
args and it will be passed through:

  https://jestjs.io/docs/en/cli.html#options

It also has some Stencil specific options, which can be found by looking at
ARG_OPTS in this file:

  https://github.com/ionic-team/stencil/blob/master/src/cli/parse-flags.ts
  `;

  return yargs
    .example('yarn test --no-headless', 'Run with the browser in non-headless mode')
    .example('yarn test -t o-help-link', 'Run only tests that match "o-help-link"')
    .example('yarn test --updateSnapshot', 'Update snapshots after changing component structure')
    .epilogue(epilogue);
};

exports.handler = () => {
  const packageDir = process.cwd();
  const pkgJson = require(`${packageDir}/package.json`);
  const suiteName = `${pkgJson.name.replace('@okta/', '')}`;
  const reportsDir = process.env.REPORTS_DIR || `${packageDir}/test-reports`;
  const jestArgs = process.argv.slice(3).join(' ');

  const cmd = `stencil test --e2e ${jestArgs}`;
  const execOptions = {
    cwd: packageDir,
    stdio: 'inherit',
    env: {
      ...process.env,
      JEST_SUITE_NAME: suiteName,
      JEST_JUNIT_OUTPUT: `${reportsDir}/unit/${suiteName}.xml`,
      REPORTS_DIR: reportsDir,

      // Stencil will parse npm_config_argv to extract jest args, but this
      // doesn't work with yarn (which does not require the run command). Reset
      // this value to clean the slate.
      npm_config_argv: '',
    },
  };
  info(`Running e2e tests:\n ${cmd}\n`);
  execSync(cmd, execOptions);
};
