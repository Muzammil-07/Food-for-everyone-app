import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View ,ImageBackground,TextInput,TouchableOpacity,Alert} from 'react-native';
import { Button } from 'react-native-paper';
import { useState } from 'react';
import firebase from '../Firebase';
import { ActivityIndicator, Colors } from 'react-native-paper';


const RsignUp=({navigation})=>{
    const[state,setstate]=useState(false)
    const [Remail, setremail] = useState('')
    const [Rpassword, setrpassword] = useState('')
    const [Rphone, setrphone] = useState('')
    const [RuserName, setruserName] = useState('')
    const [Rcity, setrcity] = useState('')
    const [resturantName, setresturantName] = useState("")
    setTimeout(() => {
      firebase.firestore().collection('ResturantUid').get().then(res=>{
      res.docs.forEach(sne=>{
        console.log(sne.data())
      })
      })
    }, 1000);
  
    const Rsignup = () => {
        setstate(true)
        firebase.auth().createUserWithEmailAndPassword(
          Remail,
          Rpassword
        ).then(() => {
          firebase.firestore().collection("Resturant").doc(firebase.auth().currentUser.uid).set({
            Name: RuserName,
            Email: Remail,
            City: Rcity,
            Phone: Rphone,
            Resturant: resturantName
          })
    
        }).then(()=>{
          firebase.firestore().collection("all").doc(firebase.auth().currentUser.uid).set({
            cat:"res"
          })
          firebase.firestore().collection("ResturantUid").doc(resturantName).set({ uid:firebase.auth().currentUser.uid})
        })
          .then(() => {
            console.log("Hello")
            Alert.alert("sucess")
            setstate(false)
    
          }).catch(err => {
            console.log(err);
            setstate(false)
    
    
          })
      }
    return(
        <ImageBackground source={require('../images/background.png')}style={styles.image}>
            <Text style={{color:'white',alignSelf:'center',fontSize:30,color:'orange'}}>Resturant Signup</Text>
        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 0 }}> 
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ justifyContent: 'center', flexDirection: 'column', alignItems: 'center', marginTop: 50 }}>
  
            <Text style={{ marginRight: 20, justifyContent: 'flex-start' ,marginBottom:22}}>UserName</Text>
            <Text style={{ marginRight: 20, justifyContent: 'flex-end', marginBottom: 30 }}>Resturant</Text>
            <Text style={{ marginRight: 20, justifyContent: 'flex-end', marginBottom:30 }}>Email</Text>
            <Text style={{ marginRight: 20, justifyContent: 'flex-end', marginBottom:30 }}>Password</Text>
            <Text style={{ marginRight: 20, justifyContent: 'flex-end', marginBottom:30}}>City</Text>
            <Text style={{ marginRight: 20, justifyContent: 'flex-end', marginBottom:0 }}>Phone</Text>
  
          </View>
          <View style={{ justifyContent: 'center', alignItems: "center", flexDirection: 'column', alignItems: 'center', marginTop: 50 }}>
  
            <TextInput placeholder="UserName" style={{ borderBottomWidth: 2, width: 120, justifyContent: 'flex-start' }} onChangeText={(text)=>setruserName(text) }/>
            <TextInput placeholder="Resturant" style={{ borderBottomWidth: 2, width: 120, justifyContent: 'flex-end', marginTop: 20 }} onChangeText={(text)=>setresturantName(text) }/>
            <TextInput placeholder="Email" style={{ borderBottomWidth: 2, width: 120, justifyContent: 'flex-end', marginTop: 20 }} onChangeText={(text)=>setremail(text)} />
            <TextInput placeholder="Password" style={{ borderBottomWidth: 2, width: 120, justifyContent: 'flex-end', marginTop: 20 }} onChangeText={(text)=>setrpassword(text)} />
            <TextInput placeholder="City" style={{ borderBottomWidth: 2, width: 120, justifyContent: 'flex-end', marginTop: 20 }} onChangeText={(text)=>setrcity(text)}/>
            <TextInput placeholder="Phone" style={{ borderBottomWidth: 2, width: 120, justifyContent: 'flex-end', marginTop: 20 }} onChangeText={(text)=>setrphone(text)}/>
  
  
          </View>
  
  
        </View>
        <ImageBackground source={require('../images/button1.png')}
      style={{width:250,height:40,marginTop:10,justifyContent: 'center',}}>
          <TouchableOpacity onPress={Rsignup} >
              <Text style={{textAlign:'center',color:'white',alignItems:'center'}} >SignUp</Text>
          </TouchableOpacity>
  
      </ImageBackground>
      </View>
      <Button onPress={()=>navigation.navigate('LogIn')} >Back To logIn</Button>
      <ActivityIndicator animating={state} color={Colors.red800} />
      </ImageBackground>
    )
}
const styles = StyleSheet.create({
 
    image: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
    },
  });
export default RsignUp