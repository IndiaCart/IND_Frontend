import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../Screens/AdminScreen/HomeScreen';
import ProfileScreen from '../../Screens/AdminScreen/ProfileScreen';
import CustomHeader from '../../components/AdminComponent/CustomHeader';
import { ThemeContext } from '../../design/ThemeContext';
// Import icons from Lucide
import { Home, User,ClipboardList , BaggageClaim} from 'lucide-react-native';
import { View, StyleSheet } from 'react-native';
import { CustomColor } from '../../design/Color';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        header: () => <CustomHeader title="Home" />,
      }}
    />
  </Stack.Navigator>
);

const ProfileStk = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        header: () => <CustomHeader title="Profile" />,
      }}
    />
  </Stack.Navigator>
);

const MainTabs = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused }) => {
          const iconColor = focused ? theme.text : CustomColor.GREY_60;
          const iconSize = focused ? 24 : 32;

          let IconComponent;

          if (route.name === 'HomeTab') {
            IconComponent = Home;
          } else if (route.name === 'ProfileTab') {
            IconComponent = User;
          }else if(route.name === 'orders'){
            IconComponent = ClipboardList;
          }else if(route.name === 'product'){
            IconComponent = BaggageClaim;
          }
          else{
             IconComponent = User;
          }

          return (
            <View style={[styles.iconWrapper, focused && [styles.activeCircle , {backgroundColor:theme.background}]]}>
              <IconComponent size={iconSize} color={iconColor} />
            </View>
          );
        },
        tabBarStyle: {
          position: 'absolute',
          bottom: 25,
          left: 20,
          right: 20,
          marginHorizontal: 10,
          marginBottom: 20,
          backgroundColor: theme.mode == "dark" ?CustomColor.GREY_90 : theme.text,
          borderRadius: 50,
          height: 70,
          paddingHorizontal: 20,
          borderTopWidth: 0,
          borderTopColor: 'transparent',

          // Shadow for iOS
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 8,

          // Elevation for Android
          elevation: 1,
        }
      })}

    >
      <Tab.Screen name="HomeTab" component={HomeStack} />
      <Tab.Screen name="orders" component={HomeStack} />
      <Tab.Screen name="product" component={ProfileStk} />
      <Tab.Screen name="rofilTab" component={ProfileStk} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    position:"relative",
    top:16,
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  activeCircle: {
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.15,
    // shadowRadius: 4,
    // elevation: 2,
  },

});

export default MainTabs;
