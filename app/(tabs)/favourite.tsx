import { useQuery } from '@tanstack/react-query';
import { View } from 'react-native';
import { ResponsiveGrid } from 'react-native-flexible-grid';

import { client } from '../core/api/client';
import { Property } from '../core/types';

import { Container } from '~/components/container';
import FavouriteCard from '~/components/favourite/card';
import Header from '~/components/header';
import LoadingIndicator from '~/components/loading-indicator';
import CustomText from '~/components/text';

export default function Favourite() {
  const {
    data: favourites,
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ['favorites'],
    queryFn: async () => {
      const response = await client.get('/favorites');
      return response.data.favorites;
    },
  });

  if (isLoading) {
    return (
      <Container>
        <Header title="Favourite" />
        <LoadingIndicator />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Header title="Favourite" />
        <View className="flex-1 items-center justify-center p-4">
          <CustomText variant="body" className="text-center text-red-500">
            Failed to load favourites. Please try again later.
          </CustomText>
        </View>
      </Container>
    );
  }

  if (!favourites?.length) {
    return (
      <Container>
        <Header title="Favourite" />
        <View className="flex-1 items-center justify-center p-4">
          <CustomText variant="body" className="text-center text-gray-500">
            No favourites yet. Add some properties to your favourites!
          </CustomText>
        </View>
      </Container>
    );
  }

  return (
    <Container>
      <Header title="Favourite" />
      <View className="mb-12">
        <ResponsiveGrid
          keyExtractor={(item: Property) => item.id}
          data={favourites}
          renderItem={({ item }) => <FavouriteCard property={item} />}
          maxItemsPerColumn={2}
          itemUnitHeight={256}
        />
      </View>
    </Container>
  );
}
