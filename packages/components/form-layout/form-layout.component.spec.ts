import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { XmDynamicModule } from '@xm-ngx/dynamic';

import { FormLayoutComponent } from './form-layout.component';

describe('FormLayoutComponent', () => {
    let component: FormLayoutComponent;
    let fixture: ComponentFixture<FormLayoutComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [XmDynamicModule],
            declarations: [FormLayoutComponent],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormLayoutComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
