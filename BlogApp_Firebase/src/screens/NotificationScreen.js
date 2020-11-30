import React, { useState,useEffect,useContext } from "react";
import { View, StyleSheet,TouchableOpacity,ActivityIndicator,FlatList } from "react-native";
import AsyncStorage from  "@react-native-community/async-storage";
import { Text, Card, Button, Avatar, Header } from "react-native-elements";
import { AuthContext } from "../providers/AuthProvider";
import { getDataJSON, storeDataJSON,fetchAllItems,AddPost ,removeData} from "../functions/AsyncStorageFunctions";

import AppHeader from "../components/AppHeader";
import NotificationCard from "../components/NotificationCard"


const NotificationScreen = (props) => {

  const authContext = useContext(AuthContext)  

  let temp="Notification";


  const [notification, setNotification] = useState([]);


  const [loading, setLoading] = useState(true);
 
 
 



 

  const loadNotifications = async () => {

   

    setLoading(false);
      
   
     
    
      const response = await getDataJSON(temp)
      console.log(response)
      if(response){
      let r=response["Notification"];
      let N=[]
       
        r.forEach((element) => {
          if (element.item.author==authContext.CurrentUser.name)
          {
            N.push(element.item)
           
         
          
          }


        });

        console.log(authContext.CurrentUser.name)
    
       setNotification(N);

      };
     


    
      }

   
  

         

  

  useEffect(() => {

     
    
    loadNotifications();
   
  },[] );
  if (!loading) {

    console.log(authContext)

  
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
                  author={item.author}
                  body={item.body}
                  id={item.postid}
                  commenter={item.commenter}
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
