import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AddTea from './AddTea';
import TakePicture from './TakePicture'

const Stack = createNativeStackNavigator();

export default function AddTeaStack() {

    return (
        <Stack.Navigator>
            <Stack.Screen name='Lisää tee' component={AddTea} />
            <Stack.Screen name='Ota kuva' component={TakePicture} />
        </Stack.Navigator>
    );
}