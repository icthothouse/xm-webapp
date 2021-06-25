import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { XmUIConfig } from '@xm-ngx/core/config';

@Injectable()
export class MockUiConfigService<T extends XmUIConfig = XmUIConfig> {

    public config$(): Observable<T> {
        return of(null);
    }

}
