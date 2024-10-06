import {createAction, props} from "@ngrx/store";
import {User} from "../../app/auth/user";
import {Credentials} from "../../app/shared/types";

export const initialSignIn = createAction("[AUTH] initialSignIn");
export const signIn = createAction("[AUTH] signIn", props<{ payload: Credentials }>());
export const signOut = createAction("[AUTH] signOut");
export const signUp = createAction("[AUTH] signUp", props<{ payload: Credentials }>());
export const authenticated = createAction("[AUTH] authenticated", props<{ payload: User | null }>());
export const authFailed = createAction("[AUTH] authFailed", props<{ payload: string }>());
