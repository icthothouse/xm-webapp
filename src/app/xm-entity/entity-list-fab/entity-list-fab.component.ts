import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { XmEventManager } from '@xm-ngx/core';
import { XmToasterService } from '@xm-ngx/toaster';

import { XM_EVENT_LIST } from '../../xm.constants';
import { EntityDetailDialogComponent } from '../entity-detail-dialog/entity-detail-dialog.component';
import { Spec } from '../shared/spec.model';
import { XmEntitySpec } from '../shared/xm-entity-spec.model';
import { XmEntitySpecService } from '../shared/xm-entity-spec.service';


@Component({
    selector: 'xm-entity-list-fab',
    templateUrl: './entity-list-fab.component.html',
    styleUrls: ['./entity-list-fab.component.scss'],
})
export class EntityListFabComponent {

    @Input() public xmEntitySpec: XmEntitySpec;
    @Input() public spec: Spec;

    constructor(private xmEntitySpecService: XmEntitySpecService,
                private eventManager: XmEventManager,
                private modalService: MatDialog,
                private toasterService: XmToasterService) {
    }

    public onRefresh(): void {
        this.eventManager.broadcast({name: XM_EVENT_LIST.XM_ENTITY_LIST_MODIFICATION});
    }

    public onGenerateNew(): void {
        this.xmEntitySpecService.generateXmEntity(this.xmEntitySpec.key).toPromise().then((value) => {
            this.eventManager.broadcast({name: XM_EVENT_LIST.XM_ENTITY_LIST_MODIFICATION});
            this.toasterService.success('New entity "' + value.body.name + '" generated!');
            this.toasterService.success('xm-entity.entity-list-fab.new-generated');
        });
    }

    public onAddNew(): void {
        const modalRef = this.modalService.open(EntityDetailDialogComponent, {width: '500px'});
        modalRef.componentInstance.xmEntitySpec = this.xmEntitySpec;
        modalRef.componentInstance.spec = this.spec;
    }

}
