import React, { useEffect, useRef } from 'react';
import {
  View,
  Animated,
  StyleSheet,
  Dimensions,
  Text,
} from 'react-native';

interface ToyAnimationProps {
  active: boolean;
  scratchProgress: number; // 0 to 100
  cardWidth: number;
  cardHeight: number;
}

const { width, height } = Dimensions.get('window');

const ToyAnimation: React.FC<ToyAnimationProps> = ({ active, scratchProgress, cardWidth, cardHeight }) => {
  // Animation values for different toys
  const toy1Anim = useRef(new Animated.Value(0)).current;
  const toy2Anim = useRef(new Animated.Value(0)).current;
  const toy3Anim = useRef(new Animated.Value(0)).current;
  const sparkleAnim = useRef(new Animated.Value(0)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (active && scratchProgress > 10) {
      // Start toy animations
      startToyAnimations();
    } else {
      // Reset animations
      resetAnimations();
    }
  }, [active, scratchProgress]);

  const startToyAnimations = () => {
    // Floating toys animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(toy1Anim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(toy1Anim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(toy2Anim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(toy2Anim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(toy3Anim, {
          toValue: 1,
          duration: 2500,
          useNativeDriver: true,
        }),
        Animated.timing(toy3Anim, {
          toValue: 0,
          duration: 2500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Sparkle animation
    Animated.loop(
      Animated.timing(sparkleAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      })
    ).start();

    // Bounce animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Rotation animation
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      })
    ).start();

    // Scale animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const resetAnimations = () => {
    toy1Anim.setValue(0);
    toy2Anim.setValue(0);
    toy3Anim.setValue(0);
    sparkleAnim.setValue(0);
    bounceAnim.setValue(0);
    rotateAnim.setValue(0);
    scaleAnim.setValue(0);
  };
  // Calculate animation transforms relative to card size
  const toy1Transform = toy1Anim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [20, -15, 20],
  });

  const toy2Transform = toy2Anim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [-20, 20, -20],
  });

  const toy3Transform = toy3Anim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [15, -25, 15],
  });

  const sparkleOpacity = sparkleAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.3, 1, 0.3],
  });
  const bounceTransform = bounceAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, -10, 0],
  });

  const rotateTransform = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const scaleTransform = scaleAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.8, 1.2, 0.8],
  });

  if (!active || scratchProgress < 10) {
    return null;
  }
  return (
    <View style={[styles.container, { width: cardWidth, height: cardHeight }]} pointerEvents="none">
      {/* Floating Toy Bear */}
      <Animated.View
        style={[
          styles.toy,
          styles.toy1,
          {
            transform: [{ translateY: toy1Transform }],
            opacity: scratchProgress > 20 ? 1 : 0,
          },
        ]}
      >
        <Text style={styles.toyEmoji}>🧸</Text>
      </Animated.View>

      {/* Floating Toy Car */}
      <Animated.View
        style={[
          styles.toy,
          styles.toy2,
          {
            transform: [{ translateX: toy2Transform }],
            opacity: scratchProgress > 30 ? 1 : 0,
          },
        ]}
      >
        <Text style={styles.toyEmoji}>🚗</Text>
      </Animated.View>

      {/* Floating Toy Rocket */}
      <Animated.View
        style={[
          styles.toy,
          styles.toy3,
          {
            transform: [{ translateY: toy3Transform }],
            opacity: scratchProgress > 25 ? 1 : 0,
          },
        ]}
      >
        <Text style={styles.toyEmoji}>🚀</Text>
      </Animated.View>

      {/* Bouncing Ball */}
      <Animated.View
        style={[
          styles.toy,
          styles.bouncingBall,
          {
            transform: [{ translateY: bounceTransform }],
            opacity: scratchProgress > 35 ? 1 : 0,
          },
        ]}
      >
        <Text style={styles.toyEmoji}>⚽</Text>
      </Animated.View>

      {/* Rotating Toy Plane */}
      <Animated.View
        style={[
          styles.toy,
          styles.rotatingToy,
          {
            transform: [{ rotate: rotateTransform }],
            opacity: scratchProgress > 40 ? 1 : 0,
          },
        ]}
      >
        <Text style={styles.toyEmoji}>✈️</Text>
      </Animated.View>

      {/* Scaling Toy Robot */}
      <Animated.View
        style={[
          styles.toy,
          styles.scalingToy,
          {
            transform: [{ scale: scaleTransform }],
            opacity: scratchProgress > 50 ? 1 : 0,
          },
        ]}
      >
        <Text style={styles.toyEmoji}>🤖</Text>
      </Animated.View>

      {/* Sparkles - positioned relative to card */}
      {[...Array(4)].map((_, index) => (
        <Animated.View
          key={index}
          style={[
            styles.sparkle,
            {
              left: 30 + (index * cardWidth * 0.2),
              top: 20 + (index % 2) * 30,
              opacity: sparkleOpacity,
              transform: [{ scale: scaleTransform }],
            },
          ]}
        >
          <Text style={styles.sparkleEmoji}>✨</Text>
        </Animated.View>
      ))}

      {/* Additional cute elements positioned within card */}
      <Animated.View
        style={[
          styles.toy,
          styles.floatingHeart,
          {
            transform: [{ translateY: toy1Transform }, { scale: scaleTransform }],
            opacity: scratchProgress > 60 ? 1 : 0,
          },
        ]}
      >
        <Text style={styles.toyEmoji}>💝</Text>
      </Animated.View>

      <Animated.View
        style={[
          styles.toy,
          styles.floatingUnicorn,
          {
            transform: [{ translateX: toy2Transform }, { rotate: rotateTransform }],
            opacity: scratchProgress > 70 ? 1 : 0,
          },
        ]}
      >
        <Text style={styles.toyEmoji}>🦄</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
    borderRadius: 20,
    overflow: 'hidden',
  },
  toy: {
    position: 'absolute',
    zIndex: 2,
  },
  toy1: {
    top: '15%',
    left: '10%',
  },
  toy2: {
    top: '25%',
    right: '15%',
  },
  toy3: {
    top: '35%',
    right: '10%',
  },
  bouncingBall: {
    bottom: '25%',
    left: '20%',
  },
  rotatingToy: {
    top: '20%',
    right: '25%',
  },
  scalingToy: {
    bottom: '30%',
    right: '20%',
  },
  floatingHeart: {
    top: '40%',
    left: '15%',
  },
  floatingUnicorn: {
    bottom: '35%',
    left: '60%',
  },
  toyEmoji: {
    fontSize: 24,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  sparkle: {
    position: 'absolute',
    zIndex: 3,
  },
  sparkleEmoji: {
    fontSize: 12,
  },
});

export default ToyAnimation;
