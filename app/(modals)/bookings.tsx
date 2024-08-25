import { View, Text, StyleSheet, Platform, Pressable } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { BlurView } from "expo-blur";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { SlideInDown } from "react-native-reanimated";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { useRouter } from "expo-router";
const BookingPage = () => {
  const router = useRouter()
  return (
    <SafeAreaView>
      <View className="relative">
        <BlurView
          className="py-16 h-screen px-4 relative"
          experimentalBlurMethod={"dimezisBlurView"}
        >
          <View className="space-y-6">
          <View className="shadow-xl bg-white px-4 shadow-black flex-row items-center h-16 justify-between rounded-lg">
            <Text className="text-gray-600 font-bold">Where</Text>
            <Text className="font-bold">I'm flexible</Text>
          </View>
          <View className="shadow-xl bg-white px-4 shadow-black flex-row items-center h-16 justify-between rounded-lg">
            <Text className="text-gray-600 font-bold">When</Text>
            <Text className="font-bold">Any week</Text>
          </View>
          <View className="shadow-xl bg-white px-4 shadow-black flex-row py-4 h-24 justify-between rounded-lg">
            <Text className=" text-2xl font-bold">Who's coming</Text>
          </View>
          </View>
  
          <Animated.View
            entering={SlideInDown.delay(200)}
            className="absolute p-4 left-0 z-[999] bg-white h-24 bottom-0 right-0 border-t border-gray-200"
          >
            <View className="flex-row justify-between items-center">
              <Pressable>
                <Text className="font-semibold underline text-[16px]">
                  Clear all
                </Text>
              </Pressable>
              <Pressable className="rounded-lg bg-purple-600   px-4 h-10 flex-row items-center" onPress={()=>router.back()}>
                <EvilIcons name="search" size={24} color="white"  />
                <Text className="text-white font-bold">Search</Text>
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
