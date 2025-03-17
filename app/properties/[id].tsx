import { useLocalSearchParams } from 'expo-router';
import { ScrollView, View } from 'react-native';

import { PROPERTIES } from '../core/constants/data';

import { Container } from '~/components/container';
import Header from '~/components/header';
import PropertyImage from '~/components/property/property-image';
import Text from '~/components/text';

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
          rating={property.rating}
          isFavorite={property.is_favorite}
        />
      </ScrollView>
    </Container>
  );
};

export default PropertyDetails;
