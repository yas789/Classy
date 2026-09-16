import { createContext } from "react";

export type MockUser = {
  id: string;
  email: string;
};

export type MockSession = {
  user: MockUser;
};

export type AuthContextValue = {
  isLoading: boolean;
  session: MockSession | null;
  user: MockUser | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);
