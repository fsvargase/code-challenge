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
  private subscribe: any;
  public id: string='0';
  public costumers$ : Observable<readonly any[]> = new Observable();
  public form : FormGroup;
  public status: any[]=[];

  public costumer:Costumer ={
    id:'0',
    first_name:'',
    last_name:'',
    email:'',
    status:'',
    phone:''
  }

  constructor(private router: Router,private route: ActivatedRoute, private store : Store<AppState>) {
    this.form = new FormGroup ({
      id: new FormControl('', Validators.required),
      first_name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      email: new FormControl('', [ Validators.email,Validators.required]),
      status: new FormControl('', Validators.required),
      phone: new FormControl('')
  });

   }

  ngOnInit(): void {
    debugger;
    this.status=[{"id":1, "name":"active"}, {"id":2, "name":"inactive"},  {"id":3, "name":"pending"}];
    this.costumers$ = this.store.select(selectListCostumers);
    this.store.dispatch(loadCostumers());     

    this.subscribe = this.route.params.subscribe(params => {
      this.id = params['id'];      
      this.title = (this.id!='0')? 'Edit Costumer':'Create Costumer';
      if(this.id!='0'){
        this.costumers$.subscribe(res => {
          debugger;
          let filtreredResult = res.filter(r=> r.id ===this.id);
          this.costumer = {...filtreredResult[0]};
        })  
      }
      // dispatch action to load the details here.
    });
  }

  save(){    
    if(this.id ==='0'){
      this.costumer.id = this.generateGuid(5);
      let costumer = this.costumer;
      this.store.dispatch(addCostumer({costumer}));
    }else{
      let costumer = this.costumer;
      this.store.dispatch(updateCostumer({costumer}));
    }
    this.router.navigate(['/']);
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
