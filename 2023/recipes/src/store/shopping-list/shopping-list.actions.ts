import {createAction, props} from "@ngrx/store";

import {ShoppingListItem} from "../../app/shared/shopping-list-item.model";

export const addItems = createAction("[SHOPPING_LIST] addItems", props<{payload: ShoppingListItem[]}>());
export const addItem = createAction("[SHOPPING_LIST] addItem", props<{payload: ShoppingListItem}>());
export const updateItem = createAction("[SHOPPING_LIST] updateItem", props<{payload: ShoppingListItem}>());
export const deleteItem = createAction("[SHOPPING_LIST] deleteItem");
export const setActiveItemIndex = createAction("[SHOPPING_LIST] setActiveItemIndex", props<{payload: null | number}>())
