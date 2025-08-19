import React, { useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  PanResponder,
  Animated,
  Text,
  Dimensions,
  Platform,
  TouchableOpacity,
} from 'react-native';
import Confetti from './Confetti';

interface ScratchCardProps {
  content: string;
  onScratchComplete?: () => void;
  coverColor?: string;
  onClose: () => void;
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.85;
const CARD_HEIGHT = 180;
const SCRATCH_DOT_SIZE = 30;

const ScratchCard: React.FC<ScratchCardProps> = ({
  content,
  onScratchComplete,
  coverColor = '#d53f8c',
  onClose,
}) => {
  const [scratched, setScratched] = useState(false);
  const [scratchMask, setScratchMask] = useState<{ x: number; y: number }[]>([]);
  const scratchOpacity = useRef(new Animated.Value(1)).current;
  const scratchedArea = useRef(0);
  const maskPoints = useRef<Set<string>>(new Set()).current;
  const totalPoints = (CARD_WIDTH * CARD_HEIGHT) / (SCRATCH_DOT_SIZE * SCRATCH_DOT_SIZE);

  const addScratchPoint = (x: number, y: number) => {
    // Round to nearest grid point to avoid duplicate points
    const gridX = Math.floor(x / SCRATCH_DOT_SIZE) * SCRATCH_DOT_SIZE;
    const gridY = Math.floor(y / SCRATCH_DOT_SIZE) * SCRATCH_DOT_SIZE;
    const key = `${gridX},${gridY}`;

    if (!maskPoints.has(key)) {
      maskPoints.add(key);
      setScratchMask(prev => [...prev, { x: gridX, y: gridY }]);
      
      // Calculate scratch percentage
      scratchedArea.current = maskPoints.size;
      const scratchPercentage = (scratchedArea.current / totalPoints) * 100;
      
      if (scratchPercentage >= 40 && !scratched) {
        revealContent();
      }
    }
  };

  const revealContent = () => {
    setScratched(true);
    Animated.timing(scratchOpacity, {
      toValue: 0,
      duration: 600,
      useNativeDriver: true,
    }).start(() => {
      onScratchComplete?.();
    });
  };

  // Using dot-based scratch detection instead of lines

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt) => {
        const { locationX, locationY } = evt.nativeEvent;
        addScratchPoint(locationX, locationY);
      },
      onPanResponderMove: (evt) => {
        if (scratched) return;
        const { locationX, locationY } = evt.nativeEvent;
        addScratchPoint(locationX, locationY);
      },
    })
  ).current;

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        {/* Content Layer */}
        <View style={styles.contentLayer}>
          <Text style={styles.contentText}>{content}</Text>
        </View>

        {/* Scratch Layer */}
        <Animated.View
          style={[
            styles.scratchLayer,
            { opacity: scratchOpacity, backgroundColor: coverColor }
          ]}
          {...panResponder.panHandlers}
        >
          {/* Scratch Mask Points */}
          {scratchMask.map((point, index) => (
            <View
              key={index}
              style={[
                styles.scratchPoint,
                {
                  left: point.x,
                  top: point.y,
                }
              ]}
            />
          ))}
          
          {!scratched && (
            <View style={styles.instructionContainer}>
              <Text style={styles.scratchText}>Scratch Here!</Text>
              <Text style={styles.scratchSubText}>to reveal your {content.includes('🔍') ? 'clue' : 'dare'}</Text>
            </View>
          )}
        </Animated.View>
      </View>

      {/* Confetti Animation */}
      <Confetti active={scratched} />
      
      {scratched && (
        <Text style={styles.instruction}>
          Your challenge has been revealed!
        </Text>
      )}
      {!scratched && (
        <Text style={styles.instruction}>
          Scratch the card to reveal your challenge
        </Text>
      )}
      <TouchableOpacity 
        onPress={onClose} 
        style={styles.closeButton}
        activeOpacity={0.8}
      >
        <Text style={styles.closeText}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  cardContainer: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#fff',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  contentLayer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 20,
  },
  scratchLayer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  scratchPoint: {
    position: 'absolute',
    width: SCRATCH_DOT_SIZE,
    height: SCRATCH_DOT_SIZE,
    backgroundColor: 'transparent',
  },
  instructionContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  contentText: {
    fontSize: 24,
    color: '#9f1239',
    textAlign: 'center',
    fontWeight: '600',
    lineHeight: 32,
    padding: 20,
  },
  scratchText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  scratchSubText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    opacity: 0.9,
  },
  instruction: {
    marginTop: 20,
    color: '#d53f8c',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 30,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#d53f8c',
    borderRadius: 25,
    width: 140,
    alignSelf: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  closeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});

export default ScratchCard;
