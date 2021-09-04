// import {AsyncStorage} from "react-native"
import { createStore,combineReducers,applyMiddleware } from "redux";
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

let ListMovies = (state=[],action) => {
    switch (action.type) {
        case "ADDMOVIES":
            return action.payload;
        case "PUSHMOVIE":
            state.push(action.payload);
            return state;
        case "RESET":
            return [];
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    listMovies:ListMovies
});

// Middleware: Redux Persist Config
const persistConfig = {
    // Root
    key: 'root',
    // Storage Method (React Native)
    storage,
    // Whitelist (Save Specific Reducers)
    whitelist: [
      "listMovies"
    ]
  };
  // Middleware: Redux Persist Persisted Reducer
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  // Redux: Store
  const store = createStore(
    persistedReducer,
    applyMiddleware(
      createLogger(),
    ),
  );
  // Middleware: Redux Persist Persister
  let persistor = persistStore(store);


  export {
    store,
    persistor,
  };