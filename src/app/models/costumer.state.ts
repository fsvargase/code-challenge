import { Costumer } from "./Costumer";

export interface CostumersState {
    costumers : ReadonlyArray<Costumer>,
    status : 'pending'| 'loading' | 'error' | 'success';
}