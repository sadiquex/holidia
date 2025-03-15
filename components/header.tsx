import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';

import Text from '~/components/text';

type Props = {
  title: string;
  headerAction?: {
    name: keyof typeof Ionicons.glyphMap;
    onPress: () => void;
  };
};
const Header = ({ title, headerAction }: Props) => {
  const router = useRouter();

  return (
    <View className="mb-4 flex-row items-center justify-between px-2">
      <View className="flex flex-row items-center justify-center">
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} />
        </Pressable>
        <Text variant="subtitle" className="text-center">
          {title}
        </Text>
      </View>

      {headerAction && (
        <Pressable onPress={headerAction.onPress}>
          <Ionicons name={headerAction.name} size={24} />
        </Pressable>
      )}
    </View>
  );
};

export default Header;
