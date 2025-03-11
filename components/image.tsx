import { Image } from 'expo-image';
import { ImageStyle, StyleProp } from 'react-native';

type ImageProps = {
  source: string;
  style?: StyleProp<ImageStyle>;
};

const defaultStyle: ImageStyle = {
  width: '100%',
  height: '100%',
  borderRadius: 16,
};

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const CustomImage = ({ source, style }: ImageProps) => {
  return (
    <Image
      source={source}
      style={[defaultStyle, style]}
      placeholder={{
        blurhash,
      }}
      contentFit="cover"
      transition={1000}
    />
  );
};

export default CustomImage;
