import { View, Text } from "react-native";
import React, { useMemo, useState } from "react";
import { Link, Stack } from "expo-router";
import ExploreHeader from "@/components/explore-header";
import Listings from "@/components/listings";
import listingsData from "@/assets/data/air-bnb-listings.json";
import { Listing } from "../types";
const IndexPage = () => {
  const [category, setCategory] = useState<string>("Tiny homes");
  const items = useMemo<Listing[]>(() => (listingsData as Listing[]).slice(0,50), []);
  const handleChangeCategory = (category: string) => {
    setCategory(category);
  };
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Stack.Screen
        options={{
          header: () => (
            <ExploreHeader handleChangeCategory={handleChangeCategory} />
          ),
        }}
      />
      
      <Listings category={category} listings={items as Listing[]} />
    </View>
  );
};



export default IndexPage;
//
