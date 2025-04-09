import { useRouter } from 'expo-router';
import { SquircleButton } from 'expo-squircle-view';
import { Image, View } from 'react-native';

import { colours } from './core/theme/colours';

import { Container } from '~/components/container';
import CustomText from '~/components/text';
const WelcomeScreen = () => {
  const router = useRouter();

  return (
    <Container>
      <View className="mx-8 flex-1 items-center justify-center gap-8">
        <Image
          source={require('~/assets/logo.png')}
          className="h-[40px] w-[176px] flex-1"
          resizeMode="contain"
        />

        <View className="w-full">
          <SquircleButton
            backgroundColor={colours.PRIMARY}
            style={{
              paddingVertical: 16,
            }}
            className="w-full"
            preserveSmoothing
            cornerSmoothing={100}
            borderRadius={16}
            onPress={() => router.push('/signup')}>
            <CustomText variant="button" className="text-center">
              Get Started
            </CustomText>
          </SquircleButton>

          <SquircleButton
            style={{
              paddingVertical: 16,
            }}
            className="w-full"
            preserveSmoothing
            cornerSmoothing={100}
            borderRadius={16}
            onPress={() => router.push('/login')}>
            <CustomText variant="button" className="text-center text-primary">
              Already have an account? Login
            </CustomText>
          </SquircleButton>
        </View>
      </View>
    </Container>
  );
};

export default WelcomeScreen;
