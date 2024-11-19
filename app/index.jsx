import { Text, View } from "react-native";
import { Link, Redirect } from "expo-router";
import Colors from "../constants/Colors";
import { useUser } from "@clerk/clerk-expo";

export default function Index() {
  const { user } = useUser();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {user ? <Redirect href="/(tabs)/home" /> : <Redirect href="/login" />}

      {/* <Link
        href="/login"
        style={{
          backgroundColor: Colors.PRIMARY,
          color: "white",
          padding: 14,
          borderRadius: 14,
          marginTop: 70,
          width: "90%",
          textAlign: "center",
        }}
      >
        <Text
          style={{ color: "black", fontFamily: "outfitBold", fontSize: 18 }}
        >
          Go To Login Screen
        </Text>
      </Link> */}
    </View>
  );
}
