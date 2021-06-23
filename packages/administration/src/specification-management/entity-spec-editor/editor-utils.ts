import { MultiLanguageDataModel } from '@xm-ngx/components/multilanguage/xm-multi-language.component';

export class EditorUtils {

    public toMultiLanguageDataModel(name: unknown): MultiLanguageDataModel {
        return name ? Object.keys(name).map((k) => ({languageKey: k, name: name[k]})) : null;
    }

    public fromMultiLanguageDataModel(name: unknown, value: MultiLanguageDataModel): void {
        value.forEach((i) => {
            name[i.languageKey] = i.name;
        });
    }
}
