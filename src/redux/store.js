import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./cartRedux";
import userReducer from "./userRedux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};
// persistConfig mein Redux Persist ke liye basic configuration di gayi hai:

// key: State ko identify karne ke liye ek unique key ("root" yahan) diya jata hai.
// version: Version number, agar aap state structure mein kuch change karte hain toh.
// storage: Redux Persist ke liye kaunsa storage engine use karna hai woh specify kiya gaya hai (storage variable se).

const rootReducer = combineReducers({ user: userReducer, cart: cartReducer });
// rootReducer mein combineReducers se userReducer aur cartReducer ko combine kiya gaya hai. Yeh dono reducers alag slices (parts) ke liye responsible hain. user slice aur cart slice ke saath.

const persistedReducer = persistReducer(persistConfig, rootReducer);
// persistReducer ka use persistConfig ke saath rootReducer ko wrap karne ke liye kiya gaya hai. Yeh Redux Persist ko enable karta hai, jisse state ko persist kiya ja sake.

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
