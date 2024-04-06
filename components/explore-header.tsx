import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { EvilIcons, MaterialIcons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
const categories = [
  {
    name: "Tiny homes",
    icon: "home",
  },
  {
    name: "Cabins",
    icon: "house-siding",
  },
  {
    name: "Trending",
    icon: "local-fire-department",
  },
  {
    name: "City",
    icon: "apartment",
  },
  {
    name:"Beachfront",
    icon:"beach-access"
  }
];
const ExploreHeader = () => {
  const router = useRouter();
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <TouchableOpacity
            style={[styles.searchBox, styles.shadowProps]}
            onPress={() => router.push("/(modals)/bookings")}
          >
            <EvilIcons name="search" size={24} color="black" />
            <View>
              <Text
                style={{
                  fontFamily: "mont-b",
                }}
              >
                Where to?
              </Text>
              <Text
                style={{
                  color: "#b3b3b3",
                  fontFamily: "mont-sb",
                  fontSize: 12,
                }}
              >
                Anywhere . Any week
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterBtn}>
            <AntDesign name="filter" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={{
            alignItems: "center",
            gap: 20,
            paddingHorizontal: 16,
          }}
        >
          {categories.map((item, i) => (
            <TouchableOpacity key={i}>
              <MaterialIcons size={24} name={item.icon as any} />
              <Text style={styles.categoryText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding:15,
    backgroundColor: "white",
    height: 150,
  },
  searchContainer: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    height:75
  },
  searchBox: {
    padding: 10,
    // height:50,
    borderRadius: 50,
    flexDirection: "row",
    borderColor: "#c2c2c2",
    borderWidth: 1,
    alignItems: "center",
    gap: 10,
    flex: 0.8,
  },
  shadowProps: {
    shadowColor: "#000",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  filterBtn: {
    borderRadius: 100,
    borderColor: "#c2c2c2",
    borderWidth: 1,
    padding: 10,
  },
  categoryText: {
    fontSize: 14,
    fontFamily: "mont-sb",
    color: Colors.light.text,
  },
  categoryTextActive: {
    fontSize: 14,
    fontFamily: "mon-sb",
    color: "#000",
  },
  categoriesBtn:{
    flex:1,
    alignItems:"center",
    justifyContent:"center",
    paddingBottom:8
  },
  categoriesBtnActive:{
    flex:1,
    alignItems:"center",
    justifyContent:"center",
    borderBottomColor:"#000",
    borderBottomWidth:2,
    paddingBottom:8
  }
});

export default ExploreHeader;
