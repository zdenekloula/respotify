import path from 'path';
import fs from 'fs-extra';
import SVGSpriter, { Config } from 'svg-sprite';

const spriterConfig: Config = {
  shape: {
    id: {
      generator: (name) => name.replace(/^(.*)\.svg$/, `icon-$1`),
    },
  },
  mode: {
    symbol: true,
  },
};

const projectRootDirectory = path.resolve(__dirname, '../');
const outputDirectory = path.join(projectRootDirectory, './public');
const iconsDirectory = path.join(projectRootDirectory, 'src/icons');
const icons = fs.readdirSync(iconsDirectory).map((filename) => {
  return {
    name: filename.replace(/\.svg$/, ''),
    path: `${iconsDirectory}/${filename}`,
  };
});

const createSprite = () => {
  const spriter = new SVGSpriter(spriterConfig);

  for (const icon of icons) {
    // Fill the spriter with the icon
    spriter.add(icon.path, '', fs.readFileSync(icon.path, { encoding: 'utf-8' }));
  }

  spriter.compile(function (error, result) {
    if (error) {
      throw error;
    }
    fs.mkdirpSync(outputDirectory);
    fs.writeFileSync(outputDirectory + '/icons-sprite.svg', result.symbol.sprite.contents);
  });
};

const createTypes = () => {
  const iconComponentDirectory = path.join(projectRootDirectory, 'src/components/icon');
  let types = `export type IconType = `;
  for (const [index, icon] of icons.entries()) {
    if (index === icons.length - 1) {
      types += `'${icon.name}';`;
      continue;
    }
    types += `'${icon.name}' | `;
  }
  fs.writeFileSync(iconComponentDirectory + '/types.generated.ts', types);
};

const generateIcons = () => {
  createSprite();
  createTypes();
};

generateIcons();
