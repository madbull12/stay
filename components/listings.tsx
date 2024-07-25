import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Image } from "expo-image";
import { AntDesign } from "@expo/vector-icons";
import { Listing } from "@/app/types";
import { Link } from "expo-router";
interface Props {
  listings: Listing[];
  category: string;
}

const Item = ({ item }: { item: Listing }) => {
  return (

      <TouchableOpacity>
        <View
          style={{
            position: "relative",
            width:"100%"
          }}
        >
          <Link>
          <Image
            style={styles.image}
            source={item.medium_url}
            // placeholder={{ blurhash }}
            contentFit="cover"
            transition={1000}
          />
          <AntDesign
            name="hearto"
            style={{
              position: "absolute",
              right: 12,
              top: 8,
            }}
            size={24}
            color="black"
          />
          </Link>
         
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 16,

          }}
        >
          <View
            style={{
              columnGap: 16,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Text
              style={{
                fontWeight: "700",
              }}
            >
              {item.name}
            </Text>
            <Text>{item.room_type}</Text>
            <Text>$ {item.price}</Text>
          </View>
          <Text
            style={{
              fontWeight: "700",
            }}
          >
            ★ {item.review_scores_rating / 20}
          </Text>
        </View>
      </TouchableOpacity>
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
      <View style={{ backgroundColor: "white", height: "100%" }}>
        {loading ? (
          <AntDesign name="loading2" size={24} color="black" />
        ) : (
          <FlatList
            style={{
              padding: 16,
            }}
            ref={listRef}
            data={listings}
            renderItem={({ item }: { item: Listing }) => <Item item={item} />}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    height: 200,
    borderRadius: 12,
    justifyContent: "center",
    backgroundColor: "#0553",
  },
});
export default Listings;
