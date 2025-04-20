/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Category.serviceService } from './category.service';

describe('Service: Category.service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Category.serviceService]
    });
  });

  it('should ...', inject([Category.serviceService], (service: Category.serviceService) => {
    expect(service).toBeTruthy();
  }));
});
