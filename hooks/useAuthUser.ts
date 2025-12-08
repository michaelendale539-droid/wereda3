// hooks/useAuthUser.ts
'use client';
import { useState, useEffect } from 'react';

// Define the type for the User Session
export interface UserSession {
  name: string;
  email: string;
  role: 'admin' | 'staff' | 'citizen'; 
  isLoggedIn: boolean;
}

// Simulated authentication check function
const fetchUserSession = (): UserSession | null => {
  // --- IN A REAL APP, THIS WOULD FETCH SESSION COOKIES/TOKENS ---
  
  // Placeholder: Simulate a logged-in Staff user
  // For production, this would securely check the session/JWT.
  const simulatedUser: UserSession = {
    name: 'Ato Elias Kebede',
    email: 'elias.k@w3pp.gov',
    role: 'staff',
    isLoggedIn: true,
  };
  
  // Return the user, or null if logged out
  // return null; // Uncomment to simulate a logged-out state
  return simulatedUser;
};

export const useAuthUser = () => {
  const [session, setSession] = useState<UserSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching the session status
    const user = fetchUserSession();
    setSession(user);
    setLoading(false);
  }, []);

  return { session, loading };
};