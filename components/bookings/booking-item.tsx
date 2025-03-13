import Ionicons from '@expo/vector-icons/Ionicons';
import { format } from 'date-fns';
import { BlurView } from 'expo-blur';
import { SquircleView } from 'expo-squircle-view';
import { View } from 'react-native';

import CustomImage from '../image';

import { Booking } from '~/app/core/types';
import Text from '~/components/text';
import { useImageColors } from '~/app/core/hooks/use-image-colors';

type Props = {
  booking: Booking;
};
const BookingItem = ({ booking }: Props) => {
  const { colors } = useImageColors(booking.property.images[0]);

  return (
    <View className="mx-4 flex-row justify-between">
      <View className="mr-4">
        <CalendarDate date={booking?.check_in as unknown as Date} />
      </View>

      <SquircleView
        className="flex-1"
        cornerSmoothing={100}
        preserveSmoothing
        borderRadius={24}
        style={{
          overflow: 'hidden',
        }}>
        <SquircleView
          style={{
            overflow: 'hidden',
            borderBottomStartRadius: 0,
          }}>
          <View className="h-36">
            <CustomImage
              source={booking.property.images[0]}
              style={{
                height: 256,
              }}
            />
          </View>
        </SquircleView>

        <SquircleView
          cornerSmoothing={100}
          preserveSmoothing
          style={{
            padding: 24,
            position: 'relative',
            backgroundColor: colors?.secondary,
            overflow: 'hidden',
          }}>
          <BlurView className="absolute inset-0" tint="dark" intensity={20} />
          <View className="flex-row">
            <Ionicons name="location" size={16} color="white" />
            <Text variant="body" className="mx-2 text-white">
              {booking.property.name}, {booking.property.city}, {booking.property.country}
            </Text>
          </View>

          <View className="my-2 flex-row justify-between">
            <View className="mb-1">
              <Text variant="body" className="text-white">
                Check-in
              </Text>
              <Text variant="body" className="text-white">
                {format(new Date(booking.check_in), 'MMM dd, yyyy')}
              </Text>
            </View>
            <View className="mb-1">
              <Text variant="body" className="text-white">
                Check-out
              </Text>
              <Text variant="body" className="text-white">
                {format(new Date(booking.check_out), 'MMM dd, yyyy')}
              </Text>
            </View>
          </View>
        </SquircleView>
      </SquircleView>
    </View>
  );
};

export default BookingItem;

const CalendarDate = ({ date = new Date() }) => {
  const month = format(date, 'MMM').toUpperCase();
  const day = format(date, 'd').toUpperCase();
  const weekday = format(date, 'EEE').toUpperCase();

  return (
    <SquircleView
      cornerSmoothing={100}
      preserveSmoothing
      backgroundColor="#f3f4f6"
      borderRadius={16}
      style={{
        padding: 4,
      }}>
      <View className="mx-1 flex-col items-center justify-center gap-2">
        <Text variant="caption">{month}</Text>

        <Text variant="subtitle">{day}</Text>

        <Text variant="caption" className="text-gray-500">
          {weekday}
        </Text>
      </View>
    </SquircleView>
  );
};
