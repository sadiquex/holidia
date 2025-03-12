import { FlatList, StyleSheet, Text, View } from 'react-native';

import { PROPERTIES } from '../core/constants/data';

import { Container } from '~/components/container';
import Card from '~/components/home/card';
import Discovery from '~/components/home/discovery';

import MainHeader from '~/components/home/main-header';

export default function Home() {
  return (
    <Container>
      <MainHeader />

      <FlatList
        data={PROPERTIES}
        renderItem={({ item }) => <Card property={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<Discovery properties={PROPERTIES} />}
      />
    </Container>
  );
}
