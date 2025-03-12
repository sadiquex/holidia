import { useRef } from 'react';
import { View } from 'react-native';
import Animated, { useSharedValue } from 'react-native-reanimated';
import Carousel, { ICarouselInstance, Pagination } from 'react-native-reanimated-carousel';

import CustomImage from '../image';

import { Property } from '~/app/core/types';
import { WIDTH } from '~/app/core/utils/layout';

type Props = {
  property: Property;
};

const CarouselItem = ({ property }: Props) => {
  const progressValue = useSharedValue<number>(0);
  const carouselRef = useRef<ICarouselInstance>(null);

  const onPressPagination = (index: number) => {
    carouselRef.current?.scrollTo({
      /**
       * Calculate the difference between the current index and the target index
       * to ensure that the carousel scrolls to the nearest index
       */
      count: index - progressValue.value,
      animated: true,
    });
  };

  return (
    <>
      <Carousel
        ref={carouselRef}
        width={WIDTH - 32}
        height={320}
        data={property.images}
        scrollAnimationDuration={1400}
        overscrollEnabled={false}
        autoPlay={false}
        renderItem={({ item: imageUri }) => {
          return (
            <View className="mx-1">
              <CustomImage
                source={imageUri}
                style={{
                  borderRadius: 40,
                }}
              />
            </View>
          );
        }}
        onProgressChange={(_, absoluteProgress) => {
          progressValue.value = absoluteProgress;
        }}
      />
      <Animated.View className="absolute bottom-4 w-full">
        <Pagination.Basic
          progress={progressValue}
          data={property.images.map((_property) => ({ color: _property }))}
          activeDotStyle={{
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: '#f3ef39',
            marginHorizontal: 4,
          }}
          onPress={onPressPagination}
          horizontal
          dotStyle={{
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: '#ededed',
            marginHorizontal: 4,
          }}
          containerStyle={{
            paddingVertical: 8,
          }}
        />
      </Animated.View>
    </>
  );
};

export default CarouselItem;
