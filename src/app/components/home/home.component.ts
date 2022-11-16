import { Component, OnInit } from '@angular/core';
import { Costumer } from 'src/app/models/Costumer';
import { SettingServiceService } from 'src/app/services/settingservice.service';
import {  faTrash, faEdit, faAdd, faClose } from '@fortawesome/free-solid-svg-icons';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public costumers: Costumer[]=[];
  public costumersDataSource: Costumer[]=[];
  public selectedSort:any="1";
  faTrash = faTrash;
  faEdit= faEdit;
  faAdd= faAdd;
  faClose= faClose;

  constructor(private settingService : SettingServiceService, private modalService: NgbModal) { }
  p: number = 1;
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
        this.costumersDataSource.sort((a, b) => {
          if (a.first_name == b.first_name) { return 0;}
          if (a.first_name < b.first_name) { return -1;}
          return 1;
        });
        localStorage.setItem(key,JSON.stringify(response));  
      }) ;
      
    }else{
      this.settingService.getCostumersFromLS()
          .subscribe((response:Costumer[])=>{
            this.costumers = response;
            this.costumersDataSource = this.costumers;
            this.costumersDataSource.sort((a, b) => {
              if (a.first_name == b.first_name) { return 0;}
              if (a.first_name < b.first_name) {  return -1;}
              return 1;
            });
          }) ;
    }    
  }


  getFullName(costumer:Costumer){
    return costumer.first_name+' '+costumer.last_name;
  }

  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  } 


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  applyFilter(event: Event) { 
    let filterParameter = (event.target as HTMLInputElement).value;
    console.log(filterParameter);
    filterParameter = filterParameter.trim(); 
    filterParameter = filterParameter.toLowerCase();
    console.log(this.costumersDataSource.length);
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
          if (a.last_name == b.status) { return 0;}
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


