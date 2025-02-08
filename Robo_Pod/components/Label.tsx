import React from 'react';
import type {PropsWithChildren} from 'react';
import {Text} from 'react-native';
import {colors} from '../theme';

interface LabelType extends PropsWithChildren {
  children?: string;
  size?: number;
  weight?: string;
  color?: string;
  lineHeight?: number;
}

function Label({
  children,
  size,
  weight,
  color,
  lineHeight,
}: LabelType): React.JSX.Element {
  !weight ? (weight = 'Regular') : null;
  return (
    <Text
      style={{
        fontSize: size || 24,
        fontFamily: `Outfit-${weight}`,
        color: color || colors.primary,
        lineHeight: lineHeight,
      }}>
      {children}
    </Text>
  );
}
export default Label;
