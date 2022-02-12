import ImageSlider from 'react-native-image-slider';
import * as React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'react-native';
const Slider=()=>{

   
      return (
          <View style={{height:180,width:'100%'}}>
        <ImageSlider images={[
           'https://firebasestorage.googleapis.com/v0/b/factory-3e7d4.appspot.com/o/card2.png?alt=media&token=f4e8d999-f344-4c3a-9ca4-41943cbb69d3',
           'https://firebasestorage.googleapis.com/v0/b/factory-3e7d4.appspot.com/o/card3.png?alt=media&token=9b487b8f-7f31-4aae-9bf4-e0d7d146f767',
           'https://firebasestorage.googleapis.com/v0/b/factory-3e7d4.appspot.com/o/card4.png?alt=media&token=99e69e06-c74b-4aaa-9908-f639453a0647'
          ]}
          loopBothSides
           autoPlayWithInterval={500} style={{padding:0,backgroundColor:'transparent'}}/>
              </View>
      );


}
export default Slider;