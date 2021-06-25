import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { XmEventManager } from '@xm-ngx/core';
import { takeUntilOnDestroy, takeUntilOnDestroyDestroy } from '@xm-ngx/shared/operators';

export const XM_EDIT_WIDGET_BUTTONS_CHANGE_EVENT = 'XM_EDIT_WIDGET_BUTTONS_CHANGE_EVENT';

export enum EditWidgetButtonsEventType {
    EDIT = 1,
    SAVE,
    CANCEL,
}

export interface EditWidgetButtonsEvent {
    event?: EditWidgetButtonsEventType;
    isEdit?: boolean;
}

@Component({
    selector: 'xm-edit-widget-buttons',
    templateUrl: './edit-widget-buttons.component.html',
})
export class EditWidgetButtonsComponent implements OnInit, OnDestroy {

    public isHidden: boolean = false;
    @Input() public isEdit: boolean = false;
    @Input() public disableSubmit: boolean = false;
    @Input() public disabled: boolean = false;

    @Output() public isEditChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() public edit: EventEmitter<void> = new EventEmitter<void>();
    @Output() public save: EventEmitter<void> = new EventEmitter<void>();
    @Output() public cancel: EventEmitter<void> = new EventEmitter<void>();
    @Output() public changeEvent: EventEmitter<EditWidgetButtonsEvent> = new EventEmitter<EditWidgetButtonsEvent>();

    constructor(
        private eventManager: XmEventManager,
    ) {
    }

    public ngOnInit(): void {
        this.eventManager.listenTo<EditWidgetButtonsEvent>(XM_EDIT_WIDGET_BUTTONS_CHANGE_EVENT)
            .pipe(takeUntilOnDestroy(this))
            .subscribe((e) => {
                this.isHidden = !this.isEdit && e.payload.isEdit;
            });
    }

    public ngOnDestroy(): void {
        takeUntilOnDestroyDestroy(this);
    }

    public onEdit(): void {
        this.changeIsEdit(EditWidgetButtonsEventType.EDIT);
        this.edit.emit();
    }

    public onSave(): void {
        this.changeIsEdit(EditWidgetButtonsEventType.SAVE);
        this.save.emit();
    }

    public onCancel(): void {
        this.changeIsEdit(EditWidgetButtonsEventType.CANCEL);
        this.cancel.emit();
    }

    private changeIsEdit(event: EditWidgetButtonsEventType): void {
        this.isEdit = !this.isEdit;
        this.isEditChange.emit(this.isEdit);
        const payload = {
            isEdit: this.isEdit,
            event,
        };
        this.changeEvent.emit(payload);
        this.eventManager.broadcast<EditWidgetButtonsEvent>({
            name: XM_EDIT_WIDGET_BUTTONS_CHANGE_EVENT,
            payload,
        });
    }
}
