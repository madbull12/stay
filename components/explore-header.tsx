import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { EvilIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { AntDesign } from '@expo/vector-icons';
const ExploreHeader = () => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <Link href="/(modals)/bookings">
            <TouchableOpacity style={[styles.searchBox, styles.shadowProps]}>
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
          </Link>
          <TouchableOpacity style={styles.filterBtn}>
          <AntDesign name="filter" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "white",
    height: 100,
  },
  searchContainer: {
    flexDirection: "row",
    gap: 10,
    justifyContent:"space-between",
    alignItems:"center",
    flex:1
  },
  searchBox: {
    padding: 10,
    borderRadius: 50,
    flexDirection: "row",
    borderColor: "#c2c2c2",
    borderWidth: 1,
    alignItems: "center",
    gap: 10,
    flex:1,
  },
  shadowProps: {
    shadowColor: "#000",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  filterBtn:{
    borderRadius:100,
    borderColor: "#c2c2c2",
    borderWidth:1,
    padding:10
  }
});

export default ExploreHeader;
