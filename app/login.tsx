// generate login screen
import { SquircleButton } from 'expo-squircle-view';
import { useState } from 'react';
import { ActivityIndicator, Image, TextInput, View } from 'react-native';

import { colours } from './core/theme/colours';

import { Container } from '~/components/container';
import Header from '~/components/header';
import CustomText from '~/components/text';
import { useRouter } from 'expo-router';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    router.push('/');
  };

  return (
    <Container>
      <Header title="Login" />

      <View className="flex-1 p-4">
        <View className="mt-24 flex items-center justify-center gap-4">
          <Image
            source={require('~/assets/logo.png')}
            className="h-[40px] w-[176px]"
            resizeMode="contain"
          />
          <CustomText variant="subtitle-primary" className="text-center">
            Welcome back
          </CustomText>

          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            className="w-full rounded-xl border border-gray-300 bg-gray-100 px-2 py-4"
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            className="w-full rounded-xl border border-gray-300 bg-gray-100 px-2 py-4"
            autoCapitalize="none"
            secureTextEntry
          />

          <SquircleButton
            className="mt-auto w-full"
            preserveSmoothing
            cornerSmoothing={100}
            borderRadius={16}
            onPress={handleLogin}
            style={{
              backgroundColor: colours.PRIMARY,
              paddingVertical: 16,
            }}>
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <CustomText variant="button" className="text-center">
                Login
              </CustomText>
            )}
          </SquircleButton>
        </View>
      </View>
    </Container>
  );
};

export default Login;
