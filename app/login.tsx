import { Link, useRouter } from 'expo-router';
import { SquircleButton } from 'expo-squircle-view';
import { useState } from 'react';
import { ActivityIndicator, Image, TextInput, View } from 'react-native';
import { toast } from 'sonner-native';

import { client } from './core/api/client';
import useAuth from './core/auth';
import { colours } from './core/theme/colours';

import { Container } from '~/components/container';
import CustomText from '~/components/text';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { signIn } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setError(null);
      setIsLoading(true);

      const response = await client.post('/users/login', {
        email,
        password,
      });

      signIn({
        access: response.data.token,
      });
      toast.success('Logged in successfully');
      router.replace('/');
    } catch (error: any) {
      console.error('Login error:', error);
      setError(
        error.response?.data?.message || 'An error occurred during login. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      {/* <Header title="Login" /> */}

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

          {error && (
            <CustomText variant="body" className="text-red-500">
              {error}
            </CustomText>
          )}

          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setError(null);
            }}
            className="w-full rounded-xl border border-gray-300 bg-gray-100 px-2 py-4"
            autoCapitalize="none"
            keyboardType="email-address"
            editable={!isLoading}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setError(null);
            }}
            className="w-full rounded-xl border border-gray-300 bg-gray-100 px-2 py-4"
            autoCapitalize="none"
            secureTextEntry
            editable={!isLoading}
          />

          <SquircleButton
            className="mt-auto w-full"
            preserveSmoothing
            cornerSmoothing={100}
            borderRadius={16}
            onPress={handleLogin}
            disabled={isLoading}
            style={{
              backgroundColor: colours.PRIMARY,
              paddingVertical: 16,
              opacity: isLoading ? 0.7 : 1,
            }}>
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <CustomText variant="button" className="text-center">
                Login
              </CustomText>
            )}
          </SquircleButton>

          {/* sign up text */}
          <CustomText variant="body" className="text-center">
            Don't have an account?{' '}
            <Link href="/signup" className="text-primary">
              Sign up
            </Link>
          </CustomText>
        </View>
      </View>
    </Container>
  );
};

export default Login;
