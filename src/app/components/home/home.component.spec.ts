import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxPaginationModule } from 'ngx-pagination'; 
import { SettingServiceService } from 'src/app/services/settingservice.service';

import { HomeComponent } from './home.component';
import { Costumer } from 'src/app/models/Costumer';
import { Observable, of } from 'rxjs';

class SettingTestingServiceService {
  public getInitialCostumers(): Observable<Costumer[]>{
    return of([
      {id:'1', first_name:"Felipe", last_name: 'Vargas', phone : '999999999',email : 'felipe.vargas@gmail.com', status : 'pending' },
      {id:'2', first_name:"Antonio", last_name: 'Alvarez', phone : '999999999',email : 'felipe.vargas@gmail.com', status : 'active' }
    ]);
  }

  public getCostumersFromLS(): Observable<Costumer[]>{    
    return of([
      {id:'1', first_name:"Felipe", last_name: 'Vargas', phone : '999999999',email : 'felipe.vargas@gmail.com', status : 'pending' },
      {id:'2', first_name:"Antonio", last_name: 'Alvarez', phone : '999999999',email : 'felipe.vargas@gmail.com', status : 'active' }
    ]);
  }
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let settingService: SettingTestingServiceService;


  beforeEach( waitForAsync(() => {
      TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports : [HttpClientTestingModule,NgxPaginationModule ],
      providers : [
        {provide:SettingServiceService, useClass:SettingTestingServiceService}  
        ]    })
    .compileComponents();
  }));

  beforeEach(() => { 
    fixture = TestBed.createComponent(HomeComponent);
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

  it('should set the order of the costumer by LastName ASC',
      waitForAsync(() => {
        const fakeCostumers: Array<Costumer> = [
          {id:'1', first_name:"Felipe", last_name: 'Vargas', phone : '999999999',email : 'felipe.vargas@gmail.com', status : 'pending' },
          {id:'2', first_name:"Antonio", last_name: 'Alvarez', phone : '999999999',email : 'felipe.vargas@gmail.com', status : 'pending' },
          {id:'3', first_name:"Pedro", last_name: 'Alvarez', phone : '999999999',email : 'felipe.vargas@gmail.com', status : 'pending' },
          {id:'4', first_name:"Pedro", last_name: 'Alvarez', phone : '999999999',email : 'felipe.vargas@gmail.com', status : 'pending' },
          {id:'5', first_name:"Juan", last_name: 'Sosa', phone : '999999999',email : 'felipe.vargas@gmail.com', status : 'pending' }

        ];
        const costumerInOrder: Array<Costumer> = [
          {id:'2', first_name:"Antonio", last_name: 'Alvarez', phone : '999999999',email : 'felipe.vargas@gmail.com', status : 'pending' },
          {id:'3', first_name:"Pedro", last_name: 'Alvarez', phone : '999999999',email : 'felipe.vargas@gmail.com', status : 'pending' },
          {id:'4', first_name:"Pedro", last_name: 'Alvarez', phone : '999999999',email : 'felipe.vargas@gmail.com', status : 'pending' },
          {id:'5', first_name:"Juan", last_name: 'Sosa', phone : '999999999',email : 'felipe.vargas@gmail.com', status : 'pending' },
          {id:'1', first_name:"Felipe", last_name: 'Vargas', phone : '999999999',email : 'felipe.vargas@gmail.com', status : 'pending' }
        ];

        component.costumersDataSource = fakeCostumers;
        // component.ringsInOrder set this too.
        component.onChange("3");
        expect(component.costumersDataSource).toEqual(costumerInOrder);
      })
  );

  it('should set the order of the costumer by LastName DESC',
  waitForAsync(() => {
    const fakeCostumers: Array<Costumer> = [
      {id:'1', first_name:"Felipe", last_name: 'Vargas', phone : '999999999',email : 'felipe.vargas@gmail.com', status : 'pending' },
      {id:'2', first_name:"Antonio", last_name: 'Alvarez', phone : '999999999',email : 'felipe.vargas@gmail.com', status : 'pending' },
      {id:'3', first_name:"Pedro", last_name: 'Perez', phone : '999999999',email : 'felipe.vargas@gmail.com', status : 'pending' },
      {id:'4', first_name:"Jose", last_name: 'Espinoza', phone : '999999999',email : 'felipe.vargas@gmail.com', status : 'pending' },
      {id:'5', first_name:"Juan", last_name: 'Sosa', phone : '999999999',email : 'felipe.vargas@gmail.com', status : 'pending' }

    ];
    const costumerInOrder: Array<Costumer> = [
      {id:'1', first_name:"Felipe", last_name: 'Vargas', phone : '999999999',email : 'felipe.vargas@gmail.com', status : 'pending' },
      {id:'5', first_name:"Juan", last_name: 'Sosa', phone : '999999999',email : 'felipe.vargas@gmail.com', status : 'pending' },
      {id:'3', first_name:"Pedro", last_name: 'Perez', phone : '999999999',email : 'felipe.vargas@gmail.com', status : 'pending' },
      {id:'4', first_name:"Jose", last_name: 'Espinoza', phone : '999999999',email : 'felipe.vargas@gmail.com', status : 'pending' },
      {id:'2', first_name:"Antonio", last_name: 'Alvarez', phone : '999999999',email : 'felipe.vargas@gmail.com', status : 'pending' }
    ];

    component.costumersDataSource = fakeCostumers;
    // component.ringsInOrder set this too.
    component.onChange("4");
    expect(component.costumersDataSource).toEqual(costumerInOrder);
  })
  );

  it('should set the order of the costumer by FirstName ASC',
    waitForAsync(() => {
      const fakeCostumers: Array<Costumer> = [
        {id:'1', first_name:"Felipe", last_name: 'Vargas', phone : '999999999',email : 'felipe.vargas@gmail.com', status : 'pending' },
        {id:'2', first_name:"Antonio", last_name: 'Alvarez', phone : '999999999',email : 'felipe.vargas@gmail.com', status : 'pending' },
        {id:'3', first_name:"Pedro", last_name: 'Alvarez', phone : '999999999',email : 'felipe.vargas@gmail.com', status : 'pending' },
        {id:'4', first_name:"Pedro", last_name: 'Alvarez', phone : '999999999',email : 'felipe.vargas@gmail.com', status : 'pending' },
        {id:'5', first_name:"Juan", last_name: 'Sosa', phone : '999999999',email : 'felipe.vargas@gmail.com', status : 'pending' }

      ];
      const costumerInOrder: Array<Costumer> = [
        {id:'2', first_name:"Antonio", last_name: 'Alvarez', phone : '999999999',email : 'felipe.vargas@gmail.com', status : 'pending' },
        {id:'1', first_name:"Felipe", last_name: 'Vargas', phone : '999999999',email : 'felipe.vargas@gmail.com', status : 'pending' },
        {id:'5', first_name:"Juan", last_name: 'Sosa', phone : '999999999',email : 'felipe.vargas@gmail.com', status : 'pending' },
        {id:'3', first_name:"Pedro", last_name: 'Alvarez', phone : '999999999',email : 'felipe.vargas@gmail.com', status : 'pending' },
        {id:'4', first_name:"Pedro", last_name: 'Alvarez', phone : '999999999',email : 'felipe.vargas@gmail.com', status : 'pending' }
      ];

      component.costumersDataSource = fakeCostumers;
      // component.ringsInOrder set this too.
      component.onChange("1");
      expect(component.costumersDataSource).toEqual(costumerInOrder);
    })
  );

  it('should set the order of the costumer by FirstName DESC',
      waitForAsync(() => {
        const fakeCostumers: Array<Costumer> = [
          {id:'1', first_name:"Felipe", last_name: 'Vargas', phone : '999999999',email : 'felipe.vargas@gmail.com', status : 'pending' },
          {id:'2', first_name:"Antonio", last_name: 'Alvarez', phone : '999999999',email : 'felipe.vargas@gmail.com', status : 'pending' },
          {id:'3', first_name:"Pedro", last_name: 'Alvarez', phone : '999999999',email : 'felipe.vargas@gmail.com', status : 'pending' },
          {id:'4', first_name:"Pedro", last_name: 'Alvarez', phone : '999999999',email : 'felipe.vargas@gmail.com', status : 'pending' },
          {id:'5', first_name:"Juan", last_name: 'Sosa', phone : '999999999',email : 'felipe.vargas@gmail.com', status : 'pending' }

        ];
        const costumerInOrder: Array<Costumer> = [
          {id:'3', first_name:"Pedro", last_name: 'Alvarez', phone : '999999999',email : 'felipe.vargas@gmail.com', status : 'pending' },
          {id:'4', first_name:"Pedro", last_name: 'Alvarez', phone : '999999999',email : 'felipe.vargas@gmail.com', status : 'pending' },
          {id:'5', first_name:"Juan", last_name: 'Sosa', phone : '999999999',email : 'felipe.vargas@gmail.com', status : 'pending' },
          {id:'1', first_name:"Felipe", last_name: 'Vargas', phone : '999999999',email : 'felipe.vargas@gmail.com', status : 'pending' },
          {id:'2', first_name:"Antonio", last_name: 'Alvarez', phone : '999999999',email : 'felipe.vargas@gmail.com', status : 'pending' }
        ];

        component.costumersDataSource = fakeCostumers;
        // component.ringsInOrder set this too.
        component.onChange("2");
        expect(component.costumersDataSource).toEqual(costumerInOrder);
        })
  );

  it('should set the order of the costumer by status ASC',
    waitForAsync(() => {
      const fakeCostumers: Array<Costumer> = [
        {id:'1', first_name:"Felipe", last_name: 'Vargas', phone : '999999999',email : 'felipe.vargas@gmail.com', status : 'pending' },
        {id:'2', first_name:"Antonio", last_name: 'Alvarez', phone : '999999999',email : 'felipe.vargas@gmail.com', status : 'active' },
        {id:'3', first_name:"Jose", last_name: 'Alvarez', phone : '999999999',email : 'felipe.vargas@gmail.com', status : 'pending' },
        {id:'4', first_name:"Pedro", last_name: 'Alvarez', phone : '999999999',email : 'felipe.vargas@gmail.com', status : 'inactive' },
        {id:'5', first_name:"Juan", last_name: 'Sosa', phone : '999999999',email : 'felipe.vargas@gmail.com', status : 'active' }

      ];
      const costumerInOrder: Array<Costumer> = [
        {id:'2', first_name:"Antonio", last_name: 'Alvarez', phone : '999999999',email : 'felipe.vargas@gmail.com', status : 'active' },
        {id:'5', first_name:"Juan", last_name: 'Sosa', phone : '999999999',email : 'felipe.vargas@gmail.com', status : 'active' },
        {id:'4', first_name:"Pedro", last_name: 'Alvarez', phone : '999999999',email : 'felipe.vargas@gmail.com', status : 'inactive' },
        {id:'1', first_name:"Felipe", last_name: 'Vargas', phone : '999999999',email : 'felipe.vargas@gmail.com', status : 'pending' },
        {id:'3', first_name:"Jose", last_name: 'Alvarez', phone : '999999999',email : 'felipe.vargas@gmail.com', status : 'pending' }
      ];

      component.costumersDataSource = fakeCostumers;
      // component.ringsInOrder set this too.
      component.onChange("5");
      expect(component.costumersDataSource).toEqual(costumerInOrder);
    })
  );

  it('should set the order of the costumer by status DESC',
      waitForAsync(() => {
        const fakeCostumers: Array<Costumer> = [
          {id:'1', first_name:"Felipe", last_name: 'Vargas', phone : '999999999',email : 'felipe.vargas@gmail.com', status : 'pending' },
          {id:'2', first_name:"Antonio", last_name: 'Alvarez', phone : '999999999',email : 'felipe.vargas@gmail.com', status : 'active' },
          {id:'3', first_name:"Jose", last_name: 'Alvarez', phone : '999999999',email : 'felipe.vargas@gmail.com', status : 'pending' },
          {id:'4', first_name:"Pedro", last_name: 'Alvarez', phone : '999999999',email : 'felipe.vargas@gmail.com', status : 'inactive' },
          {id:'5', first_name:"Juan", last_name: 'Sosa', phone : '999999999',email : 'felipe.vargas@gmail.com', status : 'active' }
    
        ];
        const costumerInOrder: Array<Costumer> = [
          {id:'1', first_name:"Felipe", last_name: 'Vargas', phone : '999999999',email : 'felipe.vargas@gmail.com', status : 'pending' },
          {id:'3', first_name:"Jose", last_name: 'Alvarez', phone : '999999999',email : 'felipe.vargas@gmail.com', status : 'pending' },
          {id:'4', first_name:"Pedro", last_name: 'Alvarez', phone : '999999999',email : 'felipe.vargas@gmail.com', status : 'inactive' },
          {id:'2', first_name:"Antonio", last_name: 'Alvarez', phone : '999999999',email : 'felipe.vargas@gmail.com', status : 'active' },
          {id:'5', first_name:"Juan", last_name: 'Sosa', phone : '999999999',email : 'felipe.vargas@gmail.com', status : 'active' }
        ];

        component.costumersDataSource = fakeCostumers;
        // component.ringsInOrder set this too.
        component.onChange("6");
        expect(component.costumersDataSource).toEqual(costumerInOrder);
        })
  );  

  it('should filter the costumer array by LastName',
      waitForAsync(() => {
        const fakeCostumers: Array<Costumer> = [
          {id:'1', first_name:"Felipe", last_name: 'Vargas', phone : '999999999',email : 'felipe.vargas@gmail.com', status : 'pending' },
          {id:'2', first_name:"Antonio", last_name: 'Alvarez', phone : '999999999',email : 'felipe.vargas@gmail.com', status : 'active' },
          {id:'3', first_name:"Jose", last_name: 'Alvarez', phone : '999999999',email : 'felipe.vargas@gmail.com', status : 'pending' },
          {id:'4', first_name:"Pedro", last_name: 'Alvarez', phone : '999999999',email : 'felipe.vargas@gmail.com', status : 'inactive' },
          {id:'5', first_name:"Juan", last_name: 'Sosa', phone : '999999999',email : 'felipe.vargas@gmail.com', status : 'active' }
    
        ];
        const costumerFiltered: Array<Costumer> = [];


        component.costumersDataSource = fakeCostumers;
        // component.ringsInOrder set this too.
        component.applyFilter("Zamora");
        expect(component.costumersDataSource).toEqual(costumerFiltered);
        })
  );    

  it('should set Initial Data id Not In LocalStorage', () => {
    expect(component).toBeDefined();
    expect(component).toBeInstanceOf(HomeComponent);
    expect(component.costumers.length).toBe(2);
  });
 
});
