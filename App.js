import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import AddTea from './AddTea';
import MyTea from './MyTea';

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
        <Tab.Screen name="Koti" component={Home} />
        <Tab.Screen name="Minun teeni" component={MyTea} />
        <Tab.Screen name="Lisää tee" component={AddTea} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
