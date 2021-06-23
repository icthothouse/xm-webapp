import * as _ from 'lodash';
import { Command } from './command';
import { Config } from './config';
import { getDirectories, readAsJson, saveAsJson } from './fs-utils';

export class ExtAssetsCommand implements Command {

    public angularConfigAssetsPath: string = 'projects.xm-webapp.architect.build.options.assets';
    public extAssetsMask: string = this.config.extDir + '/*/assets';

    constructor(private config: Config) {
    }

    public execute(): void {
        const config = readAsJson(this.config.sourceAngularConfig);
        this.updateAngularJsonAssets(config);
        saveAsJson(this.config.targetAngularConfig, config);
    }

    public updateAngularJsonAssets(config: object): void {
        let assets = _.get(config, this.angularConfigAssetsPath, []);
        const extAssets = getDirectories(this.extAssetsMask);

        _.forEach(extAssets, (i) => {
            assets.push({ glob: '**/*', input: i, output: '/assets' });
            console.info('Update angular.json assets:', i);
        });

        assets = _.uniq(assets);
        _.set(config, this.angularConfigAssetsPath, assets);
    }
}
