import { StyleSheet, Text, View, Keyboard, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { app } from './firebaseConfig';
import { getDatabase, ref, get, update } from 'firebase/database';
import { useState, useEffect } from 'react';

/*
Lähteet:
- Kurssimateriaali
- ChatGPT: tarkemmin koodissa
*/

const db = getDatabase(app);

export default function UpdateTea({ route }) {
  const { id } = route.params;
  const [tea, setTea] = useState({
    name: '',
    place: ''
  });

  //ChatGPT:tä hyödynnetty fetchItemia rakentaessa. Keskustelimme vaihtoehdoista (get/onValue) ja ChatGPT näytti kuinka kannattaa muotoilla.

  useEffect(() => {
    const fetchItem = async () => {
      const snapshot = await get(ref(db, 'items/' + id));
      if (snapshot.exists()) {
        const data = snapshot.val();

        setTea({
          name: data.name || '',
          place: data.place || ''
        });
        console.log("UPDATE TEA", data);
      }
    };

    fetchItem();
  }, [id]);



  //ChatGPT:n suosituksesta lisäsin asyncin, mutta sain toimimaan ilmankin apua.

  const updateItem = async () => {
    if (tea.name && tea.place) {
      try {
        await update(ref(db, 'items/' + id), tea);
        Keyboard.dismiss();
      } catch (error) {
        Alert.alert('Virhe', 'Päivitys ei onnistunut')
      }
    } else {
      Alert.alert('Virhe', 'Tallennus ei onnistunut')
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

      <Button mode='contained' icon='content-save' onPress={updateItem}>
        Päivitä
      </Button>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  textInput: {
    width: '90%',
    margin: 3,
  }
});