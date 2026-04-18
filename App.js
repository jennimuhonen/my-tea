import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { PaperProvider } from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';
import Home from './Home';
import AddTea from './AddTea';
import MyTeaStack from './MyTeaStack';
import TakePicture from './TakePicture';

/*
Lähteet:
- Kurssin verkkosivusto: https://haagahelia.github.io/mobilecourse/
- React Native Paper: https://oss.callstack.com/react-native-paper/ (Bottom Navigation)
- Ikonit: https://icons.expo.fyi/Index
*/

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Koti') {
                iconName = 'home-outline';
              } else if (route.name === 'Minun teeni') {
                iconName = 'leaf-outline';
              } else if (route.name === 'Lisää tee') {
                iconName = 'add-circle-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen name="Koti" component={Home} />
          <Tab.Screen name="Minun teeni" options={{ headerShown: false }} component={MyTeaStack} />
          <Tab.Screen name="Lisää tee" component={AddTea} />
          <Tab.Screen name="Ota kuva" component={TakePicture} />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
