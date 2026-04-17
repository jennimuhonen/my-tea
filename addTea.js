import { StyleSheet, View, Keyboard, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useState } from 'react';
import { app } from './firebaseConfig';
import { getDatabase, ref, push } from 'firebase/database';

//Lähteet: Kurssimateriaali, ChatGPT (tarkemmin käytöstä koodissa)

const db = getDatabase(app);

export default function App() {
  const [tea, setTea] = useState({
    name: '',
    place: ''
  });

  const saveItem = () => {
    if (tea.name && tea.place) {
      push(ref(db, 'items/'), tea);
      setTea({
        name: '',
        place: ''
      })
      Keyboard.dismiss(); //Lähde: ChatGPT
    } else {
      Alert.alert('Tallennus ei onnistunut', 'Lisää nimi ja paikka.')
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        label='Teen nimi'
        onChangeText={text => setTea({ ...tea, name: text })}
        value={tea.name}
      />
      <TextInput
        style={styles.textInput}
        label='Ostopaikka'
        onChangeText={text => setTea({ ...tea, place: text })}
        value={tea.place}
      />

      <Button mode='contained' icon='content-save' onPress={saveItem}>
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