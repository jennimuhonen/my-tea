import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MyTea from './MyTea';
import UpdateTea from './UpdateTea';
import TakePicture from './TakePicture';

/*
Lähteet:
- Luento- ja kurssimateriaali
- ChatGPT: keskustelimme siitä, kuinka stack-navigaatio asetellaan tab-navigaation sisään ja piilotetaan ylimääräinen otsikko (tab-navigaatiosta)
*/

const Stack = createNativeStackNavigator();

export default function MyTeaStack() {

    return (
        <Stack.Navigator>
            <Stack.Screen name='Minun teeni' component={MyTea} />
            <Stack.Screen name='Päivitä' component={UpdateTea} />
            <Stack.Screen name='Ota kuva' component={TakePicture} />
        </Stack.Navigator>
    );
}