import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "./src/screens/HomeScreen";
import NotificationScreen from "./src/screens/NotificationScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import SignInScreen from "./src/screens/SignInScreen";
import IndividualPostScreen from "./src/screens/IndividualPostScreen"

import { AuthContext, AuthProvider } from "./src/providers/AuthProvider";
import { Entypo, AntDesign, Ionicons } from "@expo/vector-icons";
import * as firebase from 'firebase'

const firebaseConfig={

    apiKey: "AIzaSyApJciVb7P3_TEPzPtjVVnaAt-GvCTs-Kg",
    authDomain: "blog-firebase-a132d.firebaseapp.com",
    databaseURL: "https://blog-firebase-a132d.firebaseio.com",
    projectId: "blog-firebase-a132d",
    storageBucket: "blog-firebase-a132d.appspot.com",
    messagingSenderId: "301685690491",
    appId: "1:301685690491:web:dc44f889fab3808e4a12de"
  };
  // Initialize Firebase

  if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);

}

const AuthStack = createStackNavigator();
const HomeTab = createMaterialBottomTabNavigator();
const AppDrawer = createDrawerNavigator();
const HomeStack =createStackNavigator();
const NotificationStack=createStackNavigator()


const AppDrawerScreen = () => {
  return (
    <AppDrawer.Navigator>
      <AppDrawer.Screen name="Home" component={HomeTabScreen} />
      <AppDrawer.Screen name="Profile" component={ProfileScreen} />
    </AppDrawer.Navigator>
  );
};

const HomeTabScreen = () => {
  return (
    <HomeTab.Navigator initialRouteName="Home">
    
      <HomeTab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name="home" color="white" size={26} />
         

            ) : (
              <AntDesign name="home" color="white" size={22} />
            ),
        }}
      />
      <HomeTab.Screen
        name="Notification"
        component={NotificationStackScreen}
        options={{
          tabBarLabel: "Notifications",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="ios-notifications" size={26} color="white" />
              
            ) : (
              <Ionicons
                name="ios-notifications-outline"
                size={22}
                color="white"
              />
            ),
        }}
      />
    </HomeTab.Navigator>
  );
};

const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator initialRouteName="SignIn">
      <AuthStack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ headerShown: false }}
      />
    </AuthStack.Navigator>
  );
};

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator initialRouteName="HomeScreen">
     <HomeStack.Screen name="HomeScreen" component={HomeScreen} options={{  headerShown: false }} />
     <HomeStack.Screen name="IndividualPost" component={IndividualPostScreen} options={{  headerShown: false }}/>

    </HomeStack.Navigator>
     
  
  );
};


const NotificationStackScreen = () => {
  return (
    <NotificationStack.Navigator initialRouteName="Notification">
     <NotificationStack.Screen name="Notification" component={NotificationScreen} options={{  headerShown: false }} />
     <NotificationStack.Screen name="IndividualPost" component={IndividualPostScreen} options={{  headerShown: false }}/>
   

    </NotificationStack.Navigator>
     
  
  );
};

function App() {
  return (
    <AuthProvider>
      <AuthContext.Consumer>
        {(auth) => (
          <NavigationContainer>
            {auth.IsLoggedIn ? <AppDrawerScreen /> : <AuthStackScreen/> }
          </NavigationContainer>
        )}
      </AuthContext.Consumer>
    </AuthProvider>
  );
}

export default App;
