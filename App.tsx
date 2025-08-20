import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useState, useEffect } from 'react';
import Tiles from './components/Tiles';
import WelcomeAlert from './components/WelcomeAlert';

export default function App() {
  const [showWelcomeAlert, setShowWelcomeAlert] = useState(true);

  const handleCloseAlert = () => {
    setShowWelcomeAlert(false);
  };

  return (
    <View style={styles.container}>
      <Tiles />
      <StatusBar style="auto" />
      <WelcomeAlert 
        visible={showWelcomeAlert} 
        onClose={handleCloseAlert} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
