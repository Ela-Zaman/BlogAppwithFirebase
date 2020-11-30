import { AntDesign, Entypo } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { Avatar, Button, Card, Input, Text } from "react-native-elements";
import AppHeader from "../components/AppHeader";
import { getDataJSON, storeDataJSON,fetchAllItems,AddItem ,removeData,AddNotification} from "../functions/AsyncStorageFunctions";
import { AuthContext } from "../providers/AuthProvider";


import CommentCard from "../components/CommentCard"
import { ScrollView } from "react-native-gesture-handler";

const IndividualPost = (props) => {
    
    let temp;
    let postId="";
    
    var today = new Date();
    let fromdate=today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    const [comments, setComments] = useState([]);
    const [UploadComment, setUploadComment] = useState([]);
   
    const [loading, setLoading] = useState(true);
   
   
    const author = props.route.params
    postId=author.postid
   
    const [no_comments, setno_comments] = useState("");
    const loadComments = async (id) => {
        
     
        temp =  id+"Comments"
        setLoading(false);
        const response = await getDataJSON(temp)
        if(response){
        setComments(response["post_comment"]);
        console.log(comments.length)
  
        setno_comments(comments.length)

        
        }

   

     
    };
  
           
  
    
  
    useEffect(() => {

       
      
      loadComments(postId);
     
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
                        <Text style={{ fontStyle: "italic" }}> {author.title}</Text>
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
                        21 Likes, {no_comments} Comments
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
                           
                            let newComment = {
                               
                                postId: author.postid,
                                author: author.author,
                                body: UploadComment,
                                commenter:auth.CurrentUser.name,
                                date:[fromdate]
                                
                            };
                           
                           
                            temp=postId+"Comments"
                           
               //   removeData(temp)
                // removeData("Notification")
                      let r=AddItem(temp, newComment);
                       AddNotification("Notification", newComment)
                    
                        console.log(r)
                        setComments(r)
                       console.log(comments)
                        loadComments(postId)
                          
                        }} />
                    </Card>
                    <FlatList
              data={comments}
              renderItem={function ({ item }) {
                return (
                  <CommentCard navigation={ props.navigation} 
                  commenter={item.item.commenter}
                  body={item.item.body}
                  date={item.item.date}
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
