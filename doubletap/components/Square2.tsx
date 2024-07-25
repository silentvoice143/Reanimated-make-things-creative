import {View, Text, Pressable} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

const Square2 = () => {
  const SIZE = 100;

  let timer = null;
  const TIMEOUT = 500;
  const debounce = (onSingle, onDouble) => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
      onDouble();
    } else {
      clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        onSingle();
      }, TIMEOUT);
    }
  };

  const [tap, setTap] = useState('...');

  useEffect(() => {
    setTimeout(() => {
      setTap('...');
    }, 2000);
  }, [tap]);

  const onSingleTap = () => setTap('single tap');
  const onDoubleTap = () => setTap('double tap');

  const onPress = () => {
    debounce(onSingleTap, onDoubleTap);
  };

  return (
    <Pressable
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
      onPress={onPress}>
      <View
        style={{
          height: SIZE,
          width: SIZE,
          backgroundColor: 'blue',
          opacity: 0.5,
          borderRadius: SIZE / 4,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: 'black'}}>{tap}</Text>
      </View>
    </Pressable>
  );
};

export default Square2;
