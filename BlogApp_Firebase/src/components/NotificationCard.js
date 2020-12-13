import React from "react";

import { View, StyleSheet,TouchableOpacity,ActivityIndicator,FlatList } from "react-native";
import { Card, Button, Text, Avatar } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

const NotificationCard = (props) => {

    
  return (
    <TouchableOpacity 
    onPress={ function()
      {
        
       
        props.navigation.navigate("IndividualPost",{author: props.author,author_id:props.author_id,body:props.body,postid:props.id,commenter:props.commenter})
      
            }}>
      <Card>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Avatar
            containerStyle={{ backgroundColor: "cyan" }}
            rounded
            icon={{
              name: "thumbs-o-up",
              type: "font-awesome",
              color: "black",
            }}
            activeOpacity={1}
          />
          <Text style={{ paddingHorizontal: 10 }}>
        {props.commenter} Commented on Your Post.
          </Text>
        </View>
      </Card>
      </TouchableOpacity>

  )
        }
export default NotificationCard;
