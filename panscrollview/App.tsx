/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
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
import Page from './components/Page';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import {clamp, useSharedValue, withDecay} from 'react-native-reanimated';

const words = ['How', 'Are', 'You', '?'];

const {width: ScreenWidth} = Dimensions.get('screen');

function App(): React.JSX.Element {
  const translateX = useSharedValue(0);
  const prevtranslateX = useSharedValue(0);
  const pan = Gesture.Pan()
    .onStart(e => {
      prevtranslateX.value = translateX.value;
    })
    .onUpdate(e => {
      const minTranslateX = -ScreenWidth * (words.length - 1);
      translateX.value = clamp(
        prevtranslateX.value + e.translationX,
        minTranslateX,
        0,
      );
      console.log(translateX.value);
    })
    .onEnd(e => {
      translateX.value = withDecay({velocity: e.velocityX});
    });
  return (
    <GestureHandlerRootView>
      <GestureDetector gesture={pan}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          {words.map((item, index) => (
            <Page
              key={index.toString()}
              index={index}
              title={item}
              translateX={translateX}
            />
          ))}
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

export default App;
