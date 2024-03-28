import { View, Text } from "react-native";
import React from "react";
import { Link, Stack } from "expo-router";
import ExploreHeader from "@/components/explore-header";

const IndexPage = () => {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Stack.Screen
        options={{
          header: () => <ExploreHeader />,
        }}
      />
    </View>
  );
};

export default IndexPage;
//
