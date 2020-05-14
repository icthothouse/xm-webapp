import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { XmCoreConfig } from '@xm-ngx/core';
import { Observable } from 'rxjs';
import { Log } from './log.model';

@Injectable()
export class LogsService {
    constructor(private http: HttpClient,
                private coreConfig: XmCoreConfig) {
    }

    public changeLevel(log: Log, service: string): Observable<HttpResponse<unknown>> {
        return this.http.put(`${this.coreConfig.SERVER_API_URL}${service}/management/logs`, log, {observe: 'response'});
    }

    public findByService(service: string): Observable<HttpResponse<Log[]>> {
        return this.http.get<Log[]>(`${this.coreConfig.SERVER_API_URL}${service}/management/logs`, {observe: 'response'});
    }
}
