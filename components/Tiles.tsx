import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Modal, 
  StyleSheet, 
  Animated,
  Platform,
  Dimensions,
  ScrollView
} from 'react-native';
import ScratchCard from './ScratchCard';

const { width, height } = Dimensions.get('window');

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
  const sparkleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Heart pulse animation
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
        }),
        Animated.timing(floatingAnim, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    ).start();
    
    // Sparkle animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(sparkleAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(sparkleAnim, {
          toValue: 0,
          duration: 2000,
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
        }),
        Animated.timing(welcomeGlowAnim, {
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
    setShowScratchCard(false);
  };

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
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
          styles.heart3,
          {
            transform: [{ scale: heartPulse }]
          }
        ]}>
          <Text style={styles.heartEmoji}>💝</Text>
        </Animated.View>

        {/* Sparkle decorations */}
        <Animated.View style={[
          styles.sparkle,
          styles.sparkle1,
          {
            opacity: sparkleAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0.3, 1]
            })
          }
        ]}>
          <Text style={styles.sparkleEmoji}>✨</Text>
        </Animated.View>
        
        <Animated.View style={[
          styles.sparkle,
          styles.sparkle2,
          {
            opacity: sparkleAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0.3]
            })
          }
        ]}>
          <Text style={styles.sparkleEmoji}>⭐</Text>
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
                key={`tile-${idx}`}
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
      </Animated.View>

      {/* Enhanced Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {selectedTile !== null ? tileLabels[selectedTile] : ''}
            </Text>
            
            {!showScratchCard ? (
              <>
                <View style={styles.optionsContainer}>
                  <TouchableOpacity 
                    style={styles.optionCard}
                    activeOpacity={0.8}                    onPress={() => {                      const tileNumber = selectedTile !== null ? selectedTile + 1 : 1;                      let clueContent = '';                      if (selectedTile === 0) {
                        // Whisper tile specific clue with emoji
                        clueContent = `🔍 Here's your clue:\n\n🌊 Round and round your shirts will roam—peek in the cave of foam. 🧼`;
                      } else if (selectedTile === 1) {
                        // Oneness tile specific clue with emoji
                        clueContent = `🔍 Here's your clue:\n\n🪙 Coins and crumbs keep secrets there can able to find the missed things there 🔍`;
                      } else if (selectedTile === 2) {
                        // Nexus tile specific clue with emoji
                        clueContent = `🔍 Here's your clue:\n\n🏛️ People use me to build temples, but now I'm hiding in a tiny steel cave. 🔩`;
                      } else if (selectedTile === 3) {
                        // Devotion tile specific clue with emoji
                        clueContent = `🔍 Here's your clue:\n\n🌿 I'm beneath the keeper of greens, resting low where dust gathers like silk. Guess my secret spot. 🕷️`;                      } else if (selectedTile === 4) {
                        // Eternity tile specific clue with emoji
                        clueContent = `🔍 Here's your clue:\n\n📱 Usually I hold screens, but now I keep a mystery with ease. Open me to find the present 🎁`;                      } else if (selectedTile === 5) {
                        // Reverie tile specific clue with emoji
                        clueContent = `🔍 Here's your clue:\n\n💭 You meet me before going out, but not for food, not for sleep. I hold treasures inside me. Guess my hiding spot. 👜`;
                      } else {
                        clueContent = `🔍 Here's your clue:\n\nThis is a mysterious clue for tile ${tileNumber}`;
                      }
                      setScratchContent(clueContent);
                      setShowScratchCard(true);
                    }}
                  >
                    <View style={styles.optionHeader}>
                      <View style={[styles.optionIconContainer, styles.clueIconContainer]}>
                        <Text style={styles.optionIcon}>🔍</Text>
                      </View>
                      <View style={styles.optionTextContainer}>
                        <Text style={styles.optionTitle}>Get a Clue</Text>
                        <Text style={styles.optionDescription}>Discover hidden hints to solve the mystery</Text>
                      </View>
                    </View>
                    <View style={[styles.optionGlow, styles.clueGlow]} />
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={[styles.optionCard, styles.dareCard]}
                    activeOpacity={0.8}                    onPress={() => {                      const tileNumber = selectedTile !== null ? selectedTile + 1 : 1;
                      let dareContent = '';                      if (selectedTile === 0) {
                        // Whisper tile specific dare with emoji
                        dareContent = `🎯 Your dare is:\n\n👗 I challenge you to dress up in my costume and act like me for 3 minutes 🎭`;
                      } else if (selectedTile === 1) {
                        // Oneness tile specific dare with emoji
                        dareContent = `🎯 Your dare is:\n\n😤 Reaction Challenge: we both have to show ugly faces — should not react to that! 😆`;
                      } else if (selectedTile === 2) {
                        // Nexus tile specific dare with emoji
                        dareContent = `🎯 Your dare is:\n\n📝 Write a wish on a small paper, fold it into a plane or crush, and land it in the bin to "unlock" the present. ✈️🗑️`;
                      } else if (selectedTile === 3) {
                        // Devotion tile specific dare with emoji
                        dareContent = `🎯 Your dare is:\n\n🤝 Warm Hands (45s) — hold hands and tell one memory that still warms you. 💕`;                      } else if (selectedTile === 4) {
                        // Eternity tile specific dare with emoji
                        dareContent = `🎯 Your dare is:\n\n💋 Give him 25 kisses in places where he's never been kissed before. 😘`;                      } else if (selectedTile === 5) {
                        // Reverie tile specific dare with emoji
                        dareContent = `🎯 Your dare is:\n\n🤗 Hold a strong hug without moving, or getting distracted, no matter what he does. Stay strong! 💪`;
                      } else {
                        dareContent = `🎯 Your dare is:\n\nThis is an exciting dare for tile ${tileNumber}`;
                      }
                      setScratchContent(dareContent);
                      setShowScratchCard(true);
                    }}
                  >
                    <View style={styles.optionHeader}>
                      <View style={[styles.optionIconContainer, styles.dareIconContainer]}>
                        <Text style={styles.optionIcon}>🎯</Text>
                      </View>
                      <View style={styles.optionTextContainer}>
                        <Text style={[styles.optionTitle, styles.dareTitle]}>Take a Dare</Text>
                        <Text style={[styles.optionDescription, styles.dareDescription]}>Accept a romantic challenge</Text>
                      </View>
                    </View>
                    <View style={[styles.optionGlow, styles.dareGlow]} />
                  </TouchableOpacity>
                </View>

                <TouchableOpacity 
                  onPress={closeModal} 
                  style={styles.closeButton}
                  activeOpacity={0.7}
                >
                  <Text style={styles.closeText}>✨ Back ✨</Text>
                </TouchableOpacity>
              </>
            ) : (
              <ScratchCard
                content={scratchContent}
                onScratchComplete={() => {
                  // Handle scratch complete
                }}
                onClose={() => {
                  setShowScratchCard(false);
                  closeModal();
                }}
                coverColor={scratchContent.includes('🔍') ? '#d53f8c' : '#9f1239'}
              />
            )}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffeef8',
  },
  scrollContent: {
    flexGrow: 1,
    minHeight: height,
  },
  content: {
    flex: 1,
    paddingTop: 50,
    paddingBottom: 30,
  },
  floatingHeart: {
    position: 'absolute',
    zIndex: 1,
  },
  heart1: {
    top: 80,
    left: 30,
  },
  heart2: {
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
  sparkle: {
    position: 'absolute',
    zIndex: 1,
  },
  sparkle1: {
    top: 120,
    right: 20,
  },
  sparkle2: {
    top: 180,
    left: 60,
  },
  sparkleEmoji: {
    fontSize: 16,
    opacity: 0.8,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: '900',
    color: '#9f1239',
    textAlign: 'center',
    letterSpacing: 1.5,
    textShadowColor: 'rgba(159, 18, 57, 0.3)',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 6,
  },
  welcomeSubtext: {
    fontSize: 18,
    color: '#d53f8c',
    textAlign: 'center',
    fontWeight: '600',
    letterSpacing: 1,
    marginTop: 8,
    opacity: 0.9,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    marginBottom: 12,
    color: '#9f1239',
    textAlign: 'center',
    letterSpacing: 2,
    textShadowColor: 'rgba(159, 18, 57, 0.3)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 8,
  },
  subtitle: {
    fontSize: 20,
    color: '#d53f8c',
    textAlign: 'center',
    marginBottom: 50,
    fontWeight: '600',
    letterSpacing: 1,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  tileContainer: {
    width: '47%',
    marginBottom: 25,
  },
  tileWrapper: {
    borderRadius: 25,
  },
  tile: {
    aspectRatio: 1,
    borderRadius: 25,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.4,
        shadowRadius: 20,
      },
      android: {
        elevation: 12,
      },
    }),
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  tileText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    letterSpacing: 0.5,
  },
  questionMark: {
    color: '#fff',
    fontSize: 24,
    marginTop: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  emoji: {
    fontSize: 28,
    marginTop: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 35,
    padding: 30,
    alignItems: 'center',
    width: '95%',
    maxWidth: 380,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.4,
        shadowRadius: 25,
      },
      android: {
        elevation: 15,
      },
    }),
    borderWidth: 3,
    borderColor: '#fce7f3',
  },
  modalTitle: {
    fontSize: 30,
    fontWeight: '800',
    marginBottom: 30,
    color: '#9f1239',
    textAlign: 'center',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  optionsContainer: {
    width: '100%',
    gap: 20,
  },
  optionCard: {
    backgroundColor: '#fff',
    borderRadius: 28,
    padding: 24,
    position: 'relative',
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#f9a8d4',
    ...Platform.select({
      ios: {
        shadowColor: '#d53f8c',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 25,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  dareCard: {
    borderColor: '#f87171',
  },
  optionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 2,
  },
  optionIconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  clueIconContainer: {
    backgroundColor: '#ec4899',
    shadowColor: '#ec4899',
  },
  dareIconContainer: {
    backgroundColor: '#ef4444',
    shadowColor: '#ef4444',
  },
  optionIcon: {
    fontSize: 32,
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#d53f8c',
    marginBottom: 4,
    letterSpacing: 0.8,
  },
  dareTitle: {
    color: '#dc2626',
  },
  optionDescription: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '500',
    lineHeight: 20,
    letterSpacing: 0.3,
  },
  dareDescription: {
    color: '#b91c1c',
  },
  optionGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 28,
    opacity: 0.08,
    zIndex: 1,
  },
  clueGlow: {
    backgroundColor: '#ec4899',
  },
  dareGlow: {
    backgroundColor: '#ef4444',
  },
  closeButton: {
    marginTop: 30,
    padding: 18,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#fdf2f8',
    borderRadius: 28,
    borderWidth: 3,
    borderColor: '#e9d5ff',
    ...Platform.select({
      ios: {
        shadowColor: '#d8b4fe',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  closeText: {
    color: '#9f1239',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});

export default Tiles;
