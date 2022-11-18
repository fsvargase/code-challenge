import { ActionReducerMap } from "@ngrx/store";
import { CostumersState } from "src/app/models/costumer.state";
import { costumerReducer } from "./costumer/costumer.reducer";


export interface AppState {
    costumers : CostumersState
}

export const ROOT_REDUCERS:ActionReducerMap<AppState> = {costumers : costumerReducer};