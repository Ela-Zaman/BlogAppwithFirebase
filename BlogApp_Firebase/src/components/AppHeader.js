import React from "react";
import {
   
    View,
    StyleSheet,
   
  } from "react-native";
import {

  Header,
} from "react-native-elements";

import * as firebase from 'firebase';
import "firebase/firestore";

import { AuthContext } from "../providers/AuthProvider";


const AppHeader = (props) => {
    return (
      <AuthContext.Consumer>
        {(auth) => (
          <View style={styles.viewStyle}>
            <Header
         
              leftComponent={{
                icon: "menu",
                color: "#fff",
                onPress: function () {
                  props.navigation.toggleDrawer();
                },
              }}
              centerComponent={{ text: "The Office", style: { color: "#fff" } }}
              rightComponent={{
               

                icon: "lock-outline",
                color: "#fff",
                onPress: function () {
                  firebase.
                  auth()
                  .signOut()
                  .then(()=>
                  {
                    auth.setIsLoggedIn(false);
                    auth.setCurrentUser({})
                  })
                  .catch((error)=>
                  {alert(error)})
                },
              }}
            />
           
            
          </View>
        )}
      </AuthContext.Consumer>
    );
  } 

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 30,
    color: "#fff",
  },
  viewStyle:
  {
    color:"#ffff"
  }
 
});

export default AppHeader;
