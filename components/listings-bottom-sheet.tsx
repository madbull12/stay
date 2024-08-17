import { View, Text } from "react-native";
import React, { useMemo, useRef } from "react";
import { Listing } from "@/app/types";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import Listings from "./listings";


interface Props {
  listings: Listing[];
  category: string;
}
const ListingBottomSheet = ({ listings, category }: Props) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["10%", "100%"], []);
  return (
    <BottomSheet index={1} ref={bottomSheetRef} snapPoints={snapPoints}>

        <Listings listings={listings} category={category} />
    </BottomSheet>
  );
};

export default ListingBottomSheet;
