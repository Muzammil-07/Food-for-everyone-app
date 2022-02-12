
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View ,ImageBackground,TextInput,TouchableOpacity,Alert,ScrollView} from 'react-native';
import { Avatar, Button , Card, Title, Paragraph, } from 'react-native-paper';
import { useState } from 'react';
import firebase from '../Firebase';
import { ActivityIndicator, Colors } from 'react-native-paper';
import { useEffect } from 'react';

import { Icon } from 'react-native-elements'

import Slider from "./Slider";
import Rhome from "./Rhome";
import BouncyCheckbox from "react-native-bouncy-checkbox";




const Home =()=>{
  var final;
  var arr=[];
  var catagory=[]
   const [ready,setready]=useState("false")
   const [comp ,setcomp]=useState(<Text>Hello</Text>)
   let view;
   useEffect(() => {
  
    const uid = firebase.auth().currentUser.uid;
    firebase.firestore().collection("Dishes").doc(uid).collection("Menu")
    .get().then(res=>{
      res.docs.forEach(doc=>{
        arr.push(doc.data());
        console.log(doc.data());
        setready("True")
        const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
        setcomp(<View style={{width:250, alignSelf:'center'}}> 
         {arr.map((bio, index) => (
        <Card key={index} style={{backgroundColor:"orange",marginBottom:10}}>
        <Card.Title title= {bio.Dsih} subtitle={bio.Catogary} left={LeftContent} />
        <Card.Content>
          <Title>{bio.Dsih}</Title>
          <Paragraph>{bio.Catogary}</Paragraph>
        
        </Card.Content>
        <Card.Cover source={{ uri: bio.imgsrc }} />
        <Card.Actions>
          <Button>Visit Resturant</Button>
          <Button>Maps</Button>
        </Card.Actions>
      </Card>
     ))}</View>)
      }) 
    })
  
   }, [])
      
          
        final=   arr.map((snep,index)=>{
            return snep
            });
           
            
          //  console.log(final[0].Price)
           
   
         
      
 
      
    
      

    

 console.log(ready)
    if (ready =="True"){
     
  
      view = comp;
    }
  else {
    view=<Text>Not Ready</Text>}
    
   
    return(
   
      <Rhome>
             {/* <Text style={{alignSelf:'flex-start',marginTop:'10%',fontSize:35,marginLeft:"10%"}}>Hi Ali</Text>
          <Slider/> */}
         
            </Rhome>
        
    )
}

const styles = StyleSheet.create({
 
    image: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'space-between',
      alignItems:'center'
    },
  });
export default Home;