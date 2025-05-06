import Ionicons from '@expo/vector-icons/Ionicons';
import { useQuery } from '@tanstack/react-query';
import { router } from 'expo-router';
import { SquircleView } from 'expo-squircle-view';
import { View } from 'react-native';

import { client } from '../core/api/client';
import useAuth from '../core/auth';
import { colours } from '../core/theme/colours';

import { Container } from '~/components/container';
import Header from '~/components/header';
import ImageWithSquircle from '~/components/image-with-squircle';
import LoadingIndicator from '~/components/loading-indicator';
import CustomText from '~/components/text';

type UserStats = {
  id: string;
  name: string;
  email: string;
  image: string;
  favoritePropertiesCount: number;
  bookingsCount: number;
};

type User = {
  id: string;
  name: string;
  email: string;
  image: string;
};

const Profile = () => {
  const { signOut } = useAuth();

  const { data: user, isLoading } = useQuery<User>({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await client.get('/users/me');
      return response.data.user;
    },
  });

  const { data: userStats } = useQuery<UserStats>({
    queryKey: ['user-stats'],
    queryFn: async () => {
      const response = await client.get('/users/stats');
      return response.data.stats;
    },
  });

  if (isLoading) return <LoadingIndicator />;

  return (
    <Container>
      <Header
        title="Profile"
        headerAction={{
          name: 'log-out',
          onPress: () => {
            router.push('/login');
            signOut();
          },
        }}
      />

      <View className="flex flex-row items-center justify-center">
        <ImageWithSquircle
          image={user?.image || 'https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d'}
          width={256}
          height={256}
          borderRadius={48}
        />
      </View>

      <View className="flex items-center justify-center pt-4">
        <CustomText variant="body" className="text-center">
          {user?.email}
        </CustomText>
        <CustomText variant="body" className="text-center">
          @{user?.name}
        </CustomText>
      </View>

      <SquircleView className="m-4 flex-row flex-wrap justify-around pt-10">
        {[
          {
            icon: 'stats-chart',
            title: 'Trips',
            count: userStats?.bookingsCount,
          },
          {
            icon: 'stats-chart',
            title: 'Favourite',
            count: userStats?.favoritePropertiesCount,
          },
          {
            icon: 'albums',
            title: 'Albums',
            count: userStats?.favoritePropertiesCount,
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
