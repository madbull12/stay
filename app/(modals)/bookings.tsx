import {
  View,
  Text,
  StyleSheet,
  Platform,
  Pressable,
  TextInput,
  Image,
} from "react-native";
import React, { useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { BlurView } from "expo-blur";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
} from "react-native-reanimated";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { ScrollView } from "react-native-gesture-handler";
import { places } from "@/assets/data/places";
import Feather from "@expo/vector-icons/Feather";
import DateTimePicker, { DateType } from "react-native-ui-datepicker";
import dayjs from "dayjs";
const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);
const BookingPage = () => {
  const router = useRouter();
  const [selectedPlace, setSelectedPlace] = useState(1);
  const [openCard, setOpenCard] = useState(0);
  const [date, setDate] = useState(dayjs());
  const [startDate, setStartDate] = useState<DateType>(dayjs());
  const [endDate, setEndDate] = useState<DateType>(dayjs());
  const [groups, setGroups] = useState([
    {
      name: "Adults",
      text: "Ages 13 or above",
      count: 0,
    },
    {
      name: "Children",
      text: "Ages 2-12",
      count: 0,
    },
    {
      name: "Infants",
      text: "Under 2",
      count: 0,
    },
    {
      name: "Pets",
      text: "Pets allowed",
      count: 0,
    },
  ]);
  let dateNow = new Date();
  dateNow.setDate(dateNow.getDate() - 1);
  return (
    <SafeAreaView>
      <View className="relative">
        <BlurView
          className="py-16 h-screen px-4 relative"
          experimentalBlurMethod={"dimezisBlurView"}
        >
          <View className="space-y-6">
            <View className="shadow-xl  bg-white p-4 shadow-black  justify-between rounded-lg">
              {openCard !== 0 && (
                <AnimatedTouchableOpacity
                  onPress={() => setOpenCard(0)}
                  entering={FadeIn.duration(200)}
                  exiting={FadeOut.duration(200)}
                  className="flex-row justify-between w-full"
                >
                  <Text className="text-gray-600 font-bold">Where</Text>
                  <Text className="font-bold">I'm flexible</Text>
                </AnimatedTouchableOpacity>
              )}
              {openCard === 0 && <Text>Where to?</Text>}
              {openCard === 0 && (
                <Animated.View
                  entering={FadeIn}
                  exiting={FadeOut}
                  className="space-y-4"
                >
                  <View className="flex-row items-center gap-x-4 mt-4">
                    <Feather name="search" size={24} color="black" />
                    <TextInput
                      className="border-gray-400 border rounded-lg px-4 flex-1"
                      placeholder="Search destinations"
                      placeholderTextColor={"gray"}
                    />
                  </View>

                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    className="gap-x-4"
                  >
                    {places.map((item, index) => (
                      <TouchableOpacity
                        onPress={() => setSelectedPlace(index)}
                        key={index}
                      >
                        <Image
                          source={item.img}
                          style={{
                            width: 100,
                            height: 100,
                            borderWidth: selectedPlace === index ? 1 : 0,
                            borderRadius: 5,
                            borderColor: "gray",
                          }}
                        />
                        <Text className="mt-2">{item.title}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </Animated.View>
              )}
            </View>
            <View className="shadow-xl bg-white p-4 shadow-black    justify-between rounded-lg">
              {openCard !== 1 && (
                <AnimatedTouchableOpacity
                  className={"flex-row justify-between w-full"}
                  onPress={() => setOpenCard(1)}
                  entering={FadeIn.duration(200)}
                  exiting={FadeOut.duration(200)}
                >
                  <Text className="text-gray-600 font-bold">When</Text>
                  <Text className="font-bold">Any week</Text>
                </AnimatedTouchableOpacity>
              )}
              {openCard == 1 && (
                <Text className="text-2xl font-bold">When's your trip?</Text>
              )}

              {openCard == 1 && (
                <Animated.View>
                  <DateTimePicker
                    minDate={dateNow}
                    mode="range"
                    // date={date}
                    startDate={startDate}
                    endDate={endDate}
                    onChange={(params) => {
                      setStartDate(params.startDate);
                      setEndDate(params.endDate);
                    }}
                  />
                </Animated.View>
              )}
            </View>
            <View className="shadow-xl bg-white p-4 shadow-black    justify-between rounded-lg">
              {openCard != 2 && (
                <AnimatedTouchableOpacity
                  onPress={() => setOpenCard(2)}
                  className={"flex-row justify-between w-full"}
                  entering={FadeIn.duration(200)}
                  exiting={FadeOut.duration(200)}
                >
                  <Text className="text-gray-600 font-bold">Who</Text>
                  <Text className="font-bold">Guests</Text>
                </AnimatedTouchableOpacity>
              )}
              {openCard === 2 && (
                <Text className="text-2xl font-bold">Who's coming?</Text>
              )}
              {openCard === 2 && (
                <Animated.View>
                  {groups.map((item, i) => (
                    <View
                      key={i}
                      className="flex-row items-center py-2 border-b border-gray-300 justify-between"
                    >
                      <View>
                        <Text className="font-semibold">{item.name}</Text>
                        <Text className="text-gray-400">{item.text}</Text>
                      </View>
                      <View className="flex-row gap-x-2 items-center">
                        <TouchableOpacity>
                          <AntDesign
                            name="minuscircleo"
                            size={18}
                            color="black"
                          />
                        </TouchableOpacity>
                        <Text>{item.count}</Text>
                        <TouchableOpacity>
                        <AntDesign name="pluscircleo" size={18} color="black" />

                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}
                </Animated.View>
              )}
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
              <Pressable
                className="rounded-lg bg-purple-600   px-4 h-10 flex-row items-center"
                onPress={() => router.back()}
              >
                <EvilIcons name="search" size={24} color="white" />
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
