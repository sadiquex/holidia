import Ionicons from '@expo/vector-icons/Ionicons';
import { View } from 'react-native';

import { colours } from '~/app/core/theme/colours';
import Text from '~/components/text';

export type AmenityType =
  | 'WiFi'
  | 'Kitchen'
  | 'Pool'
  | 'Free parking'
  | 'Air conditioning'
  | 'Pet friendly';

const amenityIcon: Record<AmenityType, keyof typeof Ionicons.glyphMap> = {
  'Air conditioning': 'snow',
  'Pet friendly': 'paw',
  Kitchen: 'restaurant',
  Pool: 'water',
  WiFi: 'wifi',
  'Free parking': 'car',
};

type Props = {
  amenities: string;
};
const Amenities = ({ amenities }: Props) => {
  const allAmenities = amenities.split(', ') as AmenityType[];

  return (
    <View className="flex flex-row flex-wrap justify-evenly gap-2 ">
      {allAmenities.map((amenity, i) => (
        <View key={i} className="flex-1 items-center gap-2 rounded-2xl bg-white px-4 py-2">
          <Ionicons name={amenityIcon[amenity]} size={24} color={colours.PRIMARY} />
          <Text variant="body" className="text-center">
            {amenity}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default Amenities;
