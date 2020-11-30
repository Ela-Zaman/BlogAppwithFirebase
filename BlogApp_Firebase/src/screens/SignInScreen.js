import React, { useState } from 'react';
import { View, StyleSheet, Text } from "react-native";
import { Input, Button, Card } from "react-native-elements";
import { FontAwesome, Feather, AntDesign } from '@expo/vector-icons';
import { AuthContext } from "../providers/AuthProvider";
import * as firebase from 'firebase';


const SignInScreen = (props) => {
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    return (
        <AuthContext.Consumer>

            {(auth) => (<View style={styles.viewStyle}>
                <Card>
                    <Card.Title>Welcome to AuthApp!</Card.Title>
                    <Card.Divider />
                    <Input
                        leftIcon={<FontAwesome name="envelope" size={24} color="black" />}
                        placeholder="Email-Address"
                        onChangeText={function (currentInput) {
                            setEmail(currentInput)

                        }} />

                    <Input
                        placeholder="Password"
                        leftIcon={<Feather name="key" size={24} color="black" />}
                        secureTextEntry={true}
                        onChangeText={function (currentInput) {
                            setPassword(currentInput)

                        }}

                    />

                    <Button icon={<AntDesign name="login" size={24} color="white" />}
                        title="Sign in!"
                        type="solid"
                        onPress={()=>{

                            firebase
                            .auth()
                            .signInWithEmailAndPassword(Email,Password)
                            .then((userCreds)=>{
                                auth.setIsLoggedIn(true);
                                auth.setCurrentUser(userCreds.user);
                            })
                            .catch((error)=>
                            {
                                alert(error);
                            })
                        }




                        }
                    />

                    <Button
                        type='clear'
                        icon={<AntDesign name="user" size={24} color="dodgerblue" />}
                        title="Don't have an account?"
                        onPress={function () {
                            props.navigation.navigate("SignUp");
                        }}
                    />

                </Card>


            </View>)}

        </AuthContext.Consumer>

    );
}

const styles = StyleSheet.create(
    {
        textStyle: {
            fontSize: 30,
            color: "blue",
        },

        viewStyle: {
            flex: 1,
            justifyContent: "center",
            backgroundColor: "#162187"

        }
    }
);


export default SignInScreen;