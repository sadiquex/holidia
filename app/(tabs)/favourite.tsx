import { View } from 'react-native';
import { ResponsiveGrid } from 'react-native-flexible-grid';

import { FAVORITES } from '../core/constants/data';
import { Property } from '../core/types';

import { Container } from '~/components/container';
import FavouriteCard from '~/components/favourite/card';
import Header from '~/components/header';

export default function Favourite() {
  return (
    <Container>
      <Header title="Favourite" />
      <View className="mb-12">
        <ResponsiveGrid // uses the widthRatio and heightRatio defined in our properties to set the layout
          keyExtractor={(item: Property) => item.id}
          data={FAVORITES as Property[]}
          renderItem={({ item }) => <FavouriteCard property={item} />}
          maxItemsPerColumn={2}
          itemUnitHeight={256}
        />
      </View>
    </Container>
  );
}
