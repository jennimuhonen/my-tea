import { StyleSheet, View, Keyboard, Alert, Image, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { useEffect, useState, useCallback } from 'react';
import { app } from './firebaseConfig';
import { getDatabase, ref, push } from 'firebase/database';

/*
Lähteet:
- Kurssimateriaali
- ChatGPT:
    * Keskusteltu siitä, kuinka saada route toimimaan myös takaisin tähän suuntaan.
    * Tarkemmin muusta käytöstä koodissa.
    * UseFocusEffect: ratkaisemaan tarpeettomasti talteen jäävän datan haasteet.
    * Virheenkorjausta.
*/

const db = getDatabase(app);

export default function AddTea({ navigation, route }) {
  const [tea, setTea] = useState({
    name: '',
    place: '',
    picture: route?.params?.savedUri || '' //ChatGPT:ltä routen muotoilu tänne.
  });
  const [message, setMessage] = useState('');
  const [noImage, setNoImage] = useState(false);

  //ChatGPT kehotti lisäämään, jotta vaihdettu kuva päivittyy.
  useEffect(() => {
    if (route?.params?.savedUri) {
      setTea(prev => ({
        ...prev,
        picture: route.params.savedUri
      }));
    }
  }, [route?.params?.savedUri]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setTea({
          name: '',
          place: '',
          picture: ''
        });
        setNoImage(false);
        setMessage('');
      };
    }, [])
  );

  const saveItem = () => {
    if (tea.name && tea.place) {
      push(ref(db, 'items/'), tea);
      setTea({
        name: '',
        place: '',
        picture: ''
      })
      setMessage('Tiedot tallennettu.')
      Keyboard.dismiss(); //Lähde: ChatGPT
    } else {
      Alert.alert('Tallennus ei onnistunut', 'Lisää nimi ja paikka.')
    }
  }

  const imageNoImage = () => {
    if (!noImage && !tea.picture) {
      return (
        <View style={{ flexDirection: 'row' }}>
          <Button mode='contained' onPress={() => { navigation.navigate('Ota kuva'); setMessage(""); }}>Lisää kuva</Button>
          <Button mode='contained' onPress={() => { setNoImage(true); setMessage(""); }}>Ei kuvaa</Button>
        </View>
      )
    }
  }

  const showTextInput = () => {
    if (tea.picture || noImage) {
      return (

        <View style={styles.textInput}>
          <TextInput
            label='Teen nimi'
            onChangeText={text => setTea({ ...tea, name: text })}
            value={tea.name}
          />
          <TextInput
            label='Ostopaikka'
            onChangeText={text => setTea({ ...tea, place: text })}
            value={tea.place}
          />

          <Button mode='contained' icon='content-save' onPress={saveItem}>
            Tallenna
          </Button>
        </View>
      )
    }

  }

  const showImage = () => {
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
    }
  }

  return (
    <View style={styles.container}>
      {imageNoImage()}
      {showTextInput()}
      {showImage()}
      {addPictureButton()}

      <Text>{message}</Text>

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