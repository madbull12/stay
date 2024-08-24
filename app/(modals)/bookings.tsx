import { View, Text, StyleSheet, Platform, Pressable } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { BlurView } from "expo-blur";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { SlideInDown } from "react-native-reanimated";

const BookingPage = () => {
  return (
    <SafeAreaView>
      <View className="relative">
        <BlurView
          className="py-16 h-screen px-4 relative"
          experimentalBlurMethod={"dimezisBlurView"}
        >
          <Animated.View
            entering={SlideInDown.delay(200)}
            className="absolute p-4 left-0 z-[999] bg-white h-24 bottom-0 right-0 border-t border-gray-200"
          >
            <View className="flex-row justify-between ">
              <Pressable>
                <Text className="font-semibold underline text-[16px]">
                  Clear all
                </Text>
              </Pressable>
              <Pressable className="rounded-lg">
                <Text>
                  Clear
                </Text>
              </Pressable>
            </View>
          </Animated.View>
        </BlurView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 26,
  },
});

export default BookingPage;
