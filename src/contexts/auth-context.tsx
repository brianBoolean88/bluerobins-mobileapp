import React, { createContext, useContext } from "react";

export const AuthContext = createContext<{
  isLoggedIn: boolean;
  setIsLoggedIn: (val: boolean) => void;
}>({ isLoggedIn: false, setIsLoggedIn: () => {} });

export const useAuthContext = () => useContext(AuthContext);
