import { configureStore } from "@reduxjs/toolkit";
import { configApi } from "../services/api.config";

export default configureStore({
  reducer: {
    [configApi.reducerPath]: configApi.reducer, // Add your API reducer here
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(configApi.middleware), // Include API middleware
});
