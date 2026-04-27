import { StyleSheet, Text, View, FlatList, Alert, Image } from 'react-native';
import { Card, IconButton } from 'react-native-paper';
import { app } from './firebaseConfig';
import { getDatabase, ref, onValue, remove, update } from 'firebase/database';
import { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

/*
Lähteet:
- Kurssimateriaali ja kurssitehtävät
- ChatGPT: tarkemmin käytöstä koodin seassa
- React Native Paper: Icon Button, https://oss.callstack.com/react-native-paper/docs/components/IconButton/
- React Native Paper, Icons: https://oss.callstack.com/react-native-paper/docs/guides/icons/
*/

const db = getDatabase(app);

export default function MyTea({ navigation, route }) {

  const [teas, setTeas] = useState([]);
  const savedUri = route?.params?.savedUri;
  const id = route?.params?.id;

  useEffect(() => {
    const itemsRef = ref(db, 'items/');
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const itemsArray = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value
        }));
        setTeas(itemsArray);
        // console.log("MY TEA", itemsArray)
      } else {
        setTeas([]);
      }
    })
  }, [])

  //useEffect ei aktivoitunut, joten ChatGPT kehotti käyttämään useFocusEffectiä
  useFocusEffect(
    useCallback(() => {
      if (savedUri && id) {
        changePicture(savedUri, id);
      }
    }, [savedUri, id])
  );

  //deleteItemia muokattu toimivaksi ChatGPT:n avustuksella
  const deleteItem = async (id) => {
    try {
      await remove(ref(db, 'items/' + id));
    } catch (error) {
      Alert.alert('Virhe', 'Poistaminen ei onnistunut');
    }
  };

  //apuna ChatGPT + kuvan poistamisen myötä muokkasimme myös sitä millä perusteella kuva näytetään
  const deletePicture = async (id) => {
    try {
      await update(ref(db, 'items/' + id), { picture: '' });
    } catch (error) {
      Alert.alert('Virhe', 'Kuvan poistaminen ei onnistunut');
    }
  };

  const changePicture = async (savedUri, id) => {
    try {
      await update(ref(db, 'items/' + id), { picture: savedUri });
    } catch (error) {
      Alert.alert('Virhe', 'Kuvan vaihtaminen ei onnistunut');
    }
  };

  return (
    <View>
      <FlatList
        style={styles.list}
        data={teas}
        renderItem={({ item }) =>
          <Card style={styles.card}>
            <Card.Title title={item.name} />
            <Card.Content>
              <Text variant='bodyMedium'>Paikka: {item.place}</Text>
              {typeof item.picture === 'string' && item.picture.length > 0 && (
                <Image
                  style={{ width: '70%', height: '200', marginTop: '10' }} //ChatGPT:n avulla ratkaisin kuvien näkyvyysongelman, prosentit eivät toimineet heightissä.
                  resizeMode="cover"
                  source={{ uri: item.picture }}
                />
              )}


              <View style={styles.flex}>
                <IconButton
                  icon='pencil'
                  size={20}
                  onPress={() => navigation.navigate('Päivitä', { id: item.id })} //ChatGPT muotoilussa apuna
                />
                <IconButton
                  icon='camera-outline'
                  size={20}
                  onPress={() => navigation.navigate('Ota kuva', { id: item.id })}
                />
                <IconButton
                  icon='camera-off'
                  size={20}
                  onPress={() => deletePicture(item.id)}
                />
                <IconButton
                  icon='delete-outline'
                  size={20}
                  onPress={() => deleteItem(item.id)}
                />
              </View>

            </Card.Content>
          </Card>
        }
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
  list: {
    width: '100%',
  },
  card: {
    marginBottom: 5,
  },
  flex: {
    flexDirection: 'row',
    marginTop: 5,
  }
});