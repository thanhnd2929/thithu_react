import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Animated, { Easing, useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

const Banner = ({ imageUrl }) => {
  const rotateX = useSharedValue(0);

  // Animated style for the banner
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotateX: `${rotateX.value}deg` }],
    };
  });

  const handlePress = () => {
    rotateX.value = withSpring(rotateX.value === 0 ? 180 : 0, { damping: 1, stiffness: 80 });
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Animated.View style={[styles.banner, animatedStyle]}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
      </Animated.View>
    </TouchableOpacity>
  );
};

export default Banner;

const styles = StyleSheet.create({
  banner: {
    width: '100%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backfaceVisibility: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
});
