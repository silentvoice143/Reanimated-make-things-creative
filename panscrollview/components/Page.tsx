import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

const {width} = Dimensions.get('screen');

const Page = ({title, index, translateX}: any) => {
  const pageOffset = width * index;
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: pageOffset + translateX.value}],
    };
  }, []);

  const boxAnimatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      -translateX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [0, 1, 0],
      Extrapolation.CLAMP,
    );
    console.log(scale, '====scale====', index);
    return {
      transform: [{scale: scale}],
    };
  }, []);
  return (
    <Animated.View
      style={[
        animatedStyle,
        {
          flex: 1,
          backgroundColor: `rgba(0,0,256,0.${index + 2})`,
          justifyContent: 'center',
          alignItems: 'center',
        },
        StyleSheet.absoluteFillObject,
      ]}>
      <Animated.View
        style={[
          boxAnimatedStyle,
          {
            height: width / 2,
            width: width / 2,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: width / 4,
          },
        ]}>
        <Animated.Text style={[{fontSize: 28}]}>{title}</Animated.Text>
      </Animated.View>
    </Animated.View>
  );
};

export default Page;
