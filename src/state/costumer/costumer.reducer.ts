import { createReducer, on } from "@ngrx/store";
import { Costumer } from "src/app/models/Costumer";
import { CostumersState } from "src/app/models/costumer.state";
import { addCostumer, loadCostumers, loadCostumersSuccess, removeCostumer, updateCostumer } from "./costumer.actions";



export const initialState: CostumersState = {
    costumers : [],
    status: 'pending'
}

export const costumerReducer = createReducer(
    // the initial state
    initialState,
    //Add the new costumer to the costumers array
    on(addCostumer, (state, {costumer}) => { 
        let costumersData : Costumer[] = JSON.parse(localStorage.getItem("costumers")|| "[]");
        costumersData.push(costumer);
        localStorage.setItem("costumers",JSON.stringify(costumersData));  
        return {...state, costumers:state.costumers.concat(costumer)}}),
    //Update a costumer in the costumers array
    on(updateCostumer, (state, {costumer}) => { 
        let costumersData : Costumer[] = JSON.parse(localStorage.getItem("costumers")|| "[]");
        const index = costumersData.findIndex(costumer => costumer.id === costumer.id);
        costumersData[index] = costumer;
        localStorage.setItem("costumers",JSON.stringify(costumersData));  
        return { ...state, costumer: costumer};}),

    //Remove a costumer to the costumers array
    on(removeCostumer, (state, {costumerId}) => { 
        let remainingCostumeres = state.costumers.filter((item) => item.id !== costumerId);
        localStorage.setItem("costumers",JSON.stringify(remainingCostumeres));  
        return { ...state, costumers: remainingCostumeres};}),
    //Trigger loading the costumers
    on(loadCostumers, (state) => { return {...state, status:'loading'}}),

    //Handle successfully loaded costumers
    on(loadCostumersSuccess, (state, {costumers}) => {                              
                              return {...state, costumers:costumers, status:'success'};
                            
                            }),    
 
);