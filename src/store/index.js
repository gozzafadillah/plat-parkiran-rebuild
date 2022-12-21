import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./Reducer";

export const Store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default Store;
