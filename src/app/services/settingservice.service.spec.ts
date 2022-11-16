import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Costumer } from '../models/Costumer';

import { SettingServiceService } from './settingservice.service';

let arra:Costumer[]=[];

describe('SettingserviceService', () => {
  let service: SettingServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
    });
    service = TestBed.inject(SettingServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getInitialCostumers should return toBeDefined', () => {
    expect(service.getInitialCostumers()).toBeDefined();
  });


});
