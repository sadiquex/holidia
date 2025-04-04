import Ionicons from '@expo/vector-icons/Ionicons';
import { Image, View } from 'react-native';

import { colours } from '~/app/core/theme/colours';

const MainHeader = () => {
  return (
    <View className="px-4 pb-4">
      <View className="flex-row items-center justify-between">
        <Image
          source={require('assets/logo.png')}
          style={{
            height: 20,
            width: 88,
          }}
          resizeMethod="auto"
        />
        <Ionicons name="sparkles" size={24} color={colours.PRIMARY} />
      </View>
    </View>
  );
};

export default MainHeader;
