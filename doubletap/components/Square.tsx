import {View, Text} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const Square = () => {
  const SIZE = 100;
  const [tap, setTap] = useState('...');
  const progress = useDerivedValue(() => {
    return tap === 'single tap' ? withTiming(1) : withTiming(0);
  }, [tap]);
  const [singleTap, setsingleTap] = useState(false);
  let timer = null;
  const TIMEOUT = 500;

  const doubleTapref = useRef();
  const doubletap = Gesture.Tap()
    .runOnJS(true)
    .numberOfTaps(2)
    .onStart(event => {
      if (timer) {
        clearTimeout(timer);
        // Clear the single tap timer
        setsingleTap(false);
        timer = null;
        console.log('timer cleared', timer);
        setTap('double tap'); // Set the tap state to 'double tap'
      }
    });

  const singletap = Gesture.Tap()
    .runOnJS(true)
    .onStart(event => {
      console.log(timer);
      if (!timer) {
        timer = setTimeout(() => {
          timer = null;
          console.log(tap, '====tap');
          setTap('single tap');
        }, TIMEOUT);
      }
    });

  // useEffect(() => {
  //   setTimeout(() => {
  //     setTap('...');
  //   }, 2000);
  // }, [tap]);

  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      ['blue', 'red'],
    );
    return {
      transform: [
        {scale: tap === 'single tap' ? withSpring(1.5) : withSpring(1)},
      ],
      backgroundColor: backgroundColor,
    };
  }, [tap]);
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <GestureDetector gesture={singletap}>
        <GestureDetector gesture={doubletap}>
          <Animated.View
            style={[
              animatedStyle,
              {
                height: SIZE,
                width: SIZE,
                backgroundColor: 'blue',
                opacity: 0.5,
                borderRadius: SIZE / 4,
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}>
            <Text style={{color: 'black'}}>{tap}</Text>
          </Animated.View>
        </GestureDetector>
      </GestureDetector>
    </View>
  );
};

export default Square;
