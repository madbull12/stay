import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const IndexPage = () => {
  return (
    <View>
      <Link href={'/(modals)/login'}>
      Login</Link>
      <Link href={'/(modals)/bookings'}>
      Bookings</Link>
      <Link href={'/listing/1212'}>
      Listing Details</Link>
    </View>
  )
}

export default IndexPage
// 