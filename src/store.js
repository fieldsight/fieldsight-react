import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
// import { loadState, saveState } from "./localStorage";

// const persistedState = loadState();

const initialState = {};
const isDev = process.env.PLATFORM === "local";
const middleware = [thunk];

const store = isDev
  ? createStore(
      rootReducer,
      initialState,
      compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__()
      )
    )
  : createStore(
      rootReducer,
      initialState,
      compose(applyMiddleware(...middleware))
    );

// store.subscribe(() => {
//   saveState(store.getState());
// });

export default store;
