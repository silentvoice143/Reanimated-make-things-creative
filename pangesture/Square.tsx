import {View, Text} from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

const Square = ({height = 100, width = 100, Circle_Radius = 200}) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const prevtranslateX = useSharedValue(0);
  const prevtranslateY = useSharedValue(0);

  const pan = Gesture.Pan()
    // .minDistance(1)
    .onStart(event => {})
    .onUpdate(event => {
      console.log(event.translationX);
      translateX.value = event.translationX + prevtranslateX.value;
      translateY.value = event.translationY + prevtranslateY.value;
    })
    .onEnd(event => {
      const distance = Math.sqrt(translateX.value ** 2 + translateY.value ** 2);
      console.log('distance', distance);
      if (distance < Circle_Radius) {
        prevtranslateX.value = 0;
        prevtranslateY.value = 0;
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      } else {
        prevtranslateX.value = event.translationX + prevtranslateX.value;
        prevtranslateY.value = event.translationY + prevtranslateY.value;
      }
      console.log('End translate', event.translationX);
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: translateX.value},
        {translateY: translateY.value},
      ],
    };
  });

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <GestureDetector gesture={pan}>
        <View
          style={{
            height: Circle_Radius * 2,
            width: Circle_Radius * 2,
            borderWidth: 5,
            borderColor: 'blue',
            opacity: 0.5,
            borderRadius: Circle_Radius,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Animated.View
            style={[
              {
                height: height,
                width: width,
                backgroundColor: 'blue',
                opacity: 0.5,
                borderRadius: 10,
              },
              animatedStyle,
            ]}
          />
        </View>
      </GestureDetector>
    </View>
  );
};

export default Square;
