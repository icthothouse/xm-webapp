import { TestBed } from '@angular/core/testing';

import { SidebarRightService } from './sidebar-right.service';

describe('SidebarRightService', () => {
    let service: SidebarRightService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(SidebarRightService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
