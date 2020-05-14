let fs = require('fs');
const {join} = require('path');
let _ = require('lodash');
let glob = require('glob');

const helpers = require('./helpers');

const core = 'src/i18n/';
const custom = 'src/app/ext/*/i18n/';

const corePathMask = (lang) => core + lang + '/*.json';
const customPathMask = (lang) => custom + lang + '/*.json';
const distPathMask = (lang) => core + lang + '.json';

function saveJson(path, data) {
    fs.writeFileSync(path, JSON.stringify(data, null, 2), {encoding: 'utf8'});
}

function readJson(file) {
    let json = {};
    try {
        json = JSON.parse(fs.readFileSync(file, 'utf8'));
    } catch (e) {
        console.log('Problem with: %o; \n %o', file, e);
    }
    return json;
}

function getTranslations(pathMask) {
    let translations = {};

    glob.sync(pathMask).forEach(file => {
        translations = _.merge(translations, readJson(file));
    });

    return translations;
}

function moveCustomTranslationsToCoreFolder(pathMask) {
    glob.sync(pathMask).forEach(file => {
        const [fileName, lang] = file.split('/').reverse();
        const dirpath = `${core}ext/${lang}`;
        fs.mkdirSync(dirpath, { recursive: true });

        fs.copyFile(file, `${dirpath}/${fileName}`, (err) => {
            if (err) throw err;
        });
    });
}

(function loadTranslates() {

    helpers.LANGUAGES.forEach(lang => {
        moveCustomTranslationsToCoreFolder(customPathMask(lang));

        const coreTranslations = getTranslations(corePathMask(lang));
        const customTranslations = getTranslations(customPathMask(lang));

        const savePath = distPathMask(lang);
        saveJson(savePath, _.merge(coreTranslations, customTranslations));
        console.info('Updated: ', savePath);
    });
})();
