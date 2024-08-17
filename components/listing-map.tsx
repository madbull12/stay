import React from 'react';
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import MapView from 'react-native-map-clustering';
type Props = {
  listings:any
}

const INITIAL_REGION = {
  latitude:37.33,
  longitude:-122,
  latitudeDelta:9,
  longitudeDelta:9
}
export default function ListingMap({listings}:Props) {
  const router = useRouter();
  const onMarkerSelected = (item:any)=>{
    router.push(`/listing/${item.properties.id}`)
  }

  const renderCluster = (cluster:any)=>{
    const { id,geometry,onPress,properties} = cluster;
    const points = properties.point_count;
    console.log(cluster)
    return (
      <Marker
      onPress={onPress}
        key={`clust-${id}`}
        coordinate={{
          latitude:geometry.coordinates[1],
          longitude:geometry.coordinates[0]
        }}
      >
        <View className='bg-white rounded-full px-3 py-1 items-center justify-center'>
          <Text className='font-bold'>
            {points}
          </Text>
        </View>
      </Marker>
    )
  }
  
  return (
    <View className='flex-1'>
      <MapView renderCluster={renderCluster} clusterColor='#513eff' clusterTextColor='#fff' initialRegion={INITIAL_REGION} showsMyLocationButton provider={PROVIDER_GOOGLE} showsUserLocation style={StyleSheet.absoluteFill}>
        {
          listings.features.map((item:any)=>(
            <Marker
            onPress={()=>onMarkerSelected(item)}
              key={item.properties.id}
              coordinate={{
                latitude:+item.properties.latitude,
                longitude:+item.properties.longitude
              }}
            >
              <View className='bg-white rounded-full px-3 py-1 items-center justify-center'>
                <Text className='font-bold'>
                  $ {item.properties.price}
                </Text>
              </View>
            </Marker>
          ))
        }
      </MapView>
    </View>
  );
}

