import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, NgModule, Output, Type } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { XmTranslationModule } from '@xm-ngx/translation';

@Component({
    selector: 'xm-per-page',
    templateUrl: './xm-per-page.component.html',
    styles: [`
        .form-group {
            display: inline-block;
            margin: 0;
            padding: 0;
        }

        .form-control {
            display: inline-block;
            width: auto;
        }

        .pager-wrapper {
            display: inline-block;
            width: 50px;
            padding-top: 6px;
        }
    `],
})
export class PerPageComponent {

    @Input() public sizes: number[] = [10, 20, 50];
    @Input() public itemsPerPage: number = 10;
    @Output() public itemsPerPageChange: EventEmitter<number> = new EventEmitter<number>();
    @Output() public onChange: EventEmitter<number> = new EventEmitter<number>();

    public onChangeSelect(): void {
        this.itemsPerPageChange.emit(this.itemsPerPage);
        this.onChange.emit(this.itemsPerPage);
    }

}

@NgModule({
    imports: [
        MatFormFieldModule,
        MatSelectModule,
        FormsModule,
        XmTranslationModule,
        CommonModule,
    ],
    exports: [PerPageComponent],
    declarations: [PerPageComponent],
    providers: [],
})
export class PerPageModule {
    public entry: Type<PerPageComponent> = PerPageComponent;
}
