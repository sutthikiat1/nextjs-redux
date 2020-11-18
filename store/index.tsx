import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import ReduxThunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { MakeStore, createWrapper, Context } from "next-redux-wrapper";
import rootReducer from "./reducers/index";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
// // create a makeStore function
const makeStore: MakeStore<any> = (context: Context) => {
  let store;
  store = createStore(persistedReducer, applyMiddleware(ReduxThunk));
  store.persistor = persistStore(store);
  return store;
};

// export an assembled wrapper
export const wrapper = createWrapper<any>(makeStore, { debug: true });
