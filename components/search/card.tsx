import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';

import ImageWithSquircle from '../image-with-squircle';
import CustomText from '../text';

import { Property } from '~/app/core/types';
import { WIDTH } from '~/app/core/utils/layout';

type Props = {
  property: Property;
};
const SearchCard = ({ property }: Props) => {
  const router = useRouter();
  const handlePress = () => {
    router.push(`/properties/${property.id}`);
  };

  return (
    <Pressable className="border-b border-gray-200 p-4" onPress={handlePress}>
      <View className="relative">
        <View className="mb-4 overflow-hidden">
          <ImageWithSquircle image={property.images[0]} width={WIDTH - 40} />
        </View>
        <View className="absolute right-6 top-6">
          <Ionicons
            name={property.is_favorite ? 'heart' : 'heart-outline'}
            size={24}
            color="white"
          />
        </View>
      </View>

      <View className="px-2">
        <View className="flex-row items-center">
          <CustomText variant="body" className="text-center">
            {property.name} ,{property.country}
          </CustomText>
        </View>
      </View>
    </Pressable>
  );
};

export default SearchCard;
