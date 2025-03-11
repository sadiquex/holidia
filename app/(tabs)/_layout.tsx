import { Tabs } from 'expo-router';

import { colours } from '../core/theme/colours';

import { TabBarIcon } from '~/components/tab-bar-icon';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colours.PRIMARY, // colour for the active tab
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Tab One',
          tabBarIcon: ({ color }) => <TabBarIcon name="albums" color={color} />,
          tabBarShowLabel: false,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="favourite"
        options={{
          title: 'Favourites',
          tabBarIcon: ({ color }) => <TabBarIcon name="heart" color={color} />,
          tabBarShowLabel: false,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="bookings"
        options={{
          title: 'Bookings',
          tabBarIcon: ({ color }) => <TabBarIcon name="calendar-clear" color={color} />,
          tabBarShowLabel: false,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabBarIcon name="person" color={color} />,
          tabBarShowLabel: false,
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
