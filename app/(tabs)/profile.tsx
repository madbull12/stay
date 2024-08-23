import { View, Text, Button, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from '@expo/vector-icons/Ionicons';
const ProfilePage = () => {
  const { signOut, isSignedIn } = useAuth();
  const { user } = useUser();
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [email, setEmail] = useState(user?.emailAddresses[0].emailAddress);
  const [edit, setEdit] = useState(false);
  // useEffect(()=>{

  // },[])

  return (
    <SafeAreaView>
      <View className="p-4 space-y-4">
        <View className="flex-row justify-between items-center">
          <Text className="text-xl font-bold">Profile</Text>
          <Ionicons name="notifications-outline" size={24} color="black" />
        </View>
        {user && isSignedIn ? (
          <Pressable
            onPress={() => signOut()}
            className="justify-center items-center bg-violet-700 rounded-full h-12 "
          >
            <Text className="text-white text-[16px] font-bold">Log out</Text>
          </Pressable>
        ) : null}

        {!isSignedIn && <Link href={"/(modals)/login"}>Login</Link>}
      </View>
    </SafeAreaView>
  );
};

export default ProfilePage;
