import React, { useState } from 'react';
import { View, StyleSheet, Text } from "react-native";
import { Input, Button, Card } from "react-native-elements";
import { FontAwesome, Feather, AntDesign, Ionicons } from '@expo/vector-icons';
import * as firebase from 'firebase';
import "firebase/firestore";

import { set } from 'react-native-reanimated';

const SignUpScreen = (props) => {
    const [Name, setName] = useState("");
    const [SID, setSID] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

    return (<View style={styles.viewStyle}>
        <Card>
            <Card.Title>Welcome to AuthApp!</Card.Title>
            <Card.Divider />
            <Input
                placeholder="Name"
                leftIcon={<Ionicons name="ios-person" size={24} color="black" />}
                onChangeText={function (currentInput) {
                    setName(currentInput)

                }}

            />

            <Input
                placeholder="Student ID"
                leftIcon={<Ionicons name="ios-school" size={24} color="black" />}
                onChangeText={function (currentInput) {
                    setSID(currentInput)

                }}

            />
            <Input
                leftIcon={<FontAwesome name="envelope" size={24} color="black" />}
                placeholder="Email-Address"
                onChangeText={function (currentInput) {
                    setEmail(currentInput)

                }}
            />



            <Input
                placeholder="Password"
                leftIcon={<Feather name="key" size={24} color="black" />}
                secureTextEntry={true}
                onChangeText={function (currentInput) {
                    setPassword(currentInput)

                }}
            />

            <Button icon={<AntDesign name="user" size={24} color="white" />}
                title="Sign Up!"
                type="solid"
                onPress={() => {
                    if (Name && SID && Email && Password) {
                        firebase
                        .auth()
                        .createUserWithEmailAndPassword(Email, Password)
                        .then((userCreds) =>
                        {
                            userCreds.user.updateProfile({displayName:Name});
                            firebase
                            .firestore().collection('users')
                            .doc(userCreds.user.uid)
                            .set({
                                name:Name,
                                sid:SID,
                                email:Email,
                            })
                            .then(()=>{
                                alert("Account created Successfully")
                                console.log(userCreds.user);
                                props.navigation.navigate('SignIn');
                            })
                            .catch((error)=>
                            {alert(error)})
                        })
                        .catch((error) =>{
                            alert(error);

                        });
                    }
                }
                }




            />

            <Button
                type='clear'
                icon={<AntDesign name="login" size={24} color="dodgerblue" />}
                title="Already have an account?"
                onPress={function () {
                    props.navigation.navigate("SignIn");
                }}
            />

        </Card>


    </View>)


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

export default SignUpScreen;