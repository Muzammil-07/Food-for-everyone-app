import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View ,ImageBackground,Image,TextInput,TouchableOpacity,Alert,ScrollView} from 'react-native';
import { Avatar, Button , Card, Title, Paragraph,Modal,Provider,Portal } from 'react-native-paper';
import Slider from './Slider';
import { BarCodeScanner } from 'expo-barcode-scanner';


const Mdash=({navigation})=>{
    const [visible, setVisible] = React.useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = {backgroundColor: 'white', padding: 20 , flex:0.5};
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
  
    useEffect(() => {
      (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }, []);
  
    const handleBarCodeScanned = ({ type, data }) => {
      setScanned(true);
      alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };
  
    if (hasPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }
  
    return (
        <ImageBackground source={require('../images/background1.png')} style={styles.image}>
          <Image source={require('../images/logo.png')} style={{ width: 200, height: 200, alignSelf: "center", marginTop: "25%" }} />
          <Provider>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
        {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
        </Modal>
      </Portal>
      <Button style={{marginTop: '50%'}} onPress={showModal}>
        Scan QR Code
      </Button>
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
})
export default Mdash;