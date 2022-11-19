import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faHome, faSave } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Costumer } from 'src/app/models/Costumer';
import { AppState } from 'src/state/app.state';
import { addCostumer, loadCostumers, updateCostumer } from 'src/state/costumer/costumer.actions';
import { selectListCostumers } from 'src/state/costumer/costumer.selectors';

@Component({
  selector: 'app-costumer',
  templateUrl: './costumer.component.html',
  styleUrls: ['./costumer.component.css']
})
export class CostumerComponent implements OnInit {
  faHome = faHome;
  faSave = faSave;
  public title: string='Create Costumer';
  public id: string='0';
  public costumers$ : Observable<readonly any[]> = new Observable();
  public form : FormGroup;
  public status: any[]=[];
  public isFormSubmitted = false;

  public costumer:Costumer ={
    id:'0',
    first_name:'',
    last_name:'',
    email:'',
    status:'pending',
    phone:''
  }

  constructor(private router: Router,private route: ActivatedRoute, private store : Store<AppState>) {
    this.form = new FormGroup ({
          first_name: new FormControl('', Validators.required),
          last_name: new FormControl('', Validators.required),
          email: new FormControl('', [ Validators.email,Validators.required]),     
          status: new FormControl('', Validators.required),
          phone: new FormControl('',Validators.compose([Validators.maxLength(10), Validators.pattern('^[0-9]+$')]))          
      });

   }

  ngOnInit(): void {
    this.status=[{"id":1, "name":"active"}, {"id":2, "name":"inactive"},  {"id":3, "name":"pending"}];
    this.costumers$ = this.store.select(selectListCostumers);
    this.store.dispatch(loadCostumers());     

    this.route.params.subscribe(params => {
      this.id = params['id'];      
      this.title = (this.id!='0')? 'Edit Costumer':'Create Costumer';
      if(this.id!='0'){
        this.costumers$.subscribe(res => {
          let filtreredResult = res.filter(r=> r.id ===this.id);
          this.costumer = {...filtreredResult[0]};
        })  
      }
    });
  }

  save(){    
    this.isFormSubmitted = true;
    if (this.form.valid) {
      if(this.id ==='0'){
        this.costumer.id = this.generateGuid(5);
        let costumer = this.costumer;
        this.store.dispatch(addCostumer({costumer}));
      }else{
        let costumer = this.costumer;
        this.store.dispatch(updateCostumer({costumer}));
      }
      
      this.goToList();
    }
  }

    goToList(){
        this.router.navigate(['/']);    
    }

    generateGuid (length:number){
      const ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = [];

      for (let i = 0; i < length; i++) {
        result.push(ALPHA.charAt(Math.floor(Math.random() * ALPHA.length)));
      }
      return result.join('');    
    }

}
