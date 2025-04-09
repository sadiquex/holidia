import Ionicons from '@expo/vector-icons/Ionicons';
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import { Calendar, CalendarTheme, toDateId, useDateRange } from '@marceloterreiro/flash-calendar';
import { useLocalSearchParams } from 'expo-router';
import { SquircleButton } from 'expo-squircle-view';
import { useCallback, useMemo, useRef, useState } from 'react';
import { ScrollView, View } from 'react-native';

import { PROPERTIES } from '../core/constants/data';
import { calendarTheme } from '../core/theme/calendar-theme';
import { colours } from '../core/theme/colours';

import { Container } from '~/components/container';
import Header from '~/components/header';
import Amenities from '~/components/property/amenities';
import PropertyImage from '~/components/property/property-image';
import Text from '~/components/text';

const today = toDateId(new Date());

const PropertyDetails = () => {
  const { id } = useLocalSearchParams();
  const property = PROPERTIES.find((property) => property.id === id);

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

  return (
    <Container>
      <Header title="Property" />

      <ScrollView className="bg-gray-100 p-4">
        <PropertyImage
          imageUrl={property.images[0]}
          rating={property.rating || 5}
          isFavorite={property.is_favorite}
        />

        <Text variant="subtitle-primary" className="mt-4 ">
          {property.name}
        </Text>

        <View className="my-1 flex flex-row items-center">
          <Ionicons name="location" size={16} color={colours.PRIMARY} />
          <Text variant="body-primary" className="text-center">
            {property.city}, {property.country}
          </Text>
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
          <Text variant="body" className="text-center">
            Price
          </Text>

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
            onPress={() => bottomSheetRef.current?.close()}>
            <Ionicons name="checkmark-circle" size={20} color="white" />
            <Text variant="button" className="text-center">
              Confirm
            </Text>
          </SquircleButton>
        </BottomSheetView>
      </BottomSheet>

      <View className="-z-10 mx-4 my-4 flex flex-row items-center justify-center">
        <SquircleButton
          onPress={() => bottomSheetRef.current?.expand()}
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
