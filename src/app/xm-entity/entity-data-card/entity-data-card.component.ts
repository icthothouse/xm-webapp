import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { XmEventManager } from '@xm-ngx/core';
import { XmToasterService } from '@xm-ngx/toaster';
import { finalize } from 'rxjs/operators';

import { buildJsfAttributes, nullSafe } from '../../shared/jsf-extention/jsf-attributes-helper';
import { XmEntitySpec } from '../shared/xm-entity-spec.model';
import { XmEntity } from '../shared/xm-entity.model';
import { XmEntityService } from '../shared/xm-entity.service';
import { MediaMarshaller } from "@angular/flex-layout";


@Component({
    selector: 'xm-entity-data-card',
    templateUrl: './entity-data-card.component.html',
    styleUrls: ['./entity-data-card.component.scss'],
})
export class EntityDataCardComponent implements OnInit {

    @Input() public xmEntity: XmEntity;
    @Input() public xmEntitySpec: XmEntitySpec;
    @Input() public preventDefaultUpdateError?: boolean;
    @Output() public onSaveError: EventEmitter<boolean> = new EventEmitter<boolean>();

    public jsfAttributes: any;
    public showLoader: boolean;

    constructor(private xmEntityService: XmEntityService,
                private toasterService: XmToasterService,
                private eventManager: XmEventManager,
                private mediaMarshaller: MediaMarshaller) {
    }

    public ngOnInit(): void {
        this.load();
        setTimeout(() => this.mediaMarshaller.updateStyles(), 0)
    }

    public onChangeForm(formValue: any): void {
        setTimeout(() => this.mediaMarshaller.updateStyles(), 0)
    }

    public onSubmitForm(data: any): void {
        this.showLoader = true;
        this.xmEntity.data = Object.assign({}, data);
        this.xmEntityService.update(this.xmEntity).pipe(finalize(() => this.showLoader = false))
            .subscribe(
                (res) => {
                    this.eventManager.broadcast({name: 'xmEntityDetailModification', content: {entity: res.body}});
                    this.xmEntity = Object.assign(this.xmEntity, res.body);
                    this.toasterService.success('xm-entity.entity-data-card.update-success');
                },
                (err) => {
                    if (!this.preventDefaultUpdateError) {
                        this.toasterService.error('xm-entity.entity-data-card.update-error');
                    } else {
                        this.onSaveError.emit(err);
                    }
                },
            );
    }

    private load(): void {
        if (this.xmEntitySpec && this.xmEntitySpec.dataSpec) {
            this.jsfAttributes = buildJsfAttributes(this.xmEntitySpec.dataSpec, this.xmEntitySpec.dataForm);
            this.jsfAttributes.data = Object.assign(nullSafe(this.jsfAttributes.data), nullSafe(this.xmEntity.data));
        }
    }

}
