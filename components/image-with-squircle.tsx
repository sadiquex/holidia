import { Image, useImage } from '@shopify/react-native-skia';
import React from 'react';
import { View, Text } from 'react-native';
import Squircle from 'react-native-squircle';

type ImageWithSquircleProps = {
  image: string;
  width?: number;
  height?: number;
  borderRadius?: number;
};

export default function ImageWithSquircle({
  image,
  borderRadius = 40,
  width = 296,
  height = 280,
}: ImageWithSquircleProps) {
  const imageUrl = useImage(image);

  return (
    <Squircle
      style={{
        width,
        height,
        marginHorizontal: 4,
      }}
      borderRadius={borderRadius}
      maskChildren={<Image width={width} height={height} image={imageUrl} fit="cover" />}
    />
  );
}
