import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { ROOT_REDUCERS } from 'src/state/app.state';

import { CostumerComponent } from './costumer.component';

describe('CostumerComponent', () => {
  let component: CostumerComponent;
  let fixture: ComponentFixture<CostumerComponent>;
  let route: ActivatedRoute; 
  let router : Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CostumerComponent ],
      imports : [RouterTestingModule.withRoutes([]) , StoreModule.forRoot(ROOT_REDUCERS),RouterModule.forRoot([]), ],

    })
    .compileComponents();
/*
    fixture = TestBed.createComponent(CostumerComponent);
    component = fixture.componentInstance;
    route = TestBed.inject(ActivatedRoute);

    fixture.detectChanges();*/
  });

  beforeEach(() => { 
    fixture = TestBed.createComponent(CostumerComponent);
    component = fixture.componentInstance;

    router = TestBed.inject(Router);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return Guid', () => {
      expect(component.generateGuid(5)).toHaveSize(5);
  });

  it('should save Data', () => {
    expect(component.save()).toBeUndefined();
  });

  it('navigation test', () => {
    const spy = spyOn(router, 'navigate');
    component.goToList();
    expect(spy.calls.first().args[0]).toContain('/');
    });

});
