import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import home from './home';
import addTea from './addTea';
import myTea from './myTea';

/*
Lähteet:
- Kurssin verkkosivusto: https://haagahelia.github.io/mobilecourse/
- React Native Paper: https://oss.callstack.com/react-native-paper/ (Bottom Navigation)
*/

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Koti" component={home} />
        <Tab.Screen name="Minun teeni" component={myTea} />
        <Tab.Screen name="Lisää tee" component={addTea} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
