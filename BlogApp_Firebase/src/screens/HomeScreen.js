import React, { useState, useEffect } from "react";

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

const HomeScreen = (props) => {
   
  let temp="Posts";
  let postId="";

  const [posts, setPosts] = useState([]);
  const [UploadPost, setUploadPost] = useState([]);
  const [show,setShow]=useState(false)
  const [loading, setLoading] = useState(true);
 
 
  const author = props.route.params

 

  const loadPosts = async () => {

    setLoading(false);
      
   
     
    
      const response = await getDataJSON(temp)
      if(response){
      setPosts(response["post"]);
      console.log(posts)
      }

   
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
                           
                           let newPost = {
                              
                               
                               author: auth.CurrentUser.name,
                               body: UploadPost,
                               
                           };
                          
                          
                         
                          
               //removeData(temp)
                   let r= AddPost  (temp, newPost);
                      if(r)
                       {console.log(r)
                       setPosts(r)
                       console.log(posts)
                      loadPosts()
                     setShow(true)
                       
                       
                     
                        
                       } 
                       }} />
            </Card>
            <View style={styles.container}>
        
              {show ? (
          <PostCard navigation={ props.navigation} 
          author={auth.CurrentUser.name}
          body={UploadPost}
          user={auth.CurrentUser.name}
/>
       ):null}
    </View>
         

          

            <FlatList
              data={posts}
              renderItem={function ({ item }) {
                return (
                  <PostCard navigation={ props.navigation} 
                    author={item.item.author}
                    body={item.item.body}
                    id={item.id}
                    commenter={auth.CurrentUser.name}

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
