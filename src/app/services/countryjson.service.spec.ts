import { TestBed } from '@angular/core/testing';

import { CountryjsonService } from './countryjson.service';

describe('CountryjsonService', () => {
  let service: CountryjsonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountryjsonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
