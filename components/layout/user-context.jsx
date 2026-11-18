"use client";

import { createContext, useContext } from "react";

// Passes the signed-in user from the dashboard layout to the sidebar, header and settings.
const UserContext = createContext(null);

export function UserProvider({ user, children }) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export function useCurrentUser() {
  return useContext(UserContext);
}
