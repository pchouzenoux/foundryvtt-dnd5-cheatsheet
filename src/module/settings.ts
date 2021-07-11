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
  compendiumEntry: string;
}

interface CheatsheetWorldConfig {
  controlButtons: CheatsheetWorldControlButtonConfig[];
}

export class CheatsheetSettings extends FormApplication {
  static init() {
    const defaultCheatsheetClientConfig: CheatsheetClientConfig = {
      controlButtonsEnable: true,
    };

    const _game = game as Game;
    const defaultCheatsheetWorldConfig: CheatsheetWorldConfig = {
      controlButtons: [
        {
          name: 'combat',
          title: _game.i18n.localize('dnd5-cheatsheet.controls.combat'),
          icon: 'fas fa-fist-raised',
          pack: 'dnd5-cheatsheet.dnd5-cheatsheet',
          entry: '96yLLrkGd9Wdgrh4',
          compendiumEntry: 'dnd5-cheatsheet.dnd5-cheatsheet.96yLLrkGd9Wdgrh4',
        },
        {
          name: 'range-combat',
          title: _game.i18n.localize('dnd5-cheatsheet.controls.range-combat'),
          icon: 'far fa-dot-circle',
          pack: 'dnd5-cheatsheet.dnd5-cheatsheet',
          entry: 'sWPEV6eJ09WE5hkZ',
          compendiumEntry: 'dnd5-cheatsheet.dnd5-cheatsheet.sWPEV6eJ09WE5hkZ',
        },
        {
          name: 'move',
          title: 'dnd5-cheatsheet.controls.move',
          icon: 'fas fa-running',
          pack: _game.i18n.localize('dnd5-cheatsheet.dnd5-cheatsheet'),
          entry: 'nXtpaIsrorRtpVLh',
          compendiumEntry: 'dnd5-cheatsheet.dnd5-cheatsheet.nXtpaIsrorRtpVLh',
        },
        {
          name: 'magic-item',
          title: 'dnd5-cheatsheet.controls.magic-item',
          icon: 'fas fa-tools',
          pack: _game.i18n.localize('dnd5-cheatsheet.dnd5-cheatsheet'),
          entry: 'p5phMKTqf387Wco5',
          compendiumEntry: 'dnd5-cheatsheet.dnd5-cheatsheet.p5phMKTqf387Wco5',
        },
      ],
    };

    _game.settings.register(MODULE_ID, CheahsheetClientSettings.ENABLE, {
      name: _game.i18n.localize(`${CheahsheetClientSettings.ENABLE}.name`),
      hint: _game.i18n.localize(`${CheahsheetClientSettings.ENABLE}.hint`),
      type: Boolean,
      default: defaultCheatsheetClientConfig.controlButtonsEnable,
      scope: 'client',
      config: true,
      onChange: (value) => {
        window.location.reload();
      },
    });

    _game.settings.registerMenu(
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

    _game.settings.register(
      MODULE_ID,
      CheahsheetWorldSettings.CONTROL_BUTTONS,
      {
        default: defaultCheatsheetWorldConfig.controlButtons,
        type: Object,
        scope: 'world',
        config: false,
        onChange: () => {
          window.location.reload();
        },
      },
    );
  }

  static get defaultOptions() {
    return {
      ...super.defaultOptions,
      closeOnSubmit: true,
      height: 'auto' as 'auto',
      submitOnChange: false,
      submitOnClose: false,
      template: TEMPLATES.settings,
      title: (game as Game).i18n.localize(
        `${MODULE_ID}.settings.world.controlButtons.windowTitle`,
      ),
      width: 800,
    };
  }

  getData() {
    const data = {
      ...super.getData(),
      controlButtons: (game as Game).settings.get(
        MODULE_ID,
        CheahsheetWorldSettings.CONTROL_BUTTONS,
      ),
    };
    return data;
  }

  activateListeners(html) {
    super.activateListeners(html);

    const handleNewRowClick = async (currentTarget: JQuery<any>) => {
      const tableElement = currentTarget.siblings('table');
      const tbodyElement = $(tableElement).find('tbody');

      const newRow = $(
        await renderTemplate(TEMPLATES.settingTableRow, {
          controlId: randomID(),
          control: {
            name: '',
            title: '',
            icon: '',
            pack: '',
            entry: '',
            compendiumEntry: '',
          },
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

    html.on('drop', async (event) => {
      const draggedItem = JSON.parse(
        event.originalEvent.dataTransfer.getData('text/plain'),
      );

      if (draggedItem.type !== 'JournalEntry' || !draggedItem.pack) {
        return;
      }

      const currentTarget = $(event.target).closest('input')[0];
      if (!currentTarget) {
        return;
      }

      const currentControlId = $(event.target).closest('tr')[0]?.attributes[0]
        ?.value;
      if (!currentControlId) {
        return;
      }

      $(`input[name="data.${currentControlId}.pack"]`)[0].value =
        draggedItem.pack;
      $(`input[name="data.${currentControlId}.entry"]`)[0].value =
        draggedItem.id;
      currentTarget.value = `${draggedItem.pack}.${draggedItem.id}`;
    });
  }

  async _updateObject(ev, formData) {
    const data = Object.values(expandObject(formData).data);

    await (game as Game).settings.set(
      MODULE_ID,
      CheahsheetWorldSettings.CONTROL_BUTTONS,
      data
        .filter(
          (control: CheatsheetWorldControlButtonConfig) =>
            control.name !== '' &&
            control.title !== '' &&
            control.icon !== '' &&
            control.pack !== '' &&
            control.entry !== '' &&
            control.compendiumEntry !== '',
        )
        .map((control: CheatsheetWorldControlButtonConfig) => ({
          name: control.name,
          title: control.title,
          icon: control.icon,
          pack: control.pack,
          entry: control.entry,
          compendiumEntry: control.compendiumEntry,
        })),
    );

    this.close();
  }
}
