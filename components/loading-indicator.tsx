import { ActivityIndicator, View } from 'react-native';

import { Container } from './container';

import { colours } from '~/app/core/theme/colours';

const LoadingIndicator = () => {
  return (
    <Container>
      <View className="flex flex-1 flex-row items-center justify-center">
        <ActivityIndicator size="large" color={colours.PRIMARY} />
      </View>
    </Container>
  );
};

export default LoadingIndicator;
