import fs from "fs-extra";
import less from "less";
import cheatsheet from "./src/packs/dnd5-cheatsheet";

const DEST = "./dist";
async function build() {
  fs.removeSync(DEST);
  fs.mkdirSync(DEST);

  fs.mkdirSync(`${DEST}/packs`);
  fs.writeFileSync(
    `${DEST}/packs/dnd5-cheatsheet.db`,
    cheatsheet.map((entry) => `${JSON.stringify(entry)}`).join("\n")
  );

  try {
    const result = await less.render(
      fs.readFileSync("./src/styles/dnd5-cheatsheet.less").toString()
    );

    fs.mkdirSync(`${DEST}/styles`);
    fs.writeFileSync(`${DEST}/styles/dnd5-cheatsheet.css`, result.css);
  } catch (err) {
    console.error(err);
  }
  fs.copySync(`./src/lang`, `${DEST}/lang`);
  fs.copySync(`./src/templates`, `${DEST}/templates`);

  fs.copySync(`./lib/module`, `${DEST}/module`);
  fs.copySync(`./lib/scripts`, `${DEST}/scripts`);

  fs.copySync(`./src/module.json`, `${DEST}/module.json`);
}

build();
