import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View ,ImageBackground,TextInput,TouchableOpacity,Alert} from 'react-native';
import { Button } from 'react-native-paper';
import { useState ,useEffect } from 'react';
import firebase from '../Firebase';
import { ActivityIndicator, Colors } from 'react-native-paper';
import Rhome from './Rhome';


 



const Login=({navigation})=>{
  // setTimeout(() => {
  //   firebase.firestore().collection('all').doc().get().then(doc=>{
  //    console.log(doc.data())
  //   })
  // }, 1000);
  useEffect(()=>{
    var user =firebase.auth().currentUser;
    if(user){
      navigation.navigate('Uhome')
    }
     
   
   },[])

const[state,setstate]=useState(false)

    const logIn = async () => {
   
        setstate(true)
        if(email!="null"&&password!="null"){
        firebase.auth().signInWithEmailAndPassword(email, password).then((result)=>{
          // console.log(result);
          Alert.alert("sucess")
          setstate(false)
          setemail('')
        }).then(()=>{
       firebase.firestore().collection("Managers").doc('manager').get().then((doc) => {
        if (doc.data().uid == firebase.auth().currentUser.uid) {
                           
          Alert.alert("You Are Not A User")
          
       } else   {
           Alert.alert("Success")
          navigation.navigate('Uhome')
          



       }
  
       
            
        
       
    }).catch((error) => {
        console.log("Error getting document:", error.message);
    });
      
        }) .catch (err=>{
          console.log(err)
          Alert.alert(err.message)
      
          setstate(false)
          
        }
        )
      }
      else{
        Alert.alert("Enter Field")
      }
    }
   

 


    const [email, setemail] = useState('null')
const [password, setpassword] = useState('null')


const lemail = event => {
    setemail(event.target.value)
    console.log(email);
  }
  const lpassword = event => {
    setpassword(event.target.value)
    console.log(password);
  }

  


const forgot=()=>{
  firebase.auth().sendPasswordResetEmail(email)
  .then(() => {
    // Password reset email sent!
    // ..
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ..
  });
}

  const datview=
 
  <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 40 }}>
     
    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ justifyContent: 'center', flexDirection: 'column', alignItems: 'center', marginTop: 50 }}>
  
  
        <Text style={{ marginRight: 20, justifyContent: 'flex-end', marginTop: 20 }}>Email</Text>
        <Text style={{ marginRight: 20, justifyContent: 'flex-end', marginTop: 20 }}>Password</Text>
  
      </View>
      <View style={{ justifyContent: 'center', alignItems: "center", flexDirection: 'column', alignItems: 'center', marginTop: 50 }}>
  
  
        <TextInput placeholder="Email" style={{ borderBottomWidth: 2, width: 120, justifyContent: 'flex-end', marginTop: 20 }} onChangeText={(texte)=>{setemail(texte)} }/>
        <TextInput placeholder="Password"  secureTextEntry={true} style={{ borderBottomWidth: 2, width: 120, justifyContent: 'flex-end', marginTop: 20 }} onChangeText={(text)=>{setpassword(text)
       }}/>
  
      </View>
  
  
    </View>
    <View style={{ width: 250, marginTop: 20 }}>
        
    <ImageBackground source={require('../images/button1.png')}
      style={{width:250,height:40,marginBottom:10,justifyContent: 'center',}}>
          <TouchableOpacity onPress={logIn} >
              <Text style={{textAlign:'center',color:'white',alignItems:'center'}} >LogIn </Text>
          </TouchableOpacity>
  
      </ImageBackground>
      
      <ImageBackground source={require('../images/button.png')}
      style={{width:250,height:40, justifyContent: 'center',}}>
          <TouchableOpacity onPress={()=>navigation.navigate('SignUp')} >
              <Text style={{textAlign:'center',color:'white',alignItems:'center'}}>Create New Account</Text>
          </TouchableOpacity>
      </ImageBackground>
      <TouchableOpacity onPress={forgot}>
          <Text style={{textAlign:'center',color:'orange',alignItems:'center', marginTop:6}}>Forgot Paaword</Text>
          </TouchableOpacity>
    </View>
  </View>
  
 

return(
    <ImageBackground source={require('../images/background1.png')}style={styles.image} >

<Text style={{color:'white',alignSelf:'center',fontSize:60,color:'orange'}}>LogIn </Text>
  {datview}
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
  

export default Login;