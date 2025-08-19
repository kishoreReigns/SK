import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Modal, 
  StyleSheet, 
  Animated,
  Platform
} from 'react-native';
import ScratchCard from './ScratchCard';

const tileLabels = ['Title 1', 'Title 2', 'Title 3', 'Title 4', 'Title 5', 'Title 6'];

const Tiles = () => {
  const [selectedTile, setSelectedTile] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [showScratchCard, setShowScratchCard] = useState(false);
  const [scratchContent, setScratchContent] = useState('');
  const scaleAnim = useRef(new Animated.Value(1)).current;

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
    <View style={styles.container}>
      <Text style={styles.title}>MYSTERY QUEST</Text>
      <Text style={styles.subtitle}>Unlock the Adventure</Text>
      <View style={styles.grid}>
        {tileLabels.map((label, idx) => (
          <TouchableOpacity
            key={label}
            style={styles.tileContainer}
            onPress={() => handleTilePress(idx)}
            activeOpacity={0.8}
          >
            <View style={styles.tile}>
              <Text style={styles.tileText}>{label}</Text>
              {idx > 0 && <Text style={styles.questionMark}>?</Text>}
              {idx === 0 && <Text style={styles.emoji}>❤️</Text>}
            </View>
          </TouchableOpacity>
        ))}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    marginBottom: 8,
    color: '#9f1239',
    textAlign: 'center',
    letterSpacing: 1,
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
  tile: {
    backgroundColor: '#fff',
    aspectRatio: 1,
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#d53f8c',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: {
        elevation: 4,
      },
    }),
    borderWidth: 1,
    borderColor: '#fce7f3',
  },
  tileText: {
    color: '#d53f8c',
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
  },
  questionMark: {
    color: '#d53f8c',
    fontSize: 24,
    marginTop: 5,
  },
  emoji: {
    fontSize: 24,
    marginTop: 5,
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
