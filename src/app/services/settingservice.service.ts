import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, Observable, of } from 'rxjs';
import {Costumer} from '../models/Costumer';

@Injectable({
  providedIn: 'root'
})
export class SettingServiceService {

  public url = "assets/data/";

  constructor(private http:HttpClient) { }

  public getInitialCostumers(): Observable<Costumer[]>{
    return this.http.get<Costumer[]>(this.url + 'init_data.json');
  }

  public getCostumersFromLS(): Observable<Costumer[]>{    
    let costumers = JSON.parse(localStorage.getItem("costumers")|| "[]");

    return of(costumers).pipe(
      delay(500)
    );
  }

}
