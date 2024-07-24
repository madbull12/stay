import { View, Text, FlatList, TouchableOpacity,StyleSheet } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Image } from 'expo-image';
import { AntDesign } from '@expo/vector-icons';
export interface Listing {
  id:                             number;
  name:                           null | string;
  host_id:                        number;
  neighbourhood:                  string;
  room_type:                      string;
  column_10:                      number;
  minimum_nights:                 number;
  number_of_reviews:              number;
  last_review:                    string | null;
  reviews_per_month:              number | null;
  calculated_host_listings_count: number;
  availability_365:               number;
  updated_date:                   string | null;
  city:                           string;
  coordinates:                    Coordinates;

}
export interface Coordinates {
  lon: number;
  lat: number;
}
interface Props {
  listings: Listing[];
  category: string;
}



const Item = ({ item }: { item: Listing }) => {
  return (
    <View>
      <TouchableOpacity>
      <Image
        style={styles.image}
        source="https://picsum.photos/seed/696/3000/2000"
        // placeholder={{ blurhash }}
        contentFit="cover"
        transition={1000}
      />
      <Text>{item.name}</Text>
      </TouchableOpacity>
    </View>
  );
};
const Listings = ({ listings, category }: Props) => {
  console.log(listings.length);
  const [loading, setLoading] = useState(false);
  const listRef = useRef<FlatList>(null);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [category]);
  return (
    <View>
      <View style={{backgroundColor:"white"}}>
      {loading ? <AntDesign name="loading2" size={24} color="black" /> : null}

      </View>
      <FlatList
        ref={listRef}
        data={listings}
        renderItem={({ item }:{item:Listing}) => <Item item={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    height:200,
    width: '100%',
    backgroundColor: '#0553',
  },
});
export default Listings;
