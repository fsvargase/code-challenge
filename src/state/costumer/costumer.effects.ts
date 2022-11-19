import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, exhaustMap } from 'rxjs/operators';
import { Costumer } from 'src/app/models/Costumer';
import { SettingServiceService } from 'src/app/services/settingservice.service';
import { AppState } from '../app.state';
import { loadCostumers, loadCostumersSuccess } from './costumer.actions';
 
@Injectable()
export class CostumersEffects {

  constructor( private actions$: Actions, private settingService : SettingServiceService
    )  {}

    loadCostumers$ = createEffect(() =>
      this.actions$.pipe(
        ofType(loadCostumers),
        exhaustMap(() =>
          this.settingService.getCostumers().pipe(
            map((response:Costumer[]) => {
              return  loadCostumersSuccess({ costumers: response });
            })
          )
        )
      )
    );

}
