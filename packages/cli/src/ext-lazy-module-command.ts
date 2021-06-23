import * as _ from 'lodash';
import { Command } from './command';
import { getDirectories } from './fs-utils';
import fs from 'fs';

export class ExtLazyModuleCommand implements Command {

    public sources: string[] = [
        'src/app/ext/*',
        'src/app/ext-commons/*',
    ];

    public template = (selector: string, file: string, module: string) => `    {
        selector: '${selector}',
        loadChildren: () => import('${file}').then(m => m.${module}),
    },
`;

    public getAllDirectories(): string[] {
        const list = [];
        for (const source of this.sources) {
            const extDirs = getDirectories(source);
            list.push(...extDirs);
        }
        return list;
    }

    public execute(): void {
        const moduleSource = String(fs.readFileSync('src/app/xm.module.ts'));
        const matcher = /(#regionstart dynamic-extension-modules\s)([\s\S]*)(\/\/ #regionend dynamic-extension-modules)/;
        const lazyModules = this.updateAngularJsonLazyModules();
        const newSource = moduleSource.replace(matcher, '$1' + lazyModules + '$3');
        fs.writeFileSync('src/app/xm.module.ts', newSource);
    }

    public updateAngularJsonLazyModules(): string {
        const extDirs = this.getAllDirectories();
        const modules: string[] = [];
        _.forEach(extDirs, (i) => {
            const directory = i.slice(i.lastIndexOf('/'), i.length).replace('/', '');
            const className = directory.split('-').map((e) => e[0].toUpperCase() + e.slice(1)).join('') + 'Module';
            const path = i.replace('src/app', '.') + `/module/${directory}.module`;
            let selector = directory.replace('-webapp-ext', '');
            selector = selector.startsWith('ext-') ? selector : ('ext-' + selector);
            const template = this.template(selector, path, className);
            modules.push(template);
            console.info('Update xm.module.ts lazyModules:', path);
        });
        return modules.join('');
    }
}
