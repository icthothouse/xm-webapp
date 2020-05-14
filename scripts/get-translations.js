const {exec} = require('child_process');
const helpers = require('./helpers');

const EXCLUDE_PATHS = ['src/app/ext', 'src/app/ext-commons'];

getTranslates();

function getTranslates() {
    getCoreTranslates();
    getTranslatesFromExts();
}

function getTranslatesFromExts() {
    const extsPaths = helpers.getDirectories(helpers.EXT_PATH);

    extsPaths.forEach((path) => {
        const extName = `${path.split('/').reverse()[0].split('-')[0]}-ext`;
        const outputPaths = helpers.LANGUAGES.map((l) => `-o ./${path}/i18n/${l}/${extName}.json`).join(' ');

        const command = `ngx-translate-extract -i ./${path} ${outputPaths} -f namespaced-json -s --fi "  "`;

        execCommand(command);
    })
}

function getCoreTranslates() {
    const directories = helpers.getDirectories('src/app/*').filter((directory) => !EXCLUDE_PATHS.includes(directory));
    const pathsForExtract = directories.map((directory) => `-i ./${directory}`);
    const outputPaths = helpers.LANGUAGES.map(l => `-o ./src/i18n/${l}/core.json`).join(' ');

    const command = `ngx-translate-extract ${pathsForExtract.join(' ')} ${outputPaths} -f namespaced-json -s --fi "  "`;

    execCommand(command);
}

function execCommand(command) {
    exec(command, (err, stdout, stderr) => console.log(err, stdout, stderr));
}
