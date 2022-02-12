import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View ,ImageBackground,TextInput,TouchableOpacity,Alert,ScrollView} from 'react-native';
import { Avatar, Button , Card, Title, Paragraph,Modal, Portal, Provider } from 'react-native-paper';
import { useState } from 'react';
import firebase from '../Firebase';
import { ActivityIndicator, Colors } from 'react-native-paper';
import { useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Icon } from 'react-native-elements'
import Slider from './Slider';



const Rhome=({navigation})=>{
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};
    var final;
    var arr=[];
    var catagory=[]
     const [ready,setready]=useState("false")
     const [comp ,setcomp]=useState(<Text>Hello</Text>)
     let view;
     const [image, setImage] = useState(null);
    const [Name, setName] = useState("");
    const [price, setprice] = useState("");
    const [category, setcategory] = useState("");
    const [ imagemap,setimagemap]=useState("2");
     useEffect(() => {
    
      const uid = firebase.auth().currentUser.uid;
      firebase.firestore().collection("Dishes").doc(uid).collection("Menu")
      .get().then(res=>{
        res.docs.forEach(doc=>{
          arr.push(doc.data());
          // console.log(doc.data());
          setready("True")
          const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
          setcomp(<View style={{width:"90%", alignSelf:'center'}}> 
           {arr.map((bio, index) => (
          <Card key={index} style={{backgroundColor:"transparent",marginBottom:10}}>
          <Card.Title title= {bio.Dsih} subtitle={bio.Catogary} left={LeftContent} />
          <Card.Content>
          
          
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
      (async () => {
        if (Platform.OS !== 'web') {
          const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
      })();
     }, [])
        
     const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.cancelled) {
        setImage(result);
        console.log(result)
      }
    };
    
  const add= async()=>{
  
  
    const response = await fetch(image.uri);
    
    const blob = await response.blob();
    console.log(blob)
    
    var ref = firebase.storage().ref().child("images/" + {Name});
    return ref.put(blob)
    .on('state_changed', 
    (snapshot) => {
      
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      if(progress=='100') alert('uploaded')
    }, 
    (error) => {
     console.log(error)
    }, 
    () => {
      
      ref.put(blob).snapshot.ref.getDownloadURL().then((downloadURL) => {
      
        console.log('File available at', downloadURL);
      var  a=downloadURL;
      console.log(typeof a)
    
      const uid = firebase.auth().currentUser.uid;
      firebase.firestore().collection('Dishes').doc(uid).collection("Menu").doc(Name).set({
        Dsih:Name,
    
         imgsrc:a,
         Price: price,
         Catogary:category
       
         })
      }).then(()=>{
        const uid = firebase.auth().currentUser.uid;
        firebase.firestore().collection("Dishes").doc(uid).collection("Menu")
        .get().then(querySnapshot=>{
          querySnapshot.docs.map(doc=>{
            console.log(doc.data())
         
           
            ;
            return doc.data()
          })
         
        })
       
         alert ("uploded")
       })
    }
  
    );
  
    }  



          final=   arr.map((snep,index)=>{
              return snep
              });
             
              
            //  console.log(final[0].Price)
             
     
           
        
   
        
      
        
  
      
  
  //  console.log(ready)
      if (ready =="True"){
       
    
        view = comp;
      }
    else {
      view=<Text>Not Ready</Text>}
   

return(
  <Provider>
   <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity onPress={pickImage}>
         <Avatar.Image size={60} source={require('../images/avatar.png')} />
         </TouchableOpacity>
        {image && <Image source={{ uri: image.uri }} style={{ width: 200, height: 200 }} />}
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ justifyContent: 'center', flexDirection: 'column', alignItems: 'center', marginTop: 50 }}>
  
            <Text style={{ marginRight: 20, justifyContent: 'flex-start' }}>Dish Name</Text>
            <Text style={{ marginRight: 20, justifyContent: 'flex-end', marginTop: 20 }}>Dish Price</Text>
            <Text style={{ marginRight: 20, justifyContent: 'flex-end', marginTop: 20 }}>Dish Catogary</Text>
          
          </View>
          <View style={{ justifyContent: 'center', alignItems: "center", flexDirection: 'column', alignItems: 'center', marginTop: 50 }}>
  
            <TextInput placeholder="Dish Name" style={{ borderBottomWidth: 2, width: 120, justifyContent: 'flex-start' }} onChangeText={(text)=>setName(text)} />
            <TextInput placeholder="Price" style={{ borderBottomWidth: 2, width: 120, justifyContent: 'flex-end', marginTop: 20 }} onChangeText={(text)=>setprice(text)} />
            <TextInput placeholder="Sweet or Chilli" style={{ borderBottomWidth: 2, width: 120, justifyContent: 'flex-end', marginTop: 20 }} onChangeText={(text)=>setcategory(text)} />
          
  
          </View>
       
  
        </View>
        <Button style={{marginTop:20}} mode="contained" onPress={add} >Add Dish</Button>
      </View>
        </Modal>
        </Portal>
    <ImageBackground source={require('../images/background.png')}style={styles.image}>
       <Text style={{alignSelf:'flex-start',marginTop:'20%',fontSize:35,marginLeft:"10%"}}>Hi Ali</Text>
      <Slider/>
<ScrollView style={{marginTop:10,height:"10%"}}  >

{view}

</ScrollView >
<ImageBackground source={require('../images/button.png')}
      style={{width:'90%',height:40,marginTop:10,justifyContent: 'center',alignSelf:'center',marginBottom:10}}>
        <View style={{justifyContent:"space-between",flexDirection:'row'}}>
         <Avatar.Image size={50} colors={'white'} source={require('../images/avatar.png')} style={{marginLeft:0,backgroundColor:'#FF9945'}}/>
         <Avatar.Icon size={50}  colors={'white'} icon="home" style={{marginLeft:0,backgroundColor:'#FF9945'}}/>
         <TouchableOpacity onPress={showModal}>
         <Avatar.Icon size={50} colors={'white'}icon="upload" style={{marginRight:5,backgroundColor:'#FF455E'}}/>
         </TouchableOpacity>
         </View>
          </ImageBackground>
    </ImageBackground> 
    </Provider>
)
}
const styles = StyleSheet.create({
 
    image: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
    },
  });
  
export default Rhome;