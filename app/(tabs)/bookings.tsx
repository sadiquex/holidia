import { FlatList, View } from 'react-native';

import { BOOKINGS } from '../core/constants/data';
import { Booking } from '../core/types';

import BookingItem from '~/components/bookings/booking-item';
import { Container } from '~/components/container';
import Header from '~/components/header';

const Bookings = () => {
  return (
    <Container>
      <Header title="Bookings" />
      <FlatList
        data={BOOKINGS as Booking[]}
        renderItem={({ item }) => <BookingItem booking={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        className="h-full"
        ItemSeparatorComponent={() => <View className="h-4" />}
      />
    </Container>
  );
};

export default Bookings;
