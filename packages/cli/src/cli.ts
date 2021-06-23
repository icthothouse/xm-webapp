import { CliCommands } from './command';
import { Config } from './config';
import { ExtAssetsCommand } from './ext-assets-command';
import { DocCommand } from './doc-command';
import { ExtI18nCommand } from './ext-i18n-command';
import { ExtInstallCommand } from './ext-install-command';
import { ExtLazyModuleCommand } from './ext-lazy-module-command';
import { ExtRoutingCommand } from './ext-routing-command';
import { ExtThemesCommand } from './ext-themes-command';
import { ExtThemingCommand } from './ext-theming-command';
import { HelpCommand } from './help-command';
import { ReplaceCommand } from './replace-command';

export function cli(terminalArgs: string[]): void {
    if (!terminalArgs) {
        terminalArgs = [];
    }

    const config = new Config();

    switch (terminalArgs[0] as CliCommands) {
        case 'ext-assets': {
            new ExtAssetsCommand(config).execute();
            break;
        }
        case 'ext-i18n': {
            new ExtI18nCommand(config).execute();
            break;
        }
        case 'ext-lazy-module': {
            new ExtLazyModuleCommand().execute();
            break;
        }
        case 'replace': {
            new ReplaceCommand().execute(terminalArgs.slice(1));
            break;
        }
        case 'doc': {
            new DocCommand().execute();
            break;
        }
        case 'ext-routing': {
            new ExtRoutingCommand(config).execute();
            break;
        }
        case 'ext-themes': {
            new ExtThemesCommand(config).execute();
            break;
        }
        case 'ext-theming': {
            new ExtThemingCommand(config).execute();
            break;
        }
        case 'ext-install': {
            new ExtInstallCommand(config).execute();
            break;
        }
        case 'help':
        default: {
            new HelpCommand().execute();
            break;
        }
    }
}
