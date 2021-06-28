import { getMaxListeners } from 'node:process';
import {
  CheahsheetClientSettings,
  CheahsheetWorldSettings,
  MODULE_ID,
  TEMPLATES,
} from './constants.js';

interface CheatsheetClientConfig {
  controlButtonsEnable: boolean;
}
interface CheatsheetWorldControlButtonConfig {
  name: string;
  title: string;
  icon: string;
  pack: string;
  entry: string;
}
interface CheatsheetWorldConfig {
  controlButtons: CheatsheetWorldControlButtonConfig[];
}

export class CheatsheetSettings extends FormApplication {
  static init() {
    const defaultCheatsheetClientConfig: CheatsheetClientConfig = {
      controlButtonsEnable: true,
    };

    const defaultCheatsheetWorldConfig: CheatsheetWorldConfig = {
      controlButtons: [
        {
          name: 'combat',
          title: game.i18n.localize('dnd5-cheatsheet.controls.combat'),
          icon: 'fas fa-fist-raised',
          pack: 'dnd5-cheatsheet.dnd5-cheatsheet',
          entry: '96yLLrkGd9Wdgrh4',
        },
        {
          name: 'range-combat',
          title: game.i18n.localize('dnd5-cheatsheet.controls.range-combat'),
          icon: 'far fa-dot-circle',
          pack: 'dnd5-cheatsheet.dnd5-cheatsheet',
          entry: 'sWPEV6eJ09WE5hkZ',
        },
        {
          name: 'move',
          title: 'dnd5-cheatsheet.controls.move',
          icon: 'fas fa-running',
          pack: game.i18n.localize('dnd5-cheatsheet.dnd5-cheatsheet'),
          entry: 'nXtpaIsrorRtpVLh',
        },
        {
          name: 'magic-item',
          title: 'dnd5-cheatsheet.controls.magic-item',
          icon: 'fas fa-tools',
          pack: game.i18n.localize('dnd5-cheatsheet.dnd5-cheatsheet'),
          entry: 'p5phMKTqf387Wco5',
        },
      ],
    };

    game.settings.register(MODULE_ID, CheahsheetClientSettings.ENABLE, {
      name: game.i18n.localize(`${CheahsheetClientSettings.ENABLE}.name`),
      hint: game.i18n.localize(`${CheahsheetClientSettings.ENABLE}.hint`),
      type: Boolean,
      default: defaultCheatsheetClientConfig.controlButtonsEnable,
      scope: 'client',
      config: true,
      onChange: (value) => {
        window.location.reload();
      },
    });

    game.settings.registerMenu(
      MODULE_ID,
      CheahsheetWorldSettings.CONTROL_BUTTONS_MENU,
      {
        name: `${CheahsheetWorldSettings.CONTROL_BUTTONS_MENU}.name`,
        label: `${CheahsheetWorldSettings.CONTROL_BUTTONS_MENU}.label`,
        icon: 'fas fa-table',
        type: CheatsheetSettings,
        restricted: true,
        hint: `${CheahsheetWorldSettings.CONTROL_BUTTONS_MENU}.hint`,
      },
    );

    game.settings.register(MODULE_ID, CheahsheetWorldSettings.CONTROL_BUTTONS, {
      default: defaultCheatsheetWorldConfig.controlButtons,
      type: Object,
      scope: 'world',
      config: false,
      onChange: () => {
        window.location.reload();
      },
    });
  }

  static get defaultOptions() {
    return {
      ...super.defaultOptions,
      closeOnSubmit: true,
      height: 'auto' as 'auto',
      submitOnChange: false,
      submitOnClose: false,
      template: TEMPLATES.settings,
      title: game.i18n.localize(
        `${MODULE_ID}.settings.world.controlButtons.windowTitle`,
      ),
      width: 1200,
    };
  }

  getData() {
    const data = {
      ...super.getData(),
      controlButtons: game.settings.get(
        MODULE_ID,
        CheahsheetWorldSettings.CONTROL_BUTTONS,
      ),
      packs: this.getPaksList(),
    };
    return data;
  }

  private getPaksList() {
    const packs = [];
    for (const [key, pack] of game.packs.entries()) {
      packs.push({
        key,
        title: pack.title,
      });
    }
    return packs;
  }

  activateListeners(html) {
    super.activateListeners(html);

    console.log('--------------------------------------------');
    const handleNewRowClick = async (currentTarget: JQuery<any>) => {
      const table = currentTarget.data().table;

      const tableElement = currentTarget.siblings('table');
      const tbodyElement = $(tableElement).find('tbody');

      console.log(
        '>>>>>>>>>>>>>>>>>>>>>>>',
        table,
        tableElement,
        tbodyElement,
        '<<<<<<<<<<<<<<<<<<<<<<<<<<<<<',
      );
      const newRow = $(
        await renderTemplate(TEMPLATES.settingTableRow, {
          controlId: randomID(),
          control: {
            name: '',
            title: '',
            icon: '',
            pack: '',
            entry: '',
          },
          packs: this.getPaksList(),
        }),
      );
      // render a new row at the end of tbody
      tbodyElement.append(newRow);
      this.setPosition({}); // recalc height
    };

    const handleDeleteRowClick = (currentTarget: JQuery<any>) => {
      currentTarget.parentsUntil('tbody').remove();
      this.setPosition({}); // recalc height
    };

    html.on('click', (e) => {
      const currentTarget = $(e.target).closest('button')[0];

      if (!currentTarget) {
        return;
      }

      const wrappedCurrentTarget = $(currentTarget);

      if (wrappedCurrentTarget.hasClass('add-row')) {
        handleNewRowClick(wrappedCurrentTarget);
      }
      if (wrappedCurrentTarget.hasClass('delete-row')) {
        handleDeleteRowClick(wrappedCurrentTarget);
      }
    });
  }

  async _updateObject(ev, formData) {
    const data = Object.values(expandObject(formData).data);

    await game.settings.set(
      MODULE_ID,
      CheahsheetWorldSettings.CONTROL_BUTTONS,
      data
        .filter(
          ([name, title, icon, pack, entry]) =>
            name !== '' &&
            title !== '' &&
            icon !== '' &&
            pack !== '' &&
            entry !== '',
        )
        .map(([name, title, icon, pack, entry]) => ({
          name,
          title,
          icon,
          pack,
          entry,
        })),
    );

    this.close();
  }
}
