import { createAction, props } from "@ngrx/store";
import { Costumer } from "../../app/models/Costumer";

export const addCostumer = createAction('[Costumer Component] Add Costumer', props<{costumer : Costumer }>());

export const updateCostumer = createAction('[Update Costumer] UpdateCostumer', props<{costumer: Costumer}>());

export const removeCostumer = createAction('[Costumer Component] Remove Costumer', props<{costumerId : string }>());

export const loadCostumers = createAction( '[Costumer Component] Load Costumers');

export const loadCostumersSuccess = createAction('[Costumer Component] Load Costumers Success', props<{costumers:Costumer[]}>() );

 export const filterByLastName = createAction('[Costumer Component] Load Filtered Costumers', props<{filter:string}>() );

 export const orderCostumers = createAction('[Costumer Component] Order Costumers', props<{order:string}>() );
