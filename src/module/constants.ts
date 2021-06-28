export const MODULE_ID = 'dnd5-cheatsheet';

export enum CheahsheetClientSettings {
  ENABLE = 'dnd5-cheatsheet.settings.client.enable',
}

export enum CheahsheetWorldSettings {
  CONTROL_BUTTONS_MENU = 'dnd5-cheatsheet.settings.world.controlButtons.menu',
  CONTROL_BUTTONS = 'dnd5-cheatsheet.settings.world.controlButtons',
}

export const TEMPLATES = {
  settings: `modules/${MODULE_ID}/templates/settings.hbs`,
  settingTableRow: `modules/${MODULE_ID}/templates/parts/settings-config-table-row.hbs`,
};
