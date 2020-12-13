import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Card, Button, Avatar, Header } from "react-native-elements";
import { AuthContext } from "../providers/AuthProvider";

import AppHeader from "../components/AppHeader";
import {Image} from 'react-native';

import * as firebase from 'firebase';
import "firebase/firestore";
const ProfileScreen = (props) => {
  return (
    <AuthContext.Consumer>
      {(auth) => (
        <View style={styles.viewStyle}>
          <AppHeader navigation={props.navigation} />

          <View style={styles.container}>
            <View>
              <Image
                source={
                  {
                    height: 150,
                    width: 100,
                    uri: "https://www.intofilm.org/intofilm-production/scaledcropped/970x546https%3A/s3-eu-west-1.amazonaws.com/images.cdn.filmclub.org/film__17099-brave--hi_res-c17757f8.jpg/film__17099-brave--hi_res-c17757f8.jpg",
                  }
                } />
            </View>
        <Button title="Delete User" type="outline" onPress={function () {
                   
                  auth.setIsLoggedIn(false);
                  auth.setCurrentUser({});

        }
      }
            />
            <Card>
            <View style={styles.textstyles}>
              <Text style={styles.textstyles}>Name {auth.CurrentUser.displayName}</Text>
              <Text style={styles.textstyles}>Born On: 23rd March 9999 </Text>
              <Text style={styles.textstyles}>Address: IUT </Text>
            </View>
            </Card>
          </View>
        </View>
      )
      }
    </AuthContext.Consumer>
  )
}
const styles = StyleSheet.create(
  {

    container:
    {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 30,
    },
    textstyles:
    {
      paddingTop: 30,
      fontSize: 15,
      color: 'blue',
    },

    viewStyle: {
      flex: 1,
    },
  }
)

export default ProfileScreen;
