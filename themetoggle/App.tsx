/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import {Dimensions, StyleSheet, Switch, Text, View} from 'react-native';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const Colors = {
  light: {
    background: '#F8F8F8',
    circle: '#FFF',
    text: '#1E1E1E',
  },
  dark: {
    background: '#1E1E1E',
    circle: '#252525',
    text: '#F8F8F8',
  },
};

function App(): React.JSX.Element {
  const [isDark, setIsDark] = useState(false);
  const progress = useDerivedValue(() => {
    return isDark ? withTiming(1) : withTiming(0);
  }, [isDark]);

  const SWITCH_TRACK_COLOR = {
    true: 'rgba(256,0,256,0.2)',
    false: 'rgba(0,0,0,0.1)',
  };

  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.background, Colors.dark.background],
    );
    return {backgroundColor};
  });

  const circleAnimatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.circle, Colors.dark.circle],
    );
    return {backgroundColor};
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.text, Colors.dark.text],
    );
    return {color: color};
  });

  return (
    <Animated.View style={[styles.containerStyle, animatedStyle]}>
      <Animated.Text style={[styles.textStyle, animatedTextStyle]}>
        Theme
      </Animated.Text>
      <Animated.View style={[styles.circleStyle, circleAnimatedStyle]}>
        <Switch
          onValueChange={() => {
            setIsDark(!isDark);
          }}
          value={isDark}
          trackColor={SWITCH_TRACK_COLOR}
          thumbColor={'violet'}
        />
      </Animated.View>
    </Animated.View>
  );
}

const SIZE = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleStyle: {
    height: SIZE * 0.7,
    width: SIZE * 0.7,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: (SIZE * 0.7) / 2,
    shadowRadius: 10,
    shadowOffset: {
      height: 20,
      width: 20,
    },
    shadowColor: 'black',
    shadowOpacity: 0.05,
    elevation: 8,
  },
  textStyle: {
    fontSize: 30,
    fontWeight: '700',
  },
});

export default App;
