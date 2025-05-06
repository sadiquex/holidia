import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';

import { client } from '../core/api/client';
import { PROPERTIES } from '../core/constants/data';

import { Container } from '~/components/container';
import Card from '~/components/home/card';
import Discovery from '~/components/home/discovery';
import MainHeader from '~/components/home/main-header';
import LoadingIndicator from '~/components/loading-indicator';
import CustomText from '~/components/text';

export default function Home() {
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const { data: properties, isLoading } = useQuery({
    queryKey: ['properties'],
    queryFn: async () => {
      const response = await client.get('/properties');
      return response.data.properties;
    },
  });

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <Container>
      <MainHeader />

      <FlatList
        data={properties}
        renderItem={({ item }) => <Card property={item} />} // render each item in the list
        keyExtractor={(item) => item.id} // unique key for each item
        showsVerticalScrollIndicator={false} // hide the scroll indicator
        ListHeaderComponent={<Discovery properties={properties} />} // show on top of the list
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
