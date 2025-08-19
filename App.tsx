import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Tiles from './components/Tiles';

export default function App() {
  return (
    <View style={styles.container}>
      <Tiles />
      <StatusBar style="auto" />
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
