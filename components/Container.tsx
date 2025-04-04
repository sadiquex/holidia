import { SafeAreaView } from 'react-native';

export const Container = ({ children }: { children: React.ReactNode }) => {
  return <SafeAreaView className="flex flex-1">{children}</SafeAreaView>;
};

const styles = {
  container: 'flex flex-1',
};
