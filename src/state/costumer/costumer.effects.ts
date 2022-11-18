import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { SettingServiceService } from 'src/app/services/settingservice.service';
import { AppState } from '../app.state';
import { loadCostumers } from './costumer.actions';
 
@Injectable()
export class CostumersEffects {

  constructor( private actions$: Actions, private settingService : SettingServiceService
    )  {}

loadCostumers$ = createEffect(() => this.actions$.pipe(
    ofType(loadCostumers),
    mergeMap(() => this.settingService.getCostumers()
        .pipe(
                map(costumers => ({ type: '[Costumer Component] Load Costumers Success', payload: costumers })),
                catchError(() => EMPTY)
                ))        
    )
    );

}
