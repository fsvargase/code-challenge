
import { Costumer } from "src/app/models/Costumer";
import { addCostumer, filterByLastName, loadCostumers, loadCostumersSuccess, orderCostumers, removeCostumer, updateCostumer } from "./costumer.actions";
import { costumerReducer, initialState } from "./costumer.reducer";

describe('Costumer Reducer', () => {
  const costumer: Costumer = {
    id:"7Tst8",
    first_name:"GHEORGHE",
    last_name:"BONET",
    phone:"777275530",
    status:"active", 
    email:"cristina_80@caramail.com"
  };

  const costumer2: Costumer = {
    id:"IouTL",
    first_name:"GABRIELA",
    last_name:"FERRER",
    phone:"652365245",
    status:"inactive", 
    email:"luismanuel_20@usa.com"
  };

  const costumer3: Costumer = {
    id:"TXCfS",
    first_name:"GABRIELA",
    last_name:"PACHECO",
    phone:"732561714",
    status:"active", 
    email:"aida_94@lycos.de"
  };

  const costumer4: Costumer = {
    id:"vyU8W",
    first_name:"ROBERTO",
    last_name:"PACHECO",
    phone:"740284428",
    status:"pending", 
    email:"alonso_27@scientist.com"

  };

  const costumer5: Costumer = {
    id:"vyU8W",
    first_name:"ROBERTO",
    last_name:"ZAMORA",
    phone:"740284428",
    status:"pending", 
    email:"alonso_27@scientist.com"

  };

  const costumers: Costumer[]=[];


  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = { type: 'NOOP' } as any;
      const result = costumerReducer(undefined, action);

      expect(result).toBe(initialState);
    });
  });

  describe('[Costumer Component] Load Costumers', () => {
    it('should toggle status value loading', () => {
      const action = loadCostumers();
      const result = costumerReducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        status: 'loading'
      });
    });
  });

  describe('[Costumer Component] Load Costumers Success', () => {
    it('should toggle status value success', () => {
      const action = loadCostumersSuccess({costumers});
      const result = costumerReducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        status: 'success'
      });
    });
  });

  describe('[Costumer Component] Add Costumer', () => {
    it('should toggle loading state', () => {
      const action =  addCostumer({ costumer: costumer });
      const result = costumerReducer(initialState, action);

      expect(result.costumers.length).toEqual(1);
    });
  });

  describe('[Update Costumer] UpdateCostumer', () => {
    it('should update state', () => {
      const state = costumerReducer(initialState, addCostumer({ costumer: costumer }));
      let uptatedCostumer:Costumer = {id:"7Tst8", first_name: 'Darth', last_name: 'Vader',
      phone:"777275530",
      status:"active", 
      email:"cristina_80@caramail.com"};
      const action = updateCostumer({costumer:  uptatedCostumer});
      const result = costumerReducer(state, action);
      expect(result.costumers.length).toEqual(1);
    });
  });

  describe('[Costumer Component] Remove Costumer', () => {
    it('should delete item of state', () => {
      const state = costumerReducer(initialState, addCostumer({ costumer: costumer }));
      const action = removeCostumer({costumerId:  "7Tst8"});
      const result = costumerReducer(state, action);
      expect(result.costumers.length).toEqual(0);
    });
  });

  describe('[Costumer Component] Load Filtered Costumers', () => {
    it('should filter by last Last Name the state', () => {
      let state = costumerReducer(initialState, addCostumer({ costumer: costumer }));
      state = costumerReducer(state, addCostumer({ costumer: costumer2 }));
      const action = filterByLastName({filter:  "FERRER"});
      const result = costumerReducer(state, action);
      expect(result).toBeTruthy();
    });
  });

  describe('[Costumer Component] Order Costumers', () => {
    it('should order by First Name ASC the state', () => {
      let state = costumerReducer(initialState, addCostumer({ costumer: costumer }));
      state = costumerReducer(state, addCostumer({ costumer: costumer2 }));
      state = costumerReducer(state, addCostumer({ costumer: costumer3 }));
      state = costumerReducer(state, addCostumer({ costumer: costumer4 }));
      state = costumerReducer(state, addCostumer({ costumer: costumer5 }));
      const action = orderCostumers({order:  "1"});
      const result = costumerReducer(state, action);
      expect(result).toBeTruthy();
    });
  });

  describe('[Costumer Component] Order Costumers', () => {
    it('should order by First Name DESC the state', () => {
      let state = costumerReducer(initialState, addCostumer({ costumer: costumer }));
      state = costumerReducer(state, addCostumer({ costumer: costumer2 }));
      state = costumerReducer(state, addCostumer({ costumer: costumer3 }));
      state = costumerReducer(state, addCostumer({ costumer: costumer4 }));
      state = costumerReducer(state, addCostumer({ costumer: costumer5 }));
      const action = orderCostumers({order:  "2"});
      const result = costumerReducer(state, action);
      expect(result).toBeTruthy();
    });
  });

  describe('[Costumer Component] Order Costumers', () => {
    it('should order by Last Name ASC the state', () => {
      let state = costumerReducer(initialState, addCostumer({ costumer: costumer }));
      state = costumerReducer(state, addCostumer({ costumer: costumer2 }));
      state = costumerReducer(state, addCostumer({ costumer: costumer3 }));
      state = costumerReducer(state, addCostumer({ costumer: costumer4 }));
      state = costumerReducer(state, addCostumer({ costumer: costumer5 }));
      const action = orderCostumers({order:  "3"});
      const result = costumerReducer(state, action);
      expect(result).toBeTruthy();
    });
  });

  describe('[Costumer Component] Order Costumers', () => {
    it('should order by Last Name DESC the state', () => {
      let state = costumerReducer(initialState, addCostumer({ costumer: costumer }));
      state = costumerReducer(state, addCostumer({ costumer: costumer2 }));
      state = costumerReducer(state, addCostumer({ costumer: costumer3 }));
      state = costumerReducer(state, addCostumer({ costumer: costumer4 }));
      state = costumerReducer(state, addCostumer({ costumer: costumer5 }));
      const action = orderCostumers({order:  "4"});
      const result = costumerReducer(state, action);
      expect(result).toBeTruthy();
    });
  });

  describe('[Costumer Component] Order Costumers', () => {
    it('should order by status ASC the state', () => {
      let state = costumerReducer(initialState, addCostumer({ costumer: costumer }));
      state = costumerReducer(state, addCostumer({ costumer: costumer2 }));
      state = costumerReducer(state, addCostumer({ costumer: costumer3 }));
      state = costumerReducer(state, addCostumer({ costumer: costumer4 }));
      state = costumerReducer(state, addCostumer({ costumer: costumer5 }));
      const action = orderCostumers({order:  "5"});
      const result = costumerReducer(state, action);
      expect(result).toBeTruthy();
    });
  });

  describe('[Costumer Component] Order Costumers', () => {
    it('should order by status DESC the state', () => {
      let state = costumerReducer(initialState, addCostumer({ costumer: costumer }));
      state = costumerReducer(state, addCostumer({ costumer: costumer2 }));
      state = costumerReducer(state, addCostumer({ costumer: costumer3 }));
      state = costumerReducer(state, addCostumer({ costumer: costumer4 }));
      state = costumerReducer(state, addCostumer({ costumer: costumer5 }));

      const action = orderCostumers({order:  "6"});
      const result = costumerReducer(state, action);
      expect(result).toBeTruthy();
    });
  });

});


