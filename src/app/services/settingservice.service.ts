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

  public getCostumers(): Observable<Costumer[]>{
    const serializedState = localStorage.getItem("costumers");
    if(serializedState===null || serializedState =='[]' ) {
      let costumers:Costumer[] = this.getInitCostumers();
      localStorage.setItem("costumers",JSON.stringify(costumers));  
      return of(costumers).pipe( delay(500));
    }else{
      let costumers = JSON.parse(localStorage.getItem("costumers")|| "[]");
      return of(costumers).pipe( delay(500));
    }
  }

  public getInitCostumers():Costumer[]{
    let costumers:Costumer[]=
      [
        {"id":"RaQ5V","first_name":"LEONOR","last_name":"MILLAN","phone":"776713982","status":"active" ,"email":"mariajosefa_73@earthling.net"},       
        {"id":"kda9U","first_name":"IGOR","last_name":"LEAL","phone":"659276322","status":"active", "email":"celia_01@email.com"},
        {"id":"4zyhk","first_name":"HELENA","last_name":"ROYO","phone":"607002584","status":"active", "email":"candido_78@hotmail.co.uk"},
        {"id":"4dRWc","first_name":"ASIER","last_name":"ZAPATA","phone":"788614594","status":"active", "email":"sheila_21@unforgettable.com"},
        {"id":"RG89l","first_name":"MODESTO","last_name":"OJEDA","phone":"681602551","status":"active", "email":"agustin_57@lycos.es"},
        {"id":"yQFyK","first_name":"RAQUEL","last_name":"TIRADO","phone":"690850583","status":"active", "email":"anamaria_65@gmail.com"},
        {"id":"PLnvR","first_name":"CRISTOBAL","last_name":"MOYA","phone":"733158589","status":"active", "email":"alexander_64@witty.com"},
        {"id":"JD9C8","first_name":"ELIA","last_name":"GALLARDO","phone":"600378829","status":"active", "email":"alfredo_77@lycos.at"},
        {"id":"I5Czm","first_name":"JUAN RAMON","last_name":"SALAZAR","phone":"746460917","status":"active", "email":"benito_04@whoever.com"},
        {"id":"sq4lI","first_name":"ANTONIO JOSE","last_name":"REDONDO","phone":"675881099","status":"active", "email":"josemiguel_59@btinternet.com"},
        {"id":"wuFqz","first_name":"MARIA ASUNCION","last_name":"LEON","phone":"604242602","status":"active", "email":"simon_67@hotmail.com"},
        {"id":"ym3po","first_name":"ASIER","last_name":"ROMERO","phone":"655928483","status":"active", "email":"jennifer_23@netscape.net"},
        {"id":"NoXNv","first_name":"MARIA JOSE","last_name":"PASTOR","phone":"752765451","status":"active", "email":"begona_14@lycos.it"},
        {"id":"Gpmt4","first_name":"SERGIO","last_name":"EGEA","phone":"640782869","status":"active", "email":"helena_77@mail.com"},
        {"id":"EkGfk","first_name":"MARIA DOLORS","last_name":"FERNANDEZ","phone":"637469612","status":"active", "email":"joan_30@yahoo.com"},
        {"id":"iqhjv","first_name":"FELISA","last_name":"CARO","phone":"600130880","status":"active", "email":"alexis_79@writeme.com"},
        {"id":"vyU8W","first_name":"ROBERTO","last_name":"PACHECO","phone":"740284428","status":"active", "email":"alonso_27@scientist.com"},
        {"id":"TXCfS","first_name":"SONIA","last_name":"LAFUENTE","phone":"732561714","status":"active", "email":"aida_94@lycos.de"},
        {"id":"IouTL","first_name":"GABRIELA","last_name":"FERRER","phone":"652365245","status":"active", "email":"luismanuel_20@usa.com"},
        {"id":"7Tst8","first_name":"GHEORGHE","last_name":"BONET","phone":"777275530","status":"active", "email":"cristina_80@caramail.com"}
    ];
    return costumers;
}

}
