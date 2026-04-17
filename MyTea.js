import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Alert } from 'react-native';
import { Card, IconButton } from 'react-native-paper';
import { app } from './firebaseConfig';
import { getDatabase, ref, onValue, remove } from 'firebase/database';
import { useState, useEffect } from 'react';

/*
Lähteet:
- Kurssimateriaali ja kurssitehtävät
- ChatGPT: tarkemmin käytöstä koodin seassa
- React Native Paper: Icon Button, https://oss.callstack.com/react-native-paper/docs/components/IconButton/
*/

const db = getDatabase(app);

export default function MyTea() {

  const [teas, setTeas] = useState([]);

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
        console.log(itemsArray)
      } else {
        setTeas([]);
      }
    })
  }, [])

  //deleteItemia muokattu toimivaksi ChatGPT:n avustuksella

  const deleteItem = async (id) => {
    try {
      await remove(ref(db, 'items/' + id));
    } catch (error) {
      Alert.alert('Virhe', 'Poistaminen ei onnistunut');
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
              <IconButton
              icon='delete-outline'
              size={20}
              iconColor='red'
              onPress={() => deleteItem(item.id)}
              />
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
  }
});