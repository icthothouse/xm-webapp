import { CommonModule } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ControlErrorModule } from '@xm-ngx/components/control-error';
import { XmEnumControlComponent } from '@xm-ngx/components/enum';
import { XmPermissionModule, XmPermissionService } from '@xm-ngx/core/permission';
import { XmTranslationTestingModule } from '@xm-ngx/translation';
import { MockPermissionService } from '@xm-ngx/core/permission/testing';

describe('XmEnumControlComponent', () => {
    let component: XmEnumControlComponent;
    let fixture: ComponentFixture<XmEnumControlComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [XmEnumControlComponent],
            providers: [{ provide: XmPermissionService, useClass: MockPermissionService }],
            imports: [
                CommonModule,
                MatIconModule,
                XmTranslationTestingModule,
                MatFormFieldModule,
                MatSelectModule,
                ReactiveFormsModule,
                XmPermissionModule,
                ControlErrorModule,
                ControlErrorModule.forRoot(),
                NoopAnimationsModule,
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent<XmEnumControlComponent>(XmEnumControlComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('value boolean should be equal to options.items[0] value', () => {
        const value = false;
        const title = 'False';
        component.options = { dataQa: '', items: [{ value, title }, { value: '1', title: '1' }] };
        component.value = value;
        fixture.detectChanges();
        expect(component.value).toBe(value);
        expect(component.itemsMap[String(value)].value).toBe(value);
    });

    it('value string should be equal to options.items[0] value', () => {
        const value = 'false';
        const title = 'False';
        component.value = value;
        component.options = { dataQa: '', items: [{ value, title }, { value: 1, title: '1' }] };
        fixture.detectChanges();
        expect(component.value).toBe(value);
        expect(component.itemsMap[String(value)].value).toBe(value);
    });


    it('value number should be equal to options.items[0] value', () => {
        const value = 1;
        const title = 'False';
        component.value = value;
        component.options = { dataQa: '', items: [{ value, title }, { value: 1, title: '1' }] };
        fixture.detectChanges();
        expect(component.value).toBe(value);
        expect(component.itemsMap[String(value)].value).toBe(value);
    });

    it('value number zero should be equal to options.items[0] value', () => {
        const value = 0;
        const title = 'False';
        component.value = value;
        component.options = { dataQa: '', items: [{ value, title }, { value: 1, title: '1' }] };
        fixture.detectChanges();
        expect(component.value).toBe(value);
        expect(component.itemsMap[String(value)].value).toBe(value);
    });

});
