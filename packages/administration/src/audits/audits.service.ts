import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { XmCoreConfig } from '@xm-ngx/core';
import { createRequestOption } from '@xm-ngx/entity';
import { Observable } from 'rxjs';
import { Audit } from './audit.model';

@Injectable()
export class AuditsService {
    constructor(private coreConfig: XmCoreConfig,
                private http: HttpClient) {
    }

    public query(req: any): Observable<HttpResponse<Audit[]>> {
        const params: HttpParams = createRequestOption(req);
        params.set('fromDate', req.fromDate);
        params.set('toDate', req.toDate);

        const requestURL = `${this.coreConfig.SERVER_API_URL}uaa/management/audits`;

        return this.http.get<Audit[]>(requestURL, {
            params,
            observe: 'response',
        });
    }
}
