import fs from 'fs';
import through from 'through2';

export const gulpPackContent = () => {
  return through.obj(function (vinylFile, _, callback) {
    const transformedFile = vinylFile.clone();

    const fileName = transformedFile.path.substring(
      transformedFile.path.lastIndexOf('/'),
      transformedFile.path.lastIndexOf('.'),
    );

    const htmlFilePath = `${transformedFile.base}/${fileName}.html`;
    if (fs.existsSync(htmlFilePath)) {
      const file = fs.readFileSync(htmlFilePath);

      const jsonContent = JSON.parse(transformedFile.contents);
      jsonContent.content = file.toString();
      transformedFile.contents = Buffer.from(JSON.stringify(jsonContent));
    }

    callback(null, transformedFile);
  });
};

export const gulpPackBabele = () => {
  return through.obj(function (vinylFile, _, callback) {
    const transformedFile = vinylFile.clone();

    const packName = transformedFile.path
      .substring(
        transformedFile.path.lastIndexOf('/'),
        transformedFile.path.length,
      )
      .split('.')[1];

    const translations = JSON.parse(transformedFile.contents.toString());

    for (const entry of translations.entries) {
      const htmlFilePath = `./src/packs/${packName}.db/${entry.id}_fr.html`;
      if (fs.existsSync(htmlFilePath)) {
        const file = fs.readFileSync(htmlFilePath);
        entry.description = file.toString();
      }
    }

    transformedFile.contents = Buffer.from(JSON.stringify(translations));

    callback(null, transformedFile);
  });
};
