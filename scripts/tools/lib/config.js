// Map type to component configuration file
const getConfiguration = (type) => {
  const config = {
    stencil: 'stencil.config.ts'
  };
  return config[type];
};

module.exports = {
  getConfiguration,
}
