import { TestBed } from '@angular/core/testing';

import { RequestCacheFactoryService } from './request-cache-factory.service';

describe('RequestCacheFactoryService', () => {
  let service: RequestCacheFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestCacheFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
