Hooks.once('init', () => {
  game.settings.register('dnd5e-cheatsheet', 'enable', {
    name: game.i18n.localize('dnd5Cheatsheet.config.controlButtons.name'), // FIXME: Does not work
    hint: game.i18n.localize('dnd5Cheatsheet.config.controlButtons.hint'), // FIXME: Does not work
    type: Boolean,
    default: true,
    scope: 'client',
    config: true,
    onChange: (value) => {
      window.location.reload();
    },
  });

  if (typeof Babele !== 'undefined') {
    Babele.get().register({
      module: 'dnd5-cheatsheet',
      lang: 'fr',
      dir: 'lang/compendium',
    });
  }
});
