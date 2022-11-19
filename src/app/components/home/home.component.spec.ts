import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {  RouterTestingModule } from '@angular/router/testing';
import { RouterModule, Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxPaginationModule } from 'ngx-pagination'; 


import { HomeComponent } from './home.component';
import { Costumer } from 'src/app/models/Costumer';
import { ROOT_REDUCERS } from 'src/state/app.state';
import { StoreModule } from '@ngrx/store';



describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let router : Router;

  beforeEach( waitForAsync(() => {
      TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports : [HttpClientTestingModule,NgxPaginationModule,  
        RouterTestingModule.withRoutes([]) ,StoreModule.forRoot(ROOT_REDUCERS), RouterModule.forRoot([]), ],
      providers : [StoreModule]  
      })
    .compileComponents();
  }));

  beforeEach(() => { 
    fixture = TestBed.createComponent(HomeComponent);
    router = TestBed.inject(Router);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();

  });

  it('should return Full Name', () => {
    const costumer: Costumer = {
      id:'1', first_name:"Felipe", last_name: 'Vargas', phone : '999999999',email : 'felipe.vargas@gmail.com', status : 'pending' };
      expect(component.getFullName(costumer)).toEqual('Felipe Vargas');

  });

  it('Edit Costumer navigation test', () => {
    const spy = spyOn(router, 'navigate');
    component.editCostumer('zxde');
    expect(spy.calls.first().args[0]).toContain('/costumer');
    });

  it('Add Costumer navigation test', () => {
    const spy = spyOn(router, 'navigate');
    component.addCostumer();
    expect(spy.calls.first().args[0]).toContain('/costumer');
    });

    it('should funtion ApplyFilter Exist', () => {
      component.applyFilter("xxxx");
      expect(component).toBeTruthy();
    });

 

});
