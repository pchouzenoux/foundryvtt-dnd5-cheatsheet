async function renderEntry(id: string): Promise<void> {
  const cheatsheetPack = game.packs.get(
    'dnd5-cheatsheet.dnd5-cheatsheet',
  ) as any;

  const cheatsheetEntry = (await cheatsheetPack.getEntity(id)) as any;

  cheatsheetEntry.sheet.render(true);
}

Hooks.on('getSceneControlButtons', (controls: Array<any>): void => {
  const dnd5CheatsheetControl = {
    name: 'cheatsheet',
    title: 'dnd5Cheatsheet.controls.main',
    icon: 'fas fa-dungeon',
    layer: 'ControlsLayer',
    visible: true,
    tools: [
      {
        name: 'combat',
        title: 'dnd5Cheatsheet.controls.combat',
        icon: 'fas fa-fist-raised',
        button: true,
        onClick: () => renderEntry('96yLLrkGd9Wdgrh4'),
      },
      {
        name: 'range-combat',
        title: 'dnd5Cheatsheet.controls.range-combat',
        icon: 'far fa-dot-circle',
        button: true,
        onClick: () => renderEntry('sWPEV6eJ09WE5hkZ'),
      },
      {
        name: 'move',
        title: 'dnd5Cheatsheet.controls.move',
        icon: 'fas fa-running',
        button: true,
        onClick: () => renderEntry('nXtpaIsrorRtpVLh'),
      },
    ],
  };

  const controlButtonsEnable = game.settings.get(
    'dnd5e-cheatsheet',
    'dnd5CheatSheetControlButtons',
  );
  if (controlButtonsEnable) {
    controls.push(dnd5CheatsheetControl);
  }
});
