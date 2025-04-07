import store from "../store/store"; // Import the Redux store
import { login as loginAction, logout as logoutAction } from "../store/authReducer"; // Import actions from authReducer

// Check if a user is authenticated
export const isAuthenticated = () => {
  const state = store.getState(); // Get the current state from Redux
  const user = state.auth.user; // Get the user from Redux state
  const token = localStorage.getItem("token"); // Check if a token exists in localStorage

  if (user && token) {
    return true; // User is authenticated
  } else if (!user && token) {
    // User is not in Redux but token exists
    // Fetch user details logic can be added here
    return true;
  } else {
    return false; // User is not authenticated
  }
};

// Log in the user and save the token in localStorage
export const login = (token, user) => {
  localStorage.setItem("token", token); // Save token
  store.dispatch(loginAction(user)); // Dispatch login action to store user in Redux
};

// Log out the user and clear the token
export const logout = () => {
  localStorage.removeItem("token"); // Remove token
  store.dispatch(logoutAction()); // Dispatch logout action to clear Redux state
};
