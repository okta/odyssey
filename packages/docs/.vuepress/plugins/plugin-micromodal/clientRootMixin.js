module.exports = {
  updated() {
    import('micromodal').then((module) => {
      const MicroModal = module.default;
      setTimeout(()=> {
        MicroModal.init({
          awaitCloseAnimation: true,
          disableScroll: true,
          disableFocus: true
        });
      }, 500);
    })
  },
}
