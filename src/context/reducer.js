import { REMOVE, INCREASE, DECREASE, ADDTOCART, CLEARCART } from "./actions";

export default (state, action) => {
  switch (action.type) {
    case REMOVE:
      return state.filter((item) => item.id !== action.payload);

    case INCREASE:
      return state.map((item) => {
        return item.id === action.payload
          ? { ...item, amount: item.amount + 1 }
          : { ...item };
      });

    case DECREASE:
      return state.map((item) => {
        return item === action.payload
          ? { ...item, amount: item.amount - 1 }
          : { ...item };
      });
    case ADDTOCART:
      const { id, image, title, price } = action.payload;
      let newProdcut = { id, image, title, price, amount: 1 };
      return [...state, newProdcut];

    case CLEARCART:
      return [];

    default:
      return state;
  }
};
