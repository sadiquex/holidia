import Ionicons from '@expo/vector-icons/Ionicons';
import { BlurView } from 'expo-blur';
import { View } from 'react-native';

import ImageWithSquircle from '../image-with-squircle';

import { WIDTH } from '~/app/core/utils/layout';
import Text from '~/components/text';

type Props = {
  imageUrl: string;
  rating: number | undefined;
  isFavorite: boolean;
};
const PropertyImage = ({ imageUrl, rating = 1, isFavorite = false }: Props) => {
  return (
    <View className="relative">
      <View className="flex flex-row items-center justify-center">
        <ImageWithSquircle image={imageUrl} width={WIDTH - 40} />
      </View>

      <BlurView className="absolute bottom-8 left-8 flex-row overflow-hidden rounded-xl p-2">
        <Ionicons name="star" size={24} color="#facc15" />
        <Text variant="body" className="mx-1 text-center text-white">
          {rating}
        </Text>
      </BlurView>

      <BlurView className="absolute bottom-8 right-8 flex-row overflow-hidden rounded-xl p-2">
        <Ionicons name={isFavorite ? 'heart' : 'heart-outline'} size={24} color="white" />
      </BlurView>
    </View>
  );
};

export default PropertyImage;
