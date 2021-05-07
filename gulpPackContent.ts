import fs from 'fs';
import through from 'through2';

export default () => {
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
