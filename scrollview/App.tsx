/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {SafeAreaView, useColorScheme, View} from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import Page from './components/Page';

const words = ["What's", 'up', 'devs?'];

function App(): React.JSX.Element {
  const translateX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    console.log(event.contentOffset.x);
    translateX.value = event.contentOffset.x;
  });

  return (
    <SafeAreaView style={{flex: 1}}>
      <Animated.ScrollView
        horizontal
        onScroll={scrollHandler}
        scrollEventThrottle={16}>
        {words.map((item, idx) => {
          return (
            <Page
              key={idx.toString()}
              title={item}
              index={idx}
              translateX={translateX}
            />
          );
        })}
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

export default App;
