import { createReducer, on } from "@ngrx/store";
import { Costumer } from "src/app/models/Costumer";
import { CostumersState } from "src/app/models/costumer.state";
import { addCostumer, filterByLastName, loadCostumers, loadCostumersSuccess, orderCostumers, removeCostumer, updateCostumer } from "./costumer.actions";



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
 
    //Filter Costumers By LastName
    on(filterByLastName, (state, {filter}) => {   
        let costumersData : Costumer[] = JSON.parse(localStorage.getItem("costumers")|| "[]");  
        let filteredCostumers = costumersData.filter(costumer=>costumer.last_name.toLowerCase().includes(filter));
        return {...state, costumers:filteredCostumers};
      
      }),     
      
    //Order Customers BY First Name, Last Name And Status
    on(orderCostumers, (state, {order}) => {   
        let costumersData : Costumer[]=[];
        for (let index = 0; index < state.costumers.length; index++) {
            costumersData.push(state.costumers[index]) ;            
        }
        switch (order) {
            case "1": // ASC FirstName           
                costumersData= costumersData.sort((a, b) => {
                                                if (a.first_name == b.first_name) { return 0;}
                                                if (a.first_name < b.first_name) {  return -1;}
                                                return 1;
                                            });
                break;
            case "2": // DESC FirstName           
                costumersData= costumersData.sort((a, b) => {
                                                if (a.first_name == b.first_name) { return 0;}
                                                if (a.first_name > b.first_name) {  return -1;}
                                                return 1;
                                            });            
                break;
            case "3":  // ASC LastName   
                costumersData= costumersData.sort((a, b) => {
                                                    if (a.last_name == b.last_name) { return 0;}
                                                    if (a.last_name < b.last_name) {  return -1;}
                                                    return 1;
                                                });
                break;
            case "4":  // DESC LastName   
                costumersData= costumersData.sort((a, b) => {
                                                if (a.last_name == b.last_name) { return 0;}
                                                if (a.last_name > b.last_name) {  return -1;}
                                                return 1;
                                            });
                break;
            case "5":  // ASC status
                costumersData= costumersData.sort((a, b) => {
                                                if (a.status == b.status) { return 0;}
                                                if (a.status < b.status) {  return -1;}
                                                return 1;
                                            });
                break;
            case "6":  // DESC status
                costumersData= costumersData.sort((a, b) => {
                                                    if (a.status == b.status) { return 0;}
                                                    if (a.status > b.status) {  return -1;}
                                                    return 1;
                                                });
                break;
        }
        return {...state, costumers:costumersData};
        
        }),     
);