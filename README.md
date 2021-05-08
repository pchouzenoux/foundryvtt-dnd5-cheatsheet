# DnD5 Cheatsheet

The goal of this module is to provide fast and concise DnD5 Cheatsheet. With easy access buttons.

Available in English and French.

![alt text](https://github.com/pchouzenoux/foundryvtt-dnd5-cheatsheet/blob/main/doc/overview.png "Module Overview")

## How to install
To install, follow these instructions:

1. Inside Foundry, select the Game Modules tab in the Configuration and Setup menu.
2. Click the Install Module button and enter the following URL: https://raw.githubusercontent.com/pchouzenoux/foundryvtt-dnd5-cheatsheet/main/dist/module.json
3. Click Install and wait for installation to complete.

## How to develop
To build locally (compile typescript, less, compile packs and babele)
- `yarn build`: **Build** the module
- `yarn build:watch`: **Build** the module and start the watcher

Set `FOUNDRY_DATA` environment variable to deploy locally and next run one of these two commands:
- `yarn deploy`: **Deploy** built module to `FOUNDRY_DATA` folder
- `yarn deploy:watch`: **Build and deploy** module to `FOUNDRY_DATA` folder then start the watcher

### Packs
To simplify the creation of packs use this method:
1. Create a folder with the final name of the pack (ex: `my-pack.db`)
2. One entry in the pack is on `json` file in this folder

> You can create an `.html` file with save file name to replace content of the pack by HTML content.

### Babele translation
1. Update `src/lang/compendium/dnd5-cheatsheet.dnd5-cheatsheet.json`
2. Instead of writting the `description` you can let it empty and create an `_fr.html` in the pack folder. With the pack corresponding name.
