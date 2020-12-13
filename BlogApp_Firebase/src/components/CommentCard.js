import React from "react";
import { View } from "react-native";
import { Card, Text } from "react-native-elements";


const CommentCard = (props) => {
  const date = props.created_at.toDate().toDateString()
  return (

    <Card >
     
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >

        <Text h4Style={{ padding: 10 }} h4>
         {props.commenter}
        </Text>
        <Text style={{paddingRight: 10,color:"blue"}}
        >({date})</Text>
      </View>
    
      <Text
        style={{
          paddingVertical: 10, color:"purple"
        }}
      >
       {props.body}
      </Text>
      <Card.Divider />
     
     
    </Card>
  
    
  );
};

export default CommentCard;
