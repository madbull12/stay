import React from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';

type Props = {
  listings:any
}
export default function ListingMap({listings}:Props) {
  return (
    <View className='flex-1'>
      <MapView showsMyLocationButton provider={PROVIDER_GOOGLE} showsUserLocation style={StyleSheet.absoluteFill}>
        {
          listings.features.map((item:any)=>(
            <Marker
              key={item.properties.id}
              coordinate={{
                latitude:+item.properties.latitude,
                longitude:+item.properties.longitude
              }}
            />
          ))
        }
      </MapView>
    </View>
  );
}

