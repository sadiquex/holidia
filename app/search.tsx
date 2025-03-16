import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { FlatList, TextInput, View } from 'react-native';

import { Container } from '~/components/container';
import Header from '~/components/header';
import Text from '~/components/text';
import { PROPERTIES } from './core/constants/data';
import SearchCard from '~/components/search/card';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Container>
      <Header title="Search" />
      <View className="mx-4 flex flex-row items-center justify-center rounded-xl bg-gray-100 px-4 py-2">
        <View className="flex flex-row items-center justify-center py-3">
          <Ionicons name="search" size={20} color="gray" />
          <TextInput
            className="ml-2 flex-1"
            placeholder="Search by city..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
          />
        </View>
      </View>

      <FlatList data={PROPERTIES} renderItem={({ item }) => <SearchCard property={item} />} />
    </Container>
  );
};

export default Search;
