import { StyleSheet, View, Keyboard, Alert, Image } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useEffect, useState } from 'react';
import { app } from './firebaseConfig';
import { getDatabase, ref, push } from 'firebase/database';

/*
Lähteet:
- Kurssimateriaali
- ChatGPT:
    * Keskusteltu siitä, kuinka saada route toimimaan myös takaisin tähän suuntaan.
    * Tarkemmin routen muusta käytöstä koodissa.
    * Virheenkorjausta.
*/

const db = getDatabase(app);

export default function AddTea({ navigation, route }) {
  //const [savedUri, setSavedUri] = useState(route?.params?.savedUri); //Muotoiluun apua ChatGPT:ltä.
  //const [picture, setPicture] = useState();
  const [tea, setTea] = useState({
    name: '',
    place: '',
    picture: route?.params?.savedUri || '' //ChatGPT:ltä routen muotoilu tänne.
  });

  //ChatGPT kehotti lisäämään, jotta vaihdettu kuva päivittyy.
  useEffect(() => {
    if (route?.params?.savedUri) {
      setTea(prev => ({
        ...prev,
        picture: route.params.savedUri
      }));
    }
  }, [route?.params?.savedUri]);

  const saveItem = () => {
    if (tea.name && tea.place) {
      push(ref(db, 'items/'), tea);
      setTea({
        name: '',
        place: '',
        picture: ''
      })
      Keyboard.dismiss(); //Lähde: ChatGPT
    } else {
      Alert.alert('Tallennus ei onnistunut', 'Lisää nimi ja paikka.')
    }
  }

  const image = () => {
    if (tea.picture) {
      return (
        <Image
          style={{ width: '70%', height: '35%' }}
          resizeMode="cover"
          source={{ uri: tea.picture }}
        />
      )
    }
  }

  const addPictureButton = () => {
    if (tea.picture) {
      return (
        <Button mode='contained' onPress={() => navigation.navigate('Ota kuva')}>Vaihda kuva</Button>
      )
    } else {
      return (
        <Button mode='contained' onPress={() => navigation.navigate('Ota kuva')}>Lisää kuva</Button>
      )
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

      {image()}
      {addPictureButton()}

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