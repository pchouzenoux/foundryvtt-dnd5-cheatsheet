import movements from "./data/movement.js";

export class FightCheatsheet extends FormApplication {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["dnd5-cheatsheet", "sidebar-popout"],
      closeOnSubmit: true,
      submitOnChange: false,
      submitOnClose: false,
      popOut: true,
      editable: game.user.isGM,
      width: 730,
      height: 400,
      isEditatble: false,
      resizable: true,
      template: "modules/dnd5-cheatsheet/templates/fight-cheatsheet.html",
      id: "dnd5-cheatsheet.fight",
      title: game.i18n.localize("controls.fight.title"),
    });
  }

  /**
   * Obtain module metadata and merge it with game settings which track current module visibility
   * @return {Object}   The data provided to the template when rendering the form
   */
  getData() {
    return {
      movements,
    };
  }

  /** @override */
  activateListeners(html) {
    html.find(".open").click((ev) => {
      console.log("Open", ev);
    });
  }

  /**
   * This method is called upon form submission after form data is validated
   * @param event {Event}       The initial triggering submission event
   * @param formData {Object}   The object of validated form data with which to update the object
   * @private
   */
  _updateObject(): any {}
}
