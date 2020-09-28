// Map type to component configuration file
const getConfiguration = (type) => {
  const config = {
    stencil: {
      configFile: 'stencil.config.ts',
      cmd: 'stencil build',
    }
  };
  return config[type];
};

module.exports = {
  getConfiguration,
}
