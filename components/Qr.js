import React, { useEffect } from 'react'
import { StyleSheet, Text, View ,ImageBackground,TextInput,TouchableOpacity,Alert,ScrollView} from 'react-native';
import { Avatar, Button , Card, Title, Paragraph,Modal, Portal, Provider } from 'react-native-paper';
import QRCode from "react-qr-code";
import { useState } from 'react';
import { ActivityIndicator, Colors } from 'react-native-paper';
import firebase from 'firebase';
const Qr = ({navigation}) => {
    var arr=[];
    const [value, setvalue] = useState(<ActivityIndicator animating={state} color={Colors.red800} size={25} />);
    const [state, setstate] = useState(true)


    useEffect(() => {
        const uid = firebase.auth().currentUser.uid;
        firebase.firestore().collection("Request").doc(uid).collection("Menu")
            .get().then(res => {
                res.docs.forEach(doc => {
                    arr.push(doc.data());
                    // console.log(doc.data());
                    // setready("True")
                    const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
                    setvalue(<View style={{ width: "90%", alignSelf: 'center' }}>
                        {arr.map((bio, index) => (
                            <Card key={index} style={{ backgroundColor: "transparent", marginBottom: 10 }}>
                                <Card.Title title={bio.Name} subtitle={bio.Nearestbarnch} left={LeftContent} />
                                <Card.Content>

                                <QRCode value={bio.CNIC} />
                                </Card.Content>
                                <Card.Cover  />
                                <Card.Actions>
                                    <Button>Visit Resturant</Button>
                                    <Button>Maps</Button>
                                </Card.Actions>
                            </Card>
                        ))}</View>)
                })
            })


            }, [])
        return (
            <>
                {value}
               
            </>

        )
    }
export default Qr;