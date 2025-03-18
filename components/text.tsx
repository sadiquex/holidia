import { Text, TextProps } from 'react-native';
import { twMerge } from 'tailwind-merge';

type TypographyVariant =
  | 'title'
  | 'subtitle'
  | 'body'
  | 'caption'
  | 'button'
  | 'display'
  | 'caption-primary'
  | 'body-primary'
  | 'subtitle-primary';

interface TextComponentProps extends TextProps {
  className?: string;
  variant?: TypographyVariant;
}

const variantStyles: Record<TypographyVariant, string> = {
  title: 'text-2xl font-bold',
  subtitle: 'text-xl font-semibold',
  'subtitle-primary': 'text-xl font-semibold text-primary',
  body: 'text-base',
  caption: 'text-sm font-medium',
  button: 'text-xl text-primary font-semibold text-white text-center',
  display: 'text-3xl font-bold',
  'body-primary': 'text-base text-primary',
  'caption-primary': 'text-sm text-primary font-medium',
};

const CustomText = ({ variant = 'body', className, children, ...props }: TextComponentProps) => {
  const textStyle = twMerge('text-black', variantStyles[variant], className);

  return (
    <Text className={textStyle} {...props}>
      {children}
    </Text>
  );
};

export default CustomText;
