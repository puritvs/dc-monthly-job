"use client";

import { IAccount } from "@/models/Accounts";
import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";

export type UserContextParams = {
  user: IAccount | null;
  storeUser: (newUser: IAccount) => void;
  clearUser: () => void;
};

export const UserContext = createContext<UserContextParams>({
  user: null,
  storeUser: (newUser: IAccount) => {},
  clearUser: () => {},
});

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<IAccount | null>(null);

  const storeUser = (newUser: IAccount) => {
    setUser(newUser);
  };
  const clearUser = () => {
    setUser(null);
  };
  return (
    <UserContext.Provider value={{ user, storeUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);

  return context;
}
