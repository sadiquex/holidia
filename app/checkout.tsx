import Ionicons from '@expo/vector-icons/Ionicons';
import { format } from 'date-fns';
import { SquircleButton, SquircleView } from 'expo-squircle-view';
import { useState } from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import useShoppingCartStore from './core/store';
import { colours } from './core/theme/colours';

import { Container } from '~/components/container';
import Header from '~/components/header';
import ImageWithSquircle from '~/components/image-with-squircle';
import CustomText from '~/components/text';

type Props = object;
const Checkout = ({}: Props) => {
  const { item, getTotalPrice } = useShoppingCartStore();
  const { bottom } = useSafeAreaInsets();
  const [isLoading, setIsLoading] = useState(false);

  if (!item) {
    return (
      <Container>
        <CustomText variant="body">No items in cart</CustomText>
      </Container>
    );
  }

  return (
    <Container>
      <ScrollView>
        <View className="px-4">
          <Header title="Checkout" />
          <SquircleView
            cornerSmoothing={100}
            preserveSmoothing
            borderRadius={24}
            backgroundColor="#f3f4f6"
            className="flex flex-row"
            style={{
              overflow: 'hidden',
              padding: 16,
            }}>
            <ImageWithSquircle image={item.image} width={96} height={96} borderRadius={24} />
            <View className="ml-4 flex-1">
              <CustomText variant="body" className="">
                Property
              </CustomText>
              <CustomText variant="body" className="">
                {item.name}
              </CustomText>
            </View>
          </SquircleView>

          <SquircleView
            className="my-4 bg-white"
            cornerSmoothing={100}
            preserveSmoothing
            borderRadius={24}
            backgroundColor="#f3f4f6"
            style={{
              padding: 16,
              overflow: 'hidden',
            }}>
            <CustomText variant="subtitle" className="">
              Your trip
            </CustomText>
            <View className="mb-4">
              <CustomText variant="body" className="mb-2">
                Dates
              </CustomText>
              <View className="flex flex-row items-center">
                <Ionicons name="calendar-outline" size={20} className="mr-2" />
                <CustomText variant="body" className="">
                  {format(new Date(item.startDate), 'EEE, MMM d')} {' - '}
                  {format(new Date(item.endDate), 'EEE, MMM d, yyyy')}
                </CustomText>
              </View>
            </View>
          </SquircleView>

          <SquircleView
            cornerSmoothing={100}
            preserveSmoothing
            borderRadius={24}
            backgroundColor="#f3f4f6"
            style={{
              padding: 16,
              overflow: 'hidden',
            }}>
            <CustomText variant="subtitle" className="">
              Price details
            </CustomText>
            <View className="">
              <View className="my-1 flex flex-row items-center justify-between">
                <CustomText variant="body" className="">
                  ${item.price_per_night} x {item.days} nights
                </CustomText>
                <CustomText variant="body" className="text-center">
                  ${getTotalPrice()}
                </CustomText>
              </View>
              <View className="my-1 flex flex-row items-center justify-between">
                <CustomText variant="body" className="">
                  Cleaning Fee
                </CustomText>
                <CustomText variant="body" className="text-center">
                  FREE
                </CustomText>
              </View>
              <View className="my-1 flex flex-row items-center justify-between">
                <CustomText variant="body" className="">
                  Service Fee
                </CustomText>
                <CustomText variant="body" className="text-center">
                  FREE
                </CustomText>
              </View>

              <View className="my-2 h-[1px] bg-gray-200" />

              <View className="flex flex-row items-center justify-between">
                <CustomText variant="body" className="text-center">
                  Total (USD)
                </CustomText>
                <CustomText variant="body" className="text-center">
                  ${getTotalPrice().toFixed(2)}
                </CustomText>
              </View>
            </View>
          </SquircleView>
        </View>
      </ScrollView>

      <SquircleButton
        cornerSmoothing={100}
        preserveSmoothing
        borderRadius={24}
        backgroundColor={colours.PRIMARY}
        onPress={() => {}}
        style={{
          position: 'absolute',
          bottom: bottom + 12,
          left: 0,
          right: 0,
          marginHorizontal: 16,
          paddingVertical: 16,
        }}>
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <CustomText variant="button" className="text-center">
            Confirm and Pay
          </CustomText>
        )}
      </SquircleButton>
    </Container>
  );
};

export default Checkout;
