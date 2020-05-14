const fs = require('fs');
const glob = require('glob');

const LANGUAGES = ['en', 'ru', 'uk'];
const EXT_PATH = 'src/app/ext/*';

const isDirectory = (source) => fs.lstatSync(source).isDirectory();
const getDirectories = (source) => glob.sync(source).filter(isDirectory);

module.exports = {EXT_PATH, LANGUAGES, getDirectories};
