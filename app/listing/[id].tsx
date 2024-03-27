import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const DetailPage = () => {
    const {id} = useLocalSearchParams();
  return (
    <View>
      <Text>Pagedsdsds</Text>
    </View>
  )
}

export default DetailPage