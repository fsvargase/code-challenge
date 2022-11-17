import { Component, OnInit } from '@angular/core';
import { Costumer } from 'src/app/models/Costumer';
import { SettingServiceService } from 'src/app/services/settingservice.service';
import {  faTrash, faEdit, faAdd } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public costumers: Costumer[]=[];
  public costumersDataSource: Costumer[]=[];
  public selectedSort:any="1";
  public filterValue:string="";
  faTrash = faTrash;
  faEdit= faEdit;
  faAdd= faAdd;

  constructor(private settingService : SettingServiceService, private router: Router) { }
  page: number = 1;
  closeResult: string = '';

  ngOnInit(): void {
    this.setInitialData("costumers");
  }

  setInitialData(key:string){

    if (localStorage.getItem(key) === null || localStorage.getItem(key) == '[]' ) {
      this.settingService.getInitialCostumers()
      .subscribe((response:Costumer[])=>{
        this.costumers = response;
        this.costumersDataSource = this.costumers;
        this.onChange("1");
        localStorage.setItem(key,JSON.stringify(response));  
      }) ;
      
    }else{
      this.settingService.getCostumersFromLS()
          .subscribe((response:Costumer[])=>{
            this.costumers = response;
            this.costumersDataSource = this.costumers;
            this.onChange("1");
          }) ;
    }    
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

}


