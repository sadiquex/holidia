import { useLocalSearchParams } from 'expo-router';
import { ScrollView, View } from 'react-native';

import { PROPERTIES } from '../core/constants/data';

import { Container } from '~/components/container';
import Header from '~/components/header';
import PropertyImage from '~/components/property/property-image';
import Text from '~/components/text';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colours } from '../core/theme/colours';
import Amenities from '~/components/property/amenities';

type Props = object;
const PropertyDetails = ({}: Props) => {
  const { id } = useLocalSearchParams();
  const property = PROPERTIES.find((property) => property.id === id);

  if (!property) return null;

  return (
    <Container>
      <Header title="Property" />

      <ScrollView className="bg-gray-100 p-4">
        <PropertyImage
          imageUrl={property.images[0]}
          rating={property.rating || 5}
          isFavorite={property.is_favorite}
        />

        <Text variant="subtitle-primary" className="mt-4 ">
          {property.name}
        </Text>

        <View className="my-1 flex flex-row items-center">
          <Ionicons name="location" size={16} color={colours.PRIMARY} />
          <Text variant="body-primary" className="text-center">
            {property.city}, {property.country}
          </Text>
        </View>

        <Text variant="body" className="text-gray-700">
          {property.description}
        </Text>
        <Amenities amenities={property.amenities} />
      </ScrollView>
    </Container>
  );
};

export default PropertyDetails;
