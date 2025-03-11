import { StyleSheet, Text, View } from 'react-native';

import { Container } from '~/components/container';
import CustomText from '~/components/text';

export default function Home() {
  return (
    <Container>
      <CustomText variant="title">title</CustomText>
      <CustomText variant="body">body</CustomText>
      <CustomText variant="body-primary">body primary</CustomText>
      <CustomText variant="button">button</CustomText>
      <CustomText variant="caption">caption</CustomText>
      <CustomText variant="caption-primary">caption primary</CustomText>
      <CustomText variant="display">display</CustomText>
      <CustomText variant="subtitle">subtitle</CustomText>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
