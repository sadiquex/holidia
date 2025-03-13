import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';

import Text from '~/components/text';

type Props = {
  title: string;
};
const Header = ({ title }: Props) => {
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
    </View>
  );
};

export default Header;
