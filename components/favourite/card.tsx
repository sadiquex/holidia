import Ionicons from '@expo/vector-icons/Ionicons';
import { BlurView } from 'expo-blur';
import { View } from 'react-native';

import CustomImage from '../image';

import { Property } from '~/app/core/types';
import Text from '~/components/text';

type Props = {
  property: Property;
};
const FavouriteCard = ({ property }: Props) => {
  return (
    <View className="flex-1 p-2">
      <CustomImage source={property.images[0]} />
      <BlurView
        className="absolute bottom-4 right-4 overflow-hidden rounded-xl p-2"
        intensity={80}
        tint="light">
        {property.is_favorite ? (
          <Ionicons name="heart" size={24} color="red" />
        ) : (
          <Ionicons name="heart-outline" size={24} color="white" />
        )}
      </BlurView>
    </View>
  );
};

export default FavouriteCard;
