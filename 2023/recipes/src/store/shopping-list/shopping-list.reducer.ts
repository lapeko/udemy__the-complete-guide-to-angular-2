import {createReducer, on} from "@ngrx/store";

import {ShoppingListItem} from "../../app/shared/shopping-list-item.model";
import * as shoppingListActions from "./shopping-list.actions";

interface ShoppingListState {
  items: ShoppingListItem[];
  activeItemIndex: number | null;
}

const initialState = {
  items: [],
  activeItemIndex: null,
};

export const shoppingListReducer = createReducer<ShoppingListState>(
  initialState,
  on(shoppingListActions.addItems, (state, {payload}) => ({
    ...state,
    activeItemIndex: null,
    items: [...state.items, ...payload]
  })),
  on(shoppingListActions.addItem, (state, {payload}) => ({
    ...state,
    activeItemIndex: null,
    items: [...state.items, payload],
  })),
  on(shoppingListActions.updateItem, (state, {payload}) => {
    const items = [...state.items];
    items[state.activeItemIndex] = payload;
    return {...state, activeItemIndex: null, items};
  }),
  on(shoppingListActions.deleteItem, (state) => {
    const items = state.items.filter((_, index) => index !== state.activeItemIndex);
    return {...state, activeItemIndex: null, items};
  }),
  on(shoppingListActions.setActiveItemIndex, (state, {payload}) => ({...state, activeItemIndex: payload})),
);
