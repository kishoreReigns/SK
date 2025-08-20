import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface WelcomeAlertProps {
  visible: boolean;
  onClose: () => void;
}

const { width, height } = Dimensions.get('window');

export default function WelcomeAlert({ visible, onClose }: WelcomeAlertProps) {
  const scaleValue = new Animated.Value(0);

  React.useEffect(() => {
    if (visible) {
      Animated.spring(scaleValue, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.alertContainer,
            { transform: [{ scale: scaleValue }] }
          ]}
        >
          <LinearGradient
            colors={['#ff6b6b', '#ff8e8e', '#ffa8a8']}
            style={styles.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            {/* Heart decoration */}
            <View style={styles.heartContainer}>
              <Text style={styles.heartEmoji}>💝</Text>
            </View>

            {/* Title */}
            <Text style={styles.title}>Welcome, Darling! 💕</Text>
            
            {/* Message */}
            <Text style={styles.message}>
              Welcome to our lovely app! We're so excited to have you here. 
              Get ready for an amazing experience filled with joy and surprises! ✨
            </Text>

            {/* Decorative hearts */}
            <View style={styles.decorativeHearts}>
              <Text style={styles.smallHeart}>💖</Text>
              <Text style={styles.smallHeart}>💗</Text>
              <Text style={styles.smallHeart}>💖</Text>
            </View>

            {/* OK Button */}
            <TouchableOpacity
              style={styles.okButton}
              onPress={onClose}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#ff4757', '#ff3742']}
                style={styles.buttonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.buttonText}>Let's Begin! 💝</Text>
              </LinearGradient>
            </TouchableOpacity>
          </LinearGradient>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertContainer: {
    width: width * 0.85,
    borderRadius: 25,
    overflow: 'hidden',
    elevation: 10,
    shadowColor: '#ff6b6b',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  gradient: {
    padding: 30,
    alignItems: 'center',
  },
  heartContainer: {
    marginBottom: 20,
  },
  heartEmoji: {
    fontSize: 60,
    textAlign: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  message: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 25,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  decorativeHearts: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
    marginBottom: 25,
  },
  smallHeart: {
    fontSize: 20,
    opacity: 0.8,
  },
  okButton: {
    width: '80%',
    borderRadius: 25,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#ff4757',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  buttonGradient: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});
