import { createSelector } from "@ngrx/store";
import { CostumersState } from "src/app/models/costumer.state";
import { AppState } from "../app.state";

export const selectCostumers = (state : AppState) => state.costumers;

export const selectListCostumers = createSelector(
    selectCostumers,
    (state:CostumersState) => state.costumers
);

export const selectLoadingCostumers = createSelector(
    selectCostumers,
    (state:CostumersState) => state.status
);

