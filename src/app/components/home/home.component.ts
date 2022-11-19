import { Component, OnInit } from '@angular/core';
import { Costumer } from 'src/app/models/Costumer';
import {  faTrash, faEdit, faAdd } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppState } from 'src/state/app.state';
import { Store } from '@ngrx/store';
import { selectListCostumers, selectLoadingCostumers } from 'src/state/costumer/costumer.selectors';
import { loadCostumers, removeCostumer } from 'src/state/costumer/costumer.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public loading$ : Observable<string> = new Observable()
  public costumers$ : Observable<any> = new Observable()
  public costumers: Costumer[]=[];
  public costumersDataSource: Costumer[]=[];
  public selectedSort:any="1";
  public filterValue:string="";
  faTrash = faTrash;
  faEdit= faEdit;
  faAdd= faAdd;

  constructor(private router: Router,
              private store: Store<AppState>)
              { }
  public page: number = 1;
  public closeResult: string = '';

  ngOnInit(): void { 
    
    this.loading$ = this.store.select(selectLoadingCostumers);
    this.costumers$ = this.store.select(selectListCostumers); 
    this.store.dispatch(loadCostumers());     
  }

  addCostumer(){
    this.router.navigate(['/costumer',0]);
  }

  getFullName(costumer:Costumer){
    return costumer.first_name+' '+costumer.last_name;
  }

  applyFilter(event:any) { 
    let filterParameter = event;
    filterParameter = filterParameter.trim(); 
    filterParameter = filterParameter.toLowerCase();
    this.costumersDataSource = this.costumers.filter(cos => cos.last_name.toLowerCase().includes(filterParameter));    
  }

  onChange(selectedSort:any){
    switch (selectedSort) {
      case "1":
        this.costumersDataSource.sort((a, b) => {
          if (a.first_name == b.first_name) { return 0;}
          if (a.first_name < b.first_name) {  return -1;}
          return 1;
        });
        break;
      case "2":
        this.costumersDataSource.sort((a, b) => {
          if (a.first_name == b.first_name) { return 0;}
          if (a.first_name > b.first_name) {  return -1;}
          return 1;
        });
        break;
      case "3":
        this.costumersDataSource.sort((a, b) => {
          if (a.last_name == b.last_name) { return 0;}
          if (a.last_name < b.last_name) {  return -1;}
          return 1;
        });
        break;
      case "4":
        this.costumersDataSource.sort((a, b) => {
          if (a.last_name == b.last_name) { return 0;}
          if (a.last_name > b.last_name) {  return -1;}
          return 1;
        });
        break;
      case "5":
        this.costumersDataSource.sort((a, b) => {
          if (a.status == b.status) { return 0;}
          if (a.status < b.status) {  return -1;}
          return 1;
        });
        break;
      case "6":
        this.costumersDataSource.sort((a, b) => {
          if (a.status == b.status) { return 0;}
          if (a.status > b.status) {  return -1;}
          return 1;
        });
        break;            
    }
  }

  removeCostumer(costumerId:string) {
    if(confirm("Press a button!")===true){
      this.store.dispatch(removeCostumer({costumerId}));
    }
  //  this.costumers = this.costumers.filter(costumer=>costumer.id!=costumerId);
   // this.localStorageService.saveData("costumers",JSON.stringify(this.costumers));
    //this.dataSource.data = this.costumers;

   // this.openSnackBar('Costumer Deleted','Delete');
 }

}


