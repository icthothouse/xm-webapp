import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { XmEntitySpec } from '../../../xm-entity';
import { ACache } from './a-cache';
import {takeUntilOnDestroy} from '@xm-ngx/shared/operators';
import {XmSessionService} from '../../../shared/core/src/session/xm-session.service';

export const ENTITY_CONFIG_URL = 'entity/api/xm-entity-specs';

@Injectable({
    providedIn: 'root',
})
export class EntityConfigService<T = XmEntitySpec> extends ACache<T[]> {

    public url: string = ENTITY_CONFIG_URL;

    constructor(protected httpClient: HttpClient,
                protected xmSessionService: XmSessionService) {
        super();
        this.xmSessionService.get().pipe(takeUntilOnDestroy(this)).subscribe((session) => {
            if (session.active) {
                this.forceReload();
            } else { this.clear(); }
        });
    }

    public getAll(): Observable<T[]> {
        return this.httpClient.get<T[]>(this.url);
    }

    protected request(): Observable<T[]> {
        return this.getAll();
    }
}
