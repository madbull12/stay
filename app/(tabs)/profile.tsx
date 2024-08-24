import { View, Text, Button, Pressable, Image, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import * as ImagePicker from "expo-image-picker";
const ProfilePage = () => {
  const { signOut, isSignedIn } = useAuth();
  const { user } = useUser();
  const [firstName, setFirstName] = useState<string | undefined | null>(
    user?.firstName
  );
  const [lastName, setLastName] = useState<string | undefined | null>(
    user?.lastName
  );
  // const [email, setEmail] = useState(user?.emailAddresses[0].emailAddress);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (!user) return;
    setFirstName(user?.firstName);
    setLastName(user?.lastName);
    // setFirstName(user?.firstName)
  }, [user]);
  const onEditUser = async () => {
    try {
      console.log(firstName, lastName);

      if (!lastName || !firstName) return;
      await user?.update({
        firstName,
        lastName
      });
 
    } catch (error) {
      console.log(error)
    } finally {
      setEdit(false);
 
    }
  };
  // useEffect(()=>{

  // },[])

  const onCaptureImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      base64: true,
    });
    if (!result.canceled) {
      const base64 = `data:image/png;base64,${result.assets[0].base64}`;
      user?.setProfileImage({
        file: base64,
      });
    }
  };

  return (
    <SafeAreaView>
      <View className="p-4 space-y-4">
        <View className="flex-row justify-between items-center">
          <Text className="text-xl font-bold">Profile</Text>
          <Ionicons name="notifications-outline" size={24} color="black" />
        </View>
        {user && isSignedIn ? (
          <View className="justify-center flex-col items-center space-y-2 ">
            <Pressable onPress={onCaptureImage}>
              <Image
                className="w-20 h-20 rounded-full"
                source={{
                  uri: user.imageUrl,
                }}
              />
            </Pressable>

            <View className="flex-row gap-x-2 items-center">
              {edit ? null : (
                <Text className="text-lg font-bold">{user.fullName}</Text>
              )}

              {edit ? null : (
                <Pressable onPress={() => setEdit(true)}>
                  <Feather name="edit" size={24} color="black" />
                </Pressable>
              )}
            </View>
            {edit ? (
              <View className="flex-row gap-x-2">
                <TextInput
                  className="border h-8 rounded-lg w-20 px-2 "
                  onChangeText={setFirstName}
                  value={firstName as string}
                />
                <TextInput
                  className="border h-8 rounded-lg w-20 px-2"
                  onChangeText={setLastName}
                  value={lastName as string}
                />
                <Pressable onPress={onEditUser}>
                  <AntDesign name="check" size={24} color="black" />
                </Pressable>
                {/* <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="useless placeholder"
        keyboardType="numeric"
      /> */}
              </View>
            ) : null}
            <Text>{user.emailAddresses[0].emailAddress}</Text>
            <Text>Created on {user.createdAt?.toLocaleDateString()}</Text>
          </View>
        ) : null}
        <View></View>
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
