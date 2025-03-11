import { FlatList, StyleSheet, Text, View } from 'react-native';

import { PROPERTIES } from '../core/constants/data';

import { Container } from '~/components/container';
import Card from '~/components/home/card';
import CustomText from '~/components/text';

export default function Home() {
  return (
    <Container>
      <CustomText variant="title">Home</CustomText>

      <FlatList
        data={PROPERTIES}
        renderItem={({ item }) => <Card property={item} />}
        keyExtractor={(item) => item.id}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
