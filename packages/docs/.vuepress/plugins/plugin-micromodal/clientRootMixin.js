module.exports = {
  updated() {
    import('micromodal').then((module) => {
      const MicroModal = module.default;
      MicroModal.init({
        awaitCloseAnimation: true,
        disableScroll: true,
        disableFocus: true
      });
    })
  },
}
