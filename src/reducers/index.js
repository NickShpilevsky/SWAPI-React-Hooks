import { createAction, createReducer} from "redux-act";

export const authorized = createAction();
export const setUserInfo = createAction();
export const allHeroes = createAction();
export const searchData = createAction();

const reducer = createReducer({
  [authorized]: store => ({
    ...store,
    authorized: true,
  }),
  [setUserInfo]: (store, payload) => ({
    ...store,
    user: {
      name: payload.name,
      email: payload.email,
      picture: payload.picture,
    }
  }),
  [allHeroes]: (store, payload) => ({
    ...store,
    allHeroes: payload,
  }),
  [searchData]: (store, payload) => ({
    ...store,
    searchData: payload,
  })
});

export default reducer;