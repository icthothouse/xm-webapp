import { HttpResponse } from '@angular/common/http';
import { QueryParams } from '@xm-ngx/components/entity-collection/i-entity-collection';
import { Link } from '@xm-ngx/entity/shared/link.model';
import { XmEntity } from '@xm-ngx/entity/shared/xm-entity.model';
import { ElasticQueryParams, Extra } from '@xm-ngx/entity/shared/xm-entity.service';
import { Observable, of } from 'rxjs';

export class MockXmEntityService {

    public loading$: Observable<boolean> = of(false);

    public create<T extends XmEntity>(xmEntity: T): Observable<HttpResponse<T>> {
        return of(null);
    }

    public update<T extends XmEntity>(xmEntity: T): Observable<HttpResponse<T>> {
        return of(null);
    }

    public find<T extends XmEntity>(id: number | string, req?: QueryParams): Observable<HttpResponse<T>> {
        return of(null);
    }

    public getById<T extends XmEntity>(key: number | string, params: {embed: string} & QueryParams = {embed: 'data'}): Observable<T> {
        return of(null);
    }

    public getEntitiesByIds<T extends XmEntity>(req?: QueryParams): Observable<HttpResponse<T[]>> {
        return of(null);
    }

    public query<T extends XmEntity>(req?: QueryParams): Observable<HttpResponse<T[]>> {
        return of(null);
    }

    public delete<T>(id: number | string): Observable<HttpResponse<T>> {
        return of(null);
    }

    public search<T extends XmEntity, R extends ElasticQueryParams & QueryParams>(req?: ElasticQueryParams): Observable<HttpResponse<T[] & Extra>> {
        return of(null);
    }

    public searchByTemplate<T extends XmEntity>(req?: any): Observable<HttpResponse<XmEntity[]>> {
        return of(null);
    }

    public getProfile(req?: any): Observable<HttpResponse<XmEntity>> {
        return of(null);
    }

    public getProfileByKey(key: string, req?: any): Observable<HttpResponse<XmEntity>> {
        return of(null);
    }

    public changeState(id: number, stateKey: string, inputContext?: any): Observable<HttpResponse<XmEntity>> {
        return of(null);
    }

    public createAvatar(file: File | Blob): Observable<string> {
        return of(null);
    }

    public findLinkTargets(id: number, linkTypeKey: string, req?: any): Observable<HttpResponse<Link[]>> {
        return of(null);
    }

    public findLinkSources(id: number, linkTypeKey: string, req?: any): Observable<HttpResponse<Link[]>> {
        return of(null);
    }

    public findLinkSourcesInverted(idOrKey: string,
                                   linkTypeKey: string[],
                                   req?: any): Observable<HttpResponse<Link[]>> {
        return of(null);
    }

    public fileExport(exportType: string, typeKey: string): Observable<Blob> {
        return of(null);
    }
}
