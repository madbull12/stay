import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors';

const BookingPage = () => {
  return (
    <View style={styles.container}>
      <Text>BookingPagef </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 26,
    backgroundColor: Colors.light.background,
  },
  
});

export default BookingPage