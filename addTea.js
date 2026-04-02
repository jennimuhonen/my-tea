import { StyleSheet, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useState } from 'react';

export default function App() {
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");

  return (
    <View style={styles.container}>
      <TextInput
      style={styles.textInput}
      label='Teen nimi'
      value={name}
      />
      <TextInput
      style={styles.textInput}
      label='Ostopaikka'
      value={place}
      />

      <Button mode='contained' icon='content-save'>
        Tallenna
      </Button>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  textInput: {
    width: '90%',
    margin: 3,
  }
});