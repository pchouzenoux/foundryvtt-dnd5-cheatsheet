Hooks.on('init', () => {
    game.settings.register('dnd5e-cheatsheet', 'dnd5CheatSheetControlButtons', {
        // name: game.i18n.translations.dnd5Cheatsheet.config.controlButton.name,
        // hint: game.i18n.translations.dnd5Cheatsheet.config.controlButton.hint,
        name: 'Display quick access buttons',
        hint: 'Displays buttons in the control bar for quick access to compendium items.',
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
