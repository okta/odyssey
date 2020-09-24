const { execSync } = require('child_process');

exports.command = 'test';
exports.desc = 'Test components with Puppeteer and Jest';
exports.builder = (yargs) => {
  const epilogue = `
The test runner uses Jest under the hood, so you can use any Jest CLI
args and it will be passed through:

  https://jestjs.io/docs/en/cli.html#options

`;

  return yargs
    .example('yarn test --no-headless', 'Run with the browser in non-headless mode')
    .epilogue(epilogue);
};

exports.handler = () => {
  const packageDir = process.cwd();
  const pkgJson = require(`${packageDir}/package.json`);
  const suiteName = `${pkgJson.name.replace('@okta/', '')}`;
  const jestArgs = process.argv.slice(3).join(' ');

  const cmd = `echo "Testing components using options: ${jestArgs || 'N/A'}"`;
  const execOptions = {
    cwd: packageDir,
    stdio: 'inherit',
    env: {
      ...process.env,
      JEST_SUITE_NAME: suiteName,

      // Stencil will parse npm_config_argv to extract jest args, but this
      // doesn't work with yarn (which does not require the run command). Reset
      // this value to clean the slate.
      npm_config_argv: '',
    },
  };
  execSync(cmd, execOptions);
};
