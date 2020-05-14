import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createRequestOption } from '@xm-ngx/entity';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from '../../xm.constants';
import { Widget } from './widget.model';

@Injectable()
export class WidgetService {

    private resourceUrl: string = SERVER_API_URL + 'dashboard/api/widgets';

    constructor(private http: HttpClient) { }

    public create(widget: Widget): Observable<HttpResponse<Widget>> {
        const copy = this.convert(widget);
        return this.http.post<Widget>(this.resourceUrl, copy, {observe: 'response'}).pipe(
            map((res: HttpResponse<Widget>) => this.convertResponse(res)));
    }

    public update(widget: Widget): Observable<HttpResponse<Widget>> {
        const copy = this.convert(widget);
        return this.http.put<Widget>(this.resourceUrl, copy, {observe: 'response'}).pipe(
            map((res: HttpResponse<Widget>) => this.convertResponse(res)));
    }

    public find(id: number): Observable<HttpResponse<Widget>> {
        return this.http.get<Widget>(`${this.resourceUrl}/${id}`, {observe: 'response'}).pipe(
            map((res: HttpResponse<Widget>) => this.convertResponse(res)));
    }

    public query(req?: any): Observable<HttpResponse<Widget[]>> {
        const options = createRequestOption(req);
        return this.http.get<Widget[]>(this.resourceUrl, {params: options, observe: 'response'}).pipe(
            map((res: HttpResponse<Widget[]>) => this.convertArrayResponse(res)));
    }

    public delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    private convertResponse(res: HttpResponse<Widget>): HttpResponse<Widget> {
        const body: Widget = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Widget[]>): HttpResponse<Widget[]> {
        const jsonResponse: Widget[] = res.body;
        const body: Widget[] = [];
        for (const i of jsonResponse) {
            body.push(this.convertItemFromServer(i));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Widget.
     */
    private convertItemFromServer(widget: Widget): Widget {
        return Object.assign({}, widget);
    }

    /**
     * Convert a Widget to a JSON which can be sent to the server.
     */
    private convert(widget: Widget): Widget {
        return Object.assign({}, widget);
    }
}
