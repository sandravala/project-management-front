import { configureStore } from "@reduxjs/toolkit";
import user from "./slices/UserSlice";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage,
}

const persistedUser = persistReducer(persistConfig, user)

const store = configureStore({
  reducer: {
    persistedUser
  },
  middleware: [thunk]
});

const persistor = persistStore(store);

export {store, persistor}
