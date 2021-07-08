import { createStore, applyMiddleware, compose } from "redux";
import logger from 'redux-logger'
import thunk from "redux-thunk";
import reducers from "./reducers";

const composeEnhancer =
  (process.env.NODE_ENV !== 'production' &&
    typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const middleWare = (process.env.NODE_ENV !== 'production' &&
  typeof window !== 'undefined') ? [thunk, logger] : [thunk];

const store = createStore(
  reducers,composeEnhancer(applyMiddleware(...middleWare))
);

export default store;