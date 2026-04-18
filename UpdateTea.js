import { StyleSheet, Text, View } from 'react-native';
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
        console.log(data);
      }
    };

    fetchItem();
  }, [id]);

  return (
    <View style={styles.container}>

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