import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const {height, width} = Dimensions.get('screen');

const Zoom = () => {
  const scale = useSharedValue(1);
  const focalX = useSharedValue(0);
  const focalY = useSharedValue(0);
  const AnimatedImage = Animated.createAnimatedComponent(Image);
  const pinch = Gesture.Pinch()
    .onStart(event => {
      console.log(event);
    })
    .onUpdate(event => {
      // console.log(event);
      // scale.value = event.scale;
      // focalX.value = event.focalX;
      // focalY.value = event.focalY;
    })
    .onEnd(event => {
      scale.value = withTiming(1);
    })
    .onChange(event => {
      console.log(event);
      scale.value = event.scale;
      focalX.value = event.focalX;
      focalY.value = event.focalY;
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: focalX.value},
        {translateY: focalY.value},
        {translateX: -width / 2},
        {translateY: -height / 2},
        {scale: scale.value},
        {translateX: -focalX.value},
        {translateY: -focalY.value},
        {translateX: width / 2},
        {translateY: height / 2},
      ],
    };
  }, []);

  //   const animateFocalStyle = useAnimatedStyle(() => {
  //     return {
  //       transform: [{translateX: focalX.value}, {translateY: focalY.value}],
  //     };
  //   }, []);
  return (
    <GestureDetector gesture={pinch}>
      <Animated.View>
        <AnimatedImage
          style={[{height: '100%', width: '100%'}, animatedStyle]}
          source={require('../assets/image3.jpg')}
        />
        {/* <Animated.View style={[styles.focalStyle, animateFocalStyle]} /> */}
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  focalStyle: {
    ...StyleSheet.absoluteFillObject,
    height: 15,
    width: 15,
    backgroundColor: 'blue',
  },
});

export default Zoom;
