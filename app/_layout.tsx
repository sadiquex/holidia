import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { ThemeProvider } from '@react-navigation/native';
import '../global.css';
import { Stack } from 'expo-router';
import { ReactNode, useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { APIProvider } from './core/api/api-provider';
import { AuthGuard } from './core/auth/auth-guard';
import { hydrateAuth } from './core/auth';
import theme from './core/theme/use-theme-config';
import { logApiUrl } from './core/utils/log';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

const Providers = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    logApiUrl();
    // initialize auth state on app launch
    hydrateAuth();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <APIProvider>
        <ThemeProvider value={theme}>
          <BottomSheetModalProvider>
            <AuthGuard>{children}</AuthGuard>
          </BottomSheetModalProvider>
        </ThemeProvider>
      </APIProvider>
    </GestureHandlerRootView>
  );
};

export default function RootLayout() {
  // stack is the main navigation in the app
  return (
    <Providers>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="search" options={{ headerShown: false }} />
        <Stack.Screen name="properties/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="checkout" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
        <Stack.Screen name="welcome" options={{ headerShown: false }} />
      </Stack>
    </Providers>
  );
}
