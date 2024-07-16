# Pangesture Basics

- In pangesture we get these fuction and more

```dotnetcli
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
```

- We are using two point distance formula for finding distance=sqrt(A2 + B2)
