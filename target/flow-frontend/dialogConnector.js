(function () {
  function copyClassName(dialog) {
    const overlay = dialog.$.overlay;
    if (overlay) {
      overlay.className = dialog.className;
    }
  }

  const observer = new MutationObserver((records) => {
    records.forEach((mutation) => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        copyClassName(mutation.target);
      }
    });
  });

  window.Vaadin.Flow.dialogConnector = {
    initLazy: function (dialog) {
      if (dialog.$connector) {
        return;
      }
      dialog.$connector = {};

      dialog.addEventListener('opened-changed', (e) => {
        if (e.detail.value) {
          copyClassName(dialog);
        }
      });

      observer.observe(dialog, {
        attributes: true,
        attributeFilter: ['class']
      });

      copyClassName(dialog);
    }
  };
})();
