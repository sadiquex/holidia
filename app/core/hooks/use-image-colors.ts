import { useEffect, useMemo, useState } from 'react';
import { getColors, ImageColorsResult } from 'react-native-image-colors';

import { colours } from '../theme/colours';

export const useImageColors = (imageUrl: string) => {
  const [colors, setColors] = useState<ImageColorsResult>();

  useEffect(() => {
    const fetchColors = async () => {
      try {
        const result = await getColors(imageUrl);
        setColors(result);
      } catch (error) {
        console.error('Error getting image colors:', error);
      }
    };

    fetchColors();
  }, []);

  const colorPalette = useMemo(() => {
    if (!colors) {
      return { primary: colours.PRIMARY, secondary: colours.PRIMARY, background: colours.PRIMARY };
    }

    if ('platform' in colors) {
      if (colors.platform === 'ios') {
        return {
          primary: colors.primary,
          secondary: colors.secondary,
          background: colors.background,
        };
      }
      if (colors.platform === 'android') {
        return {
          primary: colors.dominant,
          secondary: colors.dominant,
          darkVibrant: colors.darkVibrant,
          background: colors.vibrant,
        };
      }
    }
  }, [colors]);

  return {
    colors: colorPalette,
  };
};
