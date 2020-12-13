import React from "react";
import { View } from "react-native";
import { Card, Button, Text, Avatar } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";


const PostCard = (props) => {
  const date = props.created_at.toDate().toDateString()
  return (
    <Card >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Avatar
          containerStyle={{ backgroundColor: "#ffab91" }}
          rounded
          icon={{ name: "user", type: "font-awesome", color: "black" }}
          activeOpacity={1}
        />
        <Text h4Style={{ padding: 10 }} h4>
          {props.author}
        </Text>
      </View>
      <Text style={{ fontStyle: "italic" }}> posted on {date} </Text>
      <Text
        style={{
          paddingVertical: 10,
        }}
      >
        {props.body}
      </Text>
      <Card.Divider />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Button
          type="outline"
          title="  Like (17)"
          icon={<AntDesign name="like2" size={24} color="dodgerblue" 
          />}
        />
        <Button type="solid" title="Comments" 
        onPress={function(){

         
         
       
          props.navigation.navigate("IndividualPost",{author: props.author,author_id:props.author_id,body:props.body,postid:props.id,commenter:props.commenter})
        } 
        }
   
      />
      </View>
    </Card>
  );
};

export default PostCard;
