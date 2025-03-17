import Ionicons from '@expo/vector-icons/Ionicons';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import { SquircleButton, SquircleView } from 'expo-squircle-view';
import { FlatList, Pressable, View } from 'react-native';

import ImageWithSquircle from '../image-with-squircle';

import { Property } from '~/app/core/types';
import Text from '~/components/text';

type Props = {
  properties: Property[];
};
const Discovery = ({ properties }: Props) => {
  const router = useRouter();
  return (
    <>
      <SquircleButton
        className="mx-4 mb-4 flex-row items-center"
        backgroundColor="#eeecec"
        cornerSmoothing={100}
        preserveSmoothing
        borderRadius={24}
        onPress={() => {
          router.navigate('/search');
        }}
        style={{
          paddingVertical: 16,
          paddingHorizontal: 24,
        }}>
        <Ionicons name="search" size={24} color="gray" />
        <View className="mx-4">
          <Text variant="body" className="text-center">
            Where to ?
          </Text>
        </View>
      </SquircleButton>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={properties.reverse()}
        renderItem={({ item }) => (
          <SquircleView className="mx-1">
            <ImageWithSquircle image={item.images[1]} width={196} height={224} />
            <SquircleView
              cornerSmoothing={100}
              preserveSmoothing
              borderRadius={24}
              style={{
                overflow: 'hidden',
                position: 'absolute',
                bottom: 16,
                left: 24,
                right: 24,
                borderRadius: 24,
              }}>
              <BlurView intensity={40} tint="dark">
                <Pressable
                  className="flex-row items-center justify-between p-4"
                  onPress={() => {
                    router.navigate({
                      pathname: '/properties/[id]',
                      params: { id: item.id },
                    });
                  }}>
                  <View>
                    <Text variant="caption" className="text-white">
                      {item.name}
                    </Text>
                    <Text variant="caption" className="text-white">
                      from ${item.price_per_night}
                    </Text>
                  </View>

                  <Ionicons name="arrow-forward-outline" size={16} color="white" />
                </Pressable>
              </BlurView>
            </SquircleView>
          </SquircleView>
        )}
        keyExtractor={(item) => item.id}
      />
    </>
  );
};

export default Discovery;
