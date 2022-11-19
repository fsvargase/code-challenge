import { Component, OnInit } from '@angular/core';
import { Costumer } from 'src/app/models/Costumer';
import {  faTrash, faEdit, faAdd } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppState } from 'src/state/app.state';
import { Store } from '@ngrx/store';
import { selectListCostumers, selectLoadingCostumers } from 'src/state/costumer/costumer.selectors';
import { filterByLastName, loadCostumers, orderCostumers, removeCostumer } from 'src/state/costumer/costumer.actions';

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
    let filter = event;
    filter = filter.trim(); 
    filter = filter.toLowerCase();
    this.store.dispatch(filterByLastName({filter}));
  }

  onChange(order:any){
    this.store.dispatch(orderCostumers({order}));
  }

  removeCostumer(costumerId:string) {
    if(confirm("Press a button!")===true){
      this.store.dispatch(removeCostumer({costumerId}));
    }
  }

  editCostumer(costumerId:string) {    
    this.router.navigate(['/costumer',costumerId]);
  }

}


