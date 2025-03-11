import { View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

import CustomImage from '../image';

import { Property } from '~/app/core/types';
import { WIDTH } from '~/app/core/utils/layout';
import Text from '~/components/text';

type Props = {
  property: Property;
};
const CarouselItem = ({ property }: Props) => {
  return (
    <Carousel
      width={WIDTH - 32}
      height={320}
      data={property.images}
      renderItem={({ item: imageUri }) => {
        return (
          <View>
            <CustomImage
              source={imageUri}
              style={{
                height: 320,
              }}
            />
          </View>
        );
      }}
    />
  );
};

export default CarouselItem;
