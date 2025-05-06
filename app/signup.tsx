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

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { signIn } = useAuth();

  // name, email and password states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // handle sign up
  const handleRegister = async () => {
    if (!name || !email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);

    // make a mutation to /users/ with name, email and password
    const response = await client.post('/users/', { name, email, password });
    console.log(response.data);
    toast.success('Account created successfully');
    setIsLoading(false);

    // log the user in after sign up
    const loginResponse = await client.post('/users/login', { email, password });
    console.log(loginResponse.data);
    signIn({
      access: loginResponse.data.token,
    });
    toast.success('Logged in successfully');
    router.replace('/');
  };

  return (
    <Container>
      {/* <Header title="Sign Up" /> */}

      <View className="flex-1 p-4">
        <View className="mt-24 flex items-center justify-center gap-4">
          <Image
            source={require('~/assets/logo.png')}
            className="h-[40px] w-[176px]"
            resizeMode="contain"
          />
          <CustomText variant="subtitle-primary" className="text-center">
            Let's get you started
          </CustomText>

          <CustomText variant="subtitle-primary" className="text-center text-red-600">
            {error}
          </CustomText>

          <TextInput
            placeholder="Name"
            value={name}
            onChangeText={setName}
            className="w-full rounded-xl border border-gray-300 bg-gray-100 px-2 py-4"
          />
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

          {/* squircle button */}
          <SquircleButton
            className="mt-auto w-full"
            preserveSmoothing
            cornerSmoothing={100}
            borderRadius={16}
            onPress={handleRegister}
            style={{
              backgroundColor: colours.PRIMARY,
              paddingVertical: 16,
            }}>
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <CustomText variant="button" className="text-center">
                Sign Up
              </CustomText>
            )}
          </SquircleButton>

          {/* login text */}
          <CustomText variant="body" className="text-center">
            Already have an account?{' '}
            <Link href="/login" className="text-primary">
              Login
            </Link>
          </CustomText>
        </View>
      </View>
    </Container>
  );
};

export default SignUp;
