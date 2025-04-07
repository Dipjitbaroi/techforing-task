import { configureStore } from "@reduxjs/toolkit";
import { configApi } from "../services/api.config"; // Import the API service
import authReducer from "./authReducer"; // Import the authentication reducer

const store = configureStore({
  reducer: {
    // Add the API reducer here
    [configApi.reducerPath]: configApi.reducer,
    // Add the authentication reducer
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    // Add the API middleware
    getDefaultMiddleware().concat(configApi.middleware),
});

export default store;
