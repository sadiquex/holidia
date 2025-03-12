import { ThemeProvider } from '@react-navigation/native';
import '../global.css';
import { Stack } from 'expo-router';
import { ReactNode } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import theme from './core/theme/use-theme-config';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <GestureHandlerRootView>
      <ThemeProvider value={theme}>{children}</ThemeProvider>
    </GestureHandlerRootView>
  );
};

export default function RootLayout() {
  return (
    <Providers>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </Providers>
  );
}
