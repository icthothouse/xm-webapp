import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { XmEventManager } from '@xm-ngx/core';
import { JsfAttributes } from '@xm-ngx/json-schema-form/core';
import { XmToasterService } from '@xm-ngx/toaster';
import { finalize } from 'rxjs/operators';

import { buildJsfAttributes, nullSafe } from '../../shared/jsf-extention/jsf-attributes-helper';
import { XmEntitySpec } from '../shared/xm-entity-spec.model';
import { XmEntity } from '../shared/xm-entity.model';
import { XmEntityService } from '../shared/xm-entity.service';


@Component({
    selector: 'xm-entity-data-card',
    templateUrl: './entity-data-card.component.html',
    styleUrls: ['./entity-data-card.component.scss'],
})
export class EntityDataCardComponent implements OnInit {

    @Input() public xmEntity: XmEntity;
    @Input() public xmEntitySpec: XmEntitySpec;
    @Input() public preventDefaultUpdateError?: boolean;
    @Output() public saveError: EventEmitter<boolean> = new EventEmitter<boolean>();

    public jsfAttributes: JsfAttributes;
    public showLoader: boolean;

    constructor(
        private xmEntityService: XmEntityService,
        private toasterService: XmToasterService,
        private eventManager: XmEventManager,
    ) {
    }

    public ngOnInit(): void {
        this.load();
    }

    public onSubmitForm(data: any): void {
        this.showLoader = true;
        this.xmEntity.data = { ...data };
        this.xmEntityService.update(this.xmEntity).pipe(finalize(() => this.showLoader = false))
            .subscribe(
                (res) => {
                    this.eventManager.broadcast({ name: 'xmEntityDetailModification', content: { entity: res.body } });
                    this.xmEntity = Object.assign(this.xmEntity, res.body);
                    this.toasterService.success('xm-entity.entity-data-card.update-success');
                },
                (err) => {
                    if (!this.preventDefaultUpdateError) {
                        this.toasterService.error('xm-entity.entity-data-card.update-error');
                    } else {
                        this.saveError.emit(err);
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
