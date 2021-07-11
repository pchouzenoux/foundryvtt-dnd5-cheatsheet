import { MODULE_ID, TEMPLATES } from './module/constants.js';
import { CheatsheetSettings } from './module/settings.js';

Hooks.once('init', async () => {
  CheatsheetSettings.init();

  if (typeof Babele !== 'undefined') {
    Babele.get().register({
      module: 'dnd5-cheatsheet',
      lang: 'fr',
      dir: 'lang/compendium',
    });
  }

  await loadTemplates(Object.values(flattenObject(TEMPLATES)));
});
