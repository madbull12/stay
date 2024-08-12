import { View, Text, Dimensions, TouchableOpacity, Share } from "react-native";
import React, { useLayoutEffect, useMemo } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Listing } from "../types";
import listingsData from "@/assets/data/air-bnb-listings.json";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const IMG_HEIGHT = 300;
const DetailPage = () => {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const shareListing = async () => {
    try {
      await Share.share({
        title: item?.name,
        url: item?.listing_url as string,
      });
    } catch (err) {
      console.log(err);
    }
  };
  const item = useMemo<Listing | undefined>(
    () => (listingsData as Listing[]).find((item) => item.id === id),
    [id]
  );
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [2, 1, 1]
          ),
        },
      ],
    };
  });

  const headerAnimatedStyle = useAnimatedStyle(()=>{
    return {
      opacity:interpolate(
        scrollOffset.value,
        [0, IMG_HEIGHT / 1.5],
        [0,1]
      )
    }
  })

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackground:()=>(
        <Animated.View className={"bg-white h-[100px] border border-black"} style={headerAnimatedStyle}/>
      ),
      headerRight: () => (
        <View className="flex flex-row items-center justify-center gap-4 ">
          <TouchableOpacity className="w-8 flex justify-center items-center  h-8 rounded-full bg-white" onPress={shareListing}>
            <Ionicons name="share-outline" size={22} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity className="w-8 flex justify-center items-center  h-8 rounded-full bg-white">
            <Ionicons name="heart-outline" size={22} color="#000" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);

  return (
    <View className="flex-1 bg-white">
      <Animated.ScrollView
        ref={scrollRef}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        <Animated.Image
          source={{ uri: item?.medium_url }}
          style={[
            {
              height: 300,
              width,
            },
            imageAnimatedStyle,
          ]}
        ></Animated.Image>
        <View className="p-3 space-y-3 bg-white">
          <Text className="text-xl">{item?.name}</Text>
          <Text className="font-semibold">
            {item?.room_type} in {item?.smart_location}
          </Text>
          <Text className="text-gray-500 text-[13px]">
            {item?.guests_included} guests • {item?.bedrooms} bedrooms •{" "}
            {item?.beds} beds • {item?.bathrooms} bathrooms
          </Text>
          <Text className="font-bold">
            ★ {item!.review_scores_rating / 20} • {item?.number_of_reviews}{" "}
            reviews
          </Text>
          <View className="flex items-center flex-row space-x-2 p-2 border-y border-gray-300">
            <Image
              source={item?.host_picture_url}
              className="h-12 w-12 object-cover rounded-full"
            />
            <View>
              <Text className="font-semibold">Hosted by {item?.host_name}</Text>
              <Text>Hosted since {item?.host_since}</Text>
            </View>
          </View>
          <Text className="leading-5">{item?.description}</Text>
        </View>
      </Animated.ScrollView>
      <View className="fixed flex flex-row items-center justify-between border-t border-gray-300 bottom-0 p-4">
        <Text className="font-bold">${item?.price} / night</Text>
        <TouchableOpacity className="bg-blue-500 rounded-lg px-4 py-2">
          <Text className="text-white font-bold">Reserve</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DetailPage;
