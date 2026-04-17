import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Card } from 'react-native-paper';
import { app } from './firebaseConfig';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useState, useEffect } from 'react';

//Lähteet: Kurssimateriaali

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