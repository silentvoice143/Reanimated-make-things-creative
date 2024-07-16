# Reanimate with Scrollview (interpolation)

In this we created a smooth animation with horizontal scrollview

## Let's head to the code

- To get the scroll x value we used useAnimatedScrollHandler of reanimated.

```
 const scrollHandler = useAnimatedScrollHandler(event => {
    console.log(event.contentOffset.x);
    translateX.value = event.contentOffset.x;
  });
```

- Stored the translateX value in a variable named

```
const translateX=useSharedValue();
```

# Page Component

```
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import React from 'react';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
} from 'react-native-reanimated';

interface pageProps {
  title: string;
  index: number;
  translateX: Animated.SharedValue<number>;
}

const {height, width} = Dimensions.get('screen');
const SIZE = width * 0.7;

const Page: React.FC<pageProps> = ({title, index, translateX}) => {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      inputRange,
      [0, 1, 0],
      Extrapolation.CLAMP,
    );
    return {
      transform: [{scale: scale}],
      borderRadius: scale * (SIZE / 2),
    };
  }, []);

  const animatedTextStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      translateX.value,
      inputRange,
      [height / 2, 0, -height / 2],
      Extrapolation.CLAMP,
    );

    const opacity = interpolate(
      translateX.value,
      inputRange,
      [-2, 1, -2],
      Extrapolation.CLAMP,
    );
    return {
      transform: [{translateY: translateY}],
      opacity: opacity,
    };
  }, []);
  return (
    <View
      style={[
        styles.pageContainer,
        {backgroundColor: `rgba(0,0,256,0.${index + 2})`},
      ]}>
      <Animated.View style={[styles.square, animatedStyle]}>
        <Animated.View style={animatedTextStyle}>
          <Text style={[styles.textStyle]}>{title}</Text>
        </Animated.View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    height: height,
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  square: {
    alignItems: 'center',
    justifyContent: 'center',
    width: SIZE,
    height: SIZE,
    backgroundColor: `rgba(0,0,256,0.4)`,
  },
  textStyle: {
    fontSize: 70,
    fontWeight: '700',
    color: 'white',
    textTransform: 'uppercase',
  },
});

export default Page;
```

- In the Page Component we use interpolation method to handle the animation

```
interpolate(
      valuetobeinterpolated,
      inputRange,
      outputRange,
      Extrapolation.CLAMP,
    );
```
