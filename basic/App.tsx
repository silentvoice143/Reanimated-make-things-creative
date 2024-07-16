import React, {useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

function App(): React.JSX.Element {
  const size = 100;
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const handleRotation = (opacity: Animated.SharedValue<number>) => {
    'worklet';
    return `${opacity.value * 2 * Math.PI}rad`;
  };

  useEffect(() => {
    // opacity.value = withTiming(0.5, {duration: 2000});
    // scale.value = withTiming(2, {duration: 2000});

    // (opacity.value = withSpring(0.5, {duration: 2000})),
    // (scale.value = withSpring(2, {duration: 2000}));

    opacity.value = withRepeat(withSpring(0.5), 5, true);
    scale.value = withRepeat(withSpring(2), 5, true);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{scale: scale.value}, {rotate: handleRotation(opacity)}],
      borderRadius: (size * opacity.value) / 2,
    };
  }, []);
  return (
    <SafeAreaView
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Animated.View
        style={[
          {height: size, width: size, backgroundColor: 'red'},
          animatedStyle,
        ]}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default App;
