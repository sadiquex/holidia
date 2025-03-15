import Ionicons from '@expo/vector-icons/Ionicons';
import { SquircleView } from 'expo-squircle-view';
import { View } from 'react-native';

import { colours } from '../core/theme/colours';
import { User } from '../core/types';

import { Container } from '~/components/container';
import Header from '~/components/header';
import ImageWithSquircle from '~/components/image-with-squircle';
import CustomText from '~/components/text';

const user: User = {
  id: '',
  name: '',
  email: 'abubaka@gmail.com',
  username: 'user',
  avatar:
    'https://images.pexels.com/photos/18166547/pexels-photo-18166547/free-photo-of-back-view-of-woman-in-black-dress-on-sea-shore.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load',
  bookings: [],
  created_at: '',
  password: '',
  properties: null,
};

const Profile = () => {
  return (
    <Container>
      <Header
        title="Profile"
        headerAction={{
          name: 'log-out',
          onPress: () => console.log('Logout'),
        }}
      />

      <View className="flex flex-row items-center justify-center">
        <ImageWithSquircle image={user.avatar} width={256} height={256} borderRadius={48} />
      </View>

      <View className="flex items-center justify-center pt-4">
        <CustomText variant="body" className="text-center">
          {user.email}
        </CustomText>
        <CustomText variant="body" className="text-center">
          @{user.username}
        </CustomText>
      </View>

      <SquircleView className="m-4 flex-row flex-wrap justify-around pt-10">
        {[
          {
            icon: 'stats-chart',
            title: 'Trips',
            count: 4,
          },
          {
            icon: 'stats-chart',
            title: 'Favourite',
            count: 1,
          },
          {
            icon: 'albums',
            title: 'Albums',
            count: 4,
          },
        ].map((card, i) => (
          <View key={i} className="">
            <View className="flex flex-row items-center justify-center rounded-xl bg-gray-100 p-8">
              <Ionicons
                name={card.icon as keyof typeof Ionicons.glyphMap}
                color={colours.PRIMARY}
                size={40}
              />
            </View>

            <View className="mt-4 flex-row items-center justify-center gap-4">
              <CustomText variant="body" className="text-center">
                {card.title}
              </CustomText>
              <CustomText variant="body" className="text-center">
                {card.count}
              </CustomText>
            </View>
          </View>
        ))}
      </SquircleView>
    </Container>
  );
};

export default Profile;
