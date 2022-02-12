import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { useState ,useEffect} from 'react';
import firebase from '../Firebase';
import RsignUp from './RsignUp';
import { ActivityIndicator, Colors } from 'react-native-paper';
import MLogin from './MLogin';


const SignUp = ({ navigation }) => {
  var id;
  var arr=[]
  var a=[]
  const [state, setstate] = useState(false)
  const [semail, setsemail] = useState('')
  const [spassword, setspassword] = useState('')
  const [phone, setphone] = useState('')
  const [userName, setuserName] = useState('')
  const [CNIC, setCNIC] = useState('')

 
  const signup = () => {
    setstate(true)
    firebase.auth().createUserWithEmailAndPassword(
      semail,
      spassword
    ).then(() => {
      firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).set({
        Name: userName,
        Email: semail,
        Cnic: CNIC,
        Phone: phone,
       
      })
       
    })
      .then(()=>{
          arr.push(firebase.auth().currentUser.uid);
        
           firebase.firestore().collection('users').doc('uids').collection('Menue').doc(userName).set({
             uids:firebase.auth().currentUser.uid
           })
  
         
        console.log("Hello")
        Alert.alert("sucess")
        navigation.navigate('LogIn')
        setstate(true)

      }).catch(err => {
        Alert.alert(err.message);
        setstate(false)


      })
  }


  return (
    <ImageBackground source={require('../images/background1.png')} style={styles.image}>
      <Text style={{ color: 'white', alignSelf: 'center', fontSize: 40, color: 'orange' }}> Signup</Text>
      <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 0 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ justifyContent: 'center', flexDirection: 'column', alignItems: 'center', marginTop: 50 }}>

            <Text style={{ marginRight: 20, justifyContent: 'flex-start', marginBottom: 6 }}>UserName</Text>
            <Text style={{ marginRight: 20, justifyContent: 'flex-end', marginTop: 20, marginBottom: 10 }}>Email</Text>
            <Text style={{ marginRight: 20, justifyContent: 'flex-end', marginTop: 20, marginBottom: 8 }}>Password</Text>
            <Text style={{ marginRight: 20, justifyContent: 'flex-end', marginTop: 20, marginBottom: 10 }}>CNIC</Text>
            <Text style={{ marginRight: 20, justifyContent: 'flex-end', marginTop: 20, marginBottom: 0 }}>Phone</Text>

          </View>
          <View style={{ justifyContent: 'center', alignItems: "center", flexDirection: 'column', alignItems: 'center', marginTop: 50 }}>

            <TextInput placeholder="UserName" style={{ borderBottomWidth: 2, width: 120, justifyContent: 'flex-start' }} onChangeText={(text) => setuserName(text)} />
            <TextInput placeholder="Email" style={{ borderBottomWidth: 2, width: 120, justifyContent: 'flex-end', marginTop: 20 }} onChangeText={(text) => setsemail(text)} />
            <TextInput placeholder="Password" secureTextEntry={true} style={{ borderBottomWidth: 2, width: 120, justifyContent: 'flex-end', marginTop: 20 }} onChangeText={(text) => setspassword(text)} />
            <TextInput placeholder="CNIC" style={{ borderBottomWidth: 2, width: 120, justifyContent: 'flex-end', marginTop: 20 }} onChangeText={(text) => setCNIC(text)} />
            <TextInput placeholder="Phone" style={{ borderBottomWidth: 2, width: 120, justifyContent: 'flex-end', marginTop: 20 }} onChangeText={(text) => setphone(text)} />


          </View>


        </View>
        <View style={{ width: 250, marginTop: 20 }}>
          <ImageBackground source={require('../images/button1.png')}
            style={{ width: 250, height: 40, marginBottom: 10, justifyContent: 'center', }}>
            <TouchableOpacity onPress={signup} >
              <Text style={{ textAlign: 'center', color: 'white', alignItems: 'center' }} >SignUp</Text>
            </TouchableOpacity>

          </ImageBackground>

          <Button onPress={() => navigation.navigate('LogIn')} >Back To logIn</Button>
          <Button onPress={() => navigation.navigate('MLogin')}> LogIn as Manager </Button>
        </View>
      </View>


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
export default SignUp