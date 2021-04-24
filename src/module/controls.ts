import { FightCheatsheet } from "./fight-cheatsheet.js";

Hooks.on("getSceneControlButtons", (controls: Array<any>): void => {
  controls.push({
    name: "cheatsheet",
    title: "controls.main",
    icon: "fas fa-hat-wizard",
    layer: "ControlsLayer",
    visible: game.user.can("DRAWING_CREATE") || game.user.isGM,
    tools: [
      {
        name: "specials",
        title: "controls.fight.title",
        icon: "fas fa-hat-wizard",
        onClick: () => {
          new FightCheatsheet().render(true);
        },
        button: true,
      },
    ],
  });
});
