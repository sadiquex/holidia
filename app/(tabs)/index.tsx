import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';

import { PROPERTIES } from '../core/constants/data';

import { Container } from '~/components/container';
import Card from '~/components/home/card';
import Discovery from '~/components/home/discovery';
import MainHeader from '~/components/home/main-header';

export default function Home() {
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  // useEffect(() => {
  //   setTimeout(() => {
  //     router.push('/welcome');
  //   }, 3000);
  // }, []);

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return (
    <Container>
      <MainHeader />

      <FlatList
        data={PROPERTIES}
        renderItem={({ item }) => <Card property={item} />} // render each item in the list
        keyExtractor={(item) => item.id} // unique key for each item
        showsVerticalScrollIndicator={false} // hide the scroll indicator
        ListHeaderComponent={<Discovery properties={PROPERTIES} />} // show on top of the list
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </Container>
  );
}

// Home screen
// - MainHeader
// - Discovery
// - Card
// - FlatList
