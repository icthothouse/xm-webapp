import * as fs from 'fs';
import * as glob from 'glob';
import * as _ from 'lodash';
import * as sass from 'sass';
import packageImporter from 'node-sass-package-importer';
import * as path from 'path';
import { Command } from './command';
import { Config } from './config';

export class ExtThemesCommand implements Command {
    public themesPathMask: string[] = [
        'src/styles/prebuild-themes/*.scss',
        this.config.extDir + '/*/styles/prebuild-themes/*.scss',
    ];
    public destPath: string = 'src/assets/themes';

    constructor(private config: Config) {
    }

    public execute(): void {
        console.info('Building custom theme scss files.');

        const files: string[] = _.flatten(_.map(this.themesPathMask, (themePath) => glob.sync(themePath, { sync: true })));
        for (const file of files) {
            const matches = /^_?([a-zA-Z-0-9]+).scss$/.exec(path.basename(file)) || [];
            const name = matches[1];
            const outFile = `${this.destPath}/${name}.css`;

            sass.render({
                file,
                includePaths: ['src', 'src/styles', this.config.extDir],
                importer: packageImporter(),
                sourceMap: false,
                outFile: outFile,
                outputStyle: 'compressed',
            }, (err, res) => {
                fs.writeFileSync(outFile, res.css);
                console.info(`Building: ${outFile}`);
            });


        }
    }
}
