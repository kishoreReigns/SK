import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Animated, Dimensions, Easing } from 'react-native';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');
const CONFETTI_COUNT = 100;

const COLORS = [
  '#ff69b4', // pink
  '#ff1493', // deep pink
  '#ff0000', // red
  '#ff4500', // orange red
  '#9370db', // medium purple
  '#4169e1', // royal blue
  '#ffd700', // gold
  '#ff6b6b', // coral
  '#4facfe', // bright blue
  '#00f2fe', // cyan
  '#cd853f', // peru
  '#da70d6', // orchid
];

interface ConfettiProps {
  active: boolean;
}

interface Particle {
  x: Animated.Value;
  y: Animated.Value;
  rotation: Animated.Value;
  scale: Animated.Value;
  opacity: Animated.Value;
  color: string;
  shape: 'heart' | 'square' | 'circle' | 'triangle';
}

const Confetti: React.FC<ConfettiProps> = ({ active }) => {
  const [isVisible, setIsVisible] = useState(false);
  const particles = React.useRef<Particle[]>([]);
  const shapes = ['heart', 'square', 'circle', 'triangle'];

  useEffect(() => {
    if (active && !isVisible) {
      setIsVisible(true);
      particles.current = [];
      createParticles();
      animateParticles();
    }
  }, [active]);

  const createParticles = () => {
    for (let i = 0; i < CONFETTI_COUNT; i++) {
      // Distribute particles across the width of the screen
      const startX = Math.random() * WIDTH;
      const startY = -20 - Math.random() * 100; // Start above screen
      
      particles.current.push({
        x: new Animated.Value(startX),
        y: new Animated.Value(startY),
        rotation: new Animated.Value(0),
        scale: new Animated.Value(0),
        opacity: new Animated.Value(1),
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        shape: shapes[Math.floor(Math.random() * shapes.length)] as any,
      });
    }
  };

  const animateParticles = () => {
    const animations = particles.current.map((particle, index) => {
      const fallDuration = 2000 + Math.random() * 1000;
      const swayAmount = (Math.random() - 0.5) * WIDTH * 0.8;
      const rotateAmount = Math.random() * 360;

      return Animated.parallel([
        // Gentle scale animation
        Animated.timing(particle.scale, {
          toValue: 0.6 + Math.random() * 0.4,
          duration: 200,
          useNativeDriver: true,
        }),
        // Gentle swaying movement
        Animated.timing(particle.x, {
          toValue: swayAmount,
          duration: fallDuration,
          easing: Easing.out(Easing.sin),
          useNativeDriver: true,
        }),
        // Smooth falling movement
        Animated.timing(particle.y, {
          toValue: HEIGHT + 100,
          duration: fallDuration,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        // Slow rotation
        Animated.timing(particle.rotation, {
          toValue: rotateAmount,
          duration: fallDuration,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        // Gentle fade in and out
        Animated.sequence([
          Animated.timing(particle.opacity, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(particle.opacity, {
            toValue: 0,
            duration: 300,
            delay: fallDuration - 300,
            useNativeDriver: true,
          }),
        ]),
      ]);
    });

    // Stagger the animations for a more natural effect
    Animated.stagger(10, animations).start(() => {
      setTimeout(() => setIsVisible(false), 1000);
    });
  };

  const getParticleStyle = (shape: string) => {
    switch (shape) {
      case 'heart':
        return [styles.heart, { borderRadius: 0 }];
      case 'square':
        return [styles.particle, { borderRadius: 1 }];
      case 'triangle':
        return [styles.triangle, { borderRadius: 0 }];
      default:
        return [styles.particle, { borderRadius: 5 }];
    }
  };

  if (!isVisible) return null;

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {particles.current.map((particle, index) => (
        <Animated.View
          key={index}
          style={[
            ...getParticleStyle(particle.shape),
            {
              backgroundColor: particle.color,
              opacity: particle.opacity,
              transform: [
                { translateX: particle.x },
                { translateY: particle.y },
                { rotate: particle.rotation.interpolate({
                  inputRange: [0, 360],
                  outputRange: ['0deg', '360deg'],
                })},
                { scale: particle.scale },
              ],
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  particle: {
    position: 'absolute',
    width: 10,
    height: 10,
  },
  heart: {
    position: 'absolute',
    width: 10,
    height: 10,
    backgroundColor: 'transparent',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    transform: [
      { rotate: '45deg' },
      { scale: 1 },
    ],
  },
  triangle: {
    position: 'absolute',
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderBottomWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
});

export default Confetti;
