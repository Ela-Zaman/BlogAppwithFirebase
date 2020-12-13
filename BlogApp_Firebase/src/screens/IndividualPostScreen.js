import { AntDesign, Entypo } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { Avatar, Button, Card, Input, Text } from "react-native-elements";
import AppHeader from "../components/AppHeader";

import { AuthContext } from "../providers/AuthProvider";
import * as firebase from 'firebase';
import "firebase/firestore";

import CommentCard from "../components/CommentCard"
import { ScrollView } from "react-native-gesture-handler";

const IndividualPost = (props) => {
    
    

    const [comments, setComments] = useState([]);
    const [UploadComment, setUploadComment] = useState([]);
    const [commentsNo,setCommentsNo]=useState(0);
   
    const [loading, setLoading] = useState(true);
    
   
   
    const author = props.route.params
    let postId=author.postid
   

    const loadComments = async () => {
        setLoading(true);
        firebase
          .firestore()
          .collection("posts")
          .doc(author.postid)
          .collection("comments")
          .orderBy("created_at", "desc")
          .onSnapshot((querySnapshot) => {
            let temp_comments = [];
            querySnapshot.forEach((doc) => {
              temp_comments.push({
                id: doc.id,
                data: doc.data(),
              });
            });
            setComments(temp_comments);
            setCommentsNo(temp_comments.length);

            setLoading(false);
          })
        ;
          
      };
    
      useEffect(() => {
        loadComments();
      }, []);    
    if (!loading) {
    return(

        <AuthContext.Consumer>
            {(auth) => (
                <ScrollView>
                <View style={styles.viewStyle}>
                <AppHeader navigation={props.navigation}/>




                    <Card>
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
                                {author.author}
                            </Text>
                        </View>
                        <Text style={{ fontStyle: "italic" }}> {author.created_at}</Text>
                        <Text
                            style={{
                                paddingVertical: 10,
                            }}
                        >
                            {author.body}
                        </Text>
                        <Card.Divider />
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Text h4Style={{ padding: 10 }}>
                        21 Likes, {commentsNo} Comments
                            </Text>
                                
                                



                            <Card.Divider />
                        </View>
                    </Card>

                    <Card>
                        <Input
                            placeholder="Write Something...."
                            leftIcon={<Entypo name="pencil" size={24} color="black"
                            />}
                            onChangeText={function (currentInput) {
                                setUploadComment(currentInput)
                            }}
                        />
                        <Button title="Comment" type="outline" onPress={function () {


                        setLoading(true);
                      
           
           

                        firebase.firestore().collection('posts').doc(author.postid).collection("comments").add({
                            post_id:author.postid,
                            author:author.author,
                            commenter: author.commenter,
                            body: UploadComment,
                            created_at: firebase.firestore.Timestamp.now()
                          })

                          firebase.firestore().collection('users').doc(author.author_id).collection("notification").add({
                            post_id:author.postid,
                            author:author.author,
                            post_body:author.body,
                            commenter: author.commenter,
                            type: "commented",
                            created_at: firebase.firestore.Timestamp.now()
                          })
                       
       .then(()=>
       {
        setLoading(false);
         alert('Upload Comment Successfully!');
       }).catch((error)=>{
        setLoading(false);
        alert(error)

       })
       
     
        
       } 
      }
        />

                    </Card>
                    <FlatList
              data={comments}
              renderItem={function ({ item }) {
                return (
                  <CommentCard navigation={ props.navigation} 
                  commenter={item.data.commenter}
                  body={item.data.body}
                  created_at={item.data.created_at}

                  />
                );
              }}
            />
                    

                
             
                    
                               

                  
                </View>

                </ScrollView>

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


export default IndividualPost;
