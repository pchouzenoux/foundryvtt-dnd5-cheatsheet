import {
  CheahsheetClientSettings,
  CheahsheetWorldSettings,
  MODULE_ID,
} from './constants.js';

async function renderEntry(pack: string, entry: string): Promise<void> {
  const cheatsheetPack = (game as Game).packs.get(pack) as any;

  const cheatsheetEntry = (await cheatsheetPack.getDocument(entry)) as any;

  cheatsheetEntry.sheet.render(true);
}

Hooks.on('getSceneControlButtons', (controls: Array<any>): void => {
  const controlButtons = (game as Game).settings.get(
    MODULE_ID,
    CheahsheetWorldSettings.CONTROL_BUTTONS,
  );
  const dnd5CheatsheetControl = {
    name: 'cheatsheet',
    title: 'dnd5-cheatsheet.controls.main',
    icon: 'fas fa-dungeon',
    layer: 'controls',
    visible: true,
    tools: (controlButtons as any).map((control) => ({
      name: control.name,
      title: control.title,
      icon: control.icon,
      button: true,
      active: true,
      visible: true,
      onClick: () => renderEntry(control.pack, control.entry),
    })),
  };

  const controlButtonsEnable = (game as Game).settings.get(
    MODULE_ID,
    CheahsheetClientSettings.ENABLE,
  );
  if (controlButtonsEnable) {
    controls.push(dnd5CheatsheetControl);
  }
});
