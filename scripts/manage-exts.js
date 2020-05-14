const _ = require('lodash');
const fs = require('fs');
const glob = require('glob');
const helpers = require('./helpers');

const ANGULAR_CONFIG_PATH = 'config.angular.json';
const ANGULAR_CONFIG_DIST = 'angular.json';
const ANGULAR_CONFIG_ASSETS_JSON_PATH = 'projects.xm-webapp.architect.build.options.assets';
const ANGULAR_CONFIG_LAZY_MODULES_JSON_PATH = 'projects.xm-webapp.architect.build.options.lazyModules';

const EXT_ASSETS_PATH = 'src/app/ext/*/assets';

function saveAsJson(path, data) {
    fs.writeFileSync(path, JSON.stringify(data, null, 2), {encoding: 'utf8'});
}

function readAsJson(file) {
    let json = {};
    try {
        json = JSON.parse(fs.readFileSync(file));
    } catch (e) {
        console.log('Problem with: %o; \n %o', file, e);
    }
    return json;
}

function updateAssets(config) {
    let assets = _.get(config, ANGULAR_CONFIG_ASSETS_JSON_PATH, []);
    const extAssets = helpers.getDirectories(EXT_ASSETS_PATH);

    _.forEach(extAssets, (i) => {
        assets.push({ glob: '**/*', input: i, output: '/assets' });
        console.info('angular.json assets:', i);
    });
    assets = _.uniq(assets);
    _.set(config, ANGULAR_CONFIG_ASSETS_JSON_PATH, assets);
}


function updateLazyModules(config) {
    let lazyModules = _.get(config, ANGULAR_CONFIG_LAZY_MODULES_JSON_PATH, []);
    const exts = helpers.getDirectories(helpers.EXT_PATH);

    _.forEach(exts, (i) => {
        const dirName = i.slice(i.lastIndexOf('/'), i.length);
        const modulePath = `src/app/ext${  dirName  }/module${  dirName  }.module`;
        lazyModules.push(modulePath);
        console.info('angular.json lazyModules:', modulePath);
    });
    lazyModules = _.uniq(lazyModules);
    _.set(config, ANGULAR_CONFIG_LAZY_MODULES_JSON_PATH, lazyModules);
}

(function getAngularConfig() {
    const config = readAsJson(ANGULAR_CONFIG_PATH);
    updateAssets(config);
    updateLazyModules(config);
    saveAsJson(ANGULAR_CONFIG_DIST, config);
}());
