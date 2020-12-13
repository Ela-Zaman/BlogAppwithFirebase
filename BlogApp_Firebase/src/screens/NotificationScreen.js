import React, { useState,useEffect,useContext } from "react";
import { View, StyleSheet,TouchableOpacity,ActivityIndicator,FlatList } from "react-native";

import { AuthContext } from "../providers/AuthProvider";


import AppHeader from "../components/AppHeader";
import NotificationCard from "../components/NotificationCard"

import * as firebase from 'firebase';
import "firebase/firestore";
const NotificationScreen = (props) => {

  const authContext = useContext(AuthContext)  




  const [notification, setNotification] = useState([]);


  const [loading, setLoading] = useState(true);
 
 
 



  const loadNotifications = async () => {
    setLoading(true);
    firebase
      .firestore()
      .collection("users")
      .doc(authContext.CurrentUser.uid)
      .collection("notification")
      .orderBy("created_at", "desc")
      .onSnapshot((querySnapshot) => {
        let temp_notifications = [];
        querySnapshot.forEach((doc) => {
          temp_notifications.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setNotification(temp_notifications);
        setLoading(false);
      })
    ;
      
  };

  useEffect(() => {
    loadNotifications();
  }, []);    


      
  if (!loading) {

console.log(notification)
  
  return (
    <AuthContext.Consumer>
      {(auth) => (
        <View style={styles.viewStyle}>
         <AppHeader navigation={props.navigation}/> 
         
         <FlatList
              data={notification}
              renderItem={function ({ item }) {

              
            
              

                return (
                  <NotificationCard navigation={ props.navigation} 
                  author={item.data.author}
                  body={item.data.post_body}
                  id={item.data.post_id}
                  
                  commenter={item.data.commenter}
                  type={item.data.type}
                  />
                );
              }}
            />

        
        </View>
      )}
    </AuthContext.Consumer>
  );
} else {




  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <ActivityIndicator size="large" color="red" animating={true} />
    </View>
  );
} 
}


const styles = StyleSheet.create({
  textStyle: {
    fontSize: 30,
    color: "blue",
  },
  viewStyle: {
    flex: 1,
  },
});

export default NotificationScreen;
