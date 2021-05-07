Hooks.on('init', () => {
  if (typeof Babele !== 'undefined') {
    Babele.get().register({
      module: 'dnd5-cheatsheet',
      lang: 'fr',
      dir: 'lang/compendium',
    });
  }
});
