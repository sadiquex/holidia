import { Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { Container } from '~/components/container';

export default function Home() {
  return (
    <Container>
      <Text className="text-primary text-2xl">Home</Text>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
