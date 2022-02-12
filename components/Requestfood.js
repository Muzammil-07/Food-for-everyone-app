import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph, Modal, Provider, Portal, TextInput, List } from 'react-native-paper';
import Slider from './Slider';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import { getDistance, getPreciseDistance, findNearest } from 'geolib';
import Map from './Map';
import firebase from '../Firebase';
import 'firebase/firestore'


const Requestfood = ({ navigation }) => {
    const [near, setnear] = useState("Waiting");
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [visible, setVisible] = React.useState(false);
    const [expanded, setExpanded] = React.useState(false);
    const [name,setname]=useState();
    const [income,setincome]=useState();
    const [phone,setphone]=useState();
    const [cnic,setcnic]=useState();
    const [branch, setbranch]=useState();
    const [image, setImage] = useState('https://www.samaa.tv/wp-content/uploads/2019/05/CNIC-ARTWORK-2.jpg');
    const [search,setSearch] =useState("4220154083437")
    const handlePress = () => setExpanded(!expanded);

    const showModal = () => {setVisible(true)
        calculateDistance()};
    const hideModal = () => setVisible(false);
    const containerStyle = { backgroundColor: 'white', padding: 20, };

    const branches = [
        {
            "branch_name": "Aliabad",
            "latitude": 24.9200172,
            "longitude": 67.0612345
        },
        {
            "branch_name": "Numaish chowrangi",
            "latitude": 24.8732834,
            "longitude": 67.0337457
        },
        {
            "branch_name": "Saylani house phase 2",
            "latitude": 24.8278999,
            "longitude": 67.0688257
        },
        {
            "branch_name": "Touheed commercial",
            "latitude": 24.8073692,
            "longitude": 67.0357446
        },
        {
            "branch_name": "Sehar Commercial",
            "latitude": 24.8138924,
            "longitude": 67.0677652
        },
        {
            "branch_name": "Jinnah avenue",
            "latitude": 24.8949528,
            "longitude": 67.1767206
        },
        {
            "branch_name": "Johar chowrangi",
            "latitude": 24.9132328,
            "longitude": 67.1246195
        },
        {
            "branch_name": "Johar chowrangi 2",
            "latitude": 24.9100704,
            "longitude": 67.1208811
        },
        {
            "branch_name": "Hill park",
            "latitude": 24.8673515,
            "longitude": 67.0724497
        }
    ]
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);
    const calculateDistance = () => {

        branches.map((doc) => {

            var dis = getDistance(
                { latitude: location.coords.latitude, longitude: location.coords.longitude },
                { latitude: doc.latitude, longitude: doc.longitude }
            );
            // console.log(`Distance between You and Sylani${doc.branch_name}branch is\n\n${dis} Meter`);
            const neear = findNearest({ latitude: location.coords.latitude, longitude: location.coords.longitude }, branches


            )
            setnear(neear.branch_name)

        })
    }
    console.log(near)


    const pickImage = async () => {
        
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
            console.log(result)
        }
    };
    
    const add = async () => {
        const response = await fetch(image);
    
        const blob = await response.blob();
        console.log(blob)
    
        var ref = firebase.storage().ref().child("images/" + { name });
        return ref.put(blob)
            .on('state_changed',
                (snapshot) => {
    
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    if (progress == '100') Alert.alert('uploaded')
                },
                (error) => {
                   alert(error.message)
                },

       
                () => {

                    ref.put(blob).snapshot.ref.getDownloadURL().then((downloadURL) => {

                        console.log('File available at', downloadURL);
                        var a = downloadURL;


                        const uid = firebase.auth().currentUser.uid;
                        firebase.firestore().collection('Request').doc(uid).set({
                            

                            imgsrc: a,
                            Name: name,
                            Income: income,
                            Phone: phone,
                            CNIC: cnic,
                            NearestBranch: near,
                            uid:uid


                        })
                    })
                    .then(() => {
                        alert("uploded")
                        navigation.navigate('Qr')
                    }).catch((error)=>{
                           error.message
                    })
                }

            );

    }
    console.log(search)
    const searchRequest =()=>{
         firebase.firestore().collection("Request").doc("4220154083437").get().then(doc=>{
             console.log(doc.data())
         }).catch((e)=>{
             console.log(e)
         })
     
          
    }
    return (
        <ImageBackground source={require('../images/background1.png')} style={styles.image}>
            <Image source={require('../images/logo.png')} style={{ width: 200, height: 200, alignSelf: "center", marginTop: "25%" }} />
            <TextInput placeholder={"Enter CNIC"} style={{ height: 40, width: 250, marginBottom: 20, backgroundColor: 'transparent', marginTop: '20%' }} onChangeText={ (e)=>setSearch(e)} />
            <ImageBackground source={require('../images/button.png')}
                style={{ width: 250, height: 40, justifyContent: 'center', marginBottom: 20 }}>
                <TouchableOpacity onPress={searchRequest} >
                    <Text style={{ textAlign: 'center', color: 'white', alignItems: 'center' }}>Search Your Request</Text>
                </TouchableOpacity>
            </ImageBackground>
            <ImageBackground source={require('../images/button1.png')}
                style={{ width: 250, height: 40, justifyContent: 'center', }}>
                <TouchableOpacity onPress={showModal} >
                    <Text style={{ textAlign: 'center', color: 'white', alignItems: 'center' }}>New Food Request</Text>
                </TouchableOpacity>
            </ImageBackground>
            <Provider>
                <Portal>
                    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                        <TouchableOpacity onPress={pickImage}>
                        {image && <Image source={{ uri: image }} style={{ width: 100, height: 100 ,alignSelf:'center',borderRadius:20}} />}
                        </TouchableOpacity>
                        <Text style={{ alignSelf: 'center', marginBottom: 20 }}>Upload Your CNIC Front and Back Picture</Text>
                        <List.Section title={`Your Nearest Baranch`}>
                            <List.Accordion
                                title={` Nearst branch is ${near}`}
                                left={props => <List.Icon {...props} icon="map" />}
                                expanded={expanded}
                                onPress={handlePress}>
                                <List.Item title={` Nearst branch is ${near}`}/>
                                <List.Item title="Not Available But we will auto Fetch "  />
                            </List.Accordion>
                        </List.Section>
                        <TextInput placeholder='Enter Your Name' onChangeText={(text)=>setname(text)}/>
                        <TextInput placeholder='Enter Your Monthly Income'  onChangeText={(text)=>setincome(text)}/>
                        <TextInput placeholder='Enter Your Phone Number'  onChangeText={(text)=>setphone(text)}/>
                        <TextInput placeholder='Enter CNIC '  onChangeText={(text)=>setcnic(text)}/>
                        <ImageBackground source={require('../images/button1.png')}
                            style={{ width: 250, height: 40, alignSelf: "center", marginTop: 20, paddingTop: 7 }}>
                            <TouchableOpacity onPress={add} >
                                <Text style={{ textAlign: 'center', color: 'white', alignItems: 'center' }}> Send Request</Text>
                            </TouchableOpacity>
                        </ImageBackground>

                    </Modal>
                </Portal>

            </Provider>

        </ImageBackground>
    )
}
const styles = StyleSheet.create({

    image: {
        flex: 1,
        resizeMode: 'cover',
        alignItems: 'center',
        justifyContent: 'center'


    },
});
export default Requestfood;