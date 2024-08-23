import React, { useMemo, useRef } from "react";
import { Listing } from "@/app/types";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import Listings from "./listings";
import { FlatList, Pressable, Text } from "react-native";
import Entypo from '@expo/vector-icons/Entypo';

interface Props {
  listings: Listing[];
  category: string;
}
const ListingBottomSheet = ({ listings, category }: Props) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  // const listRef = useRef<FlatList>(null);
  const methodsRef = useRef<{
    scrollTop:()=>void
  }>(null);
  
  const handleCollapse = () => bottomSheetRef.current!.collapse();
  const scrollTop = () => methodsRef?.current?.scrollTop()
  const handlePressMap = () => {
    scrollTop()

    handleCollapse();
  }

  const snapPoints = useMemo(() => ["5%", "100%"], []);
  return (
    <BottomSheet index={1} ref={bottomSheetRef} snapPoints={snapPoints} >
        <Listings ref={methodsRef} listings={listings} category={category} />
        <Pressable onPress={handlePressMap} className="absolute hover:bg-black left-[50%] translate-x-1/2 w-1/2 bottom-8 bg-black rounded-full flex flex-row gap-x-2 h-12 items-center justify-center">
          <Text className="text-white text-lg font-bold text-center">Map</Text>
          <Entypo name="map" size={24} color="white" />
        </Pressable>
    </BottomSheet>
  );
};

export default ListingBottomSheet;
