import Ionicons from '@expo/vector-icons/Ionicons';
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import { Calendar, CalendarTheme, toDateId, useDateRange } from '@marceloterreiro/flash-calendar';
import { useQuery } from '@tanstack/react-query';
import { differenceInDays } from 'date-fns';
import { router, useLocalSearchParams } from 'expo-router';
import { SquircleButton } from 'expo-squircle-view';
import { nanoid } from 'nanoid/non-secure';
import { useCallback, useMemo, useRef } from 'react';
import { Pressable, ScrollView, View } from 'react-native';

import { client } from '../core/api/client';
import useShoppingCartStore from '../core/store';
import { calendarTheme } from '../core/theme/calendar-theme';
import { colours } from '../core/theme/colours';
import { ICartItem, Property } from '../core/types';

import { Container } from '~/components/container';
import Header from '~/components/header';
import LoadingIndicator from '~/components/loading-indicator';
import Amenities from '~/components/property/amenities';
import PropertyImage from '~/components/property/property-image';
import Text from '~/components/text';
const today = toDateId(new Date());

const PropertyDetails = () => {
  const { id } = useLocalSearchParams();

  const { data: property, isLoading } = useQuery<Property>({
    queryKey: ['property' + id],
    queryFn: async () => {
      const { data } = await client.get(`/properties/${id}`);
      return data.property;
    },
  });

  const { addItem } = useShoppingCartStore();

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['60%'], []);
  const { calendarActiveDateRanges, onCalendarDayPress } = useDateRange();

  const renderBackdrop = useCallback((props: BottomSheetBackdropProps) => {
    return (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior="close"
      />
    );
  }, []);

  if (!property) return null;

  const calculateDays = () => {
    if (!calendarActiveDateRanges[0]?.startId) return 0;
    if (!calendarActiveDateRanges[0]?.endId) return 1;

    const startDate = new Date(calendarActiveDateRanges[0]?.startId);
    const endDate = new Date(calendarActiveDateRanges[0]?.endId);

    return differenceInDays(endDate, startDate) + 1;
  };

  const hasSelectedDays = Boolean(calendarActiveDateRanges[0]?.startId);
  const days = calculateDays();
  const totalPrice = days * property.price_per_night;

  if (isLoading) return <LoadingIndicator />;

  return (
    <Container>
      <Header title="Property" />

      <ScrollView className="bg-gray-100 p-4">
        <PropertyImage
          imageUrl={property.images[0]}
          rating={property.rating || 5}
          isFavorite={property.is_favorite}
        />

        <View className="my-4 flex flex-row justify-between">
          <View>
            <Text variant="subtitle-primary">{property.name}</Text>

            <View className="flex flex-row items-center">
              <Ionicons name="location" size={16} color={colours.PRIMARY} />
              <Text variant="body-primary" className="text-center">
                {property.city}, {property.country}
              </Text>
            </View>
          </View>

          <View className="flex flex-row items-center justify-center gap-2">
            <Ionicons name="pricetag" size={16} color={colours.PRIMARY} />
            <Text variant="subtitle-primary">${property.price_per_night}</Text>
          </View>
        </View>

        <Text variant="body" className="text-gray-700">
          {property.description}
        </Text>
        <Amenities amenities={property.amenities} />
      </ScrollView>

      <BottomSheet
        snapPoints={snapPoints}
        ref={bottomSheetRef}
        enableDynamicSizing={false}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        style={{ flex: 1, zIndex: 100 }}
        index={-1}>
        <BottomSheetView style={{ flex: 1 }}>
          <View className="my-4 flex flex-row items-center justify-center gap-2">
            <Ionicons name="wallet" size={24} color={colours.PRIMARY} />
            <Text variant="subtitle" className="text-center">
              ${hasSelectedDays ? totalPrice : property.price_per_night}{' '}
              {!hasSelectedDays && 'per night'}
            </Text>
          </View>
          {/* <Text variant="body" className="text-center">
            Price
          </Text> */}

          <BottomSheetView style={{ flex: 1, minHeight: 300 }}>
            <Calendar
              calendarActiveDateRanges={calendarActiveDateRanges}
              calendarMonthId={today}
              onCalendarDayPress={onCalendarDayPress}
              theme={calendarTheme as CalendarTheme}
            />
          </BottomSheetView>
          <SquircleButton
            backgroundColor={colours.PRIMARY}
            className="m-8 my-6 flex flex-row items-center justify-center gap-2"
            preserveSmoothing
            style={{
              paddingVertical: 12,
              borderRadius: 24,
            }}
            onPress={() => {
              bottomSheetRef.current?.close();

              if (!hasSelectedDays || !calendarActiveDateRanges[0].startId) {
                bottomSheetRef.current?.expand();
                console.log('Please select a date');
                return;
              }

              const cartItem: ICartItem = {
                id: 'cart-' + nanoid(),
                image: property.images[0],
                name: property.name,
                product: property.id,
                price_per_night: property.price_per_night,
                quantity: 1,
                property,
                startDate: calendarActiveDateRanges[0]?.startId,
                endDate: calendarActiveDateRanges[0]?.endId ?? calendarActiveDateRanges[0]?.startId,
                days,
              };
              console.log('🚀 ~ PropertyDetails ~ cartItem:', cartItem);

              addItem(cartItem);
              bottomSheetRef.current?.close();
            }}>
            <Ionicons name="checkmark-circle" size={20} color="white" />
            <Text variant="button" className="text-center">
              Confirm
            </Text>
          </SquircleButton>
        </BottomSheetView>
      </BottomSheet>

      <View className="-z-10 mx-4 my-4 flex flex-row items-center justify-center">
        {hasSelectedDays ? (
          <Pressable
            onPress={() => bottomSheetRef.current?.expand()}
            className="mr-4 flex flex-1 flex-grow items-center gap-2">
            <View className="flex flex-row items-center justify-center">
              <Ionicons name="pricetag" color={colours.PRIMARY} />
              <Text variant="body" className="text-center">
                ${totalPrice}
              </Text>
            </View>
            <Text variant="caption" className="text-center underline">
              {days === 1 ? '1 night' : `${days} nights`}
            </Text>
          </Pressable>
        ) : (
          <Pressable
            onPress={() => bottomSheetRef.current?.expand()}
            className="mr-4 flex flex-1 flex-grow flex-row items-center gap-2">
            <Ionicons name="calendar" color={colours.PRIMARY} size={20} />
            <Text variant="body-primary" className="text-center underline">
              Select dates
            </Text>
          </Pressable>
        )}

        <SquircleButton
          onPress={() => router.push('/checkout')}
          className="flex-grow"
          borderRadius={16}
          backgroundColor={colours.PRIMARY}
          style={{
            paddingVertical: 12,
          }}>
          <Text variant="button" className="text-center">
            Book now
          </Text>
        </SquircleButton>
      </View>
    </Container>
  );
};

export default PropertyDetails;
