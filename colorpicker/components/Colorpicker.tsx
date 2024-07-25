import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  clamp,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const {width: PickerWidth} = Dimensions.get('screen');

const Colorpicker = ({colors, onColorChange}) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const prevtranslateX = useSharedValue(0);
  const pan = Gesture.Pan()
    .onStart(e => {
      prevtranslateX.value = translateX.value;
      scale.value = withSpring(1.2);
      translateY.value = withSpring(-CIRCLE_PICKER_SIZE);
    })
    .onUpdate(e => {
      const maxTranslate = PickerWidth * 0.9 - CIRCLE_PICKER_SIZE;
      translateX.value = clamp(
        prevtranslateX.value + e.translationX,
        0,
        maxTranslate,
      );
      console.log(translateX.value, PickerWidth * 0.9 - CIRCLE_PICKER_SIZE);
    })
    .onEnd(e => {
      scale.value = withSpring(1);
      translateY.value = withSpring(0);
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: translateX.value},
        {translateY: translateY.value},
        {scale: scale.value},
      ],
    };
  }, []);

  const rInternalStyle = useAnimatedStyle(() => {
    const maxWidth = PickerWidth * 0.9 - CIRCLE_PICKER_SIZE;
    const inputRange = [
      (1 / 9) * maxWidth,
      (2 / 9) * maxWidth,
      (3 / 9) * maxWidth,
      (4 / 9) * maxWidth,
      (5 / 9) * maxWidth,
      (6 / 9) * maxWidth,
      (7 / 9) * maxWidth,
      (8 / 9) * maxWidth,
      maxWidth,
    ];
    const backgroundColor = interpolateColor(
      translateX.value,
      inputRange,
      colors,
    );
    onColorChange?.(backgroundColor);
    console.log(translateX.value, maxWidth * (1 / 9));
    return {
      backgroundColor: backgroundColor,
    };
  }, []);
  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={{justifyContent: 'center'}}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          locations={[
            1 / 9,
            2 / 9,
            3 / 9,
            4 / 9,
            5 / 9,
            6 / 9,
            7 / 9,
            8 / 9,
            1,
          ]}
          colors={colors}
          style={styles.linearGradient}></LinearGradient>
        <Animated.View style={[styles.pickerCircle, animatedStyle]}>
          <Animated.View
            style={[styles.internalPicker, rInternalStyle]}></Animated.View>
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
};

const CIRCLE_PICKER_SIZE = 50;

const styles = StyleSheet.create({
  linearGradient: {
    height: 45,
    width: PickerWidth * 0.9,
    borderRadius: 25,
  },
  pickerCircle: {
    height: CIRCLE_PICKER_SIZE,
    width: CIRCLE_PICKER_SIZE,
    backgroundColor: 'white',
    borderRadius: CIRCLE_PICKER_SIZE / 2,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  internalPicker: {
    height: CIRCLE_PICKER_SIZE / 2,
    width: CIRCLE_PICKER_SIZE / 2,
    borderRadius: CIRCLE_PICKER_SIZE / 4,
    borderWidth: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});
export default Colorpicker;
