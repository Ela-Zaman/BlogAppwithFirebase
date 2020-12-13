import React, { useState, useEffect } from "react";
import * as firebase from 'firebase';
import "firebase/firestore";
import {
  ScrollView,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import {
  Card,
  Button,
  Text,
  Avatar,
  Input,
  Header,
} from "react-native-elements";
import PostCard from "./../components/PostCard";
import AppHeader from "../components/AppHeader";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { AuthContext } from "../providers/AuthProvider";



import { getDataJSON, storeDataJSON,fetchAllItems,AddPost ,removeData} from "../functions/AsyncStorageFunctions";
import { TouchableOpacity } from "react-native-gesture-handler";

const HomeScreen = (props) => {
   


  const [posts, setPosts] = useState([]);
  const [UploadPost, setUploadPost] = useState('');
  const [show,setShow]=useState(false)
  const [loading, setLoading] = useState(true);

 
 
  const author = props.route.params

 

  const loadPosts = async () => {
    setLoading(true);
    firebase
      .firestore()
      .collection("posts")
      .orderBy("created_at", "desc")
      .onSnapshot((querySnapshot) => {
        let temp_posts = [];
       
        querySnapshot.forEach((doc) => {
          temp_posts.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setPosts(temp_posts);
        setLoading(false);
        
      })
    ;
      
  };

  useEffect(() => {
    loadPosts();
  }, []);
  if (!loading) {
   
    return (
      <AuthContext.Consumer>
        {(auth) => (
          <ScrollView style={styles.viewStyle}>
            <AppHeader navigation={props.navigation}/>
           
            <Card>
              <Input
                placeholder="What's On Your Mind?"
                leftIcon={<Entypo name="pencil" size={24} color="black" />
                
              }
              onChangeText={function (currentInput) {
                setUploadPost(currentInput)
            }}
              />
               <Button title="Post" type="outline" onPress={function () {

                    setLoading(true);
            
                           
                           
           
                       firebase.firestore().collection('posts').add({
                         userId: auth.CurrentUser.uid,
                         body: UploadPost,
                         author:auth.CurrentUser.displayName,
                         created_at: firebase.firestore.Timestamp.now(),
                         likes: [],
                         comments:[],
                       }).then(()=>
                       {
                        setLoading(false);
                         alert('Post created Successfully!');
                       }).catch((error)=>{
                        setLoading(false);
                        alert(error)

                       })
                       
                     
                        
                       } 
                      }
                        />
            </Card>
           

         

          

            <FlatList
              data={posts}
              renderItem={function ({ item }) {
                return (
                  
                   
                
                  <PostCard navigation={ props.navigation} 
                    author={item.data.author}
                    author_id={item.data.userId}
                    body={item.data.body}
                    id={item.id}
                    created_at={item.data.created_at}
                   
                    commenter={auth.CurrentUser.displayName}

                  />
              
                );
              }}
            />
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
  
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 30,
    color: "blue",
  },
  viewStyle: {
    flex: 1,
    color: "#854434"

  },
});

export default HomeScreen;
