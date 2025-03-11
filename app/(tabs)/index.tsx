import { StyleSheet, Text, View } from 'react-native';

import { Container } from '~/components/container';
import CustomImage from '~/components/image';
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

      <CustomImage
        source="https://images.unsplash.com/photo-1695264424367-a61e7988200b?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        style={{
          width: 300,
          height: 200,
        }}
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
