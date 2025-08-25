import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Modal, 
  StyleSheet, 
  Animated,
  Platform,
  Dimensions
} from 'react-native';
import ScratchCard from './ScratchCard';

const { width } = Dimensions.get('window');

const tileLabels = [
  'Whisper — 🤫',
  'Oneness — 🫶', 
  'Nexus — 🔗',
  'Devotion — ❤️‍🔥',
  'Eternity — ♾️',
  'Reverie — 💭'
];

const Tiles = () => {
  const [selectedTile, setSelectedTile] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [showScratchCard, setShowScratchCard] = useState(false);
  const [scratchContent, setScratchContent] = useState('');
  
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const heartPulse = useRef(new Animated.Value(1)).current;
  const floatingAnim = useRef(new Animated.Value(0)).current;
  const welcomeSlideAnim = useRef(new Animated.Value(-100)).current;
  const welcomeFadeAnim = useRef(new Animated.Value(0)).current;
  const welcomeGlowAnim = useRef(new Animated.Value(1)).current;

  // Heart pulse animation
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(heartPulse, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(heartPulse, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Floating animation for hearts
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatingAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),        Animated.timing(floatingAnim, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    ).start();
    
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Welcome animation sequence
    Animated.sequence([
      Animated.timing(welcomeSlideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(welcomeFadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();

    // Welcome glow animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(welcomeGlowAnim, {
          toValue: 1.05,
          duration: 2000,
          useNativeDriver: true,
        }),        Animated.timing(welcomeGlowAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const getGradientColors = (index: number) => {
    const gradients = [
      ['#FF69B4', '#FF1493'], // Hot pink to deep pink - Passionate love
      ['#DC143C', '#B22222'], // Crimson to firebrick - Deep devotion
      ['#FF6347', '#FF4500'], // Tomato to orange red - Burning passion
      ['#9370DB', '#8A2BE2'], // Medium orchid to blue violet - Mystical romance
      ['#FF69B4', '#C71585'], // Hot pink to medium violet red - Tender love
      ['#DA70D6', '#BA55D3'], // Orchid to medium orchid - Dreamy romance
    ];
    return gradients[index] || gradients[0];
  };

  const handleTilePress = (index: number) => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setSelectedTile(index);
      setModalVisible(true);
    });
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedTile(null);
  };
  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      {/* Floating Hearts Background */}
      <Animated.View style={[
        styles.floatingHeart,
        styles.heart1,
        {
          transform: [{
            translateY: floatingAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, -20]
            })
          }]
        }
      ]}>
        <Text style={styles.heartEmoji}>💕</Text>
      </Animated.View>
      
      <Animated.View style={[
        styles.floatingHeart,
        styles.heart2,
        {
          transform: [{
            translateY: floatingAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 15]
            })
          }]
        }
      ]}>
        <Text style={styles.heartEmoji}>💖</Text>
      </Animated.View>

      <Animated.View style={[
        styles.floatingHeart,
        styles.heart3,        {
          transform: [{ scale: heartPulse }]
        }
      ]}>
        <Text style={styles.heartEmoji}>💝</Text>
      </Animated.View>

      {/* Welcome Text with Animation */}
      <Animated.View style={[
        styles.welcomeContainer,
        {
          transform: [
            { translateY: welcomeSlideAnim },
            { scale: welcomeGlowAnim }
          ],
          opacity: welcomeFadeAnim
        }
      ]}>
        <Text style={styles.welcomeText}>Hi Shalini 💖</Text>
        <Text style={styles.welcomeSubtext}>Welcome to your Love Quest</Text>
      </Animated.View>

      <Text style={styles.title}>💕 LOVE QUEST 💕</Text>
      <Text style={styles.subtitle}>Unlock Your Romantic Adventure</Text>
      
      <View style={styles.grid}>
        {tileLabels.map((label, idx) => {
          const colors = getGradientColors(idx);
          return (
            <Animated.View
              key={label}
              style={[
                styles.tileContainer,
                {
                  transform: [{ scale: scaleAnim }]
                }
              ]}
            >
              <TouchableOpacity
                style={styles.tileWrapper}
                onPress={() => handleTilePress(idx)}
                activeOpacity={0.8}
              >
                <View style={[
                  styles.tile,
                  {
                    backgroundColor: colors[0],
                    shadowColor: colors[1],
                  }
                ]}>
                  <Text style={styles.tileText}>{label}</Text>
                  {idx > 0 && <Text style={styles.questionMark}>💫</Text>}
                  {idx === 0 && (
                    <Animated.View style={{ transform: [{ scale: heartPulse }] }}>
                      <Text style={styles.emoji}>💖</Text>
                    </Animated.View>
                  )}
                </View>
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </View>
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{tileLabels[selectedTile ?? 0]}</Text>
            
            {!showScratchCard ? (
              <>
                <TouchableOpacity 
                  style={styles.optionButton}
                  activeOpacity={0.8}
                  onPress={() => {
                    setScratchContent('🔍 Here\'s your clue:\n\nThis is a mysterious clue for tile ' + (selectedTile! + 1));
                    setShowScratchCard(true);
                  }}
                >
                  <Text style={styles.emoji}>🔍</Text>
                  <Text style={styles.optionText}>Get a Clue</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.optionButton, styles.optionButtonSecondary]}
                  activeOpacity={0.8}
                  onPress={() => {
                    setScratchContent('🎯 Your dare is:\n\nThis is an exciting dare for tile ' + (selectedTile! + 1));
                    setShowScratchCard(true);
                  }}
                >
                  <Text style={styles.emoji}>🎯</Text>
                  <Text style={[styles.optionText, { color: '#9f1239' }]}>Take a Dare</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  onPress={closeModal} 
                  style={styles.closeButton}
                  activeOpacity={0.7}
                >
                  <Text style={styles.closeText}>Back</Text>
                </TouchableOpacity>
              </>
            ) : (
              <ScratchCard
                content={scratchContent}
                onScratchComplete={() => {
                  // Handle scratch complete
                }}                onClose={() => {
                  setShowScratchCard(false);
                  closeModal();
                }}
                coverColor={scratchContent.includes('🔍') ? '#d53f8c' : '#9f1239'}
              />
            )}
          </View>
        </View>
      </Modal>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'linear-gradient(135deg, #ffeef8 0%, #f8f5ff 100%)',
    paddingTop: 50,
  },
  floatingHeart: {
    position: 'absolute',
    zIndex: 1,
  },
  heart1: {
    top: 80,
    left: 30,
  },  heart2: {
    top: 200,
    right: 40,
  },
  heart3: {
    top: 140,
    left: width / 2 - 15,
  },
  heartEmoji: {
    fontSize: 20,
    opacity: 0.6,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: '800',
    color: '#9f1239',
    textAlign: 'center',
    letterSpacing: 1,
    textShadowColor: 'rgba(159, 18, 57, 0.3)',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 6,
  },
  welcomeSubtext: {
    fontSize: 16,
    color: '#d53f8c',
    textAlign: 'center',
    fontWeight: '600',
    letterSpacing: 0.8,
    marginTop: 5,
    opacity: 0.9,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 8,
    color: '#9f1239',
    textAlign: 'center',
    letterSpacing: 1,
    textShadowColor: 'rgba(159, 18, 57, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 18,
    color: '#d53f8c',
    textAlign: 'center',
    marginBottom: 40,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  tileContainer: {
    width: '47%',
    marginBottom: 20,
  },
  tileWrapper: {
    borderRadius: 20,
  },
  tile: {
    aspectRatio: 1,
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 15,      },
      android: {
        elevation: 8,
      },
    }),
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  tileText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    textShadowColor: 'rgba(159, 18, 57, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  questionMark: {
    color: '#fff',
    fontSize: 20,
    marginTop: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  emoji: {
    fontSize: 24,
    marginTop: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 25,
    alignItems: 'center',
    width: '90%',
    maxWidth: 340,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
      },
      android: {
        elevation: 8,
      },
    }),
    borderWidth: 2,
    borderColor: '#fce7f3',
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 25,
    color: '#9f1239',
    textAlign: 'center',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  optionButton: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginVertical: 8,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#d53f8c',
    ...Platform.select({
      ios: {
        shadowColor: '#d53f8c',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  optionButtonSecondary: {
    backgroundColor: '#fff',
    borderColor: '#9f1239',
  },
  optionText: {
    color: '#d53f8c',
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 10,
    letterSpacing: 0.5,
  },
  closeButton: {
    marginTop: 25,
    padding: 15,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#fdf2f8',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#fce7f3',
  },
  closeText: {
    color: '#9f1239',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
});

export default Tiles;
