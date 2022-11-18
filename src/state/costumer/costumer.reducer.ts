import { createReducer, on } from "@ngrx/store";
import { CostumersState } from "src/app/models/costumer.state";
import { addCostumer, loadCostumers, loadCostumersSuccess, removeCostumer } from "./costumer.actions";



export const initialState: CostumersState = {
    costumers : [],
    status: 'pending'
}

export const costumerReducer = createReducer(
    // the initial state
    initialState,
    //Add the new costumer to the costumers array
    on(addCostumer, (state, {costumer}) => { return {...state, 
                                                     costumers:state.costumers.concat(costumer)}}),
    //Remove a costumer to the costumers array
    on(removeCostumer, (state, {costumerId}) => { return { ...state, 
                                                         costumers: state.costumers.filter((item) => item.id !== costumerId)};}),
    //Trigger loading the costumers
    on(loadCostumers, (state) => { return {...state, status:'loading'}}),

    //Handle successfully loaded costumers
    on(loadCostumersSuccess, (state, {costumers}) => {                              
                              return {...state, costumers:costumers, status:'success'};
                            
                            }),    
 
);