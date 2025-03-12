import Ionicons from '@expo/vector-icons/Ionicons';
import { BlurView } from 'expo-blur';
import { Pressable, View } from 'react-native';

import CarouselItem from './carousel-item';

import { Property } from '~/app/core/types';
import Text from '~/components/text';

type Props = {
  property: Property;
};
const Card = ({ property }: Props) => {
  return (
    <View className="border-b border-gray-200 p-4">
      <View className="relative">
        <View>
          <CarouselItem property={property} />
        </View>

        <View>
          <BlurView
            intensity={100}
            className="absolute bottom-4 left-4 flex-row items-center justify-center overflow-hidden rounded-2xl p-2">
            <Ionicons name="star" size={24} color="#facc15" />
            <Text className="mx-2 text-white">5</Text>
          </BlurView>
          <Pressable className="absolute bottom-4 right-4">
            <BlurView intensity={100} className="overflow-hidden rounded-2xl p-2">
              <Ionicons
                name={property.is_favorite ? 'heart' : 'heart-outline'}
                size={24}
                color="white"
              />
            </BlurView>
          </Pressable>
        </View>

        <View className="px-2">
          <View className="flex-row justify-between py-2">
            <View className="">
              <Text variant="subtitle">{property.name}</Text>
              <Text variant="caption" className="text-gray-500">
                {property.amenities}
              </Text>
            </View>
            <View>
              <Text variant="caption">
                {property.country} starts at ${property.price_per_night}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Card;
