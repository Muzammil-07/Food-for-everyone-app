import MapView from "react-native-maps";
import React from 'react'
import { StyleSheet, Text, View, ImageBackground, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useState ,useEffect} from "react";
import { Button } from "react-native-paper";
import * as Location from 'expo-location';
import { getDistance, getPreciseDistance ,findNearest} from 'geolib';


const Map = ({navigation}) => {
    const [current ,setcurrent]=useState()
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [near,setnear]=useState()
 var arr=[]
     
   
    useEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
    
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);
      
        setcurrent(  <MapView.Marker
          coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude
          }}
          title={'My Current Location'}
          description={"description"}
        //   icon={require('../images/avatar.png')}
        pinColor={'green'}
      
        
      />
      )
        
        })();
      }, []);

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
     const branchMarker= branches.map((doc,index)=>(

        <MapView.Marker
            coordinate={{
                latitude: doc.latitude,
                longitude: doc.longitude
            }}
            title={doc.branch_name}
            description={"description"}
            key={index}
        />

        ))
        const calculateDistance = () => {
            branches.map((doc)=>{
                
                var dis = getDistance(
                  { latitude: location.coords.latitude, longitude: location.coords.longitude },
                  { latitude: doc.latitude, longitude:doc.longitude }
                );
                // console.log(`Distance between You and Sylani${doc.branch_name}branch is\n\n${dis} Meter`);
           const neear = findNearest({ latitude:location.coords.latitude, longitude: location.coords.longitude },branches
             

           )
        setnear(neear)
        
            })
          }
          console.log(near)

        return(

        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F5FCFF',
        }}>
            <MapView style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    }}
        initialRegion={{
            latitude: 24.8673515,
            longitude: 67.0724497,
            latitudeDelta: 0.0,
            longitudeDelta: 0.0,
        }}
    >
            {branchMarker}
            {current}
          
           
            </MapView>
            <Button onPress={()=>{ navigation.navigate('Uhome')}} style={{alignSelf:'auto',marginTop:'100%'}} mode="outlined"> Back</Button>
        </View>

        )
}

        export default Map;