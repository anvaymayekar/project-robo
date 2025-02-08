import React, {PropsWithChildren} from 'react';
import {Pressable, StyleSheet, Vibration} from 'react-native';
import {colors} from '../theme';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

interface TouchType extends PropsWithChildren {
  isDisabled?: boolean;
  isGradient?: boolean;
  isLarge?: boolean;
  icon?: string;
  iconSize?: number;
  colorCode?: string;
  stroke?: string;
  onPress?: (args: any) => any;
}

function Touch({
  children,
  isDisabled,
  isGradient,
  isLarge,
  icon,
  iconSize,
  colorCode,
  stroke,
  onPress,
}: TouchType): React.JSX.Element {
  let {base} = colors;
  let paletteGradient = [];
  let rippleColor;
  if (isGradient) {
    let {one, two, three} = colors;
    paletteGradient.push(one, two, three);
    rippleColor = colors.darkRipple;
  } else {
    let background;
    colorCode ? (background = colorCode) : (background = colors.shade);
    rippleColor = colors.ripple;
    paletteGradient = [background, background];
  }

  let frame;
  isLarge ? (frame = 120) : (frame = 80);
  let coreOpacity;
  isDisabled ? (coreOpacity = 0.5) : (coreOpacity = 1);

  return (
    <Pressable
      // activeOpacity={opacity || 0.3}
      android_ripple={{
        color: rippleColor,
        borderless: true,
        foreground: true,
      }}
      disabled={isDisabled || false}
      onPress={onPress}
      onLongPress={onPress}
      onPressIn={() => Vibration.vibrate(100)}
      onPressOut={() => Vibration.cancel()}
      style={{
        ...styles.touchableCover,
        width: frame,
        height: frame,
        opacity: coreOpacity,
      }}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        colors={paletteGradient as [string, string]}
        style={styles.linearGradient}>
        {icon ? (
          <Icon
            name={icon as 'search'}
            color={stroke || colors.white}
            size={iconSize || 32}
          />
        ) : (
          <></>
        )}
        {children}
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  touchableCover: {
    borderRadius: '100%',

    overflow: 'hidden',
  },
  linearGradient: {
    flex: 1,

    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Touch;
