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
        <Tab.Screen name="Home" component={home} />
        <Tab.Screen name="My Tea" component={myTea} />
        <Tab.Screen name="Add Tea" component={addTea} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
