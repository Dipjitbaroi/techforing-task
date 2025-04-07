export const isAuthenticated = () => {
    return localStorage.getItem("user") ? true : false;
  };
  
  export const login = () => {
    localStorage.setItem("user", "loggedIn");
  };
  
  export const logout = () => {
    localStorage.removeItem("user");
  };
  