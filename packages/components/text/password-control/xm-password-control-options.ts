import { XmTextTitleOptions } from '../text-title';
import { DataQa } from '@xm-ngx/shared/interfaces';

export interface XmPasswordControlOptions extends XmTextTitleOptions, DataQa {
    id: string,
    autocomplete: string | 'off',
    required: boolean,
}
