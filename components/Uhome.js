import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View ,ImageBackground,Image,TextInput,TouchableOpacity,Alert,ScrollView} from 'react-native';
import { Avatar, Button , Card, Title, Paragraph,Modal,Provider,Portal } from 'react-native-paper';
import Slider from './Slider';
import * as Location from 'expo-location';

import { getDistance, getPreciseDistance ,findNearest} from 'geolib';
import Map from './Map';



const Uhome =({navigation})=>{

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    
    
    const containerStyle = {backgroundColor: 'white', padding: 20};
   

    
   
      
  
  const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
    return(
        <ImageBackground source={require('../images/background1.png')}style={styles.image}>
            <View style={{width:'100%'}}>
          <Image source={require('../images/logo.png')} style={{width:100,height:100,alignSelf:"flex-end",marginTop:"10%"}}/>
          </View>
          <View style={{justifyContent:'center'}}>
           <Slider/>
          </View>
          <ScrollView horizontal={true} style={{flex:1}}>
          <Card style={{backgroundColor:'transparent',height:'25%',width:200, marginTop:'2%',marginRight:10,marginLeft:'auto'}}>
   
    <Card.Content>
      <Title>Sylani Education</Title>
  
    </Card.Content>
    <Card.Cover source={{ uri: 'https://images.hindustantimes.com/rf/image_size_640x362/HT/p2/2015/12/01/Pictures/_c34102da-9849-11e5-b4f4-1b7a09ed2cea.jpg' }} />
    <Card.Actions>
      <Button>Like</Button>
    </Card.Actions>
  </Card>
      <Card style={{backgroundColor:'transparent',height:'25%',width:200, marginTop:'2%' ,marginRight:10}}>
   
    <Card.Content>
      <Title>Sylani Health</Title>
      
    </Card.Content>
    <Card.Cover source={{ uri: 'https://knowledge4policy.ec.europa.eu/sites/default/files/styles/feature_thumbnail/public/kg-non-communicable_%C2%A9VectorMine-stock.adobe_12-2020.jpeg?itok=VP4phnDA' }} />
    <Card.Actions>
      <Button>Like</Button>
    </Card.Actions>
  </Card>
  <Card style={{backgroundColor:'transparent',height:'35%',width:200, marginTop:'2%' ,marginRight:10}}>
   
   <Card.Content>
     <Title>Sylani Skills Dev</Title>
     
   </Card.Content>
   <Card.Cover source={{ uri: 'https://www.forbesindia.com/media/images/2021/Feb/img_154751_softskills.jpg' }} />
   <Card.Actions>
     <Button>Like</Button>
   </Card.Actions>
 </Card>
          
       </ScrollView>
     <View style={{flexDirection:'row'}}>
       <Button onPress={()=>{navigation.navigate('Requestfood')}} style={{ width:150,marginTop:20,marginRight:10}} mode="outlined"> Request food</Button>
       <Button onPress={()=>{navigation.navigate('Map')}} style={{ width:150,marginTop:20}} mode="outlined"> Show Maps</Button>
       </View>
         </ImageBackground>
    )
}
const styles = StyleSheet.create({
 
    image: {
      flex: 1,
      resizeMode: 'cover',
      alignItems:'center'
      
    },
  });
export default Uhome;