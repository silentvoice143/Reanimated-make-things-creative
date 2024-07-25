/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useCallback} from 'react';
import type {PropsWithChildren} from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Colorpicker from './components/Colorpicker';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const COLORS = [
  'red',
  'purple',
  'blue',
  'cyan',
  'green',
  'yellow',
  'orange',
  'black',
  'white',
];

const BACKGROUND_COLOR = 'rgba(0,0,0,0.9)';
const {width} = Dimensions.get('screen');
const CIRCLE_SIZE = width * 0.8;

function App(): React.JSX.Element {
  const pickedColor = useSharedValue(COLORS[0]);

  const ranimatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: pickedColor.value,
    };
  }, []);

  const onColorChange = useCallback(color => {
    'worklet';
    pickedColor.value = color;
  }, []);

  return (
    <>
      <GestureHandlerRootView>
        <View style={styles.topContainer}>
          <Animated.View style={[styles.colorBall, ranimatedStyle]} />
        </View>
        <View style={styles.bottomContainer}>
          <Colorpicker colors={COLORS} onColorChange={onColorChange} />
        </View>
      </GestureHandlerRootView>
    </>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    flex: 3,
    backgroundColor: BACKGROUND_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorBall: {
    height: CIRCLE_SIZE,
    width: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: 'red',
  },
});

export default App;
