import { useEffect, useState } from "react";
import { AuthContext, type MockSession } from "./auth-context";

const storageKey = "classy.mockSession";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<MockSession | null>(null);

  useEffect(() => {
    const rawSession = window.localStorage.getItem(storageKey);
    setSession(rawSession ? (JSON.parse(rawSession) as MockSession) : null);
    setIsLoading(false);
  }, []);

  async function signIn(email: string, password: string) {
    if (!email || !password) {
      throw new Error("Email and password are required.");
    }

    const nextSession: MockSession = {
      user: {
        id: "mock-teacher-1",
        email,
      },
    };

    window.localStorage.setItem(storageKey, JSON.stringify(nextSession));
    setSession(nextSession);
  }

  async function signOut() {
    window.localStorage.removeItem(storageKey);
    setSession(null);
  }

  return (
    <AuthContext.Provider
      value={{ isLoading, session, user: session?.user ?? null, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}
