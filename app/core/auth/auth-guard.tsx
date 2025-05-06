import { useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';

import useAuth from './index';

/**
 * auth guard component that handles authentication state and redirects
 * redirects to login if user is not authenticated and tries to access protected routes
 */
export function AuthGuard({ children }: { children: React.ReactNode }) {
  const segments = useSegments();
  const router = useRouter();
  const { status } = useAuth();

  useEffect(() => {
    const inAuthGroup = segments[0] === '(auth)';
    const inProtectedGroup = segments[0] === '(tabs)';

    if (status === 'signOut' && inProtectedGroup) {
      // redirect to login if user is not authenticated and tries to access protected routes
      router.replace('/login');
    } else if (status === 'signIn' && inAuthGroup) {
      // redirect to home if user is authenticated and tries to access auth routes
      router.replace('/');
    }
  }, [status, segments]);

  return <>{children}</>;
}
