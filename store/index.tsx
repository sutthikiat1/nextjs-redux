import { createStore, applyMiddleware } from "redux";
import { useMemo } from "react";
import logger from "redux-logger";
import ReduxThunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { MakeStore, createWrapper, Context } from "next-redux-wrapper";
import rootReducer from "./reducers/index";
import { composeWithDevTools } from "redux-devtools-extension";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
// // create a makeStore function
// const makeStore: MakeStore<any> = (context: Context) => {
//   let store;
//   store = createStore(persistedReducer, applyMiddleware(ReduxThunk));
//   store.persistor = persistStore(store);
//   return store;
// };

const middleware = applyMiddleware(ReduxThunk);
function makeStore(initialState) {
  return createStore(
    persistedReducer,
    initialState,
    composeWithDevTools(middleware)
  );
}

let store;
export const initializeStore = (preloadedState) => {
  let _store = store ?? makeStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = makeStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}
