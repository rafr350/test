/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Product.serviceService } from './product.service.service';

describe('Service: Product.service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Product.serviceService]
    });
  });

  it('should ...', inject([Product.serviceService], (service: Product.serviceService) => {
    expect(service).toBeTruthy();
  }));
});
